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
  const setAircraftHeading = useSimulationStore((s) => s.setAircraftHeading);

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
    const nextHeading = svgPointToHeadingOffsetDeg(svgPt, svgOrigin);
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
            fill="rgba(15,19,28,0.45)"
            stroke="rgba(56,189,248,0.25)"
            strokeDasharray="2 4"
            strokeWidth={1}
          />
          <circle
            r={100}
            fill="none"
            stroke="rgba(142,213,255,0.15)"
            strokeWidth={0.8}
          />
          <g stroke="rgba(56,189,248,0.35)" strokeWidth={1}>
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
            y={-152}
            fill="#8ed5ff"
            fontFamily="var(--font-jetbrains-mono)"
            fontSize={9}
            fontWeight={600}
            textAnchor="middle"
          >
            000°
          </text>
          <text
            x={108}
            y={-104}
            fill="#8ed5ff"
            fontFamily="var(--font-jetbrains-mono)"
            fontSize={9}
            fontWeight={500}
          >
            045°
          </text>
          <text
            x={152}
            y={3}
            fill="#8ed5ff"
            fontFamily="var(--font-jetbrains-mono)"
            fontSize={9}
            fontWeight={500}
          >
            090°
          </text>
          <text
            x={0}
            y={160}
            fill="#8ed5ff"
            fontFamily="var(--font-jetbrains-mono)"
            fontSize={9}
            fontWeight={500}
            textAnchor="middle"
          >
            180°
          </text>
          <text
            x={-152}
            y={3}
            fill="#8ed5ff"
            fontFamily="var(--font-jetbrains-mono)"
            fontSize={9}
            fontWeight={500}
            textAnchor="end"
          >
            270°
          </text>
          <text
            x={-130}
            y={-104}
            fill="#8ed5ff"
            fontFamily="var(--font-jetbrains-mono)"
            fontSize={9}
            fontWeight={500}
          >
            315°
          </text>
        </g>
      )}

      {/* Hệ trục tọa độ Oxy ở Bước 6 */}
      {isExplainStep && showCoordinateGrid && (
        <g
          stroke="rgba(135,146,154,0.3)"
          strokeDasharray="4 4"
          strokeWidth={1}
          className="pointer-events-none"
        >
          <line x1={460} x2={860} y1={svgOrigin.y} y2={svgOrigin.y} />
          <line x1={svgOrigin.x} x2={svgOrigin.x} y1={300} y2={660} />
          <text
            x={868}
            y={svgOrigin.y + 3}
            fill="rgba(142,213,255,0.65)"
            stroke="none"
            fontFamily="var(--font-jetbrains-mono)"
            fontSize={10}
          >
            +x (ĐÔNG)
          </text>
          <text
            x={svgOrigin.x}
            y={290}
            fill="rgba(142,213,255,0.65)"
            stroke="none"
            fontFamily="var(--font-jetbrains-mono)"
            fontSize={10}
            textAnchor="middle"
          >
            +y (BẮC / TRỤC ĐƯỜNG BĂNG)
          </text>
          <text
            x={svgOrigin.x + 6}
            y={svgOrigin.y + 15}
            fill="rgba(142,213,255,0.5)"
            stroke="none"
            fontFamily="var(--font-jetbrains-mono)"
            fontSize={10}
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
                fill="rgba(56,189,248,0.06)"
                stroke="rgba(56,189,248,0.25)"
                strokeWidth={1}
              />
              <line
                x1={tipA.x}
                y1={tipA.y}
                x2={tipR.x}
                y2={tipR.y}
                stroke="#38bdf8"
                strokeDasharray="5 4"
                strokeWidth={1.8}
              />
              <line
                x1={tipW.x}
                y1={tipW.y}
                x2={tipR.x}
                y2={tipR.y}
                stroke="#ffc640"
                strokeDasharray="5 4"
                strokeWidth={1.8}
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
                stroke="rgba(244,63,94,0.45)"
                strokeDasharray="4 4"
                strokeWidth={1.5}
              />
              <line
                x1={svgOrigin.x}
                y1={svgOrigin.y}
                x2={svgOrigin.x}
                y2={tipA.y}
                stroke="rgba(255,198,64,0.4)"
                strokeDasharray="4 4"
                strokeWidth={1.5}
              />
            </g>
          )}

          {/* Vectơ 1: Vận tốc máy bay v_A (Vàng) */}
          <line
            x1={svgOrigin.x}
            y1={svgOrigin.y}
            x2={tipA.x}
            y2={tipA.y}
            filter="url(#glow-amber)"
            markerEnd="url(#amber-arrow)"
            stroke="#ffc640"
            strokeWidth={isExplainStep ? 3.5 : 2.8}
            className="pointer-events-none"
          />
          <text
            x={tipA.x + 12}
            y={tipA.y + 32}
            fill="#ffc640"
            fontFamily="var(--font-jetbrains-mono)"
            fontSize={11}
            fontWeight={700}
            className="pointer-events-none"
          >
            {isExplainStep
              ? "v_A (Vận tốc máy bay)"
              : isLabStep
                ? `v_A (Góc bù ${headingLabel})`
                : `v_A (${telemetry.airspeedKts} KT • ${telemetry.compassHeadingDeg.toFixed(0)}°)`}
          </text>

          {/* Vectơ 2: Vận tốc gió ngang v_W (Cyan) */}
          {isExplainStep ? (
            <>
              <line
                x1={svgOrigin.x}
                y1={svgOrigin.y}
                x2={tipW.x}
                y2={tipW.y}
                filter="url(#glow-cyan)"
                markerEnd="url(#cyan-arrow)"
                stroke="#38bdf8"
                strokeWidth={3}
                className="pointer-events-none"
              />
              <text
                x={windDirection === "rtl" ? tipW.x - 8 : tipW.x + 8}
                y={tipW.y - 6}
                fill="#38bdf8"
                fontFamily="var(--font-jetbrains-mono)"
                fontSize={11}
                fontWeight={700}
                textAnchor={windDirection === "rtl" ? "end" : "start"}
                className="pointer-events-none"
              >
                v_W (Gió ngang)
              </text>
              <text
                x={windDirection === "rtl" ? tipW.x - 8 : tipW.x + 8}
                y={tipW.y + 12}
                fill="rgba(56,189,248,0.8)"
                fontFamily="var(--font-jetbrains-mono)"
                fontSize={9}
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
                filter="url(#glow-cyan)"
                markerEnd="url(#cyan-arrow)"
                stroke="#38bdf8"
                strokeDasharray={currentStep <= 3 ? "4 3" : undefined}
                strokeWidth={isLabStep ? 2.6 : 2.2}
                className="pointer-events-none"
              />
              <text
                x={(tipA.x + tipR.x) / 2}
                y={tipA.y - 22}
                fill="#38bdf8"
                fontFamily="var(--font-jetbrains-mono)"
                fontSize={11}
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
            filter={currentStep >= 4 ? "url(#glow-coral)" : undefined}
            markerEnd={
              currentStep >= 4 ? "url(#coral-arrow)" : "url(#emerald-arrow)"
            }
            stroke={currentStep >= 4 ? "#f43f5e" : "#56e5a9"}
            strokeLinecap="round"
            strokeWidth={isExplainStep ? 4 : isLabStep ? 3.5 : 3}
            className="pointer-events-none"
          />

          {isExplainStep ? (
            <g
              transform={`translate(${tipR.x - 6}, ${(svgOrigin.y + tipR.y) / 2})`}
              className="pointer-events-none"
            >
              <rect
                x={-186}
                y={-10}
                width={180}
                height={20}
                rx={4}
                fill="#181b25"
                opacity={0.9}
                stroke="#f43f5e"
                strokeWidth={1}
              />
              <text
                x={-10}
                y={4}
                fill="#f43f5e"
                fontFamily="var(--font-jetbrains-mono)"
                fontSize={10}
                fontWeight={700}
                textAnchor="end"
              >
                v_R (Quỹ đạo thực tế)
              </text>
            </g>
          ) : (
            <text
              x={tipR.x - 14}
              y={(svgOrigin.y + tipR.y) / 2}
              fill={currentStep >= 4 ? "#f43f5e" : "#56e5a9"}
              fontFamily="var(--font-jetbrains-mono)"
              fontSize={11}
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
                stroke={currentStep >= 4 ? "#ffc640" : "#dfe2ef"}
                strokeDasharray={currentStep >= 4 ? undefined : "2 2"}
                strokeWidth={1.4}
              />
              <text
                x={arcAngleDeg >= 0 ? svgOrigin.x + 26 : svgOrigin.x - 26}
                y={svgOrigin.y - 46}
                fill={currentStep >= 4 ? "#ffc640" : "#dfe2ef"}
                fontFamily="var(--font-jetbrains-mono)"
                fontSize={10}
                fontWeight={600}
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
                r={5}
                fill="#181b25"
                stroke="#dfe2ef"
                strokeWidth={2}
              />
              <circle cx={tipR.x} cy={tipR.y} r={4} fill="#f43f5e" />
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
                fill="rgba(255,198,64,0.25)"
                stroke="#ffc640"
                strokeWidth={2}
              />
              <circle cx={0} cy={0} r={5} fill="#ffc640" />
              <rect
                x={10}
                y={-8}
                width={62}
                height={16}
                rx={8}
                fill="#1c1f29"
                stroke="#ffc640"
                strokeWidth={1}
              />
              <text
                x={16}
                y={4}
                fill="#ffc640"
                fontFamily="var(--font-jetbrains-mono)"
                fontSize={9}
                fontWeight={700}
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
