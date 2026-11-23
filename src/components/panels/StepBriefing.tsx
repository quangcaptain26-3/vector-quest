"use client";

import { ArrowRight, Compass, Wind } from "lucide-react";
import { MathFormula } from "@/components/ui/MathFormula";
import { MISSION_STEPS } from "@/domain/missionContent";
import { getTranslations } from "@/lib/i18n";
import { useSimulationStore } from "@/store/useSimulationStore";

/**
 * Bước 1: Mở đầu — Cơn gió ngang bất ngờ!
 */
export function StepBriefing() {
  const guideVisible = useSimulationStore((s) => s.guideVisible);
  const windDirection = useSimulationStore((s) => s.windDirection);
  const telemetry = useSimulationStore((s) => s.telemetry);
  const language = useSimulationStore((s) => s.language);
  const setStep = useSimulationStore((s) => s.setStep);

  const copy = MISSION_STEPS[1];
  const translations = getTranslations(language);
  const t = translations.panels;
  const windArrowLabel =
    windDirection === "rtl"
      ? translations.windPill.rtlArrow
      : translations.windPill.ltrArrow;

  return (
    <div className="flex flex-col gap-space-md">
      {/* Dòng nhãn bước */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 bg-primary/15 px-space-sm py-1 rounded-full border border-primary/20">
          <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(56,189,248,0.9)] animate-pulse" />
          <span className="font-label-caps text-label-caps text-primary font-bold">
            {copy.badge[language]}
          </span>
        </div>

        <span className="font-telemetry-sm text-telemetry-sm text-primary bg-surface-container-highest px-2.5 py-0.5 rounded-full font-semibold">
          {t.mathBadge}
        </span>
      </div>

      {/* Tiêu đề */}
      <div className="flex flex-col gap-1">
        <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">
          {copy.eyebrow[language]}
        </span>
        <h2 className="font-headline-md text-headline-md text-on-surface font-bold leading-tight">
          {copy.title[language]}
        </h2>
      </div>

      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
        {copy.subtitle[language]}
      </p>

      {/* Khung mô tả tình huống */}
      <div className="border-l-4 border-primary bg-primary/10 rounded-r-xl p-4 shadow-[0_0_20px_rgba(56,189,248,0.08)] flex gap-space-sm items-start">
        <Wind
          className="w-5 h-5 text-primary mt-0.5 shrink-0"
          aria-hidden="true"
        />
        <p className="font-body-md text-body-md text-on-surface font-medium leading-snug">
          {copy.prompt[language]}
        </p>
      </div>

      {/* Tóm tắt tác động gió ngang */}
      <div className="grid grid-cols-2 gap-2 bg-surface-container-high/60 border border-outline-variant/50 rounded-xl p-3">
        <div className="flex flex-col gap-0.5">
          <span className="font-label-caps text-label-caps text-primary">
            {t.briefing.currentWindLabel}
          </span>
          <span className="font-telemetry-md text-telemetry-md text-on-surface font-bold">
            {`${telemetry.windSpeedKts} KT (${windArrowLabel})`}
          </span>
        </div>
        <div className="flex flex-col gap-0.5">
          <span className="font-label-caps text-label-caps text-error">
            {t.briefing.trackDriftLabel}
          </span>
          <span className="font-telemetry-md text-telemetry-md text-error font-bold">
            {`${telemetry.driftAngleDeg >= 0 ? "+" : ""}${telemetry.driftAngleDeg.toFixed(1)}° (${Math.abs(telemetry.lateralDriftMeters)}m)`}
          </span>
        </div>
      </div>

      {guideVisible && (
        <div className="flex items-center justify-between gap-2 bg-surface-container-lowest/80 border border-primary-container/20 rounded-lg px-3 py-2">
          <div className="flex items-center gap-2">
            <Compass
              className="w-4 h-4 text-primary shrink-0"
              aria-hidden="true"
            />
            <span className="font-body-sm text-body-sm text-on-surface-variant">
              {copy.guideNote[language]}
            </span>
          </div>
          <MathFormula
            tex="\vec{v}_R = \vec{v}_A + \vec{v}_W"
            className="font-telemetry-sm text-telemetry-sm text-primary shrink-0"
          />
        </div>
      )}

      {/* Nút chuyển bước */}
      <button
        type="button"
        onClick={() => setStep(2)}
        className="w-full py-3 px-space-md rounded-lg bg-primary hover:bg-primary-fixed text-on-primary font-headline-sm text-headline-sm font-bold text-center transition-all flex items-center justify-center gap-space-xs shadow-[0_0_24px_rgba(56,189,248,0.5)] cursor-pointer"
      >
        <span>{t.briefing.startChallengeBtn}</span>
        <ArrowRight className="w-5 h-5" aria-hidden="true" />
      </button>
    </div>
  );
}
