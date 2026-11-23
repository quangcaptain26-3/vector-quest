"use client";

import type { WindDirection, WindStrength } from "@/domain/types";

interface WindParticlesLayerProps {
  windDirection: WindDirection;
  windStrength: WindStrength;
  isPlaying: boolean;
}

interface WindStreamSpec {
  readonly id: string;
  readonly d: string;
  readonly dashArray: string;
  readonly baseDurationSec: number;
  readonly strokeWidth: number;
}

const WIND_STREAMS: readonly WindStreamSpec[] = [
  {
    id: "stream-1",
    d: "M 1060 210 L 420 210",
    dashArray: "70 120",
    baseDurationSec: 2.8,
    strokeWidth: 1.8,
  },
  {
    id: "stream-2",
    d: "M 1120 290 L 380 290",
    dashArray: "90 140",
    baseDurationSec: 2.4,
    strokeWidth: 2,
  },
  {
    id: "stream-3",
    d: "M 1000 370 L 460 370",
    dashArray: "60 110",
    baseDurationSec: 3.1,
    strokeWidth: 1.5,
  },
  {
    id: "stream-4",
    d: "M 1160 450 L 340 450",
    dashArray: "100 150",
    baseDurationSec: 2.2,
    strokeWidth: 2.2,
  },
  {
    id: "stream-5",
    d: "M 1040 530 L 490 530",
    dashArray: "75 130",
    baseDurationSec: 2.7,
    strokeWidth: 1.6,
  },
  {
    id: "stream-6",
    d: "M 1100 610 L 410 610",
    dashArray: "85 140",
    baseDurationSec: 2.5,
    strokeWidth: 1.8,
  },
];

const SPEED_MULTIPLIER: Record<WindStrength, number> = {
  light: 1.45,
  moderate: 1,
  strong: 0.62,
};

const OPACITY_BY_STRENGTH: Record<WindStrength, number> = {
  light: 0.55,
  moderate: 0.85,
  strong: 0.98,
};

/**
 * Animated cyan crosswind streamlines matching #wind-streams in design/*.html.
 */
export function WindParticlesLayer({
  windDirection,
  windStrength,
  isPlaying,
}: WindParticlesLayerProps) {
  const durationScale = SPEED_MULTIPLIER[windStrength];
  const groupOpacity = OPACITY_BY_STRENGTH[windStrength];
  const flipTransform =
    windDirection === "ltr" ? "scale(-1, 1) translate(-1360, 0)" : undefined;

  return (
    <g
      id="wind-streams"
      filter="url(#glow-cyan)"
      opacity={groupOpacity}
      transform={flipTransform}
      className="pointer-events-none"
    >
      {WIND_STREAMS.map((stream) => {
        const dur = (stream.baseDurationSec * durationScale).toFixed(2);
        return (
          <path
            key={stream.id}
            d={stream.d}
            fill="none"
            stroke="var(--vec-w)"
            strokeWidth={stream.strokeWidth + 0.4}
            strokeLinecap="round"
            strokeDasharray={stream.dashArray}
            markerEnd="url(#cyan-arrow)"
            style={{
              animation: `vq-wind-flow ${dur}s linear infinite`,
              animationPlayState: isPlaying ? "running" : "paused",
            }}
          />
        );
      })}
    </g>
  );
}
