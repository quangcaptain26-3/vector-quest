/**
 * Landing alignment & Step 3 prediction evaluator for Vector Quest – Math 10.
 * Pure TypeScript domain module (zero React, Zustand, or DOM dependencies).
 */

import type {
  HeadingOptionId,
  LandingEvaluationResult,
  PredictionEvaluationResult,
  Vector2D,
  WindDirection,
} from "./types";
import {
  clampRunwayAngleDeg,
  computeAngleFromRunwayAxisDeg,
} from "./vectorMath";

/**
 * Evaluates whether the resultant velocity vector v_R is aligned parallel to Runway 36L
 * (or the rotated runwayAngleDeg within [-45°, +45°]) within the configured angular tolerance.
 */
export function evaluateLanding(
  resultantVector: Vector2D,
  toleranceDeg: number,
  runwayAngleDeg: number = 0
): LandingEvaluationResult {
  const safeTolerance = Math.max(0, toleranceDeg);
  const clampedRunway = clampRunwayAngleDeg(runwayAngleDeg);
  const rawAngleDeg = computeAngleFromRunwayAxisDeg(resultantVector);
  let deltaAngleDeg = rawAngleDeg - clampedRunway;
  if (deltaAngleDeg > 180) deltaAngleDeg -= 360;
  if (deltaAngleDeg < -180) deltaAngleDeg += 360;

  const absDeltaDeg = Math.abs(deltaAngleDeg);
  const runwayRad = (clampedRunway * Math.PI) / 180;
  const forwardProjection =
    resultantVector.x * Math.sin(runwayRad) +
    resultantVector.y * Math.cos(runwayRad);
  const isForwardApproach = forwardProjection > 0;
  const success = isForwardApproach && absDeltaDeg <= safeTolerance + 1e-6;

  return {
    success,
    deltaAngleDeg,
    absDeltaDeg,
    toleranceDeg: safeTolerance,
    status: success ? "SUCCESSFUL_LANDING" : "LANDING_FAILED",
  };
}

/**
 * Returns the correct Step 3 prediction option dynamically for the active crosswind direction:
 * - 'rtl' (wind pushes Left/West) -> 'D' (Turn Slightly Right / East into the wind)
 * - 'ltr' (wind pushes Right/East) -> 'C' (Turn Left / West into the wind)
 */
export function getCorrectOptionForWind(
  windDirection: WindDirection
): HeadingOptionId {
  return windDirection === "rtl" ? "D" : "C";
}

/**
 * Evaluates a student's Step 3 option selection against the active wind direction.
 */
export function evaluatePredictionOption(
  selectedOption: HeadingOptionId,
  windDirection: WindDirection
): PredictionEvaluationResult {
  const correctOption = getCorrectOptionForWind(windDirection);
  return {
    isCorrect: selectedOption === correctOption,
    selectedOption,
    correctOption,
  };
}
