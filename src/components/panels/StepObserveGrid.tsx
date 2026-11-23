"use client";

import {
  ArrowLeft,
  ArrowRight,
  Calculator,
  Check,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { MathFormula } from "@/components/ui/MathFormula";
import { RealisticAircraftSvg } from "@/components/ui/RealisticAircraftSvg";
import {
  getStep3HintForWind,
  HEADING_OPTIONS,
  MISSION_STEPS,
  STEP3_FEEDBACK,
} from "@/domain/missionContent";
import type { HeadingOptionId } from "@/domain/types";
import { useSimulationStore } from "@/store/useSimulationStore";

const ROTATION_BY_OPTION: Record<HeadingOptionId, number> = {
  A: 0,
  B: 45,
  C: -25,
  D: 18,
};

/**
 * Bước 3: Lưới Radar 2×2 chọn phương án [A–D] và Kiểm tra đáp án thích ứng theo gió.
 */
export function StepObserveGrid() {
  const windDirection = useSimulationStore((s) => s.windDirection);
  const isDaylight = useSimulationStore((s) => s.themeMode) === "daylight";
  const telemetry = useSimulationStore((s) => s.telemetry);
  const selectedOption = useSimulationStore((s) => s.selectedOption);
  const predictionResult = useSimulationStore((s) => s.predictionResult);
  const guideVisible = useSimulationStore((s) => s.guideVisible);
  const showTrigReference = useSimulationStore((s) => s.showTrigReference);

  const selectOption = useSimulationStore((s) => s.selectOption);
  const checkPredictionAnswer = useSimulationStore(
    (s) => s.checkPredictionAnswer
  );
  const toggleTrigReference = useSimulationStore((s) => s.toggleTrigReference);
  const setStep = useSimulationStore((s) => s.setStep);

  const copy = MISSION_STEPS[3];
  const windHint = getStep3HintForWind(windDirection);

  return (
    <div className="flex flex-col gap-space-sm">
      {/* Nhãn bước */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 bg-primary/15 px-space-sm py-1 rounded-full border border-primary/20">
          <span className="w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(56,189,248,0.8)] animate-pulse" />
          <span className="font-label-caps text-label-caps text-primary font-bold">
            {copy.badge}
          </span>
        </div>

        <span className="font-telemetry-sm text-telemetry-sm text-primary bg-surface-container-highest px-2.5 py-0.5 rounded-full font-semibold">
          TOÁN 10 • VECTƠ
        </span>
      </div>

      {/* Tiêu đề */}
      <div className="flex flex-col gap-0.5">
        <span className="font-label-caps text-label-caps text-primary tracking-widest uppercase">
          {copy.eyebrow}
        </span>
        <h2 className="font-headline-sm text-headline-sm text-on-surface font-bold leading-snug">
          {copy.title}
        </h2>
        <p className="font-body-sm text-body-sm text-outline italic leading-tight">
          {`“Chọn hướng mũi máy bay thích hợp để cân bằng gió ngang ${telemetry.windSpeedKts} KT.”`}
        </p>
      </div>

      {/* Lưới 2×2 các phương án [A] [B] [C] [D] */}
      <div
        className="grid grid-cols-2 gap-2.5 pt-1"
        role="radiogroup"
        aria-label="Các phương án hướng mũi máy bay"
      >
        {HEADING_OPTIONS.map((opt) => {
          const isSelected = selectedOption === opt.id;
          const isCheckedWrong =
            predictionResult &&
            !predictionResult.isCorrect &&
            predictionResult.selectedOption === opt.id;
          const isCheckedRight =
            predictionResult &&
            predictionResult.isCorrect &&
            predictionResult.selectedOption === opt.id;

          const cardBorderClass = isCheckedWrong
            ? "bg-error-container/20 border-2 border-error shadow-[0_0_15px_rgba(255,180,171,0.3)]"
            : isSelected
              ? "bg-primary/10 border-2 border-primary shadow-[0_0_15px_rgba(56,189,248,0.4)]"
              : "bg-surface-container-high/60 hover:bg-surface-container-high border border-outline-variant/60";

          return (
            <button
              key={opt.id}
              type="button"
              role="radio"
              aria-checked={isSelected}
              onClick={() => selectOption(opt.id)}
              className={`flex flex-col text-left rounded-xl p-2.5 cursor-pointer transition-all relative ${cardBorderClass}`}
            >
              <div className="flex items-center justify-between mb-1 w-full">
                <span
                  className={`font-telemetry-sm text-telemetry-sm font-bold px-1.5 py-0.5 rounded ${
                    isSelected
                      ? "bg-primary text-on-primary"
                      : "bg-surface-container-lowest text-on-surface-variant border border-outline-variant/60"
                  }`}
                >
                  {`[${opt.id}]`}
                </span>
                <div className="flex items-center gap-1">
                  {isCheckedRight && (
                    <CheckCircle2
                      className="w-4 h-4 text-tertiary"
                      aria-hidden="true"
                    />
                  )}
                  {isCheckedWrong && (
                    <XCircle
                      className="w-4 h-4 text-error"
                      aria-hidden="true"
                    />
                  )}
                  {!predictionResult && isSelected && (
                    <CheckCircle2
                      className="w-4 h-4 text-primary"
                      aria-hidden="true"
                    />
                  )}
                  <span
                    className={`font-telemetry-sm text-telemetry-sm ${
                      isSelected ? "text-primary font-bold" : "text-outline"
                    }`}
                  >
                    {opt.compassLabel}
                  </span>
                </div>
              </div>

              {/* Khung radar thu nhỏ */}
              <div
                className={`relative w-full h-[62px] rounded-md overflow-hidden flex items-center justify-center ${
                  isSelected
                    ? "bg-surface-container-lowest border border-primary/30"
                    : "bg-surface-container-lowest/90"
                }`}
              >
                <div
                  className={`absolute w-2 h-10 border-l border-r border-dashed ${
                    isSelected ? "border-tertiary/40" : "border-outline/30"
                  }`}
                />
                {windDirection === "rtl" ? (
                  <ArrowLeft
                    className={`w-4 h-4 text-primary absolute right-2 top-2 ${
                      isSelected ? "animate-pulse" : "opacity-60"
                    }`}
                    aria-hidden="true"
                  />
                ) : (
                  <ArrowRight
                    className={`w-4 h-4 text-primary absolute left-2 top-2 ${
                      isSelected ? "animate-pulse" : "opacity-60"
                    }`}
                    aria-hidden="true"
                  />
                )}

                <div
                  style={{
                    transform: `rotate(${ROTATION_BY_OPTION[opt.id]}deg)`,
                  }}
                >
                  <RealisticAircraftSvg
                    variant="mini"
                    isDaylight={isDaylight}
                    isSelected={isSelected}
                  />
                </div>
              </div>

              <span
                className={`font-label-caps text-label-caps mt-1.5 text-center w-full uppercase tracking-wide ${
                  isSelected
                    ? "text-primary font-bold"
                    : "text-on-surface font-semibold"
                }`}
              >
                {opt.title.vi}
              </span>
            </button>
          );
        })}
      </div>

      {/* Trạng thái & Phản hồi */}
      {predictionResult ? (
        <div
          className={`px-space-sm py-2 rounded-lg border flex flex-col gap-1 ${
            predictionResult.isCorrect
              ? "bg-tertiary/10 border-tertiary/40"
              : "bg-error-container/25 border-error/40"
          }`}
        >
          <div className="flex items-center justify-between">
            <span
              className={`font-telemetry-sm text-telemetry-sm font-bold ${
                predictionResult.isCorrect ? "text-tertiary" : "text-error"
              }`}
            >
              {predictionResult.isCorrect
                ? "DỰ ĐOÁN CHÍNH XÁC!"
                : "HÃY KIỂM TRA LẠI HƯỚNG GIÓ"}
            </span>
            <span className="font-telemetry-sm text-telemetry-sm text-on-surface-variant">
              {`[${predictionResult.selectedOption}]`}
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface leading-snug">
            {predictionResult.isCorrect
              ? STEP3_FEEDBACK.correct.vi
              : `${STEP3_FEEDBACK.incorrect.vi} ${windHint.vi}`}
          </p>
        </div>
      ) : (
        <div className="flex items-center justify-between px-space-xs py-1.5 bg-surface-container-lowest/80 border border-primary-container/20 rounded-lg">
          <div className="flex items-center gap-1.5">
            <span
              className={`w-2 h-2 rounded-full ${
                selectedOption ? "bg-tertiary animate-pulse" : "bg-outline"
              }`}
            />
            <span className="font-telemetry-sm text-telemetry-sm text-on-surface">
              {selectedOption ? (
                <>
                  Đã chọn phương án{" "}
                  <strong className="text-primary">{`[${selectedOption}]`}</strong>{" "}
                  — nhấn Kiểm tra đáp án
                </>
              ) : (
                "Chọn thẻ [A–D] hoặc nhấn phím A–D"
              )}
            </span>
          </div>
          <span className="font-telemetry-sm text-telemetry-sm text-tertiary font-semibold">
            {selectedOption ? "Sẵn sàng" : "Đang chờ"}
          </span>
        </div>
      )}

      {guideVisible && !predictionResult && (
        <p className="font-body-sm text-body-sm text-on-surface-variant italic px-1">
          {copy.guideNote.vi}
        </p>
      )}

      {showTrigReference && (
        <div className="bg-surface-container-lowest/90 border border-primary/30 rounded-lg p-2 flex items-center justify-between gap-2">
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Công thức góc bù gió:
          </span>
          <MathFormula
            tex="\sin\theta = \frac{|\vec{v}_W|}{|\vec{v}_A|}"
            className="font-telemetry-sm text-telemetry-sm text-primary"
          />
        </div>
      )}

      {/* Nút Kiểm tra đáp án / Vào phòng thí nghiệm */}
      <div className="flex flex-col gap-space-xs pt-0.5">
        {predictionResult?.isCorrect ? (
          <button
            type="button"
            onClick={() => setStep(4)}
            className="w-full py-3 px-space-md rounded-lg bg-tertiary hover:bg-tertiary-fixed text-on-tertiary font-headline-sm text-headline-sm font-bold text-center transition-all flex items-center justify-center gap-space-xs shadow-[0_0_24px_rgba(86,229,169,0.45)] cursor-pointer"
          >
            <span>KIỂM CHỨNG TRÊN MÔ PHỎNG</span>
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </button>
        ) : (
          <button
            type="button"
            disabled={!selectedOption}
            onClick={checkPredictionAnswer}
            className="w-full py-3 px-space-md rounded-lg bg-primary hover:bg-primary-fixed disabled:opacity-45 disabled:pointer-events-none text-on-primary font-headline-sm text-headline-sm font-bold text-center transition-all flex items-center justify-center gap-space-xs shadow-[0_0_24px_rgba(56,189,248,0.5)] cursor-pointer"
          >
            <span>Kiểm tra đáp án</span>
            <Check className="w-5 h-5" aria-hidden="true" />
          </button>
        )}

        <div className="flex items-center justify-between px-space-xs">
          <button
            type="button"
            onClick={toggleTrigReference}
            aria-expanded={showTrigReference}
            className="font-telemetry-sm text-telemetry-sm text-outline hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
          >
            <Calculator className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Công thức góc bù gió</span>
          </button>
          <MathFormula
            tex="\sin\theta = |\vec{v}_W| / |\vec{v}_A|"
            className="font-telemetry-sm text-telemetry-sm text-outline"
          />
        </div>
      </div>
    </div>
  );
}
