/**
 * Pure 2D vector physics & kinematics engine for Vector Quest – Math 10.
 * Coordinate system (math space): +x = East (right), +y = North / Runway 36L axis (up).
 * Coordinate system (SVG screen space): +x = right, +y = down (origin at 680, 560).
 * ZERO imports from React, Zustand, browser DOM, or external libraries.
 */

import type {
  ParallelogramVertices,
  SimulationTelemetry,
  Vector2D,
  WindDirection,
  WindStrength,
} from "./types";

const RAD_TO_DEG = 180 / Math.PI;
const DEG_TO_RAD = Math.PI / 180;

export const NOMINAL_AIRSPEED_KTS = 140;
/** Kinematic reference airspeed calibrated so arcsin(25 / 78.8854) ≈ 18.43° matching design/*.html */
export const KINEMATIC_AIRSPEED_KTS = 78.8854;
export const MIN_HEADING_OFFSET_DEG = -60;
export const MAX_HEADING_OFFSET_DEG = 60;
export const SVG_AIRCRAFT_ORIGIN: Vector2D = { x: 680, y: 560 };
export const SVG_SCALE_PX_PER_KT = 2.08;
const METERS_PER_KNOT_CROSS_DRIFT = 11.2;

const WIND_SPEED_BY_STRENGTH: Record<WindStrength, number> = {
  light: 15,
  moderate: 25,
  strong: 40,
};

export function addVectors(a: Vector2D, b: Vector2D): Vector2D {
  return {
    x: a.x + b.x,
    y: a.y + b.y,
  };
}

export function subtractVectors(a: Vector2D, b: Vector2D): Vector2D {
  return {
    x: a.x - b.x,
    y: a.y - b.y,
  };
}

/** Computes resultant ground velocity v_R = v_A + v_W */
export function computeResultantVector(vA: Vector2D, vW: Vector2D): Vector2D {
  return addVectors(vA, vW);
}

export function getVectorMagnitude(v: Vector2D): number {
  return Math.hypot(v.x, v.y);
}

/**
 * Computes signed angle in degrees relative to the vertical runway axis (+y).
 * Positive = deflected East (right), Negative = deflected West (left).
 */
export function computeAngleFromRunwayAxisDeg(vector: Vector2D): number {
  if (vector.x === 0 && vector.y === 0) {
    return 0;
  }
  return Math.atan2(vector.x, vector.y) * RAD_TO_DEG;
}

/** Normalizes any bearing in degrees into (0, 360] where True North is 360° */
export function normalizeCompassHeadingDeg(offsetOrBearingDeg: number): number {
  const mod = ((offsetOrBearingDeg % 360) + 360) % 360;
  return mod === 0 ? 360 : mod;
}

/** Clamps manual heading offset strictly within [-60°, +60°] */
export function clampHeadingOffsetDeg(offsetDeg: number): number {
  if (Number.isNaN(offsetDeg)) {
    return 0;
  }
  return Math.min(
    MAX_HEADING_OFFSET_DEG,
    Math.max(MIN_HEADING_OFFSET_DEG, offsetDeg)
  );
}

export function getWindSpeedKts(strength: WindStrength): number {
  return WIND_SPEED_BY_STRENGTH[strength];
}

/**
 * Computes crosswind vector v_W in math coordinates (+x East, +y North).
 * 'rtl' (Right -> Left, from 090° East) pushes West (-x).
 * 'ltr' (Left -> Right, from 270° West) pushes East (+x).
 */
export function computeWindVector(
  direction: WindDirection,
  strength: WindStrength
): Vector2D {
  const speed = getWindSpeedKts(strength);
  return {
    x: direction === "rtl" ? -speed : speed,
    y: 0,
  };
}

/**
 * Computes aircraft airspeed vector v_A for a given heading offset relative to Runway 36L (North +y).
 * Positive headingOffsetDeg rotates clockwise (East / right).
 */
export function computeAircraftVector(
  headingOffsetDeg: number,
  airspeedKts: number = KINEMATIC_AIRSPEED_KTS
): Vector2D {
  const clamped = clampHeadingOffsetDeg(headingOffsetDeg);
  const rad = clamped * DEG_TO_RAD;
  return {
    x: airspeedKts * Math.sin(rad),
    y: airspeedKts * Math.cos(rad),
  };
}

/**
 * Computes the exact crab angle offset (degrees) needed for v_Ax + v_Wx = 0.
 * RTL wind requires positive (right/East) crab angle; LTR wind requires negative (left/West) crab angle.
 */
export function computeIdealCrabAngleDeg(
  direction: WindDirection,
  strength: WindStrength,
  airspeedKts: number = KINEMATIC_AIRSPEED_KTS
): number {
  const windX = computeWindVector(direction, strength).x;
  const ratio = Math.min(0.99, Math.max(-0.99, -windX / airspeedKts));
  return Math.asin(ratio) * RAD_TO_DEG;
}

/**
 * Computes the 4 parallelogram corners in SVG coordinates from origin and two vector displacements.
 * Note: SVG displacements already encode downward +y inversion.
 */
export function computeParallelogramVertices(
  origin: Vector2D,
  svgVA: Vector2D,
  svgVW: Vector2D
): ParallelogramVertices {
  const tipA = addVectors(origin, svgVA);
  const tipW = addVectors(origin, svgVW);
  const tipR = addVectors(tipA, svgVW);

  return {
    origin,
    tipA,
    tipR,
    tipW,
  };
}

function toSvgDisplacement(mathVector: Vector2D): Vector2D {
  return {
    x: mathVector.x * SVG_SCALE_PX_PER_KT,
    y: -mathVector.y * SVG_SCALE_PX_PER_KT,
  };
}

export interface ComputeTelemetryInput {
  readonly windDirection: WindDirection;
  readonly windStrength: WindStrength;
  readonly headingOffsetDeg: number;
}

/**
 * Derives complete physics, navigational, and SVG rendering telemetry from current wind & heading.
 */
export function computeSimulationTelemetry(
  input: ComputeTelemetryInput
): SimulationTelemetry {
  const headingOffsetDeg = clampHeadingOffsetDeg(input.headingOffsetDeg);
  const windSpeedKts = getWindSpeedKts(input.windStrength);
  const vA = computeAircraftVector(headingOffsetDeg, KINEMATIC_AIRSPEED_KTS);
  const vW = computeWindVector(input.windDirection, input.windStrength);
  const vR = computeResultantVector(vA, vW);

  const driftAngleDeg = computeAngleFromRunwayAxisDeg(vR);
  const compassHeadingDeg = normalizeCompassHeadingDeg(headingOffsetDeg);
  const groundTrackDeg = normalizeCompassHeadingDeg(driftAngleDeg);
  const idealCrabAngleDeg = computeIdealCrabAngleDeg(
    input.windDirection,
    input.windStrength,
    KINEMATIC_AIRSPEED_KTS
  );
  const lateralNetKts = vR.x;
  const lateralDriftMeters = Math.round(
    lateralNetKts * METERS_PER_KNOT_CROSS_DRIFT
  );

  const svgVA = toSvgDisplacement(vA);
  const svgVW = toSvgDisplacement(vW);
  const svgVR = toSvgDisplacement(vR);
  const svgParallelogram = computeParallelogramVertices(
    SVG_AIRCRAFT_ORIGIN,
    svgVA,
    svgVW
  );

  return {
    vA,
    vW,
    vR,
    airspeedKts: NOMINAL_AIRSPEED_KTS,
    windSpeedKts,
    headingOffsetDeg,
    compassHeadingDeg,
    driftAngleDeg,
    groundTrackDeg,
    idealCrabAngleDeg,
    lateralNetKts,
    lateralDriftMeters,
    svgOrigin: SVG_AIRCRAFT_ORIGIN,
    svgVectors: {
      vA: svgVA,
      vW: svgVW,
      vR: svgVR,
    },
    svgParallelogram,
  };
}
