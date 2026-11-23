/**
 * Pure domain types for Vector Quest – Math 10.
 * Zero dependencies on React, Zustand, browser globals, or UI layers.
 */

export interface Vector2D {
  readonly x: number;
  readonly y: number;
}

/** Crosswind direction: 'rtl' = Right-to-Left (East 090°), 'ltr' = Left-to-Right (West 270°) */
export type WindDirection = "rtl" | "ltr";

/** Crosswind speed preset */
export type WindStrength = "light" | "moderate" | "strong";

/** 6-step pedagogical flow */
export type MissionStep = 1 | 2 | 3 | 4 | 5 | 6;

/** Step 3 multiple-choice option IDs */
export type HeadingOptionId = "A" | "B" | "C" | "D";

/** Supported bilingual display languages */
export type Language = "en" | "vi";

/** Classroom display themes */
export type ThemeMode = "dark" | "daylight";

/** Four corners of the vector addition parallelogram in SVG coordinates */
export interface ParallelogramVertices {
  readonly origin: Vector2D;
  readonly tipA: Vector2D;
  readonly tipR: Vector2D;
  readonly tipW: Vector2D;
}

/** Complete physics and SVG telemetry snapshot derived from wind and heading */
export interface SimulationTelemetry {
  readonly vA: Vector2D;
  readonly vW: Vector2D;
  readonly vR: Vector2D;
  readonly airspeedKts: number;
  readonly windSpeedKts: number;
  readonly headingOffsetDeg: number;
  readonly compassHeadingDeg: number;
  readonly driftAngleDeg: number;
  readonly groundTrackDeg: number;
  readonly idealCrabAngleDeg: number;
  readonly lateralNetKts: number;
  readonly lateralDriftMeters: number;
  readonly svgOrigin: Vector2D;
  readonly svgVectors: {
    readonly vA: Vector2D;
    readonly vW: Vector2D;
    readonly vR: Vector2D;
  };
  readonly svgParallelogram: ParallelogramVertices;
}

export interface LandingEvaluationResult {
  readonly success: boolean;
  readonly deltaAngleDeg: number;
  readonly absDeltaDeg: number;
  readonly toleranceDeg: number;
  readonly status: "SUCCESSFUL_LANDING" | "LANDING_FAILED";
}

export interface PredictionEvaluationResult {
  readonly isCorrect: boolean;
  readonly selectedOption: HeadingOptionId;
  readonly correctOption: HeadingOptionId;
}

export interface HeadingOptionContent {
  readonly id: HeadingOptionId;
  readonly compassLabel: string;
  readonly headingOffsetDeg: number;
  readonly title: {
    readonly en: string;
    readonly vi: string;
  };
  readonly shortLabel: {
    readonly en: string;
    readonly vi: string;
  };
}

export interface MissionStepContent {
  readonly step: MissionStep;
  readonly badge: string;
  readonly eyebrow: string;
  readonly title: string;
  readonly subtitle: {
    readonly en: string;
    readonly vi: string;
  };
  readonly prompt: {
    readonly en: string;
    readonly vi: string;
  };
  readonly guideNote: {
    readonly en: string;
    readonly vi: string;
  };
}
