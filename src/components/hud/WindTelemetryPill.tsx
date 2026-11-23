"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { MathFormula } from "@/components/ui/MathFormula";
import type { WindStrength } from "@/domain/types";
import { getTranslations } from "@/lib/i18n";
import { useSimulationStore } from "@/store/useSimulationStore";

/**
 * Bảng điều khiển Gió ngang & Thông số Vectơ góc trên trái.
 * Giữ nguyên ký hiệu toán học v_A, v_W, v_R, θ và công thức KaTeX.
 */
export function WindTelemetryPill() {
  const windDirection = useSimulationStore((s) => s.windDirection);
  const windStrength = useSimulationStore((s) => s.windStrength);
  const telemetry = useSimulationStore((s) => s.telemetry);
  const toleranceDeg = useSimulationStore((s) => s.toleranceDeg);
  const blindMode = useSimulationStore((s) => s.blindMode);
  const language = useSimulationStore((s) => s.language);
  const setWindDirection = useSimulationStore((s) => s.setWindDirection);
  const setWindStrength = useSimulationStore((s) => s.setWindStrength);
  const adjustWindSpeed = useSimulationStore((s) => s.adjustWindSpeed);

  const t = getTranslations(language).windPill;

  const strengthButtons: readonly {
    readonly id: WindStrength;
    readonly label: string;
    readonly activeLabel: string;
  }[] = [
    { id: "light", label: t.light, activeLabel: t.lightActive },
    { id: "moderate", label: t.moderate, activeLabel: t.moderateActive },
    { id: "strong", label: t.strong, activeLabel: t.strongActive },
  ];

  const isAligned = Math.abs(telemetry.driftAngleDeg) <= toleranceDeg;
  const driftDirectionLabel = isAligned
    ? t.alignedWithRunway
    : telemetry.driftAngleDeg < 0
      ? t.driftingLeft
      : t.driftingRight;

  return (
    <div className="absolute top-4 left-8 w-[364px] z-10 bg-surface-container-low/95 backdrop-blur-md p-3.5 rounded-xl shadow-[var(--hud-card-shadow)] border border-outline-variant/60 flex flex-col gap-2.5">
      {/* Tiêu đề thẻ */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-space-xs">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary-container opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-primary" />
          </span>
          <span className="font-label-caps text-label-caps text-on-surface uppercase tracking-wider">
            {t.header}
          </span>
        </div>
        <span className="font-telemetry-sm text-telemetry-sm text-primary bg-surface-container-high px-space-xs py-[2px] rounded">
          {t.systemBadge}
        </span>
      </div>

      {/* Hướng Gió ngang */}
      <div className="flex flex-col gap-space-xs">
        <div className="flex justify-between items-center">
          <span className="font-telemetry-sm text-telemetry-sm text-on-surface-variant">
            {t.directionLabel}
          </span>
          <span className="font-telemetry-sm text-telemetry-sm text-primary font-semibold">
            {windDirection === "rtl" ? t.east090 : t.west270}
          </span>
        </div>
        <div className="grid grid-cols-2 p-1 bg-surface-container-lowest/90 rounded-full">
          <button
            id="btn-wind-rtl"
            type="button"
            onClick={() => setWindDirection("rtl")}
            aria-pressed={windDirection === "rtl"}
            className={`py-1 px-3 rounded-full font-telemetry-sm text-telemetry-sm whitespace-nowrap transition-all flex items-center justify-center gap-1 cursor-pointer ${
              windDirection === "rtl"
                ? "bg-primary-container text-on-primary-container font-semibold shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>{t.rtlArrow}</span>
          </button>

          <button
            id="btn-wind-ltr"
            type="button"
            onClick={() => setWindDirection("ltr")}
            aria-pressed={windDirection === "ltr"}
            className={`py-1 px-3 rounded-full font-telemetry-sm text-telemetry-sm whitespace-nowrap transition-all flex items-center justify-center gap-1 cursor-pointer ${
              windDirection === "ltr"
                ? "bg-primary-container text-on-primary-container font-semibold shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span>{t.ltrArrow}</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Cường độ gió */}
      <div className="flex flex-col gap-space-xs">
        <div className="flex justify-between items-center gap-2">
          <span className="font-telemetry-sm text-telemetry-sm text-on-surface-variant">
            {t.strengthLabel}
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label={t.dec5Aria}
              title={t.dec5Title}
              disabled={telemetry.windSpeedKts <= 5}
              onClick={() => adjustWindSpeed(-5)}
              className="px-2 py-0.5 rounded bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container disabled:opacity-35 disabled:pointer-events-none font-telemetry-sm text-telemetry-sm font-bold text-on-surface border border-outline-variant/60 transition-colors cursor-pointer"
            >
              -5
            </button>
            <span
              id="wind-speed-label"
              className="font-telemetry-sm text-telemetry-sm text-secondary font-bold min-w-[46px] text-center"
            >
              {`${telemetry.windSpeedKts} KT`}
            </span>
            <button
              type="button"
              aria-label={t.inc5Aria}
              title={t.inc5Title}
              disabled={telemetry.windSpeedKts >= 50}
              onClick={() => adjustWindSpeed(5)}
              className="px-2 py-0.5 rounded bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container disabled:opacity-35 disabled:pointer-events-none font-telemetry-sm text-telemetry-sm font-bold text-on-surface border border-outline-variant/60 transition-colors cursor-pointer"
            >
              +5
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 p-1 bg-surface-container-lowest/90 rounded-full">
          {strengthButtons.map((btn) => {
            const active = windStrength === btn.id;
            return (
              <button
                key={btn.id}
                type="button"
                aria-pressed={active}
                onClick={() => setWindStrength(btn.id)}
                className={`py-1 rounded-full font-telemetry-sm text-telemetry-sm whitespace-nowrap text-center transition-all cursor-pointer ${
                  active
                    ? "bg-primary-container text-on-primary-container font-semibold shadow-[0_0_10px_rgba(56,189,248,0.35)]"
                    : "text-on-surface-variant hover:text-on-surface"
                }`}
              >
                {active ? btn.activeLabel : btn.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Ma trận 2x2 Thông số Vectơ */}
      <div className="grid grid-cols-2 gap-1.5 bg-surface-container-highest/40 p-2 rounded-lg">
        <div className="flex flex-col bg-surface-container-low/70 p-2 rounded">
          <span className="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-1 whitespace-nowrap tracking-tight">
            <span>{t.aircraftCardLabel}</span>
            <MathFormula tex="\vec{v}_A" className="text-secondary" />
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="font-telemetry-lg text-telemetry-lg text-secondary">
              {telemetry.airspeedKts}
            </span>
            <span className="font-telemetry-sm text-telemetry-sm text-outline">
              KT
            </span>
          </div>
          <span className="font-telemetry-sm text-telemetry-sm text-on-surface-variant">
            {`${t.headingPrefix} ${telemetry.compassHeadingDeg.toFixed(1)}°`}
          </span>
        </div>

        <div className="flex flex-col bg-surface-container-low/70 p-2 rounded">
          <span className="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-1 whitespace-nowrap tracking-tight">
            <span>{t.windCardLabel}</span>
            <MathFormula tex="\vec{v}_W" className="text-primary" />
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="font-telemetry-lg text-telemetry-lg text-primary">
              {telemetry.windSpeedKts}
            </span>
            <span className="font-telemetry-sm text-telemetry-sm text-outline">
              KT
            </span>
          </div>
          <span className="font-telemetry-sm text-telemetry-sm text-primary">
            {windDirection === "rtl" ? t.rtlArrow : t.ltrArrow}
          </span>
        </div>

        <div className="flex flex-col bg-surface-container-low/70 p-2 rounded">
          <span className="font-label-caps text-label-caps text-on-surface-variant whitespace-nowrap tracking-tight">
            {t.driftCardLabel}
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span
              className={`font-telemetry-lg text-telemetry-lg ${
                blindMode
                  ? "text-secondary"
                  : isAligned
                    ? "text-tertiary"
                    : "text-error"
              }`}
            >
              {blindMode
                ? "??.?°"
                : `${telemetry.driftAngleDeg > 0 ? "+" : ""}${telemetry.driftAngleDeg.toFixed(1)}°`}
            </span>
          </div>
          <span
            className={`font-telemetry-sm text-telemetry-sm ${
              blindMode
                ? "text-secondary"
                : isAligned
                  ? "text-tertiary"
                  : "text-error"
            }`}
          >
            {blindMode ? t.calculateManually : driftDirectionLabel}
          </span>
        </div>

        <div className="flex flex-col bg-surface-container-low/70 p-2 rounded">
          <span className="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-1 whitespace-nowrap tracking-tight">
            <span>{t.trackCardLabel}</span>
            <MathFormula tex="\vec{v}_R" className="text-tertiary" />
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="font-telemetry-lg text-telemetry-lg text-tertiary">
              {blindMode ? "???.?°" : `${telemetry.groundTrackDeg.toFixed(1)}°`}
            </span>
          </div>
          <span className="font-telemetry-sm text-telemetry-sm text-tertiary">
            {blindMode
              ? t.answerHidden
              : isAligned
                ? t.rwyAligned
                : t.rwyOffAxis}
          </span>
        </div>
      </div>

      {/* Công thức tổng hợp KaTeX */}
      <div className="flex items-center justify-between bg-surface-container-lowest/80 px-space-sm py-1.5 rounded-md">
        <span className="font-label-caps text-label-caps text-on-surface-variant">
          {telemetry.operationMode === "subtract"
            ? t.vectorSubLabel
            : t.vectorAddLabel}
        </span>
        <MathFormula
          tex={
            telemetry.operationMode === "subtract"
              ? "\\vec{v}_A = \\vec{v}_R - \\vec{v}_W"
              : "\\vec{v}_R = \\vec{v}_A + \\vec{v}_W"
          }
          className="font-telemetry-sm text-telemetry-sm text-primary font-bold"
        />
      </div>
    </div>
  );
}
