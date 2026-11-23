"use client";

import { useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent, RefObject } from "react";
import { clientToSvgPoint, svgPointToHeadingOffsetDeg } from "@/lib/svgCoords";
import { useSimulationStore } from "@/store/useSimulationStore";

interface VectorOverlayLayerProps {
  svgRef: RefObject<SVGSVGElement | null>;
}

/**
 * Lớp phủ 3 vectơ SVG (v_A, v_W, v_R), thước đo góc 360°, hệ trục tọa độ (x, y),
 * hình bình hành dựng hình và tay cầm kéo thả đầu vectơ v_A.
 * Giữ nguyên toàn bộ ký hiệu toán học v_A, v_W, v_R, θ, (x, y).
 */
export function VectorOverlayLayer({ svgRef }: VectorOverlayLayerProps) {
  const currentStep = useSimulationStore((s) => s.currentStep);
  const telemetry = useSimulationStore((s) => s.telemetry);
  const vectorsVisible = useSimulationStore((s) => s.vectorsVisible);
  const showParallelogram = useSimulationStore((s) => s.showParallelogram);
  const showCoordinateGrid = useSimulationStore((s) => s.showCoordinateGrid);
  const windDirection = useSimulationStore((s) => s.windDirection);
  const guideVisible = useSimulationStore((s) => s.guideVisible);
  const toleranceDeg = useSimulationStore((s) => s.toleranceDeg);
  const setAircraftHeading = useSimulationStore((s) => s.setAircraftHeading);
  const isDaylight = useSimulationStore((s) => s.themeMode) === "daylight";

  const [isDragging, setIsDragging] = useState(false);
  const activePointerId = useRef<number | null>(null);

  const { svgOrigin, svgParallelogram } = telemetry;
  const { tipA, tipR, tipW } = svgParallelogram;

  const isLabStep = currentStep >= 4 && currentStep <= 5;
  const isExplainStep = currentStep === 6;
  const isInteractive = currentStep === 4 || currentStep === 5;

  const handlePointerDown = (e: ReactPointerEvent<SVGGElement>) => {
    if (!isInteractive) return;
    e.preventDefault();
    e.stopPropagation();
    activePointerId.current = e.pointerId;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Bỏ qua trong môi trường mô phỏng sự kiện không hỗ trợ pointer capture
    }
    setIsDragging(true);
  };

  const handlePointerMove = (e: ReactPointerEvent<SVGGElement>) => {
    if (!isDragging || activePointerId.current !== e.pointerId) return;
    const svgPt = clientToSvgPoint(svgRef.current, e.clientX, e.clientY);
    if (!svgPt) return;
    const rawHeading = svgPointToHeadingOffsetDeg(svgPt, svgOrigin);
    // Giữ Shift để kéo siêu mịn 0.1°, mặc định làm tròn thông minh theo bước 0.5° & hút nhẹ góc chuẩn
    let nextHeading: number;
    if (e.shiftKey) {
      nextHeading = Math.round(rawHeading * 10) / 10;
    } else if (Math.abs(rawHeading - telemetry.idealCrabAngleDeg) <= 0.35) {
      nextHeading = Math.round(telemetry.idealCrabAngleDeg * 10) / 10;
    } else {
      nextHeading = Math.round(rawHeading * 2) / 2;
    }
    setAircraftHeading(nextHeading);
  };

  const handlePointerUp = (e: ReactPointerEvent<SVGGElement>) => {
    if (activePointerId.current !== e.pointerId) return;
    activePointerId.current = null;
    setIsDragging(false);
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Bỏ qua nếu đã giải phóng pointer capture
    }
  };

  const headingLabel = `${telemetry.headingOffsetDeg >= 0 ? "+" : ""}${telemetry.headingOffsetDeg.toFixed(1)}°`;
  const driftLabel = `${telemetry.driftAngleDeg >= 0 ? "+" : ""}${telemetry.driftAngleDeg.toFixed(1)}°`;

  const absDriftDeg = Math.abs(telemetry.driftAngleDeg);
  const isAligned = absDriftDeg <= toleranceDeg;
  const idealRad = (telemetry.idealCrabAngleDeg * Math.PI) / 180;
  const idealTickX = 140 * Math.sin(idealRad);
  const idealTickY = -140 * Math.cos(idealRad);

  const arcRadius = 60;
  const arcAngleDeg =
    isLabStep || isExplainStep
      ? telemetry.headingOffsetDeg
      : telemetry.driftAngleDeg;
  const arcRad = (arcAngleDeg * Math.PI) / 180;
  const arcEndX = svgOrigin.x + arcRadius * Math.sin(arcRad);
  const arcEndY = svgOrigin.y - arcRadius * Math.cos(arcRad);
  const sweepFlag = arcAngleDeg >= 0 ? 1 : 0;

  return (
    <g>
      {/* Vòng thước đo góc 360° quanh máy bay (Bước 4–5) */}
      {isLabStep && (
        <g
          transform={`translate(${svgOrigin.x}, ${svgOrigin.y})`}
          className="pointer-events-none"
        >
          <circle
            r={140}
            fill="var(--radar-protractor-bg)"
            stroke="var(--radar-ring)"
            strokeDasharray="3 4"
            strokeWidth={1.4}
          />
          <circle
            r={100}
            fill="none"
            stroke="var(--radar-ring)"
            strokeOpacity={0.55}
            strokeWidth={1}
          />
          <g stroke="var(--radar-ring)" strokeWidth={1.4}>
            <line x1={0} x2={0} y1={-140} y2={-148} />
            <line x1={140} x2={148} y1={0} y2={0} />
            <line x1={0} x2={0} y1={140} y2={148} />
            <line x1={-140} x2={-148} y1={0} y2={0} />
            <line x1={99} x2={105} y1={-99} y2={-105} />
            <line x1={99} x2={105} y1={99} y2={105} />
            <line x1={-99} x2={-105} y1={-99} y2={-105} />
            <line x1={-99} x2={-105} y1={99} y2={105} />
          </g>
          <text
            x={0}
            y={-154}
            fill="var(--radar-compass-text)"
            fontFamily="var(--font-jetbrains-mono)"
            fontSize={11.5}
            fontWeight={700}
            textAnchor="middle"
          >
            000°
          </text>
          <text
            x={110}
            y={-106}
            fill="var(--radar-compass-text)"
            fontFamily="var(--font-jetbrains-mono)"
            fontSize={11.5}
            fontWeight={700}
          >
            045°
          </text>
          <text
            x={154}
            y={4}
            fill="var(--radar-compass-text)"
            fontFamily="var(--font-jetbrains-mono)"
            fontSize={11.5}
            fontWeight={700}
          >
            090°
          </text>
          <text
            x={0}
            y={164}
            fill="var(--radar-compass-text)"
            fontFamily="var(--font-jetbrains-mono)"
            fontSize={11.5}
            fontWeight={700}
            textAnchor="middle"
          >
            180°
          </text>
          <text
            x={-154}
            y={4}
            fill="var(--radar-compass-text)"
            fontFamily="var(--font-jetbrains-mono)"
            fontSize={11.5}
            fontWeight={700}
            textAnchor="end"
          >
            270°
          </text>
          <text
            x={-136}
            y={-106}
            fill="var(--radar-compass-text)"
            fontFamily="var(--font-jetbrains-mono)"
            fontSize={11.5}
            fontWeight={700}
          >
            315°
          </text>

          {/* Vạch gợi ý góc cân bằng lý tưởng khi bật Hướng dẫn */}
          {guideVisible && (
            <g>
              <line
                x1={0}
                y1={0}
                x2={idealTickX}
                y2={idealTickY}
                stroke="var(--vec-r-safe)"
                strokeOpacity={0.65}
                strokeDasharray="4 4"
                strokeWidth={1.6}
              />
              <circle cx={idealTickX} cy={idealTickY} r={4} fill="var(--vec-r-safe)" />
              <text
                x={idealTickX + (telemetry.idealCrabAngleDeg >= 0 ? 8 : -8)}
                y={idealTickY - 8}
                fill="var(--vec-r-safe)"
                fontFamily="var(--font-jetbrains-mono)"
                fontSize={11}
                fontWeight={700}
                textAnchor={telemetry.idealCrabAngleDeg >= 0 ? "start" : "end"}
              >
                {`Chuẩn ${telemetry.idealCrabAngleDeg >= 0 ? "+" : ""}${telemetry.idealCrabAngleDeg.toFixed(1)}°`}
              </text>
            </g>
          )}

          {/* Chỉ báo độ lệch quỹ đạo trực tiếp trên Radar */}
          <g transform="translate(0, 108)">
            <rect
              x={-158}
              y={-14}
              width={316}
              height={26}
              rx={13}
              fill="var(--vec-pill-bg)"
              fillOpacity={0.94}
              stroke={isAligned ? "var(--vec-r-safe)" : "var(--vec-a)"}
              strokeWidth={1.4}
            />
            <text
              x={0}
              y={4}
              fill={isAligned ? "var(--vec-r-safe)" : "var(--vec-a)"}
              fontFamily="var(--font-jetbrains-mono)"
              fontSize={11.5}
              fontWeight={700}
              textAnchor="middle"
            >
              {isAligned
                ? `Độ lệch: ${absDriftDeg.toFixed(1)}° • Đạt ngưỡng ±${toleranceDeg}°`
                : `Độ lệch: ${absDriftDeg.toFixed(1)}° • Cần chỉnh vào ±${toleranceDeg}°`}
            </text>
          </g>
        </g>
      )}

      {/* Hệ trục tọa độ Oxy ở Bước 6 */}
      {isExplainStep && showCoordinateGrid && (
        <g
          stroke="var(--radar-axis-stroke)"
          strokeDasharray="4 4"
          strokeWidth={1.5}
          className="pointer-events-none"
        >
          <line x1={460} x2={860} y1={svgOrigin.y} y2={svgOrigin.y} />
          <line x1={svgOrigin.x} x2={svgOrigin.x} y1={300} y2={660} />
          <text
            x={868}
            y={svgOrigin.y + 4}
            fill="var(--radar-ring-text)"
            stroke="none"
            fontFamily="var(--font-jetbrains-mono)"
            fontSize={12.5}
            fontWeight={700}
          >
            +x (ĐÔNG)
          </text>
          <text
            x={svgOrigin.x}
            y={288}
            fill="var(--radar-ring-text)"
            stroke="none"
            fontFamily="var(--font-jetbrains-mono)"
            fontSize={12.5}
            fontWeight={700}
            textAnchor="middle"
          >
            +y (BẮC / TRỤC ĐƯỜNG BĂNG)
          </text>
          <text
            x={svgOrigin.x + 8}
            y={svgOrigin.y + 18}
            fill="var(--radar-ring-text)"
            stroke="none"
            fontFamily="var(--font-jetbrains-mono)"
            fontSize={12.5}
            fontWeight={700}
          >
            O(0, 0)
          </text>
        </g>
      )}

      {/* Lớp 3 vectơ — chỉ ẩn khi vectorsVisible === false */}
      {vectorsVisible && (
        <g>
          {/* Hình bình hành dựng từ hai vectơ chung gốc (Bước 6) */}
          {isExplainStep && showParallelogram && (
            <g className="pointer-events-none">
              <polygon
                points={`${svgOrigin.x},${svgOrigin.y} ${tipA.x},${tipA.y} ${tipR.x},${tipR.y} ${tipW.x},${tipW.y}`}
                fill={
                  isDaylight
                    ? "rgba(2, 132, 199, 0.09)"
                    : "rgba(56, 189, 248, 0.06)"
                }
                stroke="var(--vec-w)"
                strokeOpacity={0.35}
                strokeWidth={1.2}
              />
              <line
                x1={tipA.x}
                y1={tipA.y}
                x2={tipR.x}
                y2={tipR.y}
                stroke="var(--vec-w)"
                strokeDasharray="6 4"
                strokeWidth={2.4}
              />
              <line
                x1={tipW.x}
                y1={tipW.y}
                x2={tipR.x}
                y2={tipR.y}
                stroke="var(--vec-a)"
                strokeDasharray="6 4"
                strokeWidth={2.4}
              />
            </g>
          )}

          {/* Đường gióng thành phần (Bước 4–5) */}
          {isLabStep && (
            <g className="pointer-events-none">
              <line
                x1={svgOrigin.x}
                y1={tipA.y}
                x2={tipA.x}
                y2={tipA.y}
                stroke="var(--vec-r-drift)"
                strokeOpacity={0.55}
                strokeDasharray="4 4"
                strokeWidth={1.8}
              />
              <line
                x1={svgOrigin.x}
                y1={svgOrigin.y}
                x2={svgOrigin.x}
                y2={tipA.y}
                stroke="var(--vec-a)"
                strokeOpacity={0.5}
                strokeDasharray="4 4"
                strokeWidth={1.8}
              />
            </g>
          )}

          {/* Vectơ 1: Vận tốc máy bay v_A (Vàng / Vàng cam đậm) */}
          <line
            x1={svgOrigin.x}
            y1={svgOrigin.y}
            x2={tipA.x}
            y2={tipA.y}
            filter={isDaylight ? undefined : "url(#glow-amber)"}
            markerEnd="url(#amber-arrow)"
            stroke="var(--vec-a)"
            strokeWidth={isExplainStep ? 4.2 : 3.6}
            className="pointer-events-none"
          />
          <text
            x={tipA.x + 14}
            y={tipA.y + 34}
            fill="var(--vec-a)"
            fontFamily="var(--font-jetbrains-mono)"
            fontSize={13.5}
            fontWeight={700}
            className="pointer-events-none"
          >
            {isExplainStep
              ? "v_A (Vận tốc máy bay)"
              : isLabStep
                ? `v_A (Góc bù ${headingLabel})`
                : `v_A (${telemetry.airspeedKts} KT • ${telemetry.compassHeadingDeg.toFixed(0)}°)`}
          </text>

          {/* Vectơ 2: Vận tốc gió ngang v_W (Cyan / Xanh dương đậm) */}
          {isExplainStep ? (
            <>
              <line
                x1={svgOrigin.x}
                y1={svgOrigin.y}
                x2={tipW.x}
                y2={tipW.y}
                filter={isDaylight ? undefined : "url(#glow-cyan)"}
                markerEnd="url(#cyan-arrow)"
                stroke="var(--vec-w)"
                strokeWidth={3.8}
                className="pointer-events-none"
              />
              <text
                x={windDirection === "rtl" ? tipW.x - 10 : tipW.x + 10}
                y={tipW.y - 8}
                fill="var(--vec-w)"
                fontFamily="var(--font-jetbrains-mono)"
                fontSize={13.5}
                fontWeight={700}
                textAnchor={windDirection === "rtl" ? "end" : "start"}
                className="pointer-events-none"
              >
                v_W (Gió ngang)
              </text>
              <text
                x={windDirection === "rtl" ? tipW.x - 10 : tipW.x + 10}
                y={tipW.y + 14}
                fill="var(--vec-w)"
                fontFamily="var(--font-jetbrains-mono)"
                fontSize={11.5}
                fontWeight={600}
                textAnchor={windDirection === "rtl" ? "end" : "start"}
                className="pointer-events-none"
              >
                {`${telemetry.windSpeedKts} KT [${windDirection === "rtl" ? "PHẢI → TRÁI" : "TRÁI → PHẢI"}]`}
              </text>
            </>
          ) : (
            <>
              <line
                x1={tipA.x}
                y1={tipA.y}
                x2={tipR.x}
                y2={tipR.y}
                filter={isDaylight ? undefined : "url(#glow-cyan)"}
                markerEnd="url(#cyan-arrow)"
                stroke="var(--vec-w)"
                strokeDasharray={currentStep <= 3 ? "5 4" : undefined}
                strokeWidth={isLabStep ? 3.2 : 2.8}
                className="pointer-events-none"
              />
              <text
                x={(tipA.x + tipR.x) / 2}
                y={tipA.y - 24}
                fill="var(--vec-w)"
                fontFamily="var(--font-jetbrains-mono)"
                fontSize={13.5}
                fontWeight={700}
                textAnchor="middle"
                className="pointer-events-none"
              >
                {`v_W (${windDirection === "rtl" ? "-" : "+"}${telemetry.windSpeedKts} KT)`}
              </text>
            </>
          )}

          {/* Vectơ 3: Vận tốc tổng hợp v_R */}
          <line
            x1={svgOrigin.x}
            y1={svgOrigin.y}
            x2={tipR.x}
            y2={tipR.y}
            filter={!isDaylight && currentStep >= 4 ? "url(#glow-coral)" : undefined}
            markerEnd={
              currentStep >= 4 ? "url(#coral-arrow)" : "url(#emerald-arrow)"
            }
            stroke={
              currentStep >= 4 ? "var(--vec-r-drift)" : "var(--vec-r-safe)"
            }
            strokeLinecap="round"
            strokeWidth={isExplainStep ? 4.6 : isLabStep ? 4.0 : 3.5}
            className="pointer-events-none"
          />

          {isExplainStep ? (
            <g
              transform={`translate(${tipR.x - 6}, ${(svgOrigin.y + tipR.y) / 2})`}
              className="pointer-events-none"
            >
              <rect
                x={-204}
                y={-12}
                width={198}
                height={24}
                rx={5}
                fill="var(--vec-pill-bg)"
                opacity={0.95}
                stroke="var(--vec-r-drift)"
                strokeWidth={1.4}
              />
              <text
                x={-12}
                y={5}
                fill="var(--vec-r-drift)"
                fontFamily="var(--font-jetbrains-mono)"
                fontSize={12.5}
                fontWeight={700}
                textAnchor="end"
              >
                v_R (Quỹ đạo thực tế)
              </text>
            </g>
          ) : (
            <text
              x={tipR.x - 16}
              y={(svgOrigin.y + tipR.y) / 2}
              fill={
                currentStep >= 4 ? "var(--vec-r-drift)" : "var(--vec-r-safe)"
              }
              fontFamily="var(--font-jetbrains-mono)"
              fontSize={13.5}
              fontWeight={700}
              textAnchor="end"
              className="pointer-events-none"
            >
              {isLabStep
                ? `v_R = ${telemetry.airspeedKts} KT (Δθ = ${driftLabel})`
                : `v_R (Quỹ đạo ${telemetry.groundTrackDeg.toFixed(1)}°)`}
            </text>
          )}

          {/* Cung hiển thị góc θ / Δθ */}
          {Math.abs(arcAngleDeg) > 1 && (
            <g className="pointer-events-none">
              <path
                d={`M ${svgOrigin.x} ${svgOrigin.y - arcRadius} A ${arcRadius} ${arcRadius} 0 0 ${sweepFlag} ${arcEndX} ${arcEndY}`}
                fill="none"
                stroke={
                  currentStep >= 4 ? "var(--vec-a)" : "var(--vec-arc-neutral)"
                }
                strokeDasharray={currentStep >= 4 ? undefined : "3 3"}
                strokeWidth={1.8}
              />
              <text
                x={arcAngleDeg >= 0 ? svgOrigin.x + 28 : svgOrigin.x - 28}
                y={svgOrigin.y - 46}
                fill={
                  currentStep >= 4 ? "var(--vec-a)" : "var(--vec-arc-neutral)"
                }
                fontFamily="var(--font-jetbrains-mono)"
                fontSize={12.5}
                fontWeight={700}
                textAnchor={arcAngleDeg >= 0 ? "start" : "end"}
              >
                {currentStep >= 4 ? `θ = ${headingLabel}` : `Δθ = ${driftLabel}`}
              </text>
            </g>
          )}

          {/* Điểm gốc chung O và ngọn v_R (Bước 6) */}
          {isExplainStep && (
            <g className="pointer-events-none">
              <circle
                cx={svgOrigin.x}
                cy={svgOrigin.y}
                r={5.5}
                fill="var(--vec-pill-bg)"
                stroke="var(--vec-arc-neutral)"
                strokeWidth={2.2}
              />
              <circle cx={tipR.x} cy={tipR.y} r={4.5} fill="var(--vec-r-drift)" />
            </g>
          )}

          {/* Tay cầm kéo thả đầu mũi tên v_A (Bước 4–5) */}
          {isInteractive && (
            <g
              transform={`translate(${tipA.x}, ${tipA.y})`}
              onPointerDown={handlePointerDown}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              onPointerCancel={handlePointerUp}
              style={{ touchAction: "none" }}
              className="pointer-events-auto cursor-grab active:cursor-grabbing"
              role="slider"
              aria-label="Kéo đầu mũi tên vectơ v_A để chỉnh hướng mũi máy bay"
              aria-valuemin={-60}
              aria-valuemax={60}
              aria-valuenow={Math.round(telemetry.headingOffsetDeg)}
            >
              {/* Vùng chạm vô hình tối thiểu >= 44x44px (đường kính 52px) */}
              <circle cx={0} cy={0} r={26} fill="transparent" />
              <circle
                cx={0}
                cy={0}
                r={isDragging ? 18 : 14}
                fill="var(--vec-a)"
                fillOpacity={0.22}
                stroke="var(--vec-a)"
                strokeWidth={2.4}
              />
              <circle cx={0} cy={0} r={5.5} fill="var(--vec-a)" />
              <rect
                x={12}
                y={-10}
                width={74}
                height={20}
                rx={10}
                fill="var(--vec-pill-bg)"
                stroke="var(--vec-a)"
                strokeWidth={1.5}
              />
              <text
                x={19}
                y={4}
                fill="var(--vec-a)"
                fontFamily="var(--font-jetbrains-mono)"
                fontSize={11}
                fontWeight={800}
              >
                KÉO ĐẦU
              </text>
            </g>
          )}
        </g>
      )}
    </g>
  );
}
