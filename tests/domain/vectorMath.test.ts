import { describe, expect, it } from "vitest";
import {
  addVectors,
  clampHeadingOffsetDeg,
  computeAircraftVector,
  computeAngleFromRunwayAxisDeg,
  computeIdealCrabAngleDeg,
  computeParallelogramVertices,
  computeResultantVector,
  computeSimulationTelemetry,
  computeWindVector,
  getVectorMagnitude,
  getWindSpeedKts,
  normalizeCompassHeadingDeg,
  subtractVectors,
} from "../../src/domain/vectorMath";

describe("vectorMath", () => {
  describe("basic vector arithmetic", () => {
    it("adds two 2D vectors with positive, negative, and zero components", () => {
      expect(addVectors({ x: 25, y: 75 }, { x: -25, y: 0 })).toEqual({
        x: 0,
        y: 75,
      });
      expect(addVectors({ x: -10.5, y: 40 }, { x: 15.5, y: -5 })).toEqual({
        x: 5,
        y: 35,
      });
    });

    it("subtracts vectors accurately (v_A = v_R - v_W)", () => {
      expect(subtractVectors({ x: 0, y: 75 }, { x: -25, y: 0 })).toEqual({
        x: 25,
        y: 75,
      });
    });

    it("computes resultant vector v_R = v_A + v_W", () => {
      const vA = { x: 25, y: 74.82 };
      const vW = { x: -25, y: 0 };
      const vR = computeResultantVector(vA, vW);

      expect(vR.x).toBeCloseTo(0, 6);
      expect(vR.y).toBeCloseTo(74.82, 6);
    });

    it("computes vector magnitude", () => {
      expect(getVectorMagnitude({ x: 3, y: 4 })).toBe(5);
      expect(getVectorMagnitude({ x: 0, y: 0 })).toBe(0);
    });
  });

  describe("wind presets and direction vectors", () => {
    it("maps wind strength presets to 15 / 25 / 40 knots", () => {
      expect(getWindSpeedKts("light")).toBe(15);
      expect(getWindSpeedKts("moderate")).toBe(25);
      expect(getWindSpeedKts("strong")).toBe(40);
    });

    it("computes horizontal crosswind vector for RTL (negative x) and LTR (positive x)", () => {
      expect(computeWindVector("rtl", "light")).toEqual({ x: -15, y: 0 });
      expect(computeWindVector("rtl", "moderate")).toEqual({ x: -25, y: 0 });
      expect(computeWindVector("rtl", "strong")).toEqual({ x: -40, y: 0 });

      expect(computeWindVector("ltr", "light")).toEqual({ x: 15, y: 0 });
      expect(computeWindVector("ltr", "moderate")).toEqual({ x: 25, y: 0 });
      expect(computeWindVector("ltr", "strong")).toEqual({ x: 40, y: 0 });
    });
  });

  describe("runway axis angles, heading clamping, and crab angle", () => {
    it("computes signed drift angle relative to vertical runway axis (+y)", () => {
      expect(computeAngleFromRunwayAxisDeg({ x: 0, y: 100 })).toBeCloseTo(0, 6);
      expect(computeAngleFromRunwayAxisDeg({ x: 25, y: 25 })).toBeCloseTo(45, 6);
      expect(computeAngleFromRunwayAxisDeg({ x: -25, y: 25 })).toBeCloseTo(
        -45,
        6
      );
    });

    it("normalizes compass headings into (0, 360]", () => {
      expect(normalizeCompassHeadingDeg(0)).toBe(360);
      expect(normalizeCompassHeadingDeg(360)).toBe(360);
      expect(normalizeCompassHeadingDeg(18.4)).toBeCloseTo(18.4, 4);
      expect(normalizeCompassHeadingDeg(-18.4)).toBeCloseTo(341.6, 4);
    });

    it("clamps manual heading offset strictly within [-60, +60] degrees", () => {
      expect(clampHeadingOffsetDeg(-90)).toBe(-60);
      expect(clampHeadingOffsetDeg(-60)).toBe(-60);
      expect(clampHeadingOffsetDeg(18.4)).toBe(18.4);
      expect(clampHeadingOffsetDeg(75)).toBe(60);
    });

    it("computes positive crab angle for RTL wind and symmetric negative crab angle for LTR wind", () => {
      const rtlModerate = computeIdealCrabAngleDeg("rtl", "moderate");
      const ltrModerate = computeIdealCrabAngleDeg("ltr", "moderate");

      expect(rtlModerate).toBeCloseTo(18.43, 1);
      expect(ltrModerate).toBeCloseTo(-18.43, 1);
    });

    it("cancels lateral wind drift when aircraft heading matches ideal crab angle", () => {
      const rtlCrab = computeIdealCrabAngleDeg("rtl", "moderate");
      const vA = computeAircraftVector(rtlCrab);
      const vW = computeWindVector("rtl", "moderate");
      const vR = computeResultantVector(vA, vW);

      expect(vR.x).toBeCloseTo(0, 4);
      expect(computeAngleFromRunwayAxisDeg(vR)).toBeCloseTo(0, 4);

      const ltrCrab = computeIdealCrabAngleDeg("ltr", "strong");
      const vALtr = computeAircraftVector(ltrCrab);
      const vWLtr = computeWindVector("ltr", "strong");
      const vRLtr = computeResultantVector(vALtr, vWLtr);

      expect(vRLtr.x).toBeCloseTo(0, 4);
      expect(computeAngleFromRunwayAxisDeg(vRLtr)).toBeCloseTo(0, 4);
    });
  });

  describe("parallelogram geometry and full simulation telemetry", () => {
    it("computes 4 parallelogram vertices where diagonals bisect each other", () => {
      const origin = { x: 680, y: 560 };
      const vA = { x: 52, y: -150 };
      const vW = { x: -52, y: 0 };

      const poly = computeParallelogramVertices(origin, vA, vW);

      expect(poly.origin).toEqual({ x: 680, y: 560 });
      expect(poly.tipA).toEqual({ x: 732, y: 410 });
      expect(poly.tipW).toEqual({ x: 628, y: 560 });
      expect(poly.tipR).toEqual({ x: 680, y: 410 });

      // Diagonals (origin -> tipR) and (tipA -> tipW) share exact midpoint
      const midDiag1 = {
        x: (poly.origin.x + poly.tipR.x) / 2,
        y: (poly.origin.y + poly.tipR.y) / 2,
      };
      const midDiag2 = {
        x: (poly.tipA.x + poly.tipW.x) / 2,
        y: (poly.tipA.y + poly.tipW.y) / 2,
      };
      expect(midDiag1).toEqual(midDiag2);
    });

    it("computes uncompensated RTL moderate crosswind drift and aligned crab telemetry", () => {
      const uncompensated = computeSimulationTelemetry({
        windDirection: "rtl",
        windStrength: "moderate",
        headingOffsetDeg: 0,
      });

      expect(uncompensated.windSpeedKts).toBe(25);
      expect(uncompensated.driftAngleDeg).toBeLessThan(-15);
      expect(uncompensated.groundTrackDeg).toBeLessThan(360);
      expect(uncompensated.lateralNetKts).toBeCloseTo(-25, 4);

      const aligned = computeSimulationTelemetry({
        windDirection: "rtl",
        windStrength: "moderate",
        headingOffsetDeg: 18.4,
      });

      expect(Math.abs(aligned.driftAngleDeg)).toBeLessThan(0.2);
      expect(Math.abs(aligned.lateralNetKts)).toBeLessThan(0.2);
      expect(aligned.svgParallelogram.origin).toEqual({ x: 680, y: 560 });
      expect(aligned.svgParallelogram.tipR.x).toBeCloseTo(680, 0);
    });
  });
});
