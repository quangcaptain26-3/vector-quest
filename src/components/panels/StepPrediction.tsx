"use client";

import { ArrowRight, Brain, Calculator, MessageSquare } from "lucide-react";
import { MathFormula } from "@/components/ui/MathFormula";
import { MISSION_STEPS } from "@/domain/missionContent";
import { getTranslations } from "@/lib/i18n";
import { useSimulationStore } from "@/store/useSimulationStore";

/**
 * Bước 2: Thử thách phi công — Giữ nguyên vòng cung la bàn trực quan và chưa lộ đáp án A–D.
 */
export function StepPrediction() {
  const guideVisible = useSimulationStore((s) => s.guideVisible);
  const showTrigReference = useSimulationStore((s) => s.showTrigReference);
  const language = useSimulationStore((s) => s.language);
  const setStep = useSimulationStore((s) => s.setStep);
  const toggleTrigReference = useSimulationStore((s) => s.toggleTrigReference);

  const copy = MISSION_STEPS[2];
  const t = getTranslations(language).panels;

  return (
    <div className="flex flex-col gap-space-md">
      {/* Dòng nhãn bước */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 bg-secondary/15 px-space-sm py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(255,198,64,0.8)]" />
          <span className="font-label-caps text-label-caps text-secondary font-bold">
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

      {/* Câu hỏi thảo luận */}
      <div className="border-l-4 border-primary bg-primary/10 rounded-r-xl p-4 shadow-[0_0_20px_rgba(56,189,248,0.08)] flex gap-space-sm items-start">
        <Brain
          className="w-5 h-5 text-primary mt-0.5 shrink-0"
          aria-hidden="true"
        />
        <span className="font-headline-sm text-headline-sm text-on-surface font-semibold leading-snug">
          {copy.prompt[language]}
        </span>
      </div>

      {/* Vòng cung hướng mũi máy bay */}
      <div className="flex flex-col gap-2 p-3 bg-surface-container-high/60 rounded-xl border border-primary-container/20">
        <div className="flex items-center justify-between border-b border-surface-container-highest/60 pb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-label-caps text-label-caps text-primary tracking-wider uppercase font-bold">
              {t.prediction.arcHeader}
            </span>
          </div>
          <span className="font-telemetry-sm text-telemetry-sm text-outline">
            {t.prediction.runwayTag}
          </span>
        </div>

        <div className="relative w-full h-[110px] bg-surface-container-lowest/80 rounded-lg overflow-hidden flex items-center justify-center p-2">
          <svg className="w-full h-full" viewBox="0 0 320 100">
            <path
              d="M 40 85 A 140 140 0 0 1 280 85"
              fill="none"
              stroke="rgba(135,146,154,0.3)"
              strokeDasharray="3 3"
              strokeWidth="1.5"
            />
            <path
              d="M 70 80 A 130 130 0 0 1 130 35"
              fill="none"
              stroke="var(--vec-w)"
              strokeWidth="2.8"
            />
            <path
              d="M 130 35 A 130 130 0 0 1 190 35"
              fill="none"
              stroke="var(--vec-a)"
              strokeWidth="2.8"
            />
            <path
              d="M 190 35 A 130 130 0 0 1 250 80"
              fill="none"
              stroke="var(--vec-r-drift)"
              strokeWidth="2.8"
            />
            <circle cx="160" cy="90" fill="var(--on-surface)" r="4" />
            <line
              stroke="var(--vec-a)"
              strokeDasharray="2 2"
              strokeWidth="2"
              x1="160"
              x2="160"
              y1="85"
              y2="32"
            />
            <line
              stroke="var(--vec-w)"
              strokeWidth="2.4"
              x1="160"
              x2="100"
              y1="85"
              y2="45"
            />
            <polygon fill="var(--vec-w)" points="95,43 103,42 101,50" />
            <line
              stroke="var(--vec-r-drift)"
              strokeDasharray="3 3"
              strokeWidth="1.8"
              x1="160"
              x2="220"
              y1="85"
              y2="45"
            />
            <text
              fill="var(--vec-w)"
              fontFamily="var(--font-jetbrains-mono)"
              fontSize="11"
              fontWeight="700"
              textAnchor="middle"
              x="85"
              y="26"
            >
              {t.prediction.turnLeft}
            </text>
            <text
              fill="var(--on-surface-variant)"
              fontFamily="var(--font-jetbrains-mono)"
              fontSize="10"
              fontWeight="600"
              textAnchor="middle"
              x="85"
              y="38"
            >
              {t.prediction.crabLeft}
            </text>
            <text
              fill="var(--vec-a)"
              fontFamily="var(--font-jetbrains-mono)"
              fontSize="11"
              fontWeight="700"
              textAnchor="middle"
              x="160"
              y="18"
            >
              {t.prediction.flyStraight}
            </text>
            <text
              fill="var(--on-surface-variant)"
              fontFamily="var(--font-jetbrains-mono)"
              fontSize="10"
              fontWeight="600"
              textAnchor="middle"
              x="160"
              y="30"
            >
              {t.prediction.heading360}
            </text>
            <text
              fill="var(--vec-r-drift)"
              fontFamily="var(--font-jetbrains-mono)"
              fontSize="11"
              fontWeight="700"
              textAnchor="middle"
              x="235"
              y="26"
            >
              {t.prediction.turnRight}
            </text>
            <text
              fill="var(--on-surface-variant)"
              fontFamily="var(--font-jetbrains-mono)"
              fontSize="10"
              fontWeight="600"
              textAnchor="middle"
              x="235"
              y="38"
            >
              {t.prediction.crabRight}
            </text>
          </svg>
        </div>

        {guideVisible && (
          <div className="flex items-center justify-center gap-1.5 pt-0.5 text-center">
            <MessageSquare
              className="w-3.5 h-3.5 text-outline"
              aria-hidden="true"
            />
            <span className="font-body-sm text-body-sm text-on-surface-variant italic">
              {copy.guideNote[language]}
            </span>
          </div>
        )}
      </div>

      {/* Gợi ý lượng giác */}
      {showTrigReference && (
        <div className="bg-surface-container-lowest/90 border border-primary/30 rounded-lg p-2.5 flex items-center justify-between gap-2">
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            {t.prediction.trigHintLabel}
          </span>
          <MathFormula
            tex="|\vec{v}_A|\sin\theta + v_{W_x} = 0"
            className="font-telemetry-sm text-telemetry-sm text-primary font-semibold shrink-0"
          />
        </div>
      )}

      {/* Nút hành động */}
      <div className="flex flex-col gap-space-sm pt-1">
        <button
          type="button"
          onClick={() => setStep(3)}
          className="w-full py-3 px-space-md rounded-lg bg-primary hover:bg-primary-fixed text-on-primary font-headline-sm text-headline-sm font-bold text-center transition-all flex items-center justify-center gap-space-xs shadow-[0_0_24px_rgba(56,189,248,0.5)] cursor-pointer"
        >
          <span>{t.prediction.openOptionsBtn}</span>
          <ArrowRight className="w-5 h-5" aria-hidden="true" />
        </button>

        <div className="flex items-center justify-between px-space-xs pt-1">
          <button
            type="button"
            onClick={toggleTrigReference}
            aria-expanded={showTrigReference}
            className="font-telemetry-sm text-telemetry-sm text-outline hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Calculator className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.prediction.trigButton}</span>
          </button>
          <span className="font-telemetry-sm text-telemetry-sm text-outline">
            {t.prediction.crabAngleFooter}
          </span>
        </div>
      </div>
    </div>
  );
}
