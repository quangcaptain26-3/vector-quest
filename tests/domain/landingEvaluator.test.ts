import { describe, expect, it } from "vitest";
import {
  evaluateLanding,
  evaluatePredictionOption,
  getCorrectOptionForWind,
} from "../../src/domain/landingEvaluator";
import {
  HEADING_OPTIONS,
  MISSION_STEPS,
  STEP3_FEEDBACK,
  STEP5_OUTCOMES,
} from "../../src/domain/missionContent";

describe("landingEvaluator", () => {
  describe("evaluateLanding", () => {
    it("returns success=true when resultant vector is aligned within +/-4 deg tolerance", () => {
      // Exact alignment (0 deg)
      const exact = evaluateLanding({ x: 0, y: 75 }, 4);
      expect(exact.success).toBe(true);
      expect(exact.status).toBe("SUCCESSFUL_LANDING");
      expect(exact.deltaAngleDeg).toBeCloseTo(0, 6);

      // Exact positive boundary (+4 deg)
      const rad4 = (4 * Math.PI) / 180;
      const posBoundary = evaluateLanding(
        { x: Math.sin(rad4) * 100, y: Math.cos(rad4) * 100 },
        4
      );
      expect(posBoundary.success).toBe(true);
      expect(posBoundary.absDeltaDeg).toBeCloseTo(4, 5);

      // Exact negative boundary (-4 deg)
      const negBoundary = evaluateLanding(
        { x: -Math.sin(rad4) * 100, y: Math.cos(rad4) * 100 },
        4
      );
      expect(negBoundary.success).toBe(true);
      expect(negBoundary.absDeltaDeg).toBeCloseTo(4, 5);
    });

    it("returns success=false when |deltaAngle| exceeds tolerance", () => {
      const rad4_1 = (4.1 * Math.PI) / 180;
      const failed = evaluateLanding(
        { x: Math.sin(rad4_1) * 100, y: Math.cos(rad4_1) * 100 },
        4
      );
      expect(failed.success).toBe(false);
      expect(failed.status).toBe("LANDING_FAILED");
      expect(failed.absDeltaDeg).toBeGreaterThan(4);
    });

    it("respects configurable tolerance settings (3, 4, 5 degrees)", () => {
      const rad3_5 = (3.5 * Math.PI) / 180;
      const vector3_5 = {
        x: Math.sin(rad3_5) * 100,
        y: Math.cos(rad3_5) * 100,
      };

      expect(evaluateLanding(vector3_5, 3).success).toBe(false);
      expect(evaluateLanding(vector3_5, 4).success).toBe(true);
      expect(evaluateLanding(vector3_5, 5).success).toBe(true);
    });

    it("rejects non-forward resultant vectors (v_Ry <= 0)", () => {
      expect(evaluateLanding({ x: 0, y: 0 }, 4).success).toBe(false);
      expect(evaluateLanding({ x: 0, y: -50 }, 4).success).toBe(false);
    });

    it("evaluates landing relative to a rotated runwayAngleDeg (-45° to +45°)", () => {
      const rad30 = (30 * Math.PI) / 180;
      const vectorAlong30 = {
        x: Math.sin(rad30) * 100,
        y: Math.cos(rad30) * 100,
      };
      const aligned30 = evaluateLanding(vectorAlong30, 4, 30);
      expect(aligned30.success).toBe(true);
      expect(aligned30.absDeltaDeg).toBeCloseTo(0, 5);

      // Same vector compared against -25° runway should fail
      const mismatched = evaluateLanding(vectorAlong30, 4, -25);
      expect(mismatched.success).toBe(false);
      expect(mismatched.absDeltaDeg).toBeCloseTo(55, 4);
    });
  });

  describe("getCorrectOptionForWind & evaluatePredictionOption", () => {
    it("dynamically returns 'D' (Turn Slightly Right) for RTL crosswind", () => {
      expect(getCorrectOptionForWind("rtl")).toBe("D");
      expect(evaluatePredictionOption("D", "rtl")).toEqual({
        isCorrect: true,
        selectedOption: "D",
        correctOption: "D",
      });
      expect(evaluatePredictionOption("C", "rtl").isCorrect).toBe(false);
      expect(evaluatePredictionOption("A", "rtl").isCorrect).toBe(false);
      expect(evaluatePredictionOption("B", "rtl").isCorrect).toBe(false);
    });

    it("dynamically returns 'C' (Turn Left) for LTR crosswind", () => {
      expect(getCorrectOptionForWind("ltr")).toBe("C");
      expect(evaluatePredictionOption("C", "ltr")).toEqual({
        isCorrect: true,
        selectedOption: "C",
        correctOption: "C",
      });
      expect(evaluatePredictionOption("D", "ltr").isCorrect).toBe(false);
      expect(evaluatePredictionOption("A", "ltr").isCorrect).toBe(false);
      expect(evaluatePredictionOption("B", "ltr").isCorrect).toBe(false);
    });
  });
});

describe("missionContent", () => {
  it("contains all 6 mission steps in standardized Vietnamese Math 10 copy", () => {
    expect(Object.keys(MISSION_STEPS)).toEqual(["1", "2", "3", "4", "5", "6"]);
    expect(MISSION_STEPS[1].title).toBe("CƠN GIÓ NGANG BẤT NGỜ!");
    expect(MISSION_STEPS[2].title).toBe("EM SẼ XỬ LÝ THẾ NÀO?");
    expect(MISSION_STEPS[3].title).toBe(
      "Phi công nên chọn hướng mũi máy bay nào để hạ cánh đúng đường băng?"
    );
    expect(MISSION_STEPS[4].title).toBe("CÙNG KIỂM TRA!");
    expect(MISSION_STEPS[5].title).toBe("KIỂM TRA HẠ CÁNH");
    expect(MISSION_STEPS[6].title).toBe("CHÚNG TA ĐÃ KHÁM PHÁ ĐƯỢC GÌ?");
  });

  it("contains all 4 heading options A/B/C/D in Vietnamese", () => {
    expect(HEADING_OPTIONS.map((o) => o.id)).toEqual(["A", "B", "C", "D"]);
    expect(HEADING_OPTIONS[0].compassLabel).toBe("HƯỚNG 360°");
    expect(HEADING_OPTIONS[0].title.vi).toBe("Giữ bay thẳng");
    expect(HEADING_OPTIONS[1].compassLabel).toBe("HƯỚNG 045°");
    expect(HEADING_OPTIONS[1].title.vi).toBe("Rẽ phải gắt");
    expect(HEADING_OPTIONS[2].compassLabel).toBe("HƯỚNG 335°");
    expect(HEADING_OPTIONS[2].title.vi).toBe("Rẽ sang trái");
    expect(HEADING_OPTIONS[3].compassLabel).toBe("+18.4°");
    expect(HEADING_OPTIONS[3].title.vi).toBe("Rẽ nhẹ sang phải");
  });

  it("provides Vietnamese feedback for Step 3 and Step 5", () => {
    expect(STEP3_FEEDBACK.correct.vi).toBeTruthy();
    expect(STEP3_FEEDBACK.incorrect.vi).toBeTruthy();
    expect(STEP5_OUTCOMES.success.headline).toBe("✓ HẠ CÁNH AN TOÀN!");
    expect(STEP5_OUTCOMES.success.badge).toBe("HOÀN THÀNH NHIỆM VỤ!");
    expect(STEP5_OUTCOMES.failure.headline).toBe("HẠ CÁNH CHƯA ĐẠT!");
  });
});
