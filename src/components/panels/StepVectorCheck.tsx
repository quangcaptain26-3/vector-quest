"use client";

import { useEffect, useRef } from "react";
import {
  AlertTriangle,
  ArrowRight,
  BadgeCheck,
  CheckCircle2,
  Compass,
  Eye,
  PlaneTakeoff,
  RotateCcw,
} from "lucide-react";
import { MathFormula } from "@/components/ui/MathFormula";
import { MAX_HEADING_OFFSET_DEG, MIN_HEADING_OFFSET_DEG } from "@/config/simulation";
import { MISSION_STEPS, STEP5_OUTCOMES } from "@/domain/missionContent";
import { useSimulationStore } from "@/store/useSimulationStore";

const HEADING_STEP_BUTTONS: readonly { readonly label: string; readonly delta: number }[] = [
  { label: "-5°", delta: -5 },
  { label: "-1°", delta: -1 },
  { label: "-0.5°", delta: -0.5 },
  { label: "+0.5°", delta: 0.5 },
  { label: "+1°", delta: 1 },
  { label: "+5°", delta: 5 },
];

/**
 * Bước 4 & 5: Phòng thí nghiệm vectơ & Kiểm tra hạ cánh.
 * Không tự động reset góc máy bay khi HẠ CÁNH CHƯA ĐẠT.
 */
export function StepVectorCheck() {
  const currentStep = useSimulationStore((s) => s.currentStep);
  const windDirection = useSimulationStore((s) => s.windDirection);
  const telemetry = useSimulationStore((s) => s.telemetry);
  const landingResult = useSimulationStore((s) => s.landingResult);
  const toleranceDeg = useSimulationStore((s) => s.toleranceDeg);
  const guideVisible = useSimulationStore((s) => s.guideVisible);
  const blindMode = useSimulationStore((s) => s.blindMode);

  const setAircraftHeading = useSimulationStore((s) => s.setAircraftHeading);
  const toggleBlindMode = useSimulationStore((s) => s.toggleBlindMode);
  const adjustAircraftHeading = useSimulationStore(
    (s) => s.adjustAircraftHeading
  );
  const applyIdealCrabHeading = useSimulationStore(
    (s) => s.applyIdealCrabHeading
  );
  const watchFlight = useSimulationStore((s) => s.watchFlight);
  const checkLanding = useSimulationStore((s) => s.checkLanding);
  const setStep = useSimulationStore((s) => s.setStep);

  const holdTimeoutRef = useRef<number | null>(null);
  const holdIntervalRef = useRef<number | null>(null);

  const stopHoldRepeat = () => {
    if (holdTimeoutRef.current !== null) {
      window.clearTimeout(holdTimeoutRef.current);
      holdTimeoutRef.current = null;
    }
    if (holdIntervalRef.current !== null) {
      window.clearInterval(holdIntervalRef.current);
      holdIntervalRef.current = null;
    }
  };

  useEffect(() => stopHoldRepeat, []);

  const startHoldRepeat = (deltaDeg: number) => {
    stopHoldRepeat();
    adjustAircraftHeading(deltaDeg);
    holdTimeoutRef.current = window.setTimeout(() => {
      holdIntervalRef.current = window.setInterval(() => {
        adjustAircraftHeading(deltaDeg);
      }, 95);
    }, 340);
  };

  const isStep5 = currentStep === 5;
  const copy = isStep5 ? MISSION_STEPS[5] : MISSION_STEPS[4];
  const isSuccess = landingResult?.success ?? false;

  const counterKts = Math.round(telemetry.vA.x);
  const windKtsSigned = Math.round(telemetry.vW.x);
  const netLateralKts = Math.round(telemetry.lateralNetKts * 10) / 10;
  const absDriftDeg = Math.abs(telemetry.driftAngleDeg);
  const isWithinTolerance = absDriftDeg <= toleranceDeg;
  const idealSign = telemetry.idealCrabAngleDeg >= 0 ? "+" : "";

  return (
    <div className="flex flex-col gap-space-sm">
      {/* Nhãn bước */}
      <div className="flex items-center justify-between">
        <div
          className={`flex items-center gap-1.5 px-space-sm py-1 rounded-full border ${
            isStep5 && !isSuccess
              ? "bg-error-container/30 border-error/40"
              : "bg-tertiary/15 border-tertiary/30"
          }`}
        >
          <span
            className={`w-1.5 h-1.5 rounded-full animate-pulse ${
              isStep5 && !isSuccess
                ? "bg-error shadow-[0_0_8px_rgba(255,180,171,0.9)]"
                : "bg-tertiary shadow-[0_0_8px_rgba(86,229,169,0.9)]"
            }`}
          />
          <span
            className={`font-label-caps text-label-caps font-bold tracking-wider ${
              isStep5 && !isSuccess ? "text-error" : "text-tertiary"
            }`}
          >
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
        <p className="font-body-sm text-body-sm text-on-surface-variant leading-tight">
          {copy.subtitle.vi}
        </p>
      </div>

      {/* Thanh kéo + Cụm nút tinh chỉnh góc v_A (- / +) */}
      <div className="bg-surface-container-high/50 border border-outline-variant/60 rounded-xl p-2.5 flex flex-col gap-2">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-label-caps text-secondary uppercase flex items-center gap-1">
            <span>VẬN TỐC MÁY BAY</span>
            <MathFormula tex="\vec{v}_A" />
          </span>
          <span className="font-telemetry-sm text-telemetry-sm text-secondary font-bold">
            {`${telemetry.headingOffsetDeg >= 0 ? "+" : ""}${telemetry.headingOffsetDeg.toFixed(1)}° (Hướng ${telemetry.compassHeadingDeg
              .toFixed(0)
              .padStart(3, "0")}°)`}
          </span>
        </div>
        <input
          type="range"
          min={MIN_HEADING_OFFSET_DEG}
          max={MAX_HEADING_OFFSET_DEG}
          step={0.5}
          value={telemetry.headingOffsetDeg}
          aria-label="Điều chỉnh góc hướng mũi vectơ v_A"
          onChange={(e) => setAircraftHeading(Number(e.target.value))}
          className="w-full accent-[var(--vec-a)] cursor-pointer"
        />

        {/* Cụm nút tinh chỉnh chính xác (-5°, -1°, -0.5°, 0°, +0.5°, +1°, +5°) */}
        <div
          className="grid grid-cols-7 gap-1"
          role="group"
          aria-label="Nút tinh chỉnh góc mũi máy bay"
        >
          {HEADING_STEP_BUTTONS.slice(0, 3).map((btn) => (
            <button
              key={btn.label}
              type="button"
              aria-label={`Giảm góc mũi ${Math.abs(btn.delta)} độ`}
              onPointerDown={() => startHoldRepeat(btn.delta)}
              onPointerUp={stopHoldRepeat}
              onPointerLeave={stopHoldRepeat}
              onPointerCancel={stopHoldRepeat}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  adjustAircraftHeading(btn.delta);
                }
              }}
              className="min-h-[40px] px-1 rounded-lg bg-surface-container-lowest hover:bg-primary-container hover:text-on-primary-container border border-outline-variant/70 font-telemetry-sm text-telemetry-sm font-bold text-on-surface transition-colors cursor-pointer select-none"
            >
              {btn.label}
            </button>
          ))}

          <button
            type="button"
            aria-label="Đưa góc mũi về 0 độ thẳng"
            title="Về 0° (Thẳng)"
            onClick={() => setAircraftHeading(0)}
            className="min-h-[40px] px-1 rounded-lg bg-surface-container-highest hover:bg-secondary hover:text-on-secondary border border-outline-variant/80 font-telemetry-sm text-telemetry-sm font-bold text-on-surface transition-colors cursor-pointer select-none"
          >
            0°
          </button>

          {HEADING_STEP_BUTTONS.slice(3).map((btn) => (
            <button
              key={btn.label}
              type="button"
              aria-label={`Tăng góc mũi ${btn.delta} độ`}
              onPointerDown={() => startHoldRepeat(btn.delta)}
              onPointerUp={stopHoldRepeat}
              onPointerLeave={stopHoldRepeat}
              onPointerCancel={stopHoldRepeat}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  adjustAircraftHeading(btn.delta);
                }
              }}
              className="min-h-[40px] px-1 rounded-lg bg-surface-container-lowest hover:bg-primary-container hover:text-on-primary-container border border-outline-variant/70 font-telemetry-sm text-telemetry-sm font-bold text-on-surface transition-colors cursor-pointer select-none"
            >
              {btn.label}
            </button>
          ))}
        </div>

        {/* Chỉ báo độ lệch thời gian thực */}
        <div
          className={`px-2.5 py-1.5 rounded-lg border font-telemetry-sm text-telemetry-sm font-bold flex items-center justify-between gap-2 ${
            blindMode
              ? "bg-secondary/15 border-secondary/45 text-secondary"
              : isWithinTolerance
                ? "bg-tertiary/15 border-tertiary/45 text-tertiary"
                : "bg-surface-container-lowest/90 border-outline-variant/60 text-on-surface-variant"
          }`}
        >
          <span>
            {blindMode
              ? "Độ lệch quỹ đạo: ??.?°"
              : `Độ lệch quỹ đạo: ${absDriftDeg.toFixed(1)}°`}
          </span>
          <span>
            {blindMode
              ? "• Đang giấu số"
              : isWithinTolerance
                ? `• Đạt ngưỡng ±${toleranceDeg}°`
                : `• Ngưỡng đạt ±${toleranceDeg}°`}
          </span>
        </div>
      </div>

      {/* Khung kết quả Bước 5 */}
      {isStep5 && landingResult && (
        <div
          role="status"
          className={`rounded-xl p-3.5 flex flex-col gap-2 ${
            landingResult.success
              ? "bg-tertiary/10 border border-tertiary/40 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
              : "bg-error-container/25 border border-error/40 shadow-[0_0_20px_rgba(244,63,94,0.15)]"
          }`}
        >
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center gap-1.5">
              {landingResult.success ? (
                <CheckCircle2
                  className="w-5 h-5 text-tertiary shrink-0"
                  aria-hidden="true"
                />
              ) : (
                <AlertTriangle
                  className="w-5 h-5 text-error shrink-0"
                  aria-hidden="true"
                />
              )}
              <span
                className={`font-telemetry-sm text-telemetry-sm font-bold tracking-wider uppercase ${
                  landingResult.success ? "text-tertiary" : "text-error"
                }`}
              >
                {landingResult.success
                  ? STEP5_OUTCOMES.success.headline
                  : STEP5_OUTCOMES.failure.headline}
              </span>
            </div>
            <span
              className={`font-telemetry-sm text-telemetry-sm font-bold px-2 py-0.5 rounded-full border shrink-0 ${
                landingResult.success
                  ? "bg-tertiary/20 text-tertiary border-tertiary/40"
                  : "bg-error-container/50 text-error border-error/40"
              }`}
            >
              {landingResult.success
                ? STEP5_OUTCOMES.success.badge
                : `|Δθ| = ${landingResult.absDeltaDeg.toFixed(1)}°`}
            </span>
          </div>

          <div className="flex flex-col gap-1">
            <span className="font-label-caps text-label-caps text-on-surface tracking-wider font-bold uppercase">
              {landingResult.success
                ? STEP5_OUTCOMES.success.subheadline
                : STEP5_OUTCOMES.failure.subheadline}
            </span>
            <p className="font-body-sm text-body-sm text-on-surface leading-tight">
              {landingResult.success
                ? STEP5_OUTCOMES.success.vi
                : STEP5_OUTCOMES.failure.vi}
            </p>
          </div>
        </div>
      )}

      {/* Bảng phân tích thành phần vectơ */}
      <div className="bg-surface-container-high/60 border border-outline-variant/60 rounded-xl p-2.5 flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <span className="font-label-caps text-label-caps text-primary tracking-wider uppercase">
            PHÂN TÍCH THÀNH PHẦN VECTƠ
          </span>
          <span className="font-telemetry-sm text-telemetry-sm text-tertiary font-semibold">
            {blindMode
              ? "sin(θ) = ?"
              : `sin(${Math.abs(telemetry.headingOffsetDeg).toFixed(1)}°) ≈ ${Math.abs(
                  Math.sin((telemetry.headingOffsetDeg * Math.PI) / 180)
                ).toFixed(3)}`}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 text-center">
          <div className="bg-surface-container-lowest p-1.5 rounded">
            <span className="font-label-caps text-label-caps text-primary flex items-center justify-center gap-1">
              <span>GIÓ NGANG</span>
              <MathFormula tex="\vec{v}_W" />
            </span>
            <div className="font-telemetry-sm text-telemetry-sm text-primary font-bold mt-0.5">
              {`${windKtsSigned > 0 ? "+" : ""}${windKtsSigned} KT (${
                windDirection === "rtl" ? "Trái" : "Phải"
              })`}
            </div>
          </div>
          <div className="bg-surface-container-lowest p-1.5 rounded">
            <span className="font-label-caps text-label-caps text-secondary flex items-center justify-center gap-1">
              <span>THÀNH PHẦN BÙ</span>
              <MathFormula tex="v_{A_x}" />
            </span>
            <div className="font-telemetry-sm text-telemetry-sm text-secondary font-bold mt-0.5">
              {blindMode
                ? "?? KT"
                : `${counterKts >= 0 ? "+" : ""}${counterKts} KT`}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between px-2 text-center bg-surface-container-lowest/70 py-1 rounded">
          <span className="font-telemetry-sm text-telemetry-sm text-on-surface-variant">
            TỔNG THÀNH PHẦN NGANG:
          </span>
          <span
            className={`font-telemetry-sm text-telemetry-sm font-bold ${
              blindMode
                ? "text-secondary"
                : Math.abs(telemetry.driftAngleDeg) <= toleranceDeg
                  ? "text-tertiary"
                  : "text-error"
            }`}
          >
            {blindMode
              ? "?? KT (Tự tính)"
              : Math.abs(netLateralKts) < 0.5
                ? "0 KT (CÂN BẰNG)"
                : `${netLateralKts > 0 ? "+" : ""}${netLateralKts} KT (ĐANG LỆCH)`}
          </span>
        </div>
      </div>

      {blindMode && (
        <button
          type="button"
          onClick={toggleBlindMode}
          className="min-h-[40px] px-3 py-1.5 rounded-lg bg-secondary/20 hover:bg-secondary hover:text-on-secondary border border-secondary/50 text-secondary font-telemetry-sm text-telemetry-sm font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Eye className="w-4 h-4" aria-hidden="true" />
          <span>Mở đáp án số liệu</span>
        </button>
      )}

      {guideVisible && !blindMode && (
        <div className="flex flex-col gap-1.5">
          <p className="font-body-sm text-body-sm text-on-surface-variant italic px-1">
            {copy.guideNote.vi}
          </p>
          <button
            type="button"
            onClick={applyIdealCrabHeading}
            className="min-h-[40px] px-3 py-1.5 rounded-lg bg-tertiary/15 hover:bg-tertiary hover:text-on-tertiary border border-tertiary/40 text-tertiary font-telemetry-sm text-telemetry-sm font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <Compass className="w-4 h-4" aria-hidden="true" />
            <span>{`Gợi ý góc cân bằng (${idealSign}${telemetry.idealCrabAngleDeg.toFixed(1)}°)`}</span>
          </button>
        </div>
      )}

      {/* Các nút thao tác */}
      <div className="flex flex-col gap-space-xs pt-1">
        {isStep5 && isSuccess ? (
          <button
            type="button"
            onClick={() => setStep(6)}
            className="w-full min-h-[44px] py-2.5 px-space-md rounded-lg bg-primary hover:bg-primary-fixed text-on-primary font-headline-sm text-headline-sm font-bold text-center transition-all flex items-center justify-center gap-space-xs shadow-[0_0_24px_rgba(56,189,248,0.5)] cursor-pointer"
          >
            <span>XEM GIẢI THÍCH TOÁN HỌC</span>
            <ArrowRight className="w-5 h-5" aria-hidden="true" />
          </button>
        ) : (
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={watchFlight}
              className="min-h-[42px] py-2 px-2 rounded-lg bg-surface-container-highest hover:bg-surface-container-high text-on-surface font-telemetry-sm text-telemetry-sm font-semibold text-center transition-all flex items-center justify-center gap-1 border border-outline-variant/60 cursor-pointer"
            >
              <PlaneTakeoff
                className="w-4 h-4 text-primary"
                aria-hidden="true"
              />
              <span>Xem đường bay</span>
            </button>

            <button
              type="button"
              onClick={checkLanding}
              className="min-h-[42px] py-2 px-2 rounded-lg bg-primary hover:bg-primary-fixed text-on-primary font-telemetry-sm text-telemetry-sm font-bold text-center transition-all flex items-center justify-center gap-1 shadow-[0_0_20px_rgba(56,189,248,0.45)] cursor-pointer"
            >
              <BadgeCheck className="w-4 h-4" aria-hidden="true" />
              <span>Kiểm tra hạ cánh</span>
            </button>
          </div>
        )}

        <div className="flex items-center justify-between px-space-xs">
          <button
            type="button"
            onClick={() => setStep(4)}
            className="font-telemetry-sm text-telemetry-sm text-outline hover:text-primary transition-colors flex items-center gap-1 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Thử lại góc bay</span>
          </button>
          <MathFormula
            tex="|\Delta\theta| \le \varepsilon"
            className="font-telemetry-sm text-telemetry-sm text-outline"
          />
        </div>
      </div>
    </div>
  );
}
