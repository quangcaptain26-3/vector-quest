"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Eye,
  GraduationCap,
  HelpCircle,
  Maximize2,
  Minimize2,
  Moon,
  PenTool,
  PlaySquare,
  SlidersHorizontal,
  Sun,
  Volume2,
  VolumeX,
} from "lucide-react";
import { TOP_NAV_STAGES } from "@/domain/missionContent";
import type { MissionStep } from "@/domain/types";
import { devWarn } from "@/lib/logger";
import { useSimulationStore } from "@/store/useSimulationStore";

function isStageActive(stageId: string, currentStep: MissionStep): boolean {
  switch (stageId) {
    case "briefing":
      return currentStep === 1;
    case "predict":
      return currentStep === 2 || currentStep === 3;
    case "vector-lab":
      return currentStep === 4 || currentStep === 5;
    case "debrief":
      return currentStep === 6;
    default:
      return false;
  }
}

/**
 * Thanh điều hướng nổi phía trên khớp 100% thiết kế Aerospace HUD.
 */
export function TopPillBar() {
  const currentStep = useSimulationStore((s) => s.currentStep);
  const soundEnabled = useSimulationStore((s) => s.soundEnabled);
  const themeMode = useSimulationStore((s) => s.themeMode);
  const blindMode = useSimulationStore((s) => s.blindMode);
  const chalkEnabled = useSimulationStore((s) => s.chalkEnabled);
  const setStep = useSimulationStore((s) => s.setStep);
  const toggleSound = useSimulationStore((s) => s.toggleSound);
  const toggleThemeMode = useSimulationStore((s) => s.toggleThemeMode);
  const toggleBlindMode = useSimulationStore((s) => s.toggleBlindMode);
  const toggleChalk = useSimulationStore((s) => s.toggleChalk);
  const openModal = useSimulationStore((s) => s.openModal);

  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    const onFullscreenChange = () => {
      try {
        setIsFullscreen(Boolean(document.fullscreenElement));
      } catch {
        setIsFullscreen(false);
      }
    };
    document.addEventListener("fullscreenchange", onFullscreenChange);
    return () => {
      document.removeEventListener("fullscreenchange", onFullscreenChange);
    };
  }, []);

  const handleToggleFullscreen = async () => {
    try {
      if (!document.fullscreenElement) {
        await document.documentElement.requestFullscreen();
      } else {
        await document.exitFullscreen();
      }
    } catch (error) {
      devWarn("API Toàn màn hình không khả dụng hoặc bị chặn", {
        error: error instanceof Error ? error.message : String(error),
      });
    }
  };

  const soundLabel = soundEnabled ? "Âm thanh: Bật" : "Âm thanh: Tắt";

  return (
    <header className="fixed top-0 w-full z-50 pointer-events-none">
      <div className="h-20 w-full px-margin-desktop flex items-center justify-between gap-2 pointer-events-auto">
        {/* Biểu trưng & Tên ứng dụng */}
        <div className="flex items-center gap-space-sm bg-surface-container-low/95 backdrop-blur-xl px-space-md py-space-xs rounded-full shadow-[var(--hud-card-shadow)] border border-outline-variant/60 shrink-0">
          <Image
            src="/logo.svg"
            alt="Logo Nhiệm vụ Vectơ"
            width={36}
            height={36}
            className="w-9 h-9 rounded-lg shrink-0"
          />
          <div className="flex flex-col">
            <span className="font-label-caps text-label-caps text-primary tracking-widest">
              PHÉP CỘNG &amp; PHÉP TRỪ VECTƠ
            </span>
            <span className="font-headline-sm text-headline-sm text-on-surface uppercase whitespace-nowrap">
              NHIỆM VỤ VECTƠ • TOÁN 10
            </span>
          </div>
        </div>

        {/* Các tab giai đoạn ở giữa */}
        <nav
          aria-label="Các giai đoạn nhiệm vụ"
          className="hidden xl:flex items-center gap-1 bg-surface-container-low/95 backdrop-blur-xl p-space-xs rounded-full shadow-[var(--hud-card-shadow)] border border-outline-variant/60"
        >
          {TOP_NAV_STAGES.map((stage) => {
            const active = isStageActive(stage.id, currentStep);
            return (
              <button
                key={stage.id}
                type="button"
                aria-current={active ? "page" : undefined}
                onClick={() => setStep(stage.targetStep)}
                className={`px-space-md py-space-xs rounded-full font-telemetry-sm text-telemetry-sm whitespace-nowrap transition-colors cursor-pointer ${
                  active
                    ? "bg-primary-container text-on-primary-container font-semibold shadow-[0_0_16px_rgba(56,189,248,0.4)]"
                    : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
                }`}
              >
                {stage.label}
              </button>
            );
          })}
        </nav>

        {/* Cụm nút tiện ích bên phải */}
        <div className="flex items-center gap-space-xs bg-surface-container-low/95 backdrop-blur-xl p-space-xs rounded-full shadow-[var(--hud-card-shadow)] border border-outline-variant/60 shrink-0">
          {blindMode && (
            <button
              type="button"
              onClick={toggleBlindMode}
              title="Mở đáp án số liệu đang giấu"
              aria-label="Mở đáp án số liệu"
              className="h-8 px-2.5 rounded-full bg-secondary/20 border border-secondary/50 text-secondary font-telemetry-sm text-telemetry-sm font-bold flex items-center gap-1 hover:bg-secondary hover:text-on-secondary transition-colors whitespace-nowrap cursor-pointer"
            >
              <Eye className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Mở đáp án</span>
            </button>
          )}

          <button
            type="button"
            title="Chế độ Giáo viên (Ra đề & Chia sẻ)"
            aria-label="Chế độ Giáo viên"
            onClick={() => openModal("teacher")}
            className="h-8 px-2.5 rounded-full bg-primary/15 border border-primary/35 text-primary hover:bg-primary hover:text-on-primary font-telemetry-sm text-telemetry-sm font-bold flex items-center gap-1 transition-colors whitespace-nowrap cursor-pointer"
          >
            <GraduationCap className="w-4 h-4" aria-hidden="true" />
            <span>Giáo viên</span>
          </button>

          <button
            type="button"
            title="Bút ghi chú trên Radar"
            aria-label="Bút ghi chú trên Radar"
            aria-pressed={chalkEnabled}
            onClick={toggleChalk}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              chalkEnabled
                ? "bg-secondary text-on-secondary shadow-[0_0_10px_rgba(255,198,64,0.45)]"
                : "text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface"
            }`}
          >
            <PenTool className="w-[17px] h-[17px]" aria-hidden="true" />
          </button>

          <button
            type="button"
            title="Video"
            aria-label="Video"
            onClick={() => openModal("video")}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
          >
            <PlaySquare className="w-[18px] h-[18px]" aria-hidden="true" />
          </button>

          <button
            type="button"
            title="Cài đặt"
            aria-label="Cài đặt"
            onClick={() => openModal("settings")}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
          >
            <SlidersHorizontal
              className="w-[18px] h-[18px]"
              aria-hidden="true"
            />
          </button>

          <button
            type="button"
            title={soundLabel}
            aria-label={soundLabel}
            aria-pressed={soundEnabled}
            onClick={toggleSound}
            className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors cursor-pointer ${
              soundEnabled
                ? "text-primary hover:bg-surface-container-high"
                : "text-outline hover:bg-surface-container-high hover:text-on-surface"
            }`}
          >
            {soundEnabled ? (
              <Volume2 className="w-[18px] h-[18px]" aria-hidden="true" />
            ) : (
              <VolumeX className="w-[18px] h-[18px]" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            title={isFullscreen ? "Thoát toàn màn hình" : "Toàn màn hình"}
            aria-label={isFullscreen ? "Thoát toàn màn hình" : "Toàn màn hình"}
            onClick={handleToggleFullscreen}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
          >
            {isFullscreen ? (
              <Minimize2 className="w-[18px] h-[18px]" aria-hidden="true" />
            ) : (
              <Maximize2 className="w-[18px] h-[18px]" aria-hidden="true" />
            )}
          </button>

          <button
            type="button"
            title="Trợ giúp"
            aria-label="Trợ giúp"
            onClick={() => openModal("help")}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
          >
            <HelpCircle className="w-[18px] h-[18px]" aria-hidden="true" />
          </button>

          <button
            type="button"
            title={
              themeMode === "dark"
                ? "Chuyển sang Chế độ Máy chiếu Sáng"
                : "Chuyển sang Chế độ Buồng lái Tối"
            }
            aria-label="Chuyển đổi giao diện Sáng/Tối"
            onClick={toggleThemeMode}
            className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center ml-space-xs hover:bg-primary-fixed transition-colors cursor-pointer"
          >
            {themeMode === "dark" ? (
              <Sun className="w-[17px] h-[17px]" aria-hidden="true" />
            ) : (
              <Moon className="w-[17px] h-[17px]" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
}
