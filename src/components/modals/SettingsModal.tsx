"use client";

import {
  Languages,
  Moon,
  SlidersHorizontal,
  Sun,
  Volume2,
  VolumeX,
  X,
} from "lucide-react";
import { MathFormula } from "@/components/ui/MathFormula";
import { TOLERANCE_OPTIONS_DEG } from "@/config/simulation";
import { getTranslations } from "@/lib/i18n";
import { useSimulationStore } from "@/store/useSimulationStore";

/**
 * Hộp thoại Cài đặt mô phỏng:
 * Chỉnh sai số góc cho phép (±3°/±4°/±5°), ngôn ngữ VI/EN, chế độ Buồng lái tối / Máy chiếu sáng, và âm thanh.
 */
export function SettingsModal() {
  const activeModal = useSimulationStore((s) => s.activeModal);
  const toleranceDeg = useSimulationStore((s) => s.toleranceDeg);
  const themeMode = useSimulationStore((s) => s.themeMode);
  const soundEnabled = useSimulationStore((s) => s.soundEnabled);
  const language = useSimulationStore((s) => s.language);

  const setToleranceDeg = useSimulationStore((s) => s.setToleranceDeg);
  const setThemeMode = useSimulationStore((s) => s.setThemeMode);
  const setLanguage = useSimulationStore((s) => s.setLanguage);
  const toggleSound = useSimulationStore((s) => s.toggleSound);
  const closeModal = useSimulationStore((s) => s.closeModal);

  if (activeModal !== "settings") {
    return null;
  }

  const ts = getTranslations(language).modals.settings;

  return (
    <div
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-space-md"
      onClick={closeModal}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="settings-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-md bg-surface-container-low/95 backdrop-blur-xl border border-outline-variant/60 rounded-xl p-space-lg shadow-[0_24px_64px_rgba(0,0,0,0.75)] flex flex-col gap-space-md"
      >
        <div className="flex items-center justify-between border-b border-outline-variant/40 pb-3">
          <div className="flex items-center gap-2">
            <SlidersHorizontal
              className="w-5 h-5 text-primary"
              aria-hidden="true"
            />
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">
                {ts.eyebrow}
              </span>
              <h2
                id="settings-modal-title"
                className="font-headline-sm text-headline-sm text-on-surface font-bold"
              >
                {ts.title}
              </h2>
            </div>
          </div>

          <button
            type="button"
            aria-label={ts.closeAria}
            onClick={closeModal}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Sai số góc cho phép */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-telemetry-sm text-telemetry-sm text-on-surface font-semibold">
              {ts.toleranceTitle}
            </span>
            <span className="font-telemetry-sm text-telemetry-sm text-tertiary font-bold">
              {`±${toleranceDeg}°`}
            </span>
          </div>
          <p className="font-body-sm text-body-sm text-on-surface-variant flex items-center gap-1 flex-wrap">
            <span>{ts.tolerancePart1}</span>
            <MathFormula tex="|\Delta\theta| \le \varepsilon" />
            <span>{ts.tolerancePart2}</span>
            <MathFormula tex="\vec{v}_R" />
            <span>{ts.tolerancePart3}</span>
          </p>
          <div className="grid grid-cols-3 gap-2 p-1 bg-surface-container-lowest rounded-lg">
            {TOLERANCE_OPTIONS_DEG.map((deg) => {
              const active = toleranceDeg === deg;
              return (
                <button
                  key={deg}
                  type="button"
                  onClick={() => setToleranceDeg(deg)}
                  className={`py-1.5 rounded-md font-telemetry-sm text-telemetry-sm font-bold transition-all cursor-pointer ${
                    active
                      ? "bg-primary-container text-on-primary-container shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                      : "text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  {`±${deg}°`}
                </button>
              );
            })}
          </div>
        </div>

        {/* Ngôn ngữ hiển thị */}
        <div className="flex flex-col gap-2">
          <span className="font-telemetry-sm text-telemetry-sm text-on-surface font-semibold flex items-center gap-1.5">
            <Languages className="w-4 h-4 text-primary" aria-hidden="true" />
            <span>{ts.languageTitle}</span>
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              aria-pressed={language === "vi"}
              onClick={() => setLanguage("vi")}
              className={`py-2 px-3 rounded-lg border font-telemetry-sm text-telemetry-sm font-semibold flex items-center justify-center transition-all cursor-pointer ${
                language === "vi"
                  ? "bg-primary/15 border-primary text-primary"
                  : "bg-surface-container-high/50 border-outline-variant/50 text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span>{ts.languageVi}</span>
            </button>

            <button
              type="button"
              aria-pressed={language === "en"}
              onClick={() => setLanguage("en")}
              className={`py-2 px-3 rounded-lg border font-telemetry-sm text-telemetry-sm font-semibold flex items-center justify-center transition-all cursor-pointer ${
                language === "en"
                  ? "bg-primary/15 border-primary text-primary"
                  : "bg-surface-container-high/50 border-outline-variant/50 text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span>{ts.languageEn}</span>
            </button>
          </div>
        </div>

        {/* Chế độ hiển thị lớp học */}
        <div className="flex flex-col gap-2">
          <span className="font-telemetry-sm text-telemetry-sm text-on-surface font-semibold">
            {ts.themeTitle}
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setThemeMode("dark")}
              className={`py-2 px-3 rounded-lg border font-telemetry-sm text-telemetry-sm font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                themeMode === "dark"
                  ? "bg-primary/15 border-primary text-primary"
                  : "bg-surface-container-high/50 border-outline-variant/50 text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <Moon className="w-4 h-4" aria-hidden="true" />
              <span>{ts.themeDark}</span>
            </button>

            <button
              type="button"
              onClick={() => setThemeMode("daylight")}
              className={`py-2 px-3 rounded-lg border font-telemetry-sm text-telemetry-sm font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                themeMode === "daylight"
                  ? "bg-primary/15 border-primary text-primary"
                  : "bg-surface-container-high/50 border-outline-variant/50 text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <Sun className="w-4 h-4" aria-hidden="true" />
              <span>{ts.themeDaylight}</span>
            </button>
          </div>
        </div>

        {/* Âm thanh phản hồi */}
        <div className="flex items-center justify-between bg-surface-container-high/50 border border-outline-variant/50 rounded-lg p-3">
          <div className="flex items-center gap-2">
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-primary" aria-hidden="true" />
            ) : (
              <VolumeX className="w-4 h-4 text-outline" aria-hidden="true" />
            )}
            <span className="font-telemetry-sm text-telemetry-sm text-on-surface font-semibold">
              {ts.soundTitle}
            </span>
          </div>
          <button
            type="button"
            role="switch"
            aria-checked={soundEnabled}
            onClick={toggleSound}
            className={`px-3 py-1 rounded-full font-telemetry-sm text-telemetry-sm font-semibold transition-colors cursor-pointer ${
              soundEnabled
                ? "bg-tertiary/20 text-tertiary border border-tertiary/40"
                : "bg-surface-container-lowest text-outline border border-outline-variant"
            }`}
          >
            {soundEnabled ? ts.soundOn : ts.soundOff}
          </button>
        </div>

        <button
          type="button"
          onClick={closeModal}
          className="w-full py-2.5 rounded-lg bg-primary hover:bg-primary-fixed text-on-primary font-telemetry-sm text-telemetry-sm font-bold transition-colors cursor-pointer"
        >
          {ts.doneBtn}
        </button>
      </div>
    </div>
  );
}
