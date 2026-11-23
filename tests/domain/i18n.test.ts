import { describe, expect, it, vi } from "vitest";

vi.mock("@/config/simulation", () => import("../../src/config/simulation"));
vi.mock("@/domain/landingEvaluator", () => import("../../src/domain/landingEvaluator"));
vi.mock("@/domain/vectorMath", () => import("../../src/domain/vectorMath"));
vi.mock("@/lib/audio", () => import("../../src/lib/audio"));
vi.mock("@/lib/logger", () => import("../../src/lib/logger"));

import {
  getStep3HintForWind,
  HEADING_OPTIONS,
  MISSION_STEPS,
  STEP3_FEEDBACK,
  STEP5_OUTCOMES,
  TOP_NAV_STAGES,
} from "../../src/domain/missionContent";
import type { MissionStep } from "../../src/domain/types";
import { SPECIAL_ANGLE_PRESETS } from "../../src/domain/vectorMath";
import { getTranslations, UI_COPY } from "../../src/lib/i18n";
import { useSimulationStore } from "../../src/store/useSimulationStore";

describe("bilingual i18n coverage & store stability", () => {
  it("provides non-empty, semantically distinct VI and EN mission steps and options", () => {
    const steps: MissionStep[] = [1, 2, 3, 4, 5, 6];
    for (const step of steps) {
      const content = MISSION_STEPS[step];
      expect(content.badge.vi.trim().length).toBeGreaterThan(0);
      expect(content.badge.en.trim().length).toBeGreaterThan(0);
      expect(content.badge.en).not.toBe(content.badge.vi);

      expect(content.title.vi.trim().length).toBeGreaterThan(0);
      expect(content.title.en.trim().length).toBeGreaterThan(0);
      expect(content.title.en).not.toBe(content.title.vi);

      expect(content.subtitle.vi.trim().length).toBeGreaterThan(0);
      expect(content.subtitle.en.trim().length).toBeGreaterThan(0);
      expect(content.subtitle.en).not.toBe(content.subtitle.vi);

      expect(content.prompt.vi.trim().length).toBeGreaterThan(0);
      expect(content.prompt.en.trim().length).toBeGreaterThan(0);
      expect(content.prompt.en).not.toBe(content.prompt.vi);
    }

    for (const stage of TOP_NAV_STAGES) {
      expect(stage.label.en).not.toBe(stage.label.vi);
    }

    for (const opt of HEADING_OPTIONS) {
      expect(opt.title.en).not.toBe(opt.title.vi);
    }

    expect(STEP3_FEEDBACK.correct.en).not.toBe(STEP3_FEEDBACK.correct.vi);
    expect(STEP3_FEEDBACK.incorrect.en).not.toBe(STEP3_FEEDBACK.incorrect.vi);
    expect(getStep3HintForWind("rtl").en).not.toBe(
      getStep3HintForWind("rtl").vi
    );
    expect(getStep3HintForWind("ltr").en).not.toBe(
      getStep3HintForWind("ltr").vi
    );
    expect(STEP5_OUTCOMES.success.headline.en).not.toBe(
      STEP5_OUTCOMES.success.headline.vi
    );
    expect(STEP5_OUTCOMES.failure.headline.en).not.toBe(
      STEP5_OUTCOMES.failure.headline.vi
    );

    for (const preset of SPECIAL_ANGLE_PRESETS) {
      expect(preset.labelEn.trim().length).toBeGreaterThan(0);
      expect(preset.descriptionEn.trim().length).toBeGreaterThan(0);
      expect(preset.labelEn).not.toBe(preset.label);
    }
  });

  it("populates all static translation strings in both VI and EN dictionaries", () => {
    expect(getTranslations("vi")).toBe(UI_COPY.vi);
    expect(getTranslations("en")).toBe(UI_COPY.en);
    expect(UI_COPY.en.topBar.teacherButton).toBe("Teacher");
    expect(UI_COPY.vi.topBar.teacherButton).toBe("Giáo viên");
    expect(UI_COPY.en.bottomDock.next).toBe("Next");
    expect(UI_COPY.vi.bottomDock.next).toBe("Tiếp theo");
  });

  it("switches language cleanly in Zustand without altering active simulation state", () => {
    const store = useSimulationStore.getState();
    store.resetSimulation();
    store.setStep(4);
    store.setWindDirection("ltr");
    store.setWindStrength("strong");
    store.setAircraftHeading(-28.5);
    store.addChalkPath("M 100 100 L 200 200");
    store.checkLanding();

    const beforeToggle = useSimulationStore.getState();
    expect(beforeToggle.language).toBe("vi");

    store.setLanguage("en");
    const afterEn = useSimulationStore.getState();
    expect(afterEn.language).toBe("en");
    expect(afterEn.currentStep).toBe(beforeToggle.currentStep);
    expect(afterEn.aircraftHeadingDeg).toBe(-28.5);
    expect(afterEn.windDirection).toBe("ltr");
    expect(afterEn.windStrength).toBe("strong");
    expect(afterEn.chalkPaths).toEqual(["M 100 100 L 200 200"]);
    expect(afterEn.landingResult).toEqual(beforeToggle.landingResult);

    store.toggleLanguage();
    expect(useSimulationStore.getState().language).toBe("vi");

    store.setLanguage("en");
    store.resetSimulation();
    expect(useSimulationStore.getState().language).toBe("en");
    store.setLanguage("vi");
  });
});
