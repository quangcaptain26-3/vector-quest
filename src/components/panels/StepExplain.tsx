"use client";

import { ArrowRight, RotateCcw } from "lucide-react";
import { MathFormula } from "@/components/ui/MathFormula";
import { MISSION_STEPS } from "@/domain/missionContent";
import { getTranslations } from "@/lib/i18n";
import { useSimulationStore } from "@/store/useSimulationStore";

/**
 * Bước 6: Giải thích — Quy tắc hình bình hành & Phép cộng/trừ vectơ (Toán 10).
 */
export function StepExplain() {
  const showParallelogram = useSimulationStore((s) => s.showParallelogram);
  const showCoordinateGrid = useSimulationStore((s) => s.showCoordinateGrid);
  const guideVisible = useSimulationStore((s) => s.guideVisible);
  const language = useSimulationStore((s) => s.language);

  const toggleParallelogram = useSimulationStore((s) => s.toggleParallelogram);
  const toggleCoordinateGrid = useSimulationStore((s) => s.toggleCoordinateGrid);
  const applyIdealCrabHeading = useSimulationStore(
    (s) => s.applyIdealCrabHeading
  );
  const resetSimulation = useSimulationStore((s) => s.resetSimulation);

  const copy = MISSION_STEPS[6];
  const t = getTranslations(language).panels;
  const te = t.explain;

  return (
    <div className="flex flex-col gap-space-sm">
      {/* Nhãn bước */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 bg-primary/15 px-space-sm py-1 rounded-full border border-primary/30">
          <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(56,189,248,0.9)] animate-pulse" />
          <span className="font-label-caps text-label-caps text-primary font-bold tracking-wider">
            {copy.badge[language]}
          </span>
        </div>

        <span className="font-telemetry-sm text-telemetry-sm text-primary bg-surface-container-highest px-2.5 py-0.5 rounded-full font-semibold">
          {t.mathBadge}
        </span>
      </div>

      {/* Tiêu đề & Câu hỏi khám phá */}
      <div className="flex flex-col gap-0.5">
        <span className="font-label-caps text-label-caps text-secondary tracking-widest uppercase">
          {copy.eyebrow[language]}
        </span>
        <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold leading-snug">
          {copy.title[language]}
        </h2>
        <div className="p-2.5 rounded-lg bg-surface-container-lowest/80 border-l-2 border-secondary flex flex-col gap-0.5 mt-1">
          <p className="font-body-sm text-body-sm text-on-surface font-medium leading-tight">
            {copy.subtitle[language]}
          </p>
        </div>
      </div>

      {/* Thẻ công thức phép cộng & phép trừ vectơ */}
      <div className="bg-surface-container-lowest/90 border border-primary-container/20 rounded-xl p-3.5 flex flex-col gap-2.5 shadow-[0_0_20px_rgba(56,189,248,0.08)]">
        <div className="flex items-center justify-between border-b border-outline-variant/60 pb-2">
          <span className="font-label-caps text-label-caps text-on-surface-variant tracking-wider uppercase">
            {te.formulaHeader}
          </span>
          <span className="font-telemetry-sm text-telemetry-sm text-tertiary font-bold">
            {te.commonOriginTag}
          </span>
        </div>

        <div className="flex flex-col items-center gap-1 py-1">
          <MathFormula
            tex="\vec{v}_R = \vec{v}_A + \vec{v}_W"
            className="font-headline-sm text-headline-sm text-primary font-bold tracking-wider"
          />
          <MathFormula
            tex="\vec{v}_A = \vec{v}_R - \vec{v}_W"
            className="font-telemetry-sm text-telemetry-sm text-secondary"
          />
        </div>

        <div className="flex flex-col gap-1.5 text-body-sm">
          <div className="flex items-center gap-2 bg-surface-container-high/60 px-2 py-1.5 rounded">
            <span className="w-2.5 h-2.5 rounded-full bg-secondary shadow-[0_0_6px_rgba(255,198,64,0.7)] shrink-0" />
            <span className="font-telemetry-sm text-telemetry-sm text-on-surface flex-1 flex items-center gap-1.5">
              <MathFormula tex="\vec{v}_A" className="text-secondary font-bold" />
              <span>{te.vaLegend}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 bg-surface-container-high/60 px-2 py-1.5 rounded">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-container shadow-[0_0_6px_rgba(56,189,248,0.7)] shrink-0" />
            <span className="font-telemetry-sm text-telemetry-sm text-on-surface flex-1 flex items-center gap-1.5">
              <MathFormula tex="\vec{v}_W" className="text-primary font-bold" />
              <span>{te.vwLegend}</span>
            </span>
          </div>
          <div className="flex items-center gap-2 bg-surface-container-high/60 px-2 py-1.5 rounded">
            <span className="w-2.5 h-2.5 rounded-full bg-error shadow-[0_0_6px_rgba(244,63,94,0.8)] shrink-0" />
            <span className="font-telemetry-sm text-telemetry-sm text-on-surface flex-1 flex items-center gap-1.5">
              <MathFormula tex="\vec{v}_R" className="text-error font-bold" />
              <span>{te.vrLegend}</span>
            </span>
          </div>
        </div>
      </div>

      {/* Công tắc minh họa hình bình hành & tọa độ */}
      <div className="flex flex-col gap-1.5 bg-surface-container-high/50 p-2 rounded-xl border border-outline-variant/60">
        <div className="flex items-center justify-between px-2 py-1">
          <span className="font-telemetry-sm text-telemetry-sm text-on-surface font-medium">
            {te.showParallelogram}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={showParallelogram}
            aria-label={te.showParallelogram}
            onClick={toggleParallelogram}
            className={`w-9 h-5 rounded-full p-0.5 flex items-center transition-all cursor-pointer ${
              showParallelogram
                ? "bg-primary-container justify-end shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                : "bg-surface-container-lowest border border-outline-variant justify-start"
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full block ${
                showParallelogram
                  ? "bg-surface-container-lowest"
                  : "bg-outline"
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between px-2 py-1">
          <span className="font-telemetry-sm text-telemetry-sm text-on-surface font-medium">
            {te.showCoordinateGrid}
          </span>
          <button
            type="button"
            role="switch"
            aria-checked={showCoordinateGrid}
            aria-label={te.showCoordinateGrid}
            onClick={toggleCoordinateGrid}
            className={`w-9 h-5 rounded-full p-0.5 flex items-center transition-all cursor-pointer ${
              showCoordinateGrid
                ? "bg-primary-container justify-end shadow-[0_0_8px_rgba(56,189,248,0.5)]"
                : "bg-surface-container-lowest border border-outline-variant justify-start"
            }`}
          >
            <span
              className={`w-4 h-4 rounded-full block ${
                showCoordinateGrid
                  ? "bg-surface-container-lowest"
                  : "bg-outline"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Quy tắc hình bình hành */}
      <div className="p-2.5 rounded-xl bg-primary/10 border-l-2 border-primary flex flex-col gap-1">
        <span className="font-label-caps text-label-caps text-primary font-bold uppercase tracking-wider">
          {te.ruleHeader}
        </span>
        <p className="font-body-sm text-body-sm text-on-surface leading-tight">
          {copy.prompt[language]}
        </p>
      </div>

      {guideVisible && (
        <button
          type="button"
          onClick={applyIdealCrabHeading}
          className="text-left font-body-sm text-body-sm text-primary hover:text-primary-fixed underline decoration-dotted cursor-pointer px-1 flex items-center gap-1"
        >
          <span>{te.snapIdealPrefix}</span>
          <MathFormula tex="\vec{v}_A" />
          <span>{te.snapIdealSuffix}</span>
        </button>
      )}

      {/* Nút kết thúc / phát lại */}
      <div className="grid grid-cols-2 gap-2 pt-1">
        <button
          type="button"
          onClick={resetSimulation}
          className="py-2.5 px-2 rounded-lg bg-surface-container-highest hover:bg-surface-container-high text-on-surface font-telemetry-sm text-telemetry-sm font-semibold text-center transition-all flex items-center justify-center gap-1 border border-outline-variant/60 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" aria-hidden="true" />
          <span>{te.replayBtn}</span>
        </button>

        <button
          type="button"
          onClick={resetSimulation}
          className="py-2.5 px-2 rounded-lg bg-primary hover:bg-primary-fixed text-on-primary font-telemetry-sm text-telemetry-sm font-bold text-center transition-all flex items-center justify-center gap-1 shadow-[0_0_20px_rgba(56,189,248,0.4)] cursor-pointer"
        >
          <span>{te.finishBtn}</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  );
}
