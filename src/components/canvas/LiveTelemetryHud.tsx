"use client";

import { AlertTriangle } from "lucide-react";
import { MathFormula } from "@/components/ui/MathFormula";
import { useSimulationStore } from "@/store/useSimulationStore";

/**
 * Thẻ trạng thái góc dưới trái sân bay:
 * - Bước 1–3: Cảnh báo động hướng gió ngang đẩy máy bay lệch trái/phải.
 * - Bước 4–6: HUD cân bằng vectơ kèm công thức KaTeX v_R = v_A + v_W.
 */
export function LiveTelemetryHud() {
  const currentStep = useSimulationStore((s) => s.currentStep);
  const telemetry = useSimulationStore((s) => s.telemetry);
  const windDirection = useSimulationStore((s) => s.windDirection);
  const toleranceDeg = useSimulationStore((s) => s.toleranceDeg);

  const absDriftDeg = Math.abs(telemetry.driftAngleDeg);
  const isAligned = absDriftDeg <= toleranceDeg;
  const absMeters = Math.abs(telemetry.lateralDriftMeters);

  if (currentStep <= 3) {
    const dynamicWindNotice =
      windDirection === "rtl"
        ? "Gió ngang đang đẩy máy bay lệch sang trái."
        : "Gió ngang đang đẩy máy bay lệch sang phải.";

    return (
      <div
        id="live-telemetry-hud"
        className="absolute bottom-2.5 left-8 max-w-[364px] z-10 flex items-center gap-space-sm bg-surface-container-low/95 backdrop-blur-md px-space-md py-1.5 rounded-full shadow-[var(--hud-card-shadow)] border border-outline-variant/60"
      >
        <div
          className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${
            isAligned
              ? "bg-tertiary/20 text-tertiary"
              : "bg-secondary/20 text-secondary"
          }`}
        >
          <AlertTriangle
            className="w-4 h-4 animate-pulse"
            aria-hidden="true"
          />
        </div>
        <div className="flex flex-wrap items-center gap-x-1 font-telemetry-sm text-telemetry-sm leading-tight">
          <span
            className={`font-bold ${isAligned ? "text-tertiary" : "text-secondary"}`}
          >
            {isAligned ? "CHUẨN TRỤC:" : "CẢNH BÁO:"}
          </span>
          <span className="text-on-surface">
            {isAligned
              ? "Quỹ đạo máy bay trùng với tim đường băng 36L."
              : `${dynamicWindNotice} (Lệch ${absMeters}m)`}
          </span>
        </div>
      </div>
    );
  }

  const hdgSign = telemetry.headingOffsetDeg >= 0 ? "+" : "";
  const driftSign = telemetry.driftAngleDeg >= 0 ? "+" : "";
  const windDirLabel = windDirection === "rtl" ? "Phải → Trái" : "Trái → Phải";

  return (
    <div
      id="live-telemetry-hud"
      className="absolute bottom-3 left-8 z-10 flex flex-col gap-1.5 bg-surface-container-low/95 backdrop-blur-md p-3 rounded-xl shadow-[var(--hud-card-shadow)] border border-outline-variant/60 max-w-[364px]"
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-1.5">
          <span
            className={`w-2 h-2 rounded-full animate-pulse ${
              isAligned
                ? "bg-tertiary shadow-[0_0_8px_rgba(86,229,169,0.9)]"
                : "bg-secondary shadow-[0_0_8px_rgba(255,198,64,0.9)]"
            }`}
          />
          <span className="font-label-caps text-label-caps text-on-surface uppercase tracking-wider">
            CÂN BẰNG VECTƠ
          </span>
        </div>
        <span
          className={`font-telemetry-sm text-telemetry-sm font-bold px-1.5 py-0.5 rounded bg-surface-container-high border ${
            isAligned
              ? "text-tertiary border-tertiary/40"
              : "text-error border-error/40"
          }`}
        >
          {isAligned ? "KHÓA ĐƯỜNG BĂNG" : "LỆCH TIM ĐƯỜNG BĂNG"}
        </span>
      </div>

      <div className="bg-surface-container-lowest/80 px-2.5 py-1.5 rounded-md flex items-center justify-between gap-2">
        <span className="font-label-caps text-label-caps text-on-surface-variant">
          CÔNG THỨC VECTƠ:
        </span>
        <MathFormula
          tex="\vec{v}_R = \vec{v}_A + \vec{v}_W"
          className="font-telemetry-sm text-telemetry-sm text-tertiary font-bold"
        />
      </div>

      <div className="grid grid-cols-2 gap-1.5">
        <div className="bg-surface-container-high/60 px-2 py-1 rounded flex flex-col">
          <span className="font-label-caps text-label-caps text-secondary flex items-center gap-1">
            <span>MŨI MÁY BAY</span>
            <MathFormula tex="\vec{v}_A" />
          </span>
          <span className="font-telemetry-sm text-telemetry-sm text-on-surface font-semibold">
            {`${hdgSign}${telemetry.headingOffsetDeg.toFixed(1)}° (${telemetry.compassHeadingDeg
              .toFixed(0)
              .padStart(3, "0")}°)`}
          </span>
        </div>

        <div className="bg-surface-container-high/60 px-2 py-1 rounded flex flex-col">
          <span className="font-label-caps text-label-caps text-primary flex items-center gap-1">
            <span>GIÓ NGANG</span>
            <MathFormula tex="\vec{v}_W" />
          </span>
          <span className="font-telemetry-sm text-telemetry-sm text-on-surface font-semibold">
            {`${telemetry.windSpeedKts} KT (${windDirLabel})`}
          </span>
        </div>

        <div className="bg-surface-container-high/60 px-2 py-1 rounded flex flex-col">
          <span className="font-label-caps text-label-caps text-tertiary flex items-center gap-1">
            <span>QUỸ ĐẠO</span>
            <MathFormula tex="\vec{v}_R" />
          </span>
          <span
            className={`font-telemetry-sm text-telemetry-sm font-semibold ${
              isAligned ? "text-tertiary" : "text-error"
            }`}
          >
            {`${driftSign}${telemetry.driftAngleDeg.toFixed(1)}° (${
              isAligned ? "Chuẩn trục" : "Đang lệch"
            })`}
          </span>
        </div>

        <div className="bg-surface-container-high/60 px-2 py-1 rounded flex flex-col">
          <span className="font-label-caps text-label-caps text-outline">
            TRẠNG THÁI
          </span>
          <span
            className={`font-telemetry-sm text-telemetry-sm font-bold flex items-center gap-1 ${
              isAligned ? "text-tertiary" : "text-secondary"
            }`}
          >
            <span
              className={`w-1.5 h-1.5 rounded-full ${
                isAligned ? "bg-tertiary" : "bg-secondary"
              }`}
            />
            <span>{isAligned ? "TRÙNG TIM ĐB" : "CẦN CHỈNH HƯỚNG"}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
