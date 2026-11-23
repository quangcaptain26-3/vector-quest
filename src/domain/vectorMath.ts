/**
 * Pure 2D vector physics & kinematics engine for Vector Quest – Math 10.
 * Coordinate system (math space): +x = East (right), +y = North / Runway 36L axis (up).
 * Coordinate system (SVG screen space): +x = right, +y = down (origin at 680, 560).
 * ZERO imports from React, Zustand, browser DOM, or external libraries.
 */

import type {
  ParallelogramVertices,
  SimulationTelemetry,
  SpecialAnglePreset,
  Vector2D,
  VectorOperationMode,
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
export const MIN_RUNWAY_ANGLE_DEG = -45;
export const MAX_RUNWAY_ANGLE_DEG = 45;
export const SVG_AIRCRAFT_ORIGIN: Vector2D = { x: 680, y: 560 };
export const SVG_SCALE_PX_PER_KT = 2.08;
const METERS_PER_KNOT_CROSS_DRIFT = 11.2;

export const SPECIAL_ANGLE_PRESETS: readonly SpecialAnglePreset[] = [
  {
    id: "default-140-25",
    label: "Chuẩn Hàng không",
    description: "|v_A| = 140 KT, |v_W| = 25 KT (Góc bù ~18.4°)",
    airspeedKts: 140,
    windSpeedKts: 25,
    expectedCrabDeg: 18.4,
    runwayAngleDeg: 0,
    operationMode: "add",
  },
  {
    id: "special-30-deg",
    label: "Góc đẹp 30°",
    description: "|v_A| = 100 KT, |v_W| = 50 KT (sin 30° = 1/2)",
    airspeedKts: 100,
    windSpeedKts: 50,
    expectedCrabDeg: 30,
    runwayAngleDeg: 0,
    operationMode: "add",
  },
  {
    id: "special-45-deg",
    label: "Góc đẹp 45°",
    description: "|v_A| = 100 KT, |v_W| = 70.7 KT (sin 45° ≈ √2/2)",
    airspeedKts: 100,
    windSpeedKts: 70.7,
    expectedCrabDeg: 45,
    runwayAngleDeg: 0,
    operationMode: "add",
  },
  {
    id: "pythagoras-3-4-5",
    label: "Bộ số 3-4-5",
    description: "|v_A| = 100 KT, |v_W| = 60 KT (tỉ lệ 3 : 4 : 5)",
    airspeedKts: 100,
    windSpeedKts: 60,
    expectedCrabDeg: 36.9,
    runwayAngleDeg: 0,
    operationMode: "subtract",
  },
  {
    id: "angled-runway-30",
    label: "Đường băng chéo +30°",
    description: "Đường băng xoay +30°, |v_A| = 100 KT, |v_W| = 50 KT",
    airspeedKts: 100,
    windSpeedKts: 50,
    expectedCrabDeg: 55.7,
    runwayAngleDeg: 30,
    operationMode: "subtract",
  },
];

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

/** Computes required aircraft velocity v_A = v_R - v_W (vector subtraction mode) */
export function computeRequiredAircraftVector(
  desiredResultant: Vector2D,
  windVector: Vector2D
): Vector2D {
  return subtractVectors(desiredResultant, windVector);
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

/** Clamps rotated runway angle strictly within [-45°, +45°] */
export function clampRunwayAngleDeg(angleDeg: number): number {
  if (Number.isNaN(angleDeg)) {
    return 0;
  }
  return Math.min(
    MAX_RUNWAY_ANGLE_DEG,
    Math.max(MIN_RUNWAY_ANGLE_DEG, angleDeg)
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

function toSvgDisplacement(
  mathVector: Vector2D,
  pxPerKt: number = SVG_SCALE_PX_PER_KT
): Vector2D {
  return {
    x: mathVector.x * pxPerKt,
    y: -mathVector.y * pxPerKt,
  };
}

export interface ComputeTelemetryInput {
  readonly windDirection: WindDirection;
  readonly windStrength: WindStrength;
  readonly headingOffsetDeg: number;
  readonly customWindSpeedKts?: number;
  readonly customAirspeedKts?: number;
  readonly runwayAngleDeg?: number;
  readonly operationMode?: VectorOperationMode;
}

/**
 * Derives complete physics, navigational, and SVG rendering telemetry from current wind, runway & heading.
 */
export function computeSimulationTelemetry(
  input: ComputeTelemetryInput
): SimulationTelemetry {
  const headingOffsetDeg = clampHeadingOffsetDeg(input.headingOffsetDeg);
  const runwayAngleDeg = clampRunwayAngleDeg(input.runwayAngleDeg ?? 0);
  const operationMode: VectorOperationMode = input.operationMode ?? "add";
  const windSpeedKts =
    typeof input.customWindSpeedKts === "number" &&
    !Number.isNaN(input.customWindSpeedKts)
      ? Math.min(150, Math.max(5, Math.round(input.customWindSpeedKts * 10) / 10))
      : getWindSpeedKts(input.windStrength);

  const hasCustomAirspeed =
    typeof input.customAirspeedKts === "number" &&
    !Number.isNaN(input.customAirspeedKts);
  const kinematicAirspeed = hasCustomAirspeed
    ? Math.min(250, Math.max(40, Math.round(input.customAirspeedKts as number)))
    : KINEMATIC_AIRSPEED_KTS;
  const displayAirspeedKts = hasCustomAirspeed
    ? kinematicAirspeed
    : NOMINAL_AIRSPEED_KTS;

  const vA = computeAircraftVector(headingOffsetDeg, kinematicAirspeed);
  const vW: Vector2D = {
    x: input.windDirection === "rtl" ? -windSpeedKts : windSpeedKts,
    y: 0,
  };
  const vR = computeResultantVector(vA, vW);

  const rawAngleDeg = computeAngleFromRunwayAxisDeg(vR);
  let driftAngleDeg = rawAngleDeg - runwayAngleDeg;
  if (driftAngleDeg > 180) driftAngleDeg -= 360;
  if (driftAngleDeg < -180) driftAngleDeg += 360;

  const compassHeadingDeg = normalizeCompassHeadingDeg(headingOffsetDeg);
  const groundTrackDeg = normalizeCompassHeadingDeg(rawAngleDeg);

  const runwayRad = runwayAngleDeg * DEG_TO_RAD;
  const idealCrabRatio = Math.min(
    0.99,
    Math.max(-0.99, (-vW.x * Math.cos(runwayRad)) / kinematicAirspeed)
  );
  const idealCrabAngleDeg = clampHeadingOffsetDeg(
    runwayAngleDeg + Math.asin(idealCrabRatio) * RAD_TO_DEG
  );

  // Lateral velocity component perpendicular to the (possibly rotated) runway centerline
  const lateralNetKts =
    vR.x * Math.cos(runwayRad) - vR.y * Math.sin(runwayRad);
  const lateralDriftMeters = Math.round(
    lateralNetKts * METERS_PER_KNOT_CROSS_DRIFT
  );

  const svgScale = hasCustomAirspeed
    ? SVG_SCALE_PX_PER_KT * (KINEMATIC_AIRSPEED_KTS / kinematicAirspeed)
    : SVG_SCALE_PX_PER_KT;

  const svgVA = toSvgDisplacement(vA, svgScale);
  const svgVW = toSvgDisplacement(vW, svgScale);
  const svgVR = toSvgDisplacement(vR, svgScale);
  const svgParallelogram = computeParallelogramVertices(
    SVG_AIRCRAFT_ORIGIN,
    svgVA,
    svgVW
  );

  return {
    vA,
    vW,
    vR,
    airspeedKts: displayAirspeedKts,
    windSpeedKts,
    headingOffsetDeg,
    runwayAngleDeg,
    operationMode,
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
