"use client";

import { useEffect, useState } from "react";
import { RealisticAircraftSvg } from "@/components/ui/RealisticAircraftSvg";
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
  const isDaylight = useSimulationStore((s) => s.themeMode) === "daylight";

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
          stroke="var(--vec-r-safe)"
          strokeOpacity={isDaylight ? 0.65 : 0.5}
          strokeDasharray="10 8"
          strokeWidth={2}
        />
      ) : (
        <line
          x1={origin.x}
          y1={100}
          x2={origin.x}
          y2={560}
          filter={!isDaylight && currentStep <= 5 ? "url(#glow-cyan)" : undefined}
          stroke="var(--vec-r-safe)"
          strokeOpacity={currentStep === 6 ? 0.45 : 1}
          strokeDasharray="8 6"
          strokeLinecap="round"
          strokeWidth={currentStep === 6 ? 1.8 : 2.8}
        />
      )}

      {/* Điểm chạm đất mục tiêu */}
      {currentStep >= 4 && currentStep <= 5 && (
        <g>
          <circle
            cx={touchdown.x}
            cy={touchdown.y}
            r={9}
            fill="none"
            stroke="var(--vec-r-safe)"
            strokeWidth={2.4}
          />
          <circle cx={touchdown.x} cy={touchdown.y} r={3.5} fill="var(--vec-r-safe)" />
          <text
            x={touchdown.x}
            y={26}
            fill="var(--vec-r-safe)"
            fontFamily="var(--font-jetbrains-mono)"
            fontSize={12.5}
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
            opacity={isDaylight ? 0.85 : 0.65}
            stroke={isAligned ? "var(--vec-r-safe)" : "var(--vec-w)"}
            strokeDasharray="6 6"
            strokeWidth={2.2}
          />
          <circle
            cx={projectedX}
            cy={projectedY}
            r={5}
            fill="none"
            stroke={isAligned ? "var(--vec-r-safe)" : "var(--vec-w)"}
            strokeWidth={2}
          />
          <circle
            cx={projectedX}
            cy={projectedY}
            r={2}
            fill={isAligned ? "var(--vec-r-safe)" : "var(--vec-w)"}
          />
          {!isAligned && (
            <text
              x={projectedX < origin.x ? projectedX - 12 : projectedX + 12}
              y={projectedY + 4}
              fill="var(--vec-w)"
              fontFamily="var(--font-jetbrains-mono)"
              fontSize={12.5}
              fontWeight={700}
              opacity={0.95}
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
            stroke="var(--vec-caliper)"
            strokeWidth={2.2}
          />
          <circle cx={0} cy={0} r={3.5} fill="var(--vec-r-safe)" />
          <circle cx={caliperDevPx} cy={0} r={3.5} fill="var(--vec-caliper)" />
          <text
            x={caliperDevPx < 0 ? caliperDevPx - 8 : caliperDevPx + 8}
            y={-7}
            fill="var(--vec-caliper)"
            fontFamily="var(--font-jetbrains-mono)"
            fontSize={12.5}
            fontWeight={700}
            textAnchor={caliperDevPx < 0 ? "end" : "start"}
          >
            {`LỆCH NGANG: ${telemetry.lateralDriftMeters > 0 ? "+" : ""}${
              telemetry.lateralDriftMeters
            }m`}
          </text>
        </g>
      )}

      {/* Máy bay top-down chân thực & vòng định hướng */}
      <g transform={`translate(${aircraftX}, ${aircraftY})`}>
        <circle
          cx={0}
          cy={0}
          r={28}
          fill="none"
          stroke="var(--vec-a)"
          strokeOpacity={isDaylight ? 0.55 : 0.4}
          strokeDasharray="4 4"
          strokeWidth={1.3}
          style={{
            animation: "vq-spin 20s linear infinite",
            animationPlayState: isPlaying ? "running" : "paused",
          }}
        />
        <g transform={`rotate(${telemetry.headingOffsetDeg}) translate(-32, -32)`}>
          <RealisticAircraftSvg variant="radar" isDaylight={isDaylight} />
        </g>
        <circle cx={0} cy={0} r={2.5} fill="var(--vec-a)" />
      </g>
    </g>
  );
}
