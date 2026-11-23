/**
 * Fixed simulation constants for Vector Quest – Math 10.
 * Shared across domain, store, and canvas/HUD layers without circular imports.
 */

export const WIND_SPEED_KTS = {
  LIGHT: 15,
  MODERATE: 25,
  STRONG: 40,
} as const;

export type WindStrengthKey = keyof typeof WIND_SPEED_KTS;
export type WindDirectionKey = "RTL" | "LTR";

export const DEFAULT_WIND_DIRECTION: WindDirectionKey = "RTL";
export const DEFAULT_WIND_STRENGTH: WindStrengthKey = "MODERATE";

/** Nominal aircraft airspeed magnitude (knots) matching design/*.html */
export const DEFAULT_AIRSPEED_KTS = 140;

/** Default angular tolerance (degrees) for CHECK LANDING alignment */
export const DEFAULT_TOLERANCE_DEG = 4;
export const TOLERANCE_OPTIONS_DEG = [3, 4, 5] as const;

/** Allowed manual heading drag bounds relative to Runway 36L (000°) */
export const HEADING_DRAG_LIMIT_DEG = 60;
export const MIN_HEADING_OFFSET_DEG = -HEADING_DRAG_LIMIT_DEG;
export const MAX_HEADING_OFFSET_DEG = HEADING_DRAG_LIMIT_DEG;

/** Runway 36L reference heading (True North = 360° / 0°) */
export const RUNWAY_HEADING_DEG = 360;

/** Total pedagogical steps in the mission (Steps 1–6) */
export const TOTAL_MISSION_STEPS = 6;

/** Canonical SVG Radar viewport coordinates matching design/*.html */
export const RADAR_CANVAS_COORDS = {
  VIEWBOX_WIDTH: 1360,
  VIEWBOX_HEIGHT: 720,
  AIRCRAFT_ORIGIN: { x: 680, y: 560 },
  COMPASS_CENTER: { x: 680, y: 480 },
  TOUCHDOWN_TARGET: { x: 680, y: 110 },
} as const;
