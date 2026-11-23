"use client";

import { useEffect, useState } from "react";
import { RADAR_CANVAS_COORDS } from "@/config/simulation";
import { useSimulationStore } from "@/store/useSimulationStore";

const FLIGHT_DURATION_MS = 2200;
const APPROACH_TARGET_Y = 140;

/**
 * Hiển thị trục tim đường băng, quỹ đạo dự kiến đứt nét, thước đo độ lệch ngang,
 * mục tiêu chạm đất và hình chiếu máy bay top-down trên Radar SVG.
 */
export function AircraftLayer() {
  const telemetry = useSimulationStore((s) => s.telemetry);
  const currentStep = useSimulationStore((s) => s.currentStep);
  const isPlaying = useSimulationStore((s) => s.isPlaying);
  const isFlightAnimating = useSimulationStore((s) => s.isFlightAnimating);
  const stopFlightAnimation = useSimulationStore((s) => s.stopFlightAnimation);

  const [flightProgress, setFlightProgress] = useState(0);

  useEffect(() => {
    if (!isFlightAnimating) {
      return;
    }

    let frameId = 0;
    let lastTimestamp: number | null = null;
    let progress = 0;

    const tick = (timestamp: number) => {
      if (lastTimestamp === null) {
        lastTimestamp = timestamp;
      }
      const deltaMs = timestamp - lastTimestamp;
      lastTimestamp = timestamp;

      if (isPlaying) {
        progress = Math.min(1, progress + deltaMs / FLIGHT_DURATION_MS);
        setFlightProgress(progress);
      }

      if (progress < 1) {
        frameId = window.requestAnimationFrame(tick);
      } else {
        window.setTimeout(() => {
          setFlightProgress(0);
          stopFlightAnimation();
        }, 450);
      }
    };

    frameId = window.requestAnimationFrame(tick);
    return () => {
      window.cancelAnimationFrame(frameId);
    };
  }, [isFlightAnimating, isPlaying, stopFlightAnimation]);

  const origin = RADAR_CANVAS_COORDS.AIRCRAFT_ORIGIN;
  const touchdown = RADAR_CANVAS_COORDS.TOUCHDOWN_TARGET;

  const vRx = telemetry.svgVectors.vR.x;
  const vRy = telemetry.svgVectors.vR.y;
  const safeNegVRy = Math.max(20, -vRy);
  const projScale = (origin.y - 230) / safeNegVRy;
  const projectedX = Math.max(220, Math.min(1140, origin.x + vRx * projScale));
  const projectedY = 230;

  const flightScale = (origin.y - APPROACH_TARGET_Y) / safeNegVRy;
  const activeProgress = isFlightAnimating ? flightProgress : 0;
  const aircraftX = origin.x + vRx * flightScale * activeProgress;
  const aircraftY = origin.y + vRy * flightScale * activeProgress;

  const caliperScale = (origin.y - 310) / safeNegVRy;
  const caliperDevPx = Math.max(
    -240,
    Math.min(240, vRx * caliperScale * 0.78)
  );
  const absDriftMeters = Math.abs(telemetry.lateralDriftMeters);
  const isAligned = Math.abs(telemetry.driftAngleDeg) <= 1.5;
  const showGhostTrail = currentStep <= 5;
  const showCaliper = currentStep <= 3 && absDriftMeters > 10;

  return (
    <g className="pointer-events-none">
      {/* Trục kéo dài tim đường băng */}
      {currentStep <= 3 ? (
        <line
          x1={origin.x}
          y1={70}
          x2={origin.x}
          y2={720}
          stroke="rgba(86,229,169,0.5)"
          strokeDasharray="10 8"
          strokeWidth={1.5}
        />
      ) : (
        <line
          x1={origin.x}
          y1={100}
          x2={origin.x}
          y2={560}
          filter={currentStep <= 5 ? "url(#glow-cyan)" : undefined}
          stroke={currentStep === 6 ? "rgba(86,229,169,0.35)" : "#56e5a9"}
          strokeDasharray="8 6"
          strokeLinecap="round"
          strokeWidth={currentStep === 6 ? 1.5 : 2.5}
        />
      )}

      {/* Điểm chạm đất mục tiêu */}
      {currentStep >= 4 && currentStep <= 5 && (
        <g>
          <circle
            cx={touchdown.x}
            cy={touchdown.y}
            r={8}
            fill="none"
            stroke="#56e5a9"
            strokeWidth={2}
          />
          <circle cx={touchdown.x} cy={touchdown.y} r={3} fill="#56e5a9" />
          <text
            x={touchdown.x}
            y={26}
            fill="#56e5a9"
            fontFamily="var(--font-jetbrains-mono)"
            fontSize={10}
            fontWeight={700}
            textAnchor="middle"
          >
            {isAligned
              ? "ĐIỂM CHẠM ĐẤT • ĐÃ KHÓA"
              : "ĐIỂM CHẠM ĐẤT • ĐB 36L"}
          </text>
        </g>
      )}

      {/* Quỹ đạo đứt nét dự kiến */}
      {showGhostTrail && (
        <g>
          <line
            x1={origin.x}
            y1={origin.y}
            x2={projectedX}
            y2={projectedY}
            opacity={0.55}
            stroke={isAligned ? "#56e5a9" : "#38bdf8"}
            strokeDasharray="4 6"
            strokeWidth={1.5}
          />
          <circle
            cx={projectedX}
            cy={projectedY}
            r={4}
            fill="none"
            stroke={isAligned ? "#56e5a9" : "#38bdf8"}
            strokeWidth={1.5}
          />
          <circle
            cx={projectedX}
            cy={projectedY}
            r={1.5}
            fill={isAligned ? "#56e5a9" : "#38bdf8"}
          />
          {!isAligned && (
            <text
              x={projectedX < origin.x ? projectedX - 12 : projectedX + 12}
              y={projectedY + 4}
              fill="#38bdf8"
              fontFamily="var(--font-jetbrains-mono)"
              fontSize={10}
              opacity={0.85}
              textAnchor={projectedX < origin.x ? "end" : "start"}
            >
              {`DỰ KIẾN LỆCH (${absDriftMeters}m ${
                telemetry.lateralDriftMeters < 0 ? "TRÁI" : "PHẢI"
              })`}
            </text>
          )}
        </g>
      )}

      {/* Thước đo độ lệch ngang khỏi tim đường băng */}
      {showCaliper && (
        <g transform={`translate(${origin.x}, 310)`}>
          <line
            x1={0}
            y1={0}
            x2={caliperDevPx}
            y2={0}
            stroke="#ffb4ab"
            strokeWidth={1.5}
          />
          <circle cx={0} cy={0} r={3} fill="#56e5a9" />
          <circle cx={caliperDevPx} cy={0} r={3} fill="#ffb4ab" />
          <text
            x={caliperDevPx < 0 ? caliperDevPx - 8 : caliperDevPx + 8}
            y={-6}
            fill="#ffb4ab"
            fontFamily="var(--font-jetbrains-mono)"
            fontSize={10}
            fontWeight={600}
            textAnchor={caliperDevPx < 0 ? "end" : "start"}
          >
            {`LỆCH NGANG: ${telemetry.lateralDriftMeters > 0 ? "+" : ""}${
              telemetry.lateralDriftMeters
            }m`}
          </text>
        </g>
      )}

      {/* Máy bay top-down & vòng định hướng */}
      <g transform={`translate(${aircraftX}, ${aircraftY})`}>
        <circle
          cx={0}
          cy={0}
          r={24}
          fill="none"
          stroke="rgba(255, 198, 64, 0.4)"
          strokeDasharray="4 4"
          strokeWidth={1}
          style={{
            animation: "vq-spin 20s linear infinite",
            animationPlayState: isPlaying ? "running" : "paused",
          }}
        />
        <g
          transform={`rotate(${telemetry.headingOffsetDeg}) translate(-18, -18) scale(1.5)`}
          filter="url(#glow-amber)"
        >
          <path
            d="M12 2L9 9H3L6 13L4 21L12 17L20 21L18 13L21 9H15L12 2Z"
            fill="var(--secondary)"
          />
        </g>
        <circle cx={0} cy={0} r={2.5} fill="var(--primary-fixed)" />
      </g>
    </g>
  );
}
