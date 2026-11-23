"use client";

import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  BookOpen,
  GitCompareArrows,
  Pause,
  PlaneTakeoff,
  Play,
  RotateCcw,
  Waypoints,
} from "lucide-react";
import type { MissionStep } from "@/domain/types";
import { useSimulationStore } from "@/store/useSimulationStore";

const STEP_DOTS: readonly MissionStep[] = [1, 2, 3, 4, 5, 6];

/**
 * Thanh điều khiển nổi dưới đáy khớp thiết kế gốc với đầy đủ nhãn Tiếng Việt chuẩn.
 */
export function BottomControlDock() {
  const currentStep = useSimulationStore((s) => s.currentStep);
  const isPlaying = useSimulationStore((s) => s.isPlaying);
  const guideVisible = useSimulationStore((s) => s.guideVisible);
  const vectorsVisible = useSimulationStore((s) => s.vectorsVisible);
  const showParallelogram = useSimulationStore((s) => s.showParallelogram);
  const landingResult = useSimulationStore((s) => s.landingResult);

  const setStep = useSimulationStore((s) => s.setStep);
  const nextStep = useSimulationStore((s) => s.nextStep);
  const prevStep = useSimulationStore((s) => s.prevStep);
  const resetSimulation = useSimulationStore((s) => s.resetSimulation);
  const togglePlay = useSimulationStore((s) => s.togglePlay);
  const watchFlight = useSimulationStore((s) => s.watchFlight);
  const checkLanding = useSimulationStore((s) => s.checkLanding);
  const toggleGuide = useSimulationStore((s) => s.toggleGuide);
  const toggleVectors = useSimulationStore((s) => s.toggleVectors);
  const toggleParallelogram = useSimulationStore((s) => s.toggleParallelogram);

  return (
    <footer className="fixed bottom-0 w-full z-40 pointer-events-none">
      <div className="w-full px-margin-desktop pb-space-md flex items-center justify-center">
        <div className="pointer-events-auto flex items-center gap-space-sm bg-surface-container-low/95 backdrop-blur-xl px-space-md py-space-sm rounded-full shadow-[var(--hud-card-shadow)] border border-outline-variant/60 max-w-full overflow-x-auto">
          {/* Nhóm nút bên trái */}
          <div className="flex items-center gap-space-xs shrink-0">
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep <= 1}
              className="min-h-[40px] px-space-sm py-space-xs rounded-full font-telemetry-sm text-telemetry-sm text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface disabled:opacity-40 disabled:pointer-events-none transition-colors flex items-center gap-1 whitespace-nowrap cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" aria-hidden="true" />
              <span>Quay lại</span>
            </button>

            <button
              type="button"
              onClick={resetSimulation}
              className="min-h-[40px] px-space-sm py-space-xs rounded-full font-telemetry-sm text-telemetry-sm text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors flex items-center gap-1 whitespace-nowrap cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" aria-hidden="true" />
              <span>Đặt lại</span>
            </button>

            <button
              type="button"
              title={isPlaying ? "Tạm dừng" : "Tiếp tục"}
              aria-label={isPlaying ? "Tạm dừng" : "Tiếp tục"}
              onClick={togglePlay}
              className="min-h-[40px] px-space-sm rounded-full bg-surface-container-high text-primary flex items-center justify-center gap-1 hover:bg-primary-container hover:text-on-primary-container transition-colors shadow-[0_0_12px_rgba(56,189,248,0.25)] font-telemetry-sm text-telemetry-sm whitespace-nowrap cursor-pointer"
            >
              {isPlaying ? (
                <>
                  <Pause className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Tạm dừng</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Tiếp tục</span>
                </>
              )}
            </button>

            {(currentStep >= 4 || currentStep === 6) && (
              <button
                type="button"
                onClick={watchFlight}
                className="min-h-[40px] px-space-sm py-space-xs rounded-full font-telemetry-sm text-telemetry-sm text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors flex items-center gap-1 whitespace-nowrap cursor-pointer"
              >
                <PlaneTakeoff className="w-4 h-4" aria-hidden="true" />
                <span>{currentStep === 6 ? "Phát lại" : "Xem đường bay"}</span>
              </button>
            )}

            {(currentStep === 4 || currentStep === 5) && (
              <button
                type="button"
                title="Kiểm tra hạ cánh"
                aria-label="Kiểm tra hạ cánh"
                onClick={checkLanding}
                className="min-h-[40px] px-space-sm py-space-xs rounded-full bg-surface-container-high text-tertiary hover:bg-tertiary-container hover:text-on-tertiary-container font-telemetry-sm text-telemetry-sm font-semibold transition-colors flex items-center gap-1 shadow-[0_0_12px_rgba(86,229,169,0.25)] whitespace-nowrap cursor-pointer"
              >
                <BadgeCheck className="w-4 h-4" aria-hidden="true" />
                <span>Kiểm tra hạ cánh</span>
              </button>
            )}
          </div>

          {/* 6 chấm tiến trình */}
          <div
            className="flex items-center gap-space-xs px-space-xs shrink-0"
            role="tablist"
            aria-label="Tiến trình 6 bước"
          >
            {STEP_DOTS.map((step) => {
              const isCurrent = currentStep === step;
              const isCompleted = currentStep > step;
              const isSuccessStep5 = step === 5 && landingResult?.success;
              return (
                <button
                  key={step}
                  type="button"
                  role="tab"
                  aria-selected={isCurrent}
                  aria-label={`Bước ${step}`}
                  onClick={() => setStep(step)}
                  className={`h-2 rounded-full transition-all cursor-pointer ${
                    isCurrent
                      ? isSuccessStep5
                        ? "w-5 bg-tertiary shadow-[0_0_8px_rgba(86,229,169,0.9)]"
                        : "w-5 bg-primary shadow-[0_0_8px_rgba(56,189,248,0.8)]"
                      : isCompleted
                        ? "w-2 bg-primary/60 hover:bg-primary"
                        : "w-2 bg-surface-bright hover:bg-outline"
                  }`}
                />
              );
            })}
          </div>

          {/* Nhóm nút bên phải */}
          <div className="flex items-center gap-space-xs shrink-0">
            <button
              type="button"
              aria-pressed={guideVisible}
              onClick={toggleGuide}
              className={`min-h-[40px] px-space-sm py-space-xs rounded-full font-telemetry-sm text-telemetry-sm transition-colors flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                guideVisible
                  ? "bg-surface-container-high text-primary border border-primary/30"
                  : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              }`}
            >
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span>Hướng dẫn</span>
            </button>

            <button
              type="button"
              aria-pressed={vectorsVisible}
              onClick={toggleVectors}
              className={`min-h-[40px] px-space-sm py-space-xs rounded-full font-telemetry-sm text-telemetry-sm transition-colors flex items-center gap-1 whitespace-nowrap cursor-pointer ${
                vectorsVisible
                  ? "bg-surface-container-high text-primary border border-primary/30"
                  : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
              }`}
            >
              <Waypoints className="w-4 h-4" aria-hidden="true" />
              <span>{vectorsVisible ? "Ẩn vectơ" : "Hiện vectơ"}</span>
            </button>

            {currentStep === 6 && (
              <button
                type="button"
                aria-pressed={showParallelogram}
                onClick={toggleParallelogram}
                className={`min-h-[40px] px-space-sm py-space-xs rounded-full font-telemetry-sm text-telemetry-sm font-semibold transition-colors flex items-center gap-1 border whitespace-nowrap cursor-pointer ${
                  showParallelogram
                    ? "bg-surface-container-high text-primary border-primary/30"
                    : "text-on-surface-variant border-outline-variant/40 hover:bg-surface-container-high"
                }`}
              >
                <GitCompareArrows className="w-4 h-4" aria-hidden="true" />
                <span>Hình bình hành</span>
              </button>
            )}

            {currentStep < 6 ? (
              <button
                type="button"
                onClick={nextStep}
                className="min-h-[40px] px-space-md py-space-xs rounded-full bg-primary-container text-on-primary-container font-telemetry-sm text-telemetry-sm font-semibold hover:bg-primary hover:text-on-primary transition-colors flex items-center gap-1 shadow-[0_0_16px_rgba(56,189,248,0.3)] whitespace-nowrap cursor-pointer"
              >
                <span>{currentStep === 5 ? "Giải thích" : "Tiếp theo"}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            ) : (
              <button
                type="button"
                onClick={resetSimulation}
                className="min-h-[40px] px-space-md py-space-xs rounded-full bg-primary-container text-on-primary-container font-telemetry-sm text-telemetry-sm font-semibold hover:bg-primary hover:text-on-primary transition-colors flex items-center gap-1 shadow-[0_0_16px_rgba(56,189,248,0.3)] whitespace-nowrap cursor-pointer"
              >
                <span>Phát lại từ đầu</span>
                <RotateCcw className="w-4 h-4" aria-hidden="true" />
              </button>
            )}
          </div>
        </div>
      </div>
    </footer>
  );
}
