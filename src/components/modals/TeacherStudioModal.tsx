"use client";

import { useEffect, useState } from "react";
import {
  BookmarkPlus,
  Check,
  Copy,
  EyeOff,
  GraduationCap,
  Monitor,
  Trash2,
  X,
} from "lucide-react";
import { MathFormula } from "@/components/ui/MathFormula";
import type {
  TvScaleMode,
  VectorOperationMode,
  WindDirection,
  WindStrength,
} from "@/domain/types";
import { SPECIAL_ANGLE_PRESETS } from "@/domain/vectorMath";
import { buildSimulationQueryString } from "@/lib/urlSync";
import { useSimulationStore } from "@/store/useSimulationStore";

const LOCAL_STORAGE_KEY = "vq_teacher_presets_v1";

interface SavedTeacherPreset {
  readonly id: string;
  readonly name: string;
  readonly windDirection: WindDirection;
  readonly windStrength: WindStrength;
  readonly operationMode: VectorOperationMode;
  readonly customAirspeedKts: number | null;
  readonly customWindSpeedKts: number | null;
  readonly runwayAngleDeg: number;
  readonly blindMode: boolean;
  readonly tvScale: TvScaleMode;
}

const TV_SCALE_OPTIONS: readonly {
  readonly id: TvScaleMode;
  readonly label: string;
}[] = [
  { id: "normal", label: "100% (Chuẩn)" },
  { id: "large", label: "115% (Lớn)" },
  { id: "xlarge", label: "125% (Rất lớn)" },
];

/**
 * Ngăn Tùy Biến Giáo Viên (Teacher Studio) — 100% Frontend (localStorage + URL Query Params).
 */
export function TeacherStudioModal() {
  const activeModal = useSimulationStore((s) => s.activeModal);
  const closeModal = useSimulationStore((s) => s.closeModal);

  const currentStep = useSimulationStore((s) => s.currentStep);
  const windDirection = useSimulationStore((s) => s.windDirection);
  const windStrength = useSimulationStore((s) => s.windStrength);
  const customAirspeedKts = useSimulationStore((s) => s.customAirspeedKts);
  const customWindSpeedKts = useSimulationStore((s) => s.customWindSpeedKts);
  const runwayAngleDeg = useSimulationStore((s) => s.runwayAngleDeg);
  const operationMode = useSimulationStore((s) => s.operationMode);
  const blindMode = useSimulationStore((s) => s.blindMode);
  const tvScale = useSimulationStore((s) => s.tvScale);
  const telemetry = useSimulationStore((s) => s.telemetry);

  const setOperationMode = useSimulationStore((s) => s.setOperationMode);
  const setCustomAirspeed = useSimulationStore((s) => s.setCustomAirspeed);
  const setCustomWindSpeed = useSimulationStore((s) => s.setCustomWindSpeed);
  const setRunwayAngle = useSimulationStore((s) => s.setRunwayAngle);
  const applySpecialPreset = useSimulationStore((s) => s.applySpecialPreset);
  const applyTeacherConfig = useSimulationStore((s) => s.applyTeacherConfig);
  const toggleBlindMode = useSimulationStore((s) => s.toggleBlindMode);
  const setTvScale = useSimulationStore((s) => s.setTvScale);

  const [presetName, setPresetName] = useState("");
  const [savedPresets, setSavedPresets] = useState<SavedTeacherPreset[]>(() => {
    if (typeof window === "undefined") return [];
    try {
      const raw = window.localStorage.getItem(LOCAL_STORAGE_KEY);
      return raw ? (JSON.parse(raw) as SavedTeacherPreset[]) : [];
    } catch {
      return [];
    }
  });
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      window.localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(savedPresets)
      );
    } catch {
      // Bỏ qua nếu trình duyệt chặn localStorage
    }
  }, [savedPresets]);

  if (activeModal !== "teacher") {
    return null;
  }

  const queryString = buildSimulationQueryString({
    windDirection,
    windStrength,
    currentStep,
    operationMode,
    customAirspeedKts,
    customWindSpeedKts,
    runwayAngleDeg,
    blindMode,
    tvScale,
  });

  const shareUrl =
    typeof window !== "undefined"
      ? `${window.location.origin}${window.location.pathname}${queryString}`
      : queryString;

  const handleSavePreset = () => {
    const trimmed = presetName.trim() || `Bài giảng Toán 10 (${telemetry.airspeedKts}/${telemetry.windSpeedKts})`;
    const nextItem: SavedTeacherPreset = {
      id: `${Date.now()}`,
      name: trimmed,
      windDirection,
      windStrength,
      operationMode,
      customAirspeedKts,
      customWindSpeedKts,
      runwayAngleDeg,
      blindMode,
      tvScale,
    };
    setSavedPresets((prev) => [nextItem, ...prev].slice(0, 8));
    setPresetName("");
  };

  const handleLoadPreset = (item: SavedTeacherPreset) => {
    applyTeacherConfig({
      windDirection: item.windDirection,
      windStrength: item.windStrength,
      operationMode: item.operationMode,
      customAirspeedKts: item.customAirspeedKts,
      customWindSpeedKts: item.customWindSpeedKts,
      runwayAngleDeg: item.runwayAngleDeg,
      blindMode: item.blindMode,
      tvScale: item.tvScale,
    });
  };

  const handleDeletePreset = (id: string) => {
    setSavedPresets((prev) => prev.filter((item) => item.id !== id));
  };

  const handleCopyShareUrl = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
    } catch {
      // Vẫn hiển thị xác nhận ngay cả khi clipboard bị chặn ở headless
    }
    setCopiedLink(true);
    window.setTimeout(() => setCopiedLink(false), 2200);
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="teacher-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/65 backdrop-blur-sm p-4"
      onClick={(e) => {
        if (e.target === e.currentTarget) closeModal();
      }}
    >
      <div className="w-full max-w-[660px] max-h-[90vh] overflow-y-auto bg-surface-container-low border border-outline-variant/70 rounded-2xl shadow-[0_24px_60px_rgba(0,0,0,0.65)] p-5 flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-outline-variant/50 pb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-primary/15 border border-primary/30 flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-primary" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">
                TEACHER STUDIO • TOÁN 10
              </span>
              <h2
                id="teacher-modal-title"
                className="font-headline-sm text-headline-sm text-on-surface font-bold"
              >
                Ngăn Tùy biến Giáo viên &amp; Ra đề Nhanh
              </h2>
            </div>
          </div>

          <button
            type="button"
            aria-label="Đóng Chế độ Giáo viên"
            onClick={closeModal}
            className="w-9 h-9 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* 1. Chọn chế độ Phép cộng / Phép trừ Vectơ */}
        <div className="flex flex-col gap-2">
          <span className="font-label-caps text-label-caps text-on-surface-variant uppercase">
            1. CHẾ ĐỘ PHÉP TOÁN VECTƠ
          </span>
          <div className="grid grid-cols-2 gap-2">
            <button
              type="button"
              onClick={() => setOperationMode("add")}
              aria-pressed={operationMode === "add"}
              className={`min-h-[44px] px-3 py-2 rounded-xl border flex flex-col items-start justify-center gap-0.5 transition-all cursor-pointer ${
                operationMode === "add"
                  ? "bg-primary/15 border-primary text-primary font-bold"
                  : "bg-surface-container-high/50 border-outline-variant/50 text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span className="font-telemetry-sm text-telemetry-sm font-bold">
                Phép cộng Vectơ
              </span>
              <MathFormula tex="\vec{v}_R = \vec{v}_A + \vec{v}_W" className="text-xs" />
            </button>

            <button
              type="button"
              onClick={() => setOperationMode("subtract")}
              aria-pressed={operationMode === "subtract"}
              className={`min-h-[44px] px-3 py-2 rounded-xl border flex flex-col items-start justify-center gap-0.5 transition-all cursor-pointer ${
                operationMode === "subtract"
                  ? "bg-secondary/15 border-secondary text-secondary font-bold"
                  : "bg-surface-container-high/50 border-outline-variant/50 text-on-surface-variant hover:text-on-surface"
              }`}
            >
              <span className="font-telemetry-sm text-telemetry-sm font-bold">
                Phép trừ Vectơ
              </span>
              <MathFormula tex="\vec{v}_A = \vec{v}_R - \vec{v}_W" className="text-xs" />
            </button>
          </div>
        </div>

        {/* 2. Bộ đề Số đẹp & Xoay Đường băng */}
        <div className="flex flex-col gap-2.5 bg-surface-container-high/45 border border-outline-variant/50 rounded-xl p-3">
          <span className="font-label-caps text-label-caps text-primary uppercase">
            2. BỘ ĐỀ SỐ ĐẸP TÍNH NHẨM &amp; ĐƯỜNG BĂNG NGHIÊNG
          </span>
          <div className="flex flex-wrap gap-1.5">
            {SPECIAL_ANGLE_PRESETS.map((preset) => {
              const isMatch =
                telemetry.airspeedKts === preset.airspeedKts &&
                Math.abs(telemetry.windSpeedKts - preset.windSpeedKts) < 0.2 &&
                runwayAngleDeg === preset.runwayAngleDeg;
              return (
                <button
                  key={preset.id}
                  type="button"
                  title={preset.description}
                  onClick={() => applySpecialPreset(preset.id)}
                  className={`min-h-[38px] px-3 py-1.5 rounded-lg border font-telemetry-sm text-telemetry-sm font-semibold transition-all cursor-pointer ${
                    isMatch
                      ? "bg-primary-container text-on-primary-container border-primary shadow-[0_0_12px_rgba(56,189,248,0.35)]"
                      : "bg-surface-container-lowest text-on-surface border-outline-variant/60 hover:border-primary/60"
                  }`}
                >
                  {preset.label}
                </button>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-2.5 pt-1">
            {/* |v_A| */}
            <div className="bg-surface-container-lowest/90 border border-outline-variant/50 rounded-lg p-2.5 flex flex-col gap-1">
              <div className="flex items-center justify-between font-telemetry-sm text-telemetry-sm">
                <span className="text-secondary font-bold flex items-center gap-1">
                  <span>Độ lớn</span>
                  <MathFormula tex="|\vec{v}_A|" />
                </span>
                <span className="text-on-surface font-bold">
                  {`${telemetry.airspeedKts} KT`}
                </span>
              </div>
              <input
                type="range"
                min={60}
                max={200}
                step={10}
                aria-label="Chỉnh độ lớn vận tốc máy bay"
                value={telemetry.airspeedKts}
                onChange={(e) => setCustomAirspeed(Number(e.target.value))}
                className="w-full accent-[var(--vec-a)] cursor-pointer"
              />
            </div>

            {/* |v_W| */}
            <div className="bg-surface-container-lowest/90 border border-outline-variant/50 rounded-lg p-2.5 flex flex-col gap-1">
              <div className="flex items-center justify-between font-telemetry-sm text-telemetry-sm">
                <span className="text-primary font-bold flex items-center gap-1">
                  <span>Độ lớn</span>
                  <MathFormula tex="|\vec{v}_W|" />
                </span>
                <span className="text-on-surface font-bold">
                  {`${telemetry.windSpeedKts} KT`}
                </span>
              </div>
              <input
                type="range"
                min={5}
                max={100}
                step={5}
                aria-label="Chỉnh độ lớn vận tốc gió"
                value={telemetry.windSpeedKts}
                onChange={(e) => setCustomWindSpeed(Number(e.target.value))}
                className="w-full accent-[var(--vec-w)] cursor-pointer"
              />
            </div>

            {/* Runway Angle */}
            <div className="bg-surface-container-lowest/90 border border-outline-variant/50 rounded-lg p-2.5 flex flex-col gap-1">
              <div className="flex items-center justify-between font-telemetry-sm text-telemetry-sm">
                <span className="text-tertiary font-bold">Góc đường băng</span>
                <span className="text-on-surface font-bold">
                  {`${runwayAngleDeg > 0 ? "+" : ""}${runwayAngleDeg}°`}
                </span>
              </div>
              <input
                type="range"
                min={-45}
                max={45}
                step={5}
                aria-label="Xoay góc đường băng từ -45 đến +45 độ"
                value={runwayAngleDeg}
                onChange={(e) => setRunwayAngle(Number(e.target.value))}
                className="w-full accent-[var(--vec-r-safe)] cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* 3. Blind Mode & TV Text Scale */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {/* Blind Classroom Mode */}
          <div className="flex items-center justify-between gap-2 bg-surface-container-high/50 border border-outline-variant/50 rounded-xl p-3">
            <div className="flex flex-col gap-0.5">
              <span className="font-telemetry-sm text-telemetry-sm text-on-surface font-bold flex items-center gap-1.5">
                <EyeOff className="w-4 h-4 text-secondary" aria-hidden="true" />
                <span>Chế độ Giấu số liệu</span>
              </span>
              <span className="font-body-sm text-body-sm text-on-surface-variant">
                Ẩn góc lệch &amp; v_R để học sinh tự tính
              </span>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={blindMode}
              aria-label="Chế độ giấu số liệu"
              onClick={toggleBlindMode}
              className={`w-11 h-6 rounded-full p-0.5 flex items-center transition-all shrink-0 cursor-pointer ${
                blindMode
                  ? "bg-secondary justify-end shadow-[0_0_10px_rgba(255,198,64,0.45)]"
                  : "bg-surface-container-lowest border border-outline-variant justify-start"
              }`}
            >
              <span
                className={`w-5 h-5 rounded-full block ${
                  blindMode ? "bg-surface-container-lowest" : "bg-outline"
                }`}
              />
            </button>
          </div>

          {/* TV Scale */}
          <div className="flex flex-col gap-1.5 bg-surface-container-high/50 border border-outline-variant/50 rounded-xl p-3">
            <span className="font-telemetry-sm text-telemetry-sm text-on-surface font-bold flex items-center gap-1.5">
              <Monitor className="w-4 h-4 text-primary" aria-hidden="true" />
              <span>Cỡ chữ TV / Máy chiếu</span>
            </span>
            <div className="grid grid-cols-3 gap-1.5">
              {TV_SCALE_OPTIONS.map((opt) => (
                <button
                  key={opt.id}
                  type="button"
                  aria-pressed={tvScale === opt.id}
                  onClick={() => setTvScale(opt.id)}
                  className={`min-h-[36px] px-1.5 py-1 rounded-lg font-telemetry-sm text-telemetry-sm font-semibold border transition-all cursor-pointer ${
                    tvScale === opt.id
                      ? "bg-primary-container text-on-primary-container border-primary"
                      : "bg-surface-container-lowest text-on-surface-variant border-outline-variant/60 hover:text-on-surface"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* 4. Lưu bộ đề (localStorage) & Sao chép Link bài giảng */}
        <div className="flex flex-col gap-2.5 bg-surface-container-lowest/80 border border-outline-variant/60 rounded-xl p-3">
          <span className="font-label-caps text-label-caps text-primary uppercase">
            3. LƯU BỘ ĐỀ CÁ NHÂN &amp; CHIA SẺ LINK BÀI GIẢNG
          </span>

          <div className="flex gap-2">
            <input
              type="text"
              value={presetName}
              onChange={(e) => setPresetName(e.target.value)}
              placeholder="Đặt tên bài giảng (VD: Tiết 12 - Góc 30 độ)..."
              aria-label="Tên bộ đề bài giảng"
              className="flex-1 min-h-[40px] px-3 rounded-lg bg-surface-container-high/70 border border-outline-variant/60 font-body-sm text-body-sm text-on-surface placeholder:text-outline focus:outline-none focus:border-primary"
            />
            <button
              type="button"
              onClick={handleSavePreset}
              className="min-h-[40px] px-3 rounded-lg bg-surface-container-highest hover:bg-primary-container hover:text-on-primary-container border border-outline-variant/70 font-telemetry-sm text-telemetry-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              <BookmarkPlus className="w-4 h-4" aria-hidden="true" />
              <span>Lưu bộ đề</span>
            </button>
          </div>

          {savedPresets.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {savedPresets.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center gap-1 bg-surface-container-high/70 border border-outline-variant/60 rounded-lg pl-2.5 pr-1 py-1"
                >
                  <button
                    type="button"
                    onClick={() => handleLoadPreset(item)}
                    className="font-telemetry-sm text-telemetry-sm text-on-surface hover:text-primary font-semibold cursor-pointer"
                  >
                    {item.name}
                  </button>
                  <button
                    type="button"
                    aria-label={`Xóa bộ đề ${item.name}`}
                    onClick={() => handleDeletePreset(item.id)}
                    className="p-1 text-outline hover:text-error cursor-pointer"
                  >
                    <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                  </button>
                </div>
              ))}
            </div>
          )}

          <div className="flex items-center gap-2 pt-1">
            <code
              id="teacher-share-url"
              className="flex-1 px-2.5 py-2 rounded-lg bg-surface-container-high/50 border border-outline-variant/50 font-telemetry-sm text-telemetry-sm text-on-surface-variant truncate"
            >
              {shareUrl}
            </code>
            <button
              type="button"
              onClick={handleCopyShareUrl}
              className="min-h-[40px] px-3.5 rounded-lg bg-primary hover:bg-primary-fixed text-on-primary font-telemetry-sm text-telemetry-sm font-bold flex items-center gap-1.5 transition-colors cursor-pointer shrink-0"
            >
              {copiedLink ? (
                <>
                  <Check className="w-4 h-4" aria-hidden="true" />
                  <span>Đã sao chép!</span>
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" aria-hidden="true" />
                  <span>Sao chép Link bài giảng</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
