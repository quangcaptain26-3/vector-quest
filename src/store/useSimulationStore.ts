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
  TvScaleMode,
  VectorOperationMode,
  WindDirection,
  WindStrength,
} from "@/domain/types";
import {
  clampHeadingOffsetDeg,
  clampRunwayAngleDeg,
  computeSimulationTelemetry,
  SPECIAL_ANGLE_PRESETS,
} from "@/domain/vectorMath";
import { playAlert, playClick, playSuccess } from "@/lib/audio";
import { devLog } from "@/lib/logger";

export type HudModalType = "video" | "settings" | "help" | "teacher" | null;

export interface TeacherConfigInput {
  readonly windDirection?: WindDirection;
  readonly windStrength?: WindStrength;
  readonly currentStep?: MissionStep;
  readonly operationMode?: VectorOperationMode;
  readonly customAirspeedKts?: number | null;
  readonly customWindSpeedKts?: number | null;
  readonly runwayAngleDeg?: number;
  readonly blindMode?: boolean;
  readonly tvScale?: TvScaleMode;
}

export interface SimulationStoreState {
  currentStep: MissionStep;
  windDirection: WindDirection;
  windStrength: WindStrength;
  customWindSpeedKts: number | null;
  customAirspeedKts: number | null;
  runwayAngleDeg: number;
  operationMode: VectorOperationMode;
  blindMode: boolean;
  tvScale: TvScaleMode;
  chalkEnabled: boolean;
  chalkPaths: readonly string[];
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
  adjustWindSpeed: (deltaKts: number) => void;
  setCustomAirspeed: (airspeedKts: number | null) => void;
  setCustomWindSpeed: (windSpeedKts: number | null) => void;
  setRunwayAngle: (angleDeg: number) => void;
  setOperationMode: (mode: VectorOperationMode) => void;
  applySpecialPreset: (presetId: string) => void;
  applyTeacherConfig: (config: TeacherConfigInput) => void;
  toggleBlindMode: () => void;
  setBlindMode: (blind: boolean) => void;
  setTvScale: (scale: TvScaleMode) => void;
  toggleChalk: () => void;
  addChalkPath: (pathD: string) => void;
  clearChalkPaths: () => void;
  setAircraftHeading: (headingOffsetDeg: number) => void;
  adjustAircraftHeading: (deltaDeg: number) => void;
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

function buildTelemetryFromState(
  state: Pick<
    SimulationStoreState,
    | "windDirection"
    | "windStrength"
    | "aircraftHeadingDeg"
    | "customWindSpeedKts"
    | "customAirspeedKts"
    | "runwayAngleDeg"
    | "operationMode"
  >,
  overrides: Partial<
    Pick<
      SimulationStoreState,
      | "windDirection"
      | "windStrength"
      | "aircraftHeadingDeg"
      | "customWindSpeedKts"
      | "customAirspeedKts"
      | "runwayAngleDeg"
      | "operationMode"
    >
  > = {}
): SimulationTelemetry {
  const merged = { ...state, ...overrides };
  return computeSimulationTelemetry({
    windDirection: merged.windDirection,
    windStrength: merged.windStrength,
    headingOffsetDeg: merged.aircraftHeadingDeg,
    customWindSpeedKts: merged.customWindSpeedKts ?? undefined,
    customAirspeedKts: merged.customAirspeedKts ?? undefined,
    runwayAngleDeg: merged.runwayAngleDeg,
    operationMode: merged.operationMode,
  });
}

function deriveStrengthFromSpeed(speedKts: number): WindStrength {
  return speedKts <= 18 ? "light" : speedKts <= 32 ? "moderate" : "strong";
}

export const useSimulationStore = create<SimulationStoreState>()((set, get) => ({
  currentStep: 1,
  windDirection: DEFAULT_WIND_DIRECTION,
  windStrength: DEFAULT_WIND_STRENGTH,
  customWindSpeedKts: null,
  customAirspeedKts: null,
  runwayAngleDeg: 0,
  operationMode: "add",
  blindMode: false,
  tvScale: "normal",
  chalkEnabled: false,
  chalkPaths: [],
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
    const state = get();
    playClick(state.soundEnabled);
    const telemetry = buildTelemetryFromState(state, { windDirection });
    const predictionResult = state.selectedOption
      ? evaluatePredictionOption(state.selectedOption, windDirection)
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
    const state = get();
    playClick(state.soundEnabled);
    const telemetry = buildTelemetryFromState(state, {
      windStrength,
      customWindSpeedKts: null,
    });

    devLog("setWindStrength", { windStrength });
    set({
      windStrength,
      customWindSpeedKts: null,
      telemetry,
      landingResult: null,
      isFlightAnimating: false,
    });
  },

  adjustWindSpeed: (deltaKts) => {
    const state = get();
    playClick(state.soundEnabled);
    const nextSpeed = Math.min(
      100,
      Math.max(5, Math.round((state.telemetry.windSpeedKts + deltaKts) * 10) / 10)
    );
    const derivedStrength = deriveStrengthFromSpeed(nextSpeed);
    const nextTelemetry = buildTelemetryFromState(state, {
      windStrength: derivedStrength,
      customWindSpeedKts: nextSpeed,
    });

    devLog("adjustWindSpeed", { deltaKts, nextSpeed });
    set({
      windStrength: derivedStrength,
      customWindSpeedKts: nextSpeed,
      telemetry: nextTelemetry,
      landingResult: null,
      isFlightAnimating: false,
    });
  },

  setCustomAirspeed: (airspeedKts) => {
    const state = get();
    playClick(state.soundEnabled);
    const nextAirspeed =
      airspeedKts === null
        ? null
        : Math.min(250, Math.max(40, Math.round(airspeedKts)));
    const telemetry = buildTelemetryFromState(state, {
      customAirspeedKts: nextAirspeed,
    });
    set({
      customAirspeedKts: nextAirspeed,
      telemetry,
      landingResult: null,
    });
  },

  setCustomWindSpeed: (windSpeedKts) => {
    const state = get();
    playClick(state.soundEnabled);
    const nextSpeed =
      windSpeedKts === null
        ? null
        : Math.min(150, Math.max(5, Math.round(windSpeedKts * 10) / 10));
    const derivedStrength =
      nextSpeed === null ? state.windStrength : deriveStrengthFromSpeed(nextSpeed);
    const telemetry = buildTelemetryFromState(state, {
      windStrength: derivedStrength,
      customWindSpeedKts: nextSpeed,
    });
    set({
      windStrength: derivedStrength,
      customWindSpeedKts: nextSpeed,
      telemetry,
      landingResult: null,
    });
  },

  setRunwayAngle: (angleDeg) => {
    const state = get();
    playClick(state.soundEnabled);
    const runwayAngleDeg = clampRunwayAngleDeg(Math.round(angleDeg));
    const telemetry = buildTelemetryFromState(state, { runwayAngleDeg });
    set({
      runwayAngleDeg,
      telemetry,
      landingResult: null,
    });
  },

  setOperationMode: (operationMode) => {
    const state = get();
    playClick(state.soundEnabled);
    const telemetry = buildTelemetryFromState(state, { operationMode });
    set({
      operationMode,
      telemetry,
    });
  },

  applySpecialPreset: (presetId) => {
    const preset = SPECIAL_ANGLE_PRESETS.find((p) => p.id === presetId);
    if (!preset) return;
    const state = get();
    playClick(state.soundEnabled);
    const isDefaultPreset = preset.id === "default-140-25";
    const nextCustomVa = isDefaultPreset ? null : preset.airspeedKts;
    const nextCustomVw = isDefaultPreset ? null : preset.windSpeedKts;
    const nextStrength = deriveStrengthFromSpeed(preset.windSpeedKts);
    const nextMode = preset.operationMode ?? state.operationMode;
    const telemetry = buildTelemetryFromState(state, {
      windStrength: nextStrength,
      customAirspeedKts: nextCustomVa,
      customWindSpeedKts: nextCustomVw,
      runwayAngleDeg: preset.runwayAngleDeg,
      operationMode: nextMode,
      aircraftHeadingDeg: 0,
    });

    set({
      windStrength: nextStrength,
      customAirspeedKts: nextCustomVa,
      customWindSpeedKts: nextCustomVw,
      runwayAngleDeg: preset.runwayAngleDeg,
      operationMode: nextMode,
      aircraftHeadingDeg: 0,
      telemetry,
      landingResult: null,
      isFlightAnimating: false,
    });
  },

  applyTeacherConfig: (config) => {
    const state = get();
    playClick(state.soundEnabled);
    const nextDirection = config.windDirection ?? state.windDirection;
    const nextCustomVw =
      config.customWindSpeedKts === undefined
        ? state.customWindSpeedKts
        : config.customWindSpeedKts;
    const nextStrength =
      config.windStrength ??
      (nextCustomVw !== null
        ? deriveStrengthFromSpeed(nextCustomVw)
        : state.windStrength);
    const nextCustomVa =
      config.customAirspeedKts === undefined
        ? state.customAirspeedKts
        : config.customAirspeedKts;
    const nextRunway =
      config.runwayAngleDeg !== undefined
        ? clampRunwayAngleDeg(config.runwayAngleDeg)
        : state.runwayAngleDeg;
    const nextMode = config.operationMode ?? state.operationMode;
    const nextStep = config.currentStep ?? state.currentStep;
    const nextBlind = config.blindMode ?? state.blindMode;
    const nextTvScale = config.tvScale ?? state.tvScale;

    const telemetry = buildTelemetryFromState(state, {
      windDirection: nextDirection,
      windStrength: nextStrength,
      customWindSpeedKts: nextCustomVw,
      customAirspeedKts: nextCustomVa,
      runwayAngleDeg: nextRunway,
      operationMode: nextMode,
    });

    set({
      currentStep: nextStep,
      windDirection: nextDirection,
      windStrength: nextStrength,
      customWindSpeedKts: nextCustomVw,
      customAirspeedKts: nextCustomVa,
      runwayAngleDeg: nextRunway,
      operationMode: nextMode,
      blindMode: nextBlind,
      tvScale: nextTvScale,
      telemetry,
      landingResult: null,
      isFlightAnimating: false,
    });
  },

  toggleBlindMode: () => {
    const { blindMode, soundEnabled } = get();
    playClick(soundEnabled);
    set({ blindMode: !blindMode });
  },

  setBlindMode: (blindMode) => {
    playClick(get().soundEnabled);
    set({ blindMode });
  },

  setTvScale: (tvScale) => {
    playClick(get().soundEnabled);
    set({ tvScale });
  },

  toggleChalk: () => {
    const { chalkEnabled, soundEnabled } = get();
    playClick(soundEnabled);
    set({ chalkEnabled: !chalkEnabled });
  },

  addChalkPath: (pathD) => {
    if (!pathD) return;
    set((s) => ({ chalkPaths: [...s.chalkPaths, pathD] }));
  },

  clearChalkPaths: () => {
    playClick(get().soundEnabled);
    set({ chalkPaths: [] });
  },

  setAircraftHeading: (headingOffsetDeg) => {
    const state = get();
    const clamped = clampHeadingOffsetDeg(headingOffsetDeg);
    const telemetry = buildTelemetryFromState(state, {
      aircraftHeadingDeg: clamped,
    });

    set({
      aircraftHeadingDeg: clamped,
      telemetry,
      landingResult: null,
    });
  },

  adjustAircraftHeading: (deltaDeg) => {
    const state = get();
    playClick(state.soundEnabled);
    const rounded = Math.round((state.aircraftHeadingDeg + deltaDeg) * 10) / 10;
    const clamped = clampHeadingOffsetDeg(rounded);
    const telemetry = buildTelemetryFromState(state, {
      aircraftHeadingDeg: clamped,
    });

    set({
      aircraftHeadingDeg: clamped,
      telemetry,
      landingResult: null,
    });
  },

  applyIdealCrabHeading: () => {
    const state = get();
    playClick(state.soundEnabled);
    const baseTelemetry = buildTelemetryFromState(state, {
      aircraftHeadingDeg: 0,
    });
    const ideal = Math.round(baseTelemetry.idealCrabAngleDeg * 10) / 10;
    const telemetry = buildTelemetryFromState(state, {
      aircraftHeadingDeg: ideal,
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
    const { telemetry, toleranceDeg, runwayAngleDeg, soundEnabled } = get();
    const result = evaluateLanding(telemetry.vR, toleranceDeg, runwayAngleDeg);

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
    const { telemetry, landingResult, runwayAngleDeg, soundEnabled } = get();
    playClick(soundEnabled);
    const updatedLanding = landingResult
      ? evaluateLanding(telemetry.vR, toleranceDeg, runwayAngleDeg)
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
      customWindSpeedKts: null,
      customAirspeedKts: null,
      runwayAngleDeg: 0,
      operationMode: "add",
      blindMode: false,
      chalkEnabled: false,
      chalkPaths: [],
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
