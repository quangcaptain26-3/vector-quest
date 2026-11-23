"use client";

import { useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { Eraser, PenTool, X } from "lucide-react";
import { RADAR_CANVAS_COORDS } from "@/config/simulation";
import { getTranslations } from "@/lib/i18n";
import { clientToSvgPoint } from "@/lib/svgCoords";
import { useSimulationStore } from "@/store/useSimulationStore";
import { AircraftLayer } from "./AircraftLayer";
import { LiveTelemetryHud } from "./LiveTelemetryHud";
import { VectorOverlayLayer } from "./VectorOverlayLayer";
import { WindParticlesLayer } from "./WindParticlesLayer";

/**
 * Full-viewport SVG Airport Radar Canvas stage matching design/*.html.
 * Renders the radial compass rings, glideslope cone, Physical Runway 36L (with optional rotation),
 * dynamic wind particles, aircraft layer, interactive vector overlay, chalk notes, and telemetry HUD.
 */
export function AirportRadarCanvas() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const currentStep = useSimulationStore((s) => s.currentStep);
  const windDirection = useSimulationStore((s) => s.windDirection);
  const windStrength = useSimulationStore((s) => s.windStrength);
  const runwayAngleDeg = useSimulationStore((s) => s.runwayAngleDeg);
  const isPlaying = useSimulationStore((s) => s.isPlaying);
  const themeMode = useSimulationStore((s) => s.themeMode);
  const chalkEnabled = useSimulationStore((s) => s.chalkEnabled);
  const chalkPaths = useSimulationStore((s) => s.chalkPaths);
  const language = useSimulationStore((s) => s.language);
  const addChalkPath = useSimulationStore((s) => s.addChalkPath);
  const clearChalkPaths = useSimulationStore((s) => s.clearChalkPaths);
  const toggleChalk = useSimulationStore((s) => s.toggleChalk);

  const [activeStroke, setActiveStroke] = useState<string>("");
  const isDrawingRef = useRef(false);
  const tc = getTranslations(language).canvas;

  const compassCenter = RADAR_CANVAS_COORDS.COMPASS_CENTER;
  const origin = RADAR_CANVAS_COORDS.AIRCRAFT_ORIGIN;
  const isExplainStep = currentStep === 6;
  const isDaylight = themeMode === "daylight";

  const handleChalkPointerDown = (e: ReactPointerEvent<SVGRectElement>) => {
    if (!chalkEnabled) return;
    e.preventDefault();
    const pt = clientToSvgPoint(svgRef.current, e.clientX, e.clientY);
    if (!pt) return;
    isDrawingRef.current = true;
    try {
      e.currentTarget.setPointerCapture(e.pointerId);
    } catch {
      // Bỏ qua trong headless browser
    }
    setActiveStroke(`M ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`);
  };

  const handleChalkPointerMove = (e: ReactPointerEvent<SVGRectElement>) => {
    if (!chalkEnabled || !isDrawingRef.current) return;
    const pt = clientToSvgPoint(svgRef.current, e.clientX, e.clientY);
    if (!pt) return;
    setActiveStroke((prev) => `${prev} L ${pt.x.toFixed(1)} ${pt.y.toFixed(1)}`);
  };

  const finishChalkStroke = (e: ReactPointerEvent<SVGRectElement>) => {
    if (!isDrawingRef.current) return;
    isDrawingRef.current = false;
    try {
      if (e.currentTarget.hasPointerCapture(e.pointerId)) {
        e.currentTarget.releasePointerCapture(e.pointerId);
      }
    } catch {
      // Bỏ qua
    }
    if (activeStroke.includes("L")) {
      addChalkPath(activeStroke);
    }
    setActiveStroke("");
  };

  return (
    <div
      className="relative w-full h-full overflow-hidden rounded-xl flex items-center justify-center"
      style={{ backgroundColor: "var(--radar-bg)" }}
    >
      {/* Atmospheric Glow & Tactical Radial Vignette */}
      <div
        className={`absolute inset-0 pointer-events-none z-0 ${isDaylight
          ? "bg-[radial-gradient(circle_at_50%_45%,rgba(2,132,199,0.07)_0%,rgba(234,240,246,0.65)_68%,rgba(220,229,239,0.92)_100%)]"
          : "bg-[radial-gradient(circle_at_50%_45%,rgba(56,189,248,0.06)_0%,rgba(15,19,28,0.75)_65%,rgba(10,14,23,0.98)_100%)]"
          }`}
      />

      {/* Live SVG Radar Grid, Runway 36L, Wind Particles, Aircraft & Interactive Vectors */}
      <svg
        ref={svgRef}
        id="radar-canvas"
        viewBox="0 0 1360 720"
        preserveAspectRatio="xMidYMid meet"
        className="relative w-full h-full z-[1] select-none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <style>{`
            @keyframes vq-wind-flow {
              from { stroke-dashoffset: 460; }
              to { stroke-dashoffset: 0; }
            }
            @keyframes vq-spin {
              from { transform: rotate(0deg); }
              to { transform: rotate(360deg); }
            }
          `}</style>
          <marker
            id="cyan-arrow"
            markerHeight="6"
            markerWidth="6"
            orient="auto-start-reverse"
            refX="6"
            refY="5"
            viewBox="0 0 10 10"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--vec-w)" />
          </marker>
          <marker
            id="amber-arrow"
            markerHeight="6"
            markerWidth="6"
            orient="auto-start-reverse"
            refX="6"
            refY="5"
            viewBox="0 0 10 10"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--vec-a)" />
          </marker>
          <marker
            id="emerald-arrow"
            markerHeight="6"
            markerWidth="6"
            orient="auto-start-reverse"
            refX="6"
            refY="5"
            viewBox="0 0 10 10"
          >
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="var(--vec-r-safe)" />
          </marker>
          <marker
            id="coral-arrow"
            markerHeight="7"
            markerWidth="7"
            orient="auto-start-reverse"
            refX="7"
            refY="5"
            viewBox="0 0 10 10"
          >
            <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="var(--vec-r-drift)" />
          </marker>

          <pattern
            id="grid-dots"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <circle cx="24" cy="24" r="1" fill="var(--radar-grid-dot)" />
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke="var(--radar-grid-line)"
              strokeWidth="1"
            />
          </pattern>

          <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-amber" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2.8" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="glow-coral" x="-30%" y="-30%" width="160%" height="160%">
            <feGaussianBlur stdDeviation="3.5" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Background Grid */}
        <rect
          width="100%"
          height="100%"
          fill="url(#grid-dots)"
          className="pointer-events-none"
        />

        {/* Center Dynamic Compass Radial Rings */}
        <g
          opacity={isExplainStep ? 0.3 : isDaylight ? 0.85 : 0.55}
          transform={`translate(${compassCenter.x}, ${compassCenter.y})`}
          className="pointer-events-none"
        >
          <circle
            r={130}
            fill="none"
            stroke="var(--radar-ring)"
            strokeDasharray="4 4"
            strokeWidth={1.3}
          />
          <text
            x={136}
            y={-6}
            fill="var(--radar-ring-text)"
            fontFamily="var(--font-jetbrains-mono)"
            fontSize={12}
            fontWeight={700}
            letterSpacing="0.06em"
          >
            5 NM
          </text>

          <circle
            r={260}
            fill="none"
            stroke="var(--radar-ring)"
            strokeDasharray="4 6"
            strokeWidth={1.3}
          />
          <text
            x={266}
            y={-6}
            fill="var(--radar-ring-text)"
            fontFamily="var(--font-jetbrains-mono)"
            fontSize={12}
            fontWeight={700}
            letterSpacing="0.06em"
          >
            10 NM
          </text>

          {!isExplainStep && (
            <>
              <circle
                r={390}
                fill="none"
                stroke="var(--radar-ring)"
                strokeDasharray="2 8"
                strokeWidth={1.2}
              />
              <text
                x={396}
                y={-6}
                fill="var(--radar-ring-text)"
                fontFamily="var(--font-jetbrains-mono)"
                fontSize={12}
                fontWeight={700}
                letterSpacing="0.06em"
              >
                15 NM
              </text>
            </>
          )}

          {/* Polar Axis Crosshairs */}
          <line
            x1={-480}
            x2={480}
            y1={0}
            y2={0}
            stroke="var(--radar-axis-stroke)"
            strokeWidth={1.1}
          />
          <line
            x1={0}
            x2={0}
            y1={-380}
            y2={380}
            stroke="var(--radar-axis-stroke)"
            strokeWidth={1.1}
          />

          {/* Azimuth Compass Ticks */}
          {currentStep <= 3 && (
            <>
              <g stroke="var(--radar-ring)" strokeWidth={1.4}>
                <line x1={0} x2={0} y1={-390} y2={-402} />
                <line x1={390} x2={402} y1={0} y2={0} />
                <line x1={0} x2={0} y1={390} y2={402} />
                <line x1={-390} x2={-402} y1={0} y2={0} />
                <line x1={275} x2={284} y1={-275} y2={-284} />
                <line x1={-275} x2={-284} y1={-275} y2={-284} />
                <line x1={275} x2={284} y1={275} y2={284} />
                <line x1={-275} x2={-284} y1={275} y2={284} />
              </g>
              <text
                x={-12}
                y={-408}
                fill="var(--radar-compass-text)"
                fontFamily="var(--font-jetbrains-mono)"
                fontSize={13}
                fontWeight={700}
              >
                360°
              </text>
              <text
                x={410}
                y={4}
                fill="var(--radar-compass-text)"
                fontFamily="var(--font-jetbrains-mono)"
                fontSize={13}
                fontWeight={700}
              >
                090°
              </text>
              <text
                x={-12}
                y={420}
                fill="var(--radar-compass-text)"
                fontFamily="var(--font-jetbrains-mono)"
                fontSize={13}
                fontWeight={700}
              >
                180°
              </text>
              <text
                x={-448}
                y={4}
                fill="var(--radar-compass-text)"
                fontFamily="var(--font-jetbrains-mono)"
                fontSize={13}
                fontWeight={700}
              >
                270°
              </text>
            </>
          )}
        </g>

        {/* Approach Glideslope & Physical Runway 36L (rotates with runwayAngleDeg) */}
        <g
          transform={
            runwayAngleDeg !== 0
              ? `rotate(${runwayAngleDeg}, ${origin.x}, ${origin.y})`
              : undefined
          }
          className="pointer-events-none"
        >
          {!isExplainStep && (
            <polygon
              points={
                currentStep >= 4
                  ? "680,110 590,560 770,560"
                  : "680,110 590,520 770,520"
              }
              fill={
                isDaylight
                  ? "rgba(5, 150, 105, 0.08)"
                  : "rgba(86, 229, 169, 0.035)"
              }
              stroke="var(--vec-r-safe)"
              strokeOpacity={isDaylight ? 0.35 : 0.22}
              strokeDasharray="4 4"
              strokeWidth={1.2}
            />
          )}

          {/* Physical Runway 36L (exact SVG-aligned strip at x=644, y=40, 72x260) */}
          <g opacity={isExplainStep ? 0.35 : 1}>
            <rect
              x={644}
              y={40}
              width={72}
              height={260}
              rx={3}
              fill="var(--runway-fill)"
              stroke="var(--runway-stroke)"
              strokeWidth={2}
            />
            {/* Threshold Green Identification Strobes */}
            {[658, 668, 678, 688, 698].map((sx) => (
              <rect
                key={sx}
                x={sx - 5}
                y={48}
                width={10}
                height={4}
                rx={1}
                fill="var(--vec-r-safe)"
              />
            ))}
            {/* Runway Designation Markings */}
            <text
              x={680}
              y={82}
              fill="var(--runway-markings)"
              fontFamily="var(--font-space-grotesk)"
              fontSize={19}
              fontWeight={800}
              letterSpacing="0.12em"
              textAnchor="middle"
            >
              36
            </text>
            <text
              x={680}
              y={102}
              fill="var(--runway-markings)"
              fontFamily="var(--font-space-grotesk)"
              fontSize={19}
              fontWeight={800}
              letterSpacing="0.12em"
              textAnchor="middle"
            >
              L
            </text>
            {/* Touchdown Aiming Points */}
            <rect
              x={652}
              y={128}
              width={8}
              height={40}
              rx={1}
              fill="var(--runway-markings)"
              opacity={0.9}
            />
            <rect
              x={700}
              y={128}
              width={8}
              height={40}
              rx={1}
              fill="var(--runway-markings)"
              opacity={0.9}
            />
            {/* Centerline High-Intensity Lights */}
            {[195, 220, 245].map((ly) => (
              <rect
                key={ly}
                x={678}
                y={ly}
                width={4}
                height={12}
                rx={1}
                fill="var(--vec-r-safe)"
              />
            ))}
            {/* Outer Runway End Safety Zone */}
            <rect
              x={644}
              y={296}
              width={72}
              height={4}
              fill="var(--vec-r-drift)"
              opacity={0.85}
            />
          </g>
        </g>

        {/* Animated Wind Streams */}
        {!isExplainStep && (
          <WindParticlesLayer
            windDirection={windDirection}
            windStrength={windStrength}
            isPlaying={isPlaying}
          />
        )}

        {/* Aircraft, Ghost Trail & ILS Caliper */}
        <AircraftLayer />

        {/* 3 Vectors + Protractor + Parallelogram + DRAG TIP Handle */}
        <VectorOverlayLayer svgRef={svgRef} />

        {/* Lớp Bút ghi chú tạm trên Radar cho Giáo viên */}
        <g id="chalk-overlay">
          {chalkPaths.map((d, idx) => (
            <path
              key={`${idx}-${d.slice(0, 16)}`}
              d={d}
              fill="none"
              stroke="var(--vec-a)"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pointer-events-none"
            />
          ))}
          {activeStroke && (
            <path
              d={activeStroke}
              fill="none"
              stroke="var(--vec-a)"
              strokeWidth={3}
              strokeLinecap="round"
              strokeLinejoin="round"
              className="pointer-events-none"
            />
          )}
          {chalkEnabled && (
            <rect
              x={0}
              y={0}
              width={1360}
              height={720}
              fill="transparent"
              style={{ touchAction: "none" }}
              className="pointer-events-auto cursor-crosshair"
              onPointerDown={handleChalkPointerDown}
              onPointerMove={handleChalkPointerMove}
              onPointerUp={finishChalkStroke}
              onPointerCancel={finishChalkStroke}
            />
          )}
        </g>
      </svg>

      {/* Thanh công cụ Bút ghi chú khi đang bật */}
      {(chalkEnabled || chalkPaths.length > 0) && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2 bg-surface-container-low/95 backdrop-blur-md px-3 py-1.5 rounded-full shadow-[var(--hud-card-shadow)] border border-secondary/50">
          <span className="font-telemetry-sm text-telemetry-sm text-secondary font-bold flex items-center gap-1">
            <PenTool className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{chalkEnabled ? tc.chalkActive : tc.chalkNotes}</span>
          </span>
          {chalkPaths.length > 0 && (
            <button
              type="button"
              onClick={clearChalkPaths}
              className="px-2 py-0.5 rounded-full bg-surface-container-high hover:bg-error-container hover:text-error font-telemetry-sm text-telemetry-sm font-semibold flex items-center gap-1 cursor-pointer"
            >
              <Eraser className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{tc.chalkClear}</span>
            </button>
          )}
          {chalkEnabled && (
            <button
              type="button"
              onClick={toggleChalk}
              className="px-2 py-0.5 rounded-full bg-secondary text-on-secondary font-telemetry-sm text-telemetry-sm font-bold flex items-center gap-1 cursor-pointer"
            >
              <X className="w-3.5 h-3.5" aria-hidden="true" />
              <span>{tc.chalkTurnOff}</span>
            </button>
          )}
        </div>
      )}

      {/* Bottom-Left Status Warning Pill / Vector Equilibrium HUD */}
      <LiveTelemetryHud />
    </div>
  );
}
