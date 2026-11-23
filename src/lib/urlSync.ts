/**
 * URL query parameter synchronization for sharing classroom wind & step presets.
 * Example: /?dir=ltr&strength=strong&step=4
 */

import type { MissionStep, WindDirection, WindStrength } from "@/domain/types";

export interface SimulationUrlPreset {
  readonly windDirection?: WindDirection;
  readonly windStrength?: WindStrength;
  readonly currentStep?: MissionStep;
}

const VALID_DIRECTIONS = new Set<WindDirection>(["rtl", "ltr"]);
const VALID_STRENGTHS = new Set<WindStrength>(["light", "moderate", "strong"]);

/**
 * Safely parses ?dir=rtl|ltr&strength=light|moderate|strong&step=1..6 from location.search.
 */
export function parseSimulationQueryParams(
  search: string
): SimulationUrlPreset {
  try {
    const params = new URLSearchParams(search);
    const dirParam = params.get("dir");
    const strengthParam = params.get("strength");
    const stepParam = params.get("step");

    const parsedStep = stepParam ? Number.parseInt(stepParam, 10) : NaN;
    const validStep =
      Number.isInteger(parsedStep) && parsedStep >= 1 && parsedStep <= 6
        ? (parsedStep as MissionStep)
        : undefined;

    return {
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
  } catch {
    return {};
  }
}

export function buildSimulationQueryString(input: {
  windDirection: WindDirection;
  windStrength: WindStrength;
  currentStep: MissionStep;
}): string {
  const params = new URLSearchParams();
  params.set("dir", input.windDirection);
  params.set("strength", input.windStrength);
  params.set("step", String(input.currentStep));
  return `?${params.toString()}`;
}

/**
 * Updates browser URL query params in-place without triggering Next.js navigation or reload.
 */
export function syncSimulationToUrl(input: {
  windDirection: WindDirection;
  windStrength: WindStrength;
  currentStep: MissionStep;
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
