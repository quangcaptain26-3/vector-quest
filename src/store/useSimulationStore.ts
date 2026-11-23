/**
 * Global simulation store (Zustand) — Single Source of Truth for Vector Quest – Math 10.
 * Connects pure domain physics/evaluation with Flight-Deck HUD, Radar Canvas, and 6-Step Panels.
 */

import { create } from "zustand";
import { DEFAULT_TOLERANCE_DEG } from "@/config/simulation";
import { evaluateLanding, evaluatePredictionOption } from "@/domain/landingEvaluator";
import type {
  HeadingOptionId,
  LandingEvaluationResult,
  Language,
  MissionStep,
  PredictionEvaluationResult,
  SimulationTelemetry,
  ThemeMode,
  WindDirection,
  WindStrength,
} from "@/domain/types";
import {
  clampHeadingOffsetDeg,
  computeSimulationTelemetry,
} from "@/domain/vectorMath";
import { playAlert, playClick, playSuccess } from "@/lib/audio";
import { devLog } from "@/lib/logger";

export type HudModalType = "video" | "settings" | "help" | null;

export interface SimulationStoreState {
  currentStep: MissionStep;
  windDirection: WindDirection;
  windStrength: WindStrength;
  aircraftHeadingDeg: number;
  telemetry: SimulationTelemetry;
  selectedOption: HeadingOptionId | null;
  predictionResult: PredictionEvaluationResult | null;
  landingResult: LandingEvaluationResult | null;
  vectorsVisible: boolean;
  guideVisible: boolean;
  soundEnabled: boolean;
  themeMode: ThemeMode;
  language: Language;
  toleranceDeg: number;
  isPlaying: boolean;
  isFlightAnimating: boolean;
  showParallelogram: boolean;
  showCoordinateGrid: boolean;
  showTrigReference: boolean;
  activeModal: HudModalType;

  setStep: (step: MissionStep) => void;
  nextStep: () => void;
  prevStep: () => void;
  setWindDirection: (direction: WindDirection) => void;
  setWindStrength: (strength: WindStrength) => void;
  setAircraftHeading: (headingOffsetDeg: number) => void;
  applyIdealCrabHeading: () => void;
  selectOption: (optionId: HeadingOptionId) => void;
  checkPredictionAnswer: () => PredictionEvaluationResult | null;
  checkLanding: () => LandingEvaluationResult;
  toggleVectors: () => void;
  toggleGuide: () => void;
  togglePlay: () => void;
  setIsPlaying: (playing: boolean) => void;
  watchFlight: () => void;
  stopFlightAnimation: () => void;
  toggleSound: () => void;
  setThemeMode: (mode: ThemeMode) => void;
  toggleThemeMode: () => void;
  setLanguage: (language: Language) => void;
  toggleLanguage: () => void;
  setToleranceDeg: (toleranceDeg: number) => void;
  toggleParallelogram: () => void;
  toggleCoordinateGrid: () => void;
  toggleTrigReference: () => void;
  openModal: (modal: Exclude<HudModalType, null>) => void;
  closeModal: () => void;
  resetSimulation: () => void;
}

const DEFAULT_WIND_DIRECTION: WindDirection = "rtl";
const DEFAULT_WIND_STRENGTH: WindStrength = "moderate";
const DEFAULT_HEADING_DEG = 0;

function createInitialTelemetry(): SimulationTelemetry {
  return computeSimulationTelemetry({
    windDirection: DEFAULT_WIND_DIRECTION,
    windStrength: DEFAULT_WIND_STRENGTH,
    headingOffsetDeg: DEFAULT_HEADING_DEG,
  });
}

export const useSimulationStore = create<SimulationStoreState>()((set, get) => ({
  currentStep: 1,
  windDirection: DEFAULT_WIND_DIRECTION,
  windStrength: DEFAULT_WIND_STRENGTH,
  aircraftHeadingDeg: DEFAULT_HEADING_DEG,
  telemetry: createInitialTelemetry(),
  selectedOption: null,
  predictionResult: null,
  landingResult: null,
  vectorsVisible: true,
  guideVisible: true,
  soundEnabled: true,
  themeMode: "dark",
  language: "vi",
  toleranceDeg: DEFAULT_TOLERANCE_DEG,
  isPlaying: true,
  isFlightAnimating: false,
  showParallelogram: true,
  showCoordinateGrid: true,
  showTrigReference: false,
  activeModal: null,

  setStep: (step) => {
    const state = get();
    playClick(state.soundEnabled);
    devLog("setStep", { step });
    set({
      currentStep: step,
      isFlightAnimating: false,
    });
  },

  nextStep: () => {
    const { currentStep, soundEnabled } = get();
    if (currentStep >= 6) return;
    playClick(soundEnabled);
    const next = (currentStep + 1) as MissionStep;
    devLog("nextStep", { from: currentStep, to: next });
    set({
      currentStep: next,
      isFlightAnimating: false,
    });
  },

  prevStep: () => {
    const { currentStep, soundEnabled } = get();
    if (currentStep <= 1) return;
    playClick(soundEnabled);
    const prev = (currentStep - 1) as MissionStep;
    devLog("prevStep", { from: currentStep, to: prev });
    set({
      currentStep: prev,
      isFlightAnimating: false,
    });
  },

  setWindDirection: (windDirection) => {
    const { windStrength, aircraftHeadingDeg, soundEnabled, selectedOption } =
      get();
    playClick(soundEnabled);
    const telemetry = computeSimulationTelemetry({
      windDirection,
      windStrength,
      headingOffsetDeg: aircraftHeadingDeg,
    });
    const predictionResult = selectedOption
      ? evaluatePredictionOption(selectedOption, windDirection)
      : null;

    devLog("setWindDirection", { windDirection });
    set({
      windDirection,
      telemetry,
      predictionResult,
      landingResult: null,
      isFlightAnimating: false,
    });
  },

  setWindStrength: (windStrength) => {
    const { windDirection, aircraftHeadingDeg, soundEnabled } = get();
    playClick(soundEnabled);
    const telemetry = computeSimulationTelemetry({
      windDirection,
      windStrength,
      headingOffsetDeg: aircraftHeadingDeg,
    });

    devLog("setWindStrength", { windStrength });
    set({
      windStrength,
      telemetry,
      landingResult: null,
      isFlightAnimating: false,
    });
  },

  setAircraftHeading: (headingOffsetDeg) => {
    const { windDirection, windStrength } = get();
    const clamped = clampHeadingOffsetDeg(headingOffsetDeg);
    const telemetry = computeSimulationTelemetry({
      windDirection,
      windStrength,
      headingOffsetDeg: clamped,
    });

    set({
      aircraftHeadingDeg: clamped,
      telemetry,
      landingResult: null,
    });
  },

  applyIdealCrabHeading: () => {
    const { windDirection, windStrength, soundEnabled } = get();
    playClick(soundEnabled);
    const currentTelemetry = computeSimulationTelemetry({
      windDirection,
      windStrength,
      headingOffsetDeg: 0,
    });
    const ideal = Math.round(currentTelemetry.idealCrabAngleDeg * 10) / 10;
    const telemetry = computeSimulationTelemetry({
      windDirection,
      windStrength,
      headingOffsetDeg: ideal,
    });

    set({
      aircraftHeadingDeg: ideal,
      telemetry,
      landingResult: null,
    });
  },

  selectOption: (optionId) => {
    const { soundEnabled } = get();
    playClick(soundEnabled);
    set({
      selectedOption: optionId,
      predictionResult: null,
    });
  },

  checkPredictionAnswer: () => {
    const { selectedOption, windDirection, soundEnabled } = get();
    if (!selectedOption) return null;

    const result = evaluatePredictionOption(selectedOption, windDirection);
    if (result.isCorrect) {
      playSuccess(soundEnabled);
    } else {
      playAlert(soundEnabled);
    }

    devLog("checkPredictionAnswer", { result });
    set({ predictionResult: result });
    return result;
  },

  checkLanding: () => {
    const { telemetry, toleranceDeg, soundEnabled } = get();
    const result = evaluateLanding(telemetry.vR, toleranceDeg);

    if (result.success) {
      playSuccess(soundEnabled);
    } else {
      playAlert(soundEnabled);
    }

    devLog("checkLanding", { result });
    // Explicitly preserve aircraftHeadingDeg and telemetry when landing fails
    set({
      landingResult: result,
      currentStep: 5,
      isFlightAnimating: false,
    });
    return result;
  },

  toggleVectors: () => {
    const { vectorsVisible, soundEnabled } = get();
    playClick(soundEnabled);
    // Only toggles vector overlay visibility; never alters v_A, v_W, or aircraft heading
    set({ vectorsVisible: !vectorsVisible });
  },

  toggleGuide: () => {
    const { guideVisible, soundEnabled } = get();
    playClick(soundEnabled);
    // Only toggles pedagogical guide visibility; never alters or hides vectors
    set({ guideVisible: !guideVisible });
  },

  togglePlay: () => {
    const { isPlaying, soundEnabled } = get();
    playClick(soundEnabled);
    set({ isPlaying: !isPlaying });
  },

  setIsPlaying: (isPlaying) => set({ isPlaying }),

  watchFlight: () => {
    const { soundEnabled } = get();
    playClick(soundEnabled);
    set({ isPlaying: true, isFlightAnimating: true });
  },

  stopFlightAnimation: () => set({ isFlightAnimating: false }),

  toggleSound: () => {
    const nextSound = !get().soundEnabled;
    if (nextSound) {
      playClick(true);
    }
    set({ soundEnabled: nextSound });
  },

  setThemeMode: (themeMode) => {
    playClick(get().soundEnabled);
    set({ themeMode });
  },

  toggleThemeMode: () => {
    const { themeMode, soundEnabled } = get();
    playClick(soundEnabled);
    set({ themeMode: themeMode === "dark" ? "daylight" : "dark" });
  },

  setLanguage: (language) => {
    playClick(get().soundEnabled);
    set({ language });
  },

  toggleLanguage: () => {
    const { language, soundEnabled } = get();
    playClick(soundEnabled);
    set({ language: language === "en" ? "vi" : "en" });
  },

  setToleranceDeg: (toleranceDeg) => {
    const { telemetry, landingResult, soundEnabled } = get();
    playClick(soundEnabled);
    const updatedLanding = landingResult
      ? evaluateLanding(telemetry.vR, toleranceDeg)
      : null;

    set({
      toleranceDeg,
      landingResult: updatedLanding,
    });
  },

  toggleParallelogram: () => {
    playClick(get().soundEnabled);
    set((s) => ({ showParallelogram: !s.showParallelogram }));
  },

  toggleCoordinateGrid: () => {
    playClick(get().soundEnabled);
    set((s) => ({ showCoordinateGrid: !s.showCoordinateGrid }));
  },

  toggleTrigReference: () => {
    playClick(get().soundEnabled);
    set((s) => ({ showTrigReference: !s.showTrigReference }));
  },

  openModal: (activeModal) => {
    playClick(get().soundEnabled);
    set({ activeModal });
  },

  closeModal: () => {
    playClick(get().soundEnabled);
    set({ activeModal: null });
  },

  resetSimulation: () => {
    playClick(get().soundEnabled);
    devLog("resetSimulation");
    set({
      currentStep: 1,
      windDirection: DEFAULT_WIND_DIRECTION,
      windStrength: DEFAULT_WIND_STRENGTH,
      aircraftHeadingDeg: DEFAULT_HEADING_DEG,
      telemetry: createInitialTelemetry(),
      selectedOption: null,
      predictionResult: null,
      landingResult: null,
      vectorsVisible: true,
      isPlaying: true,
      isFlightAnimating: false,
      showTrigReference: false,
    });
  },
}));
