/**
 * URL query parameter synchronization for sharing classroom wind & step presets.
 * Example: /?dir=ltr&strength=strong&step=4
 */

import type {
  MissionStep,
  TvScaleMode,
  VectorOperationMode,
  WindDirection,
  WindStrength,
} from "@/domain/types";

export interface SimulationUrlPreset {
  readonly windDirection?: WindDirection;
  readonly windStrength?: WindStrength;
  readonly currentStep?: MissionStep;
  readonly operationMode?: VectorOperationMode;
  readonly customAirspeedKts?: number;
  readonly customWindSpeedKts?: number;
  readonly runwayAngleDeg?: number;
  readonly blindMode?: boolean;
  readonly tvScale?: TvScaleMode;
}

const VALID_DIRECTIONS = new Set<WindDirection>(["rtl", "ltr"]);
const VALID_STRENGTHS = new Set<WindStrength>(["light", "moderate", "strong"]);
const VALID_MODES = new Set<VectorOperationMode>(["add", "subtract"]);
const VALID_TV_SCALES = new Set<TvScaleMode>(["normal", "large", "xlarge"]);

/**
 * Safely parses ?dir=rtl|ltr&strength=light|moderate|strong&step=1..6 plus optional Teacher Studio params.
 */
export function parseSimulationQueryParams(
  search: string
): SimulationUrlPreset {
  try {
    const params = new URLSearchParams(search);
    const dirParam = params.get("dir");
    const strengthParam = params.get("strength");
    const stepParam = params.get("step");
    const modeParam = params.get("mode");
    const vaParam = params.get("va");
    const vwParam = params.get("vw");
    const rwParam = params.get("rw");
    const blindParam = params.get("blind");
    const tvParam = params.get("tv");

    const parsedStep = stepParam ? Number.parseInt(stepParam, 10) : NaN;
    const validStep =
      Number.isInteger(parsedStep) && parsedStep >= 1 && parsedStep <= 6
        ? (parsedStep as MissionStep)
        : undefined;

    const base: SimulationUrlPreset = {
      windDirection:
        dirParam && VALID_DIRECTIONS.has(dirParam as WindDirection)
          ? (dirParam as WindDirection)
          : undefined,
      windStrength:
        strengthParam && VALID_STRENGTHS.has(strengthParam as WindStrength)
          ? (strengthParam as WindStrength)
          : undefined,
      currentStep: validStep,
    };

    const result: Record<string, unknown> = { ...base };

    if (modeParam && VALID_MODES.has(modeParam as VectorOperationMode)) {
      result.operationMode = modeParam as VectorOperationMode;
    }

    if (vaParam !== null) {
      const va = Number.parseFloat(vaParam);
      if (Number.isFinite(va) && va >= 40 && va <= 250) {
        result.customAirspeedKts = Math.round(va);
      }
    }

    if (vwParam !== null) {
      const vw = Number.parseFloat(vwParam);
      if (Number.isFinite(vw) && vw >= 5 && vw <= 150) {
        result.customWindSpeedKts = Math.round(vw * 10) / 10;
      }
    }

    if (rwParam !== null) {
      const rw = Number.parseFloat(rwParam);
      if (Number.isFinite(rw) && rw >= -45 && rw <= 45) {
        result.runwayAngleDeg = Math.round(rw);
      }
    }

    if (blindParam === "1" || blindParam === "true") {
      result.blindMode = true;
    }

    if (tvParam && VALID_TV_SCALES.has(tvParam as TvScaleMode)) {
      result.tvScale = tvParam as TvScaleMode;
    }

    return result as SimulationUrlPreset;
  } catch {
    return {};
  }
}

export function buildSimulationQueryString(input: {
  windDirection: WindDirection;
  windStrength: WindStrength;
  currentStep: MissionStep;
  operationMode?: VectorOperationMode;
  customAirspeedKts?: number | null;
  customWindSpeedKts?: number | null;
  runwayAngleDeg?: number;
  blindMode?: boolean;
  tvScale?: TvScaleMode;
}): string {
  const params = new URLSearchParams();
  params.set("dir", input.windDirection);
  params.set("strength", input.windStrength);
  params.set("step", String(input.currentStep));
  if (input.operationMode && input.operationMode !== "add") {
    params.set("mode", input.operationMode);
  }
  if (
    typeof input.customAirspeedKts === "number" &&
    !Number.isNaN(input.customAirspeedKts)
  ) {
    params.set("va", String(input.customAirspeedKts));
  }
  if (
    typeof input.customWindSpeedKts === "number" &&
    !Number.isNaN(input.customWindSpeedKts)
  ) {
    params.set("vw", String(input.customWindSpeedKts));
  }
  if (typeof input.runwayAngleDeg === "number" && input.runwayAngleDeg !== 0) {
    params.set("rw", String(input.runwayAngleDeg));
  }
  if (input.blindMode) {
    params.set("blind", "1");
  }
  if (input.tvScale && input.tvScale !== "normal") {
    params.set("tv", input.tvScale);
  }
  return `?${params.toString()}`;
}

/**
 * Updates browser URL query params in-place without triggering Next.js navigation or reload.
 */
export function syncSimulationToUrl(input: {
  windDirection: WindDirection;
  windStrength: WindStrength;
  currentStep: MissionStep;
  operationMode?: VectorOperationMode;
  customAirspeedKts?: number | null;
  customWindSpeedKts?: number | null;
  runwayAngleDeg?: number;
  blindMode?: boolean;
  tvScale?: TvScaleMode;
}): void {
  if (typeof window === "undefined") {
    return;
  }

  try {
    const nextSearch = buildSimulationQueryString(input);
    if (window.location.search === nextSearch) {
      return;
    }
    const nextUrl = `${window.location.pathname}${nextSearch}${window.location.hash}`;
    window.history.replaceState(null, "", nextUrl);
  } catch {
    // Ignore history API restrictions in embedded sandboxes
  }
}
