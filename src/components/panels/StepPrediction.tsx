"use client";

import { ArrowRight, Brain, Calculator, MessageSquare } from "lucide-react";
import { MathFormula } from "@/components/ui/MathFormula";
import { MISSION_STEPS } from "@/domain/missionContent";
import { useSimulationStore } from "@/store/useSimulationStore";

/**
 * Bước 2: Thử thách phi công — Giữ nguyên vòng cung la bàn trực quan và chưa lộ đáp án A–D.
 */
export function StepPrediction() {
  const guideVisible = useSimulationStore((s) => s.guideVisible);
  const showTrigReference = useSimulationStore((s) => s.showTrigReference);
  const setStep = useSimulationStore((s) => s.setStep);
  const toggleTrigReference = useSimulationStore((s) => s.toggleTrigReference);

  const copy = MISSION_STEPS[2];

  return (
    <div className="flex flex-col gap-space-md">
      {/* Dòng nhãn bước */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 bg-secondary/15 px-space-sm py-1 rounded-full">
          <span className="w-1.5 h-1.5 rounded-full bg-secondary shadow-[0_0_8px_rgba(255,198,64,0.8)]" />
          <span className="font-label-caps text-label-caps text-secondary font-bold">
            {copy.badge}
          </span>
        </div>

        <span className="font-telemetry-sm text-telemetry-sm text-primary bg-surface-container-highest px-2.5 py-0.5 rounded-full font-semibold">
          TOÁN 10 • VECTƠ
        </span>
      </div>

      {/* Tiêu đề */}
      <div className="flex flex-col gap-1">
        <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">
          {copy.eyebrow}
        </span>
        <h2 className="font-headline-md text-headline-md text-on-surface font-bold leading-tight">
          {copy.title}
        </h2>
      </div>

      <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
        {copy.subtitle.vi}
      </p>

      {/* Câu hỏi thảo luận */}
      <div className="border-l-4 border-primary bg-primary/10 rounded-r-xl p-4 shadow-[0_0_20px_rgba(56,189,248,0.08)] flex gap-space-sm items-start">
        <Brain
          className="w-5 h-5 text-primary mt-0.5 shrink-0"
          aria-hidden="true"
        />
        <span className="font-headline-sm text-headline-sm text-on-surface font-semibold leading-snug">
          {copy.prompt.vi}
        </span>
      </div>

      {/* Vòng cung hướng mũi máy bay */}
      <div className="flex flex-col gap-2 p-3 bg-surface-container-high/60 rounded-xl border border-primary-container/20">
        <div className="flex items-center justify-between border-b border-surface-container-highest/60 pb-1.5">
          <div className="flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
            <span className="font-label-caps text-label-caps text-primary tracking-wider uppercase font-bold">
              CUNG DỰ ĐOÁN HƯỚNG MŨI
            </span>
          </div>
          <span className="font-telemetry-sm text-telemetry-sm text-outline">
            ĐƯỜNG BĂNG 36L
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
              stroke="#38bdf8"
              strokeWidth="2.5"
            />
            <path
              d="M 130 35 A 130 130 0 0 1 190 35"
              fill="none"
              stroke="#ffc640"
              strokeWidth="2.5"
            />
            <path
              d="M 190 35 A 130 130 0 0 1 250 80"
              fill="none"
              stroke="#ffb4ab"
              strokeWidth="2.5"
            />
            <circle cx="160" cy="90" fill="#dfe2ef" r="3.5" />
            <line
              stroke="#ffc640"
              strokeDasharray="2 2"
              strokeWidth="1.5"
              x1="160"
              x2="160"
              y1="85"
              y2="32"
            />
            <line
              stroke="#38bdf8"
              strokeWidth="2"
              x1="160"
              x2="100"
              y1="85"
              y2="45"
            />
            <polygon fill="#38bdf8" points="95,43 103,42 101,50" />
            <line
              stroke="#ffb4ab"
              strokeDasharray="3 3"
              strokeWidth="1.5"
              x1="160"
              x2="220"
              y1="85"
              y2="45"
            />
            <text
              fill="#38bdf8"
              fontFamily="var(--font-jetbrains-mono)"
              fontSize="10"
              fontWeight="700"
              textAnchor="middle"
              x="90"
              y="28"
            >
              RẼ TRÁI
            </text>
            <text
              fill="#87929a"
              fontFamily="var(--font-jetbrains-mono)"
              fontSize="8.5"
              textAnchor="middle"
              x="90"
              y="38"
            >
              Chếch trái
            </text>
            <text
              fill="#ffc640"
              fontFamily="var(--font-jetbrains-mono)"
              fontSize="10"
              fontWeight="700"
              textAnchor="middle"
              x="160"
              y="20"
            >
              BAY THẲNG
            </text>
            <text
              fill="#87929a"
              fontFamily="var(--font-jetbrains-mono)"
              fontSize="8.5"
              textAnchor="middle"
              x="160"
              y="30"
            >
              Hướng 360°
            </text>
            <text
              fill="#ffb4ab"
              fontFamily="var(--font-jetbrains-mono)"
              fontSize="10"
              fontWeight="700"
              textAnchor="middle"
              x="230"
              y="28"
            >
              RẼ PHẢI
            </text>
            <text
              fill="#87929a"
              fontFamily="var(--font-jetbrains-mono)"
              fontSize="8.5"
              textAnchor="middle"
              x="230"
              y="38"
            >
              Chếch phải
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
              {copy.guideNote.vi}
            </span>
          </div>
        )}
      </div>

      {/* Gợi ý lượng giác */}
      {showTrigReference && (
        <div className="bg-surface-container-lowest/90 border border-primary/30 rounded-lg p-2.5 flex items-center justify-between gap-2">
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Cân bằng thành phần ngang:
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
          <span>MỞ CÁC PHƯƠNG ÁN HƯỚNG BAY</span>
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
            <span>Công thức lượng giác</span>
          </button>
          <span className="font-telemetry-sm text-telemetry-sm text-outline">
            Góc bù gió • TOÁN 10
          </span>
        </div>
      </div>
    </div>
  );
}
