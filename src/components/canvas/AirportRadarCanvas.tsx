"use client";

import { useRef } from "react";
import { RADAR_CANVAS_COORDS } from "@/config/simulation";
import { useSimulationStore } from "@/store/useSimulationStore";
import { AircraftLayer } from "./AircraftLayer";
import { LiveTelemetryHud } from "./LiveTelemetryHud";
import { VectorOverlayLayer } from "./VectorOverlayLayer";
import { WindParticlesLayer } from "./WindParticlesLayer";

/**
 * Full-viewport SVG Airport Radar Canvas stage matching design/*.html.
 * Renders the radial compass rings, glideslope cone, Physical Runway 36L,
 * dynamic wind particles, aircraft layer, interactive vector overlay, and telemetry HUD.
 */
export function AirportRadarCanvas() {
  const svgRef = useRef<SVGSVGElement | null>(null);
  const currentStep = useSimulationStore((s) => s.currentStep);
  const windDirection = useSimulationStore((s) => s.windDirection);
  const windStrength = useSimulationStore((s) => s.windStrength);
  const isPlaying = useSimulationStore((s) => s.isPlaying);
  const themeMode = useSimulationStore((s) => s.themeMode);

  const compassCenter = RADAR_CANVAS_COORDS.COMPASS_CENTER;
  const isExplainStep = currentStep === 6;
  const isDaylight = themeMode === "daylight";

  return (
    <div className="relative w-full h-full overflow-hidden rounded-xl bg-surface-container-lowest flex items-center justify-center">
      {/* Atmospheric Glow & Tactical Radial Vignette */}
      <div
        className={`absolute inset-0 pointer-events-none z-0 ${
          isDaylight
            ? "bg-[radial-gradient(circle_at_50%_45%,rgba(2,132,199,0.08)_0%,rgba(241,245,249,0.72)_68%,rgba(226,232,240,0.95)_100%)]"
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
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#38bdf8" />
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
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#ffc640" />
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
            <path d="M 0 1.5 L 8 5 L 0 8.5 z" fill="#56e5a9" />
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
            <path d="M 0 1.5 L 9 5 L 0 8.5 z" fill="#f43f5e" />
          </marker>

          <pattern
            id="grid-dots"
            width="48"
            height="48"
            patternUnits="userSpaceOnUse"
          >
            <circle
              cx="24"
              cy="24"
              r="0.8"
              fill={
                isDaylight
                  ? "rgba(2, 132, 199, 0.22)"
                  : "rgba(142, 213, 255, 0.16)"
              }
            />
            <path
              d="M 48 0 L 0 0 0 48"
              fill="none"
              stroke={
                isDaylight
                  ? "rgba(15, 23, 42, 0.06)"
                  : "rgba(255, 255, 255, 0.025)"
              }
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
          opacity={isExplainStep ? 0.2 : 0.45}
          transform={`translate(${compassCenter.x}, ${compassCenter.y})`}
          className="pointer-events-none"
        >
          <circle
            r={130}
            fill="none"
            stroke="rgba(56,189,248,0.22)"
            strokeDasharray="3 4"
            strokeWidth={1}
          />
          <text
            x={136}
            y={-6}
            fill="rgba(142,213,255,0.75)"
            fontFamily="var(--font-jetbrains-mono)"
            fontSize={10}
            letterSpacing="0.08em"
          >
            5 NM
          </text>

          <circle
            r={260}
            fill="none"
            stroke="rgba(56,189,248,0.18)"
            strokeDasharray="4 6"
            strokeWidth={1}
          />
          <text
            x={266}
            y={-6}
            fill="rgba(142,213,255,0.75)"
            fontFamily="var(--font-jetbrains-mono)"
            fontSize={10}
            letterSpacing="0.08em"
          >
            10 NM
          </text>

          {!isExplainStep && (
            <>
              <circle
                r={390}
                fill="none"
                stroke="rgba(56,189,248,0.12)"
                strokeDasharray="2 8"
                strokeWidth={1}
              />
              <text
                x={396}
                y={-6}
                fill="rgba(142,213,255,0.75)"
                fontFamily="var(--font-jetbrains-mono)"
                fontSize={10}
                letterSpacing="0.08em"
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
            stroke="rgba(135,146,154,0.18)"
            strokeWidth={1}
          />
          <line
            x1={0}
            x2={0}
            y1={-380}
            y2={380}
            stroke="rgba(135,146,154,0.18)"
            strokeWidth={1}
          />

          {/* Azimuth Compass Ticks */}
          {currentStep <= 3 && (
            <>
              <g stroke="rgba(56,189,248,0.3)" strokeWidth={1}>
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
                x={-8}
                y={-408}
                fill="#8ed5ff"
                fontFamily="var(--font-jetbrains-mono)"
                fontSize={11}
                fontWeight={700}
              >
                360°
              </text>
              <text
                x={410}
                y={4}
                fill="#8ed5ff"
                fontFamily="var(--font-jetbrains-mono)"
                fontSize={11}
                fontWeight={700}
              >
                090°
              </text>
              <text
                x={-8}
                y={420}
                fill="#8ed5ff"
                fontFamily="var(--font-jetbrains-mono)"
                fontSize={11}
                fontWeight={700}
              >
                180°
              </text>
              <text
                x={-445}
                y={4}
                fill="#8ed5ff"
                fontFamily="var(--font-jetbrains-mono)"
                fontSize={11}
                fontWeight={700}
              >
                270°
              </text>
            </>
          )}
        </g>

        {/* Approach Glideslope & Localizer Lateral Cone */}
        {!isExplainStep && (
          <polygon
            points={
              currentStep >= 4
                ? "680,110 590,560 770,560"
                : "680,110 590,520 770,520"
            }
            fill="rgba(86,229,169,0.035)"
            stroke="rgba(86,229,169,0.18)"
            strokeDasharray="3 3"
            strokeWidth={1}
            className="pointer-events-none"
          />
        )}

        {/* Physical Runway 36L (exact SVG-aligned strip at x=644, y=40, 72x260) */}
        <g
          opacity={isExplainStep ? 0.32 : 1}
          className="pointer-events-none"
        >
          <rect
            x={644}
            y={40}
            width={72}
            height={260}
            rx={3}
            fill="var(--surface-container-high)"
            stroke="rgba(56,189,248,0.2)"
            strokeWidth={1.5}
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
              fill="var(--tertiary)"
            />
          ))}
          {/* Runway Designation Markings */}
          <text
            x={680}
            y={82}
            fill="var(--on-surface)"
            fontFamily="var(--font-space-grotesk)"
            fontSize={18}
            fontWeight={700}
            letterSpacing="0.12em"
            textAnchor="middle"
          >
            36
          </text>
          <text
            x={680}
            y={100}
            fill="var(--on-surface)"
            fontFamily="var(--font-space-grotesk)"
            fontSize={18}
            fontWeight={700}
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
            fill="var(--on-surface)"
            opacity={0.8}
          />
          <rect
            x={700}
            y={128}
            width={8}
            height={40}
            rx={1}
            fill="var(--on-surface)"
            opacity={0.8}
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
              fill="var(--tertiary-container)"
            />
          ))}
          {/* Outer Runway End Safety Zone */}
          <rect
            x={644}
            y={296}
            width={72}
            height={4}
            fill="var(--error)"
            opacity={0.7}
          />
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
      </svg>

      {/* Bottom-Left Status Warning Pill / Vector Equilibrium HUD */}
      <LiveTelemetryHud />
    </div>
  );
}
