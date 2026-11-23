/**
 * Pointer-to-SVG coordinate conversion utilities using getScreenCTM().inverse().
 */

import { RADAR_CANVAS_COORDS } from "@/config/simulation";
import type { Vector2D } from "@/domain/types";
import { clampHeadingOffsetDeg } from "@/domain/vectorMath";

const RAD_TO_DEG = 180 / Math.PI;

/**
 * Converts browser client coordinates (clientX, clientY) into SVG viewBox user-space coordinates.
 * Uses svgElement.getScreenCTM().inverse() with a bounding-rect fallback if CTM is unavailable.
 */
export function clientToSvgPoint(
  svgElement: SVGSVGElement | null,
  clientX: number,
  clientY: number
): Vector2D | null {
  if (!svgElement) {
    return null;
  }

  try {
    const ctm = svgElement.getScreenCTM();
    if (ctm) {
      const point = svgElement.createSVGPoint();
      point.x = clientX;
      point.y = clientY;
      const transformed = point.matrixTransform(ctm.inverse());
      return {
        x: transformed.x,
        y: transformed.y,
      };
    }

    const rect = svgElement.getBoundingClientRect();
    if (rect.width <= 0 || rect.height <= 0) {
      return null;
    }

    const viewBox = svgElement.viewBox.baseVal;
    const vbWidth = viewBox.width || RADAR_CANVAS_COORDS.VIEWBOX_WIDTH;
    const vbHeight = viewBox.height || RADAR_CANVAS_COORDS.VIEWBOX_HEIGHT;

    return {
      x: viewBox.x + ((clientX - rect.left) / rect.width) * vbWidth,
      y: viewBox.y + ((clientY - rect.top) / rect.height) * vbHeight,
    };
  } catch {
    return null;
  }
}

/**
 * Computes the clamped aircraft heading offset (degrees in [-60, +60])
 * from an SVG pointer position relative to the aircraft origin (680, 560).
 */
export function svgPointToHeadingOffsetDeg(
  svgPoint: Vector2D,
  origin: Vector2D = RADAR_CANVAS_COORDS.AIRCRAFT_ORIGIN
): number {
  const dx = svgPoint.x - origin.x;
  // SVG +y is downward; runway axis points upward (-y), so forward dy = origin.y - svgPoint.y
  const forwardDy = Math.max(20, origin.y - svgPoint.y);
  const angleDeg = Math.atan2(dx, forwardDy) * RAD_TO_DEG;
  return clampHeadingOffsetDeg(Math.round(angleDeg * 10) / 10);
}
