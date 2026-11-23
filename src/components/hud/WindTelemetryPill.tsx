"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { MathFormula } from "@/components/ui/MathFormula";
import type { WindStrength } from "@/domain/types";
import { useSimulationStore } from "@/store/useSimulationStore";

const STRENGTH_BUTTONS: readonly {
  readonly id: WindStrength;
  readonly label: string;
  readonly activeLabel: string;
}[] = [
    { id: "light", label: "Nhẹ", activeLabel: "Nhẹ (15 KT)" },
    { id: "moderate", label: "Vừa", activeLabel: "Vừa (25 KT)" },
    { id: "strong", label: "Mạnh", activeLabel: "Mạnh (40 KT)" },
  ];

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
  const setWindDirection = useSimulationStore((s) => s.setWindDirection);
  const setWindStrength = useSimulationStore((s) => s.setWindStrength);
  const adjustWindSpeed = useSimulationStore((s) => s.adjustWindSpeed);

  const isAligned = Math.abs(telemetry.driftAngleDeg) <= toleranceDeg;
  const driftDirectionLabel = isAligned
    ? "Trùng trục đường băng"
    : telemetry.driftAngleDeg < 0
      ? "Lệch sang trái"
      : "Lệch sang phải";

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
            ĐIỀU KHIỂN GIÓ NGANG
          </span>
        </div>
        <span className="font-telemetry-sm text-telemetry-sm text-primary bg-surface-container-high px-space-xs py-[2px] rounded">
          HỆ THỐNG 01
        </span>
      </div>

      {/* Hướng Gió ngang */}
      <div className="flex flex-col gap-space-xs">
        <div className="flex justify-between items-center">
          <span className="font-telemetry-sm text-telemetry-sm text-on-surface-variant">
            HƯỚNG GIÓ NGANG
          </span>
          <span className="font-telemetry-sm text-telemetry-sm text-primary font-semibold">
            {windDirection === "rtl" ? "090° ĐÔNG" : "270° TÂY"}
          </span>
        </div>
        <div className="grid grid-cols-2 p-1 bg-surface-container-lowest/90 rounded-full">
          <button
            id="btn-wind-rtl"
            type="button"
            onClick={() => setWindDirection("rtl")}
            aria-pressed={windDirection === "rtl"}
            className={`py-1 px-3 rounded-full font-telemetry-sm text-telemetry-sm whitespace-nowrap transition-all flex items-center justify-center gap-1 cursor-pointer ${windDirection === "rtl"
                ? "bg-primary-container text-on-primary-container font-semibold shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                : "text-on-surface-variant hover:text-on-surface"
              }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Phải → Trái</span>
          </button>

          <button
            id="btn-wind-ltr"
            type="button"
            onClick={() => setWindDirection("ltr")}
            aria-pressed={windDirection === "ltr"}
            className={`py-1 px-3 rounded-full font-telemetry-sm text-telemetry-sm whitespace-nowrap transition-all flex items-center justify-center gap-1 cursor-pointer ${windDirection === "ltr"
                ? "bg-primary-container text-on-primary-container font-semibold shadow-[0_0_12px_rgba(56,189,248,0.4)]"
                : "text-on-surface-variant hover:text-on-surface"
              }`}
          >
            <span>Trái → Phải</span>
            <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Cường độ gió */}
      <div className="flex flex-col gap-space-xs">
        <div className="flex justify-between items-center gap-2">
          <span className="font-telemetry-sm text-telemetry-sm text-on-surface-variant">
            CƯỜNG ĐỘ GIÓ
          </span>
          <div className="flex items-center gap-1.5">
            <button
              type="button"
              aria-label="Giảm tốc độ gió 5 KT"
              title="Giảm 5 KT"
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
              aria-label="Tăng tốc độ gió 5 KT"
              title="Tăng 5 KT"
              disabled={telemetry.windSpeedKts >= 50}
              onClick={() => adjustWindSpeed(5)}
              className="px-2 py-0.5 rounded bg-surface-container-high hover:bg-primary-container hover:text-on-primary-container disabled:opacity-35 disabled:pointer-events-none font-telemetry-sm text-telemetry-sm font-bold text-on-surface border border-outline-variant/60 transition-colors cursor-pointer"
            >
              +5
            </button>
          </div>
        </div>
        <div className="grid grid-cols-3 p-1 bg-surface-container-lowest/90 rounded-full">
          {STRENGTH_BUTTONS.map((btn) => {
            const active = windStrength === btn.id;
            return (
              <button
                key={btn.id}
                type="button"
                aria-pressed={active}
                onClick={() => setWindStrength(btn.id)}
                className={`py-1 rounded-full font-telemetry-sm text-telemetry-sm whitespace-nowrap text-center transition-all cursor-pointer ${active
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
            <span>MÁY BAY</span>
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
            {`Hướng mũi: ${telemetry.compassHeadingDeg.toFixed(1)}°`}
          </span>
        </div>

        <div className="flex flex-col bg-surface-container-low/70 p-2 rounded">
          <span className="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-1 whitespace-nowrap tracking-tight">
            <span>GIÓ NGANG</span>
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
            {windDirection === "rtl" ? "Phải → Trái" : "Trái → Phải"}
          </span>
        </div>

        <div className="flex flex-col bg-surface-container-low/70 p-2 rounded">
          <span className="font-label-caps text-label-caps text-on-surface-variant whitespace-nowrap tracking-tight">
            GÓC LỆCH (θ)
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span
              className={`font-telemetry-lg text-telemetry-lg ${blindMode ? "text-secondary" : isAligned ? "text-tertiary" : "text-error"
                }`}
            >
              {blindMode
                ? "??.?°"
                : `${telemetry.driftAngleDeg > 0 ? "+" : ""}${telemetry.driftAngleDeg.toFixed(1)}°`}
            </span>
          </div>
          <span
            className={`font-telemetry-sm text-telemetry-sm ${blindMode ? "text-secondary" : isAligned ? "text-tertiary" : "text-error"
              }`}
          >
            {blindMode ? "Tự tính toán" : driftDirectionLabel}
          </span>
        </div>

        <div className="flex flex-col bg-surface-container-low/70 p-2 rounded">
          <span className="font-label-caps text-label-caps text-on-surface-variant flex items-center gap-1 whitespace-nowrap tracking-tight">
            <span>QUỸ ĐẠO</span>
            <MathFormula tex="\vec{v}_R" className="text-tertiary" />
          </span>
          <div className="flex items-baseline gap-1 mt-0.5">
            <span className="font-telemetry-lg text-telemetry-lg text-tertiary">
              {blindMode ? "???.?°" : `${telemetry.groundTrackDeg.toFixed(1)}°`}
            </span>
          </div>
          <span className="font-telemetry-sm text-telemetry-sm text-tertiary">
            {blindMode
              ? "Đang giấu đáp án"
              : isAligned
                ? "ĐB 36L Chuẩn trục"
                : "ĐB 36L Lệch trục"}
          </span>
        </div>
      </div>

      {/* Công thức tổng hợp KaTeX */}
      <div className="flex items-center justify-between bg-surface-container-lowest/80 px-space-sm py-1.5 rounded-md">
        <span className="font-label-caps text-label-caps text-on-surface-variant">
          {telemetry.operationMode === "subtract" ? "TRỪ VECTƠ:" : "CỘNG VECTƠ:"}
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
