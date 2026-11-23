"use client";

import { useEffect, useRef } from "react";
import { AirportRadarCanvas } from "@/components/canvas/AirportRadarCanvas";
import { BottomControlDock } from "@/components/hud/BottomControlDock";
import { TopPillBar } from "@/components/hud/TopPillBar";
import { WindTelemetryPill } from "@/components/hud/WindTelemetryPill";
import { HelpModal } from "@/components/modals/HelpModal";
import { SettingsModal } from "@/components/modals/SettingsModal";
import { TeacherStudioModal } from "@/components/modals/TeacherStudioModal";
import { VideoDemoModal } from "@/components/modals/VideoDemoModal";
import { ChallengePanelHost } from "@/components/panels/ChallengePanelHost";
import { CanvasErrorBoundary } from "@/components/ui/CanvasErrorBoundary";
import type { HeadingOptionId } from "@/domain/types";
import { computeSimulationTelemetry } from "@/domain/vectorMath";
import {
  parseSimulationQueryParams,
  syncSimulationToUrl,
} from "@/lib/urlSync";
import { useSimulationStore } from "@/store/useSimulationStore";

const OPTION_KEYS = new Set<HeadingOptionId>(["A", "B", "C", "D"]);

/**
 * Vector Quest – Math 10 Flight-Deck HUD Shell.
 * Composes TopPillBar, AirportRadarCanvas + WindTelemetryPill + ChallengePanelHost,
 * BottomControlDock, utility modals, URL preset sync, and classroom keyboard shortcuts.
 */
export default function HomePage() {
  const themeMode = useSimulationStore((s) => s.themeMode);
  const windDirection = useSimulationStore((s) => s.windDirection);
  const windStrength = useSimulationStore((s) => s.windStrength);
  const currentStep = useSimulationStore((s) => s.currentStep);
  const operationMode = useSimulationStore((s) => s.operationMode);
  const customAirspeedKts = useSimulationStore((s) => s.customAirspeedKts);
  const customWindSpeedKts = useSimulationStore((s) => s.customWindSpeedKts);
  const runwayAngleDeg = useSimulationStore((s) => s.runwayAngleDeg);
  const blindMode = useSimulationStore((s) => s.blindMode);
  const tvScale = useSimulationStore((s) => s.tvScale);
  const hasHydratedUrlRef = useRef(false);

  // Sync Dark Cockpit vs Daylight Projector theme class and TV text scale on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === "daylight") {
      root.classList.remove("dark");
      root.classList.add("theme-daylight");
    } else {
      root.classList.remove("theme-daylight");
      root.classList.add("dark");
    }

    root.classList.remove("tv-scale-large", "tv-scale-xlarge");
    if (tvScale === "large") {
      root.classList.add("tv-scale-large");
    } else if (tvScale === "xlarge") {
      root.classList.add("tv-scale-xlarge");
    }
  }, [themeMode, tvScale]);

  // Hydrate initial wind, step, and Teacher Studio preset from URL query params once on mount
  useEffect(() => {
    const preset = parseSimulationQueryParams(window.location.search);
    if (
      preset.windDirection ||
      preset.windStrength ||
      preset.currentStep ||
      preset.operationMode ||
      preset.customAirspeedKts !== undefined ||
      preset.customWindSpeedKts !== undefined ||
      preset.runwayAngleDeg !== undefined ||
      preset.blindMode !== undefined ||
      preset.tvScale !== undefined
    ) {
      const current = useSimulationStore.getState();
      const nextDirection = preset.windDirection ?? current.windDirection;
      const nextStrength = preset.windStrength ?? current.windStrength;
      const nextStep = preset.currentStep ?? current.currentStep;
      const nextMode = preset.operationMode ?? current.operationMode;
      const nextVa = preset.customAirspeedKts ?? current.customAirspeedKts;
      const nextVw = preset.customWindSpeedKts ?? current.customWindSpeedKts;
      const nextRw = preset.runwayAngleDeg ?? current.runwayAngleDeg;
      const nextBlind = preset.blindMode ?? current.blindMode;
      const nextTvScale = preset.tvScale ?? current.tvScale;

      useSimulationStore.setState({
        windDirection: nextDirection,
        windStrength: nextStrength,
        currentStep: nextStep,
        operationMode: nextMode,
        customAirspeedKts: nextVa,
        customWindSpeedKts: nextVw,
        runwayAngleDeg: nextRw,
        blindMode: nextBlind,
        tvScale: nextTvScale,
        telemetry: computeSimulationTelemetry({
          windDirection: nextDirection,
          windStrength: nextStrength,
          headingOffsetDeg: current.aircraftHeadingDeg,
          customAirspeedKts: nextVa ?? undefined,
          customWindSpeedKts: nextVw ?? undefined,
          runwayAngleDeg: nextRw,
          operationMode: nextMode,
        }),
      });
    }
    hasHydratedUrlRef.current = true;
  }, []);

  // Keep URL query params synchronized when wind, step, or Teacher Studio config changes
  useEffect(() => {
    if (!hasHydratedUrlRef.current) {
      return;
    }
    syncSimulationToUrl({
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
  }, [
    windDirection,
    windStrength,
    currentStep,
    operationMode,
    customAirspeedKts,
    customWindSpeedKts,
    runwayAngleDeg,
    blindMode,
    tvScale,
  ]);

  // Classroom keyboard shortcuts (disabled while any modal is open)
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") {
        return;
      }

      const state = useSimulationStore.getState();
      if (state.activeModal !== null) {
        if (event.key === "Escape") {
          event.preventDefault();
          state.closeModal();
        }
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        state.nextStep();
        return;
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        state.prevStep();
        return;
      }

      if (event.code === "Space" || event.key === " ") {
        event.preventDefault();
        state.togglePlay();
        return;
      }

      if (state.currentStep >= 4) {
        const fineDelta = event.shiftKey ? 0.1 : 0.5;
        if (event.key === "ArrowUp" || event.key === "+" || event.key === "=") {
          event.preventDefault();
          state.adjustAircraftHeading(fineDelta);
          return;
        }
        if (event.key === "ArrowDown" || event.key === "-" || event.key === "_") {
          event.preventDefault();
          state.adjustAircraftHeading(-fineDelta);
          return;
        }
      }

      if (state.currentStep === 3) {
        const upper = event.key.toUpperCase() as HeadingOptionId;
        if (OPTION_KEYS.has(upper)) {
          event.preventDefault();
          state.selectOption(upper);
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="min-h-screen w-full bg-surface text-on-surface flex flex-col">
      <TopPillBar />

      <main className="w-full pt-20 pb-24 bg-surface min-h-screen">
        <div className="flex flex-col w-full relative select-none">
          {/* Interactive Cockpit & Radar Viewport Stage */}
          <div className="relative w-full h-[calc(100vh-11rem)] max-h-[940px] min-h-[520px] overflow-hidden rounded-xl bg-surface-container-lowest flex items-center justify-center">
            <CanvasErrorBoundary>
              <AirportRadarCanvas />
            </CanvasErrorBoundary>

            {/* Top-Left Wind Telemetry & Controls */}
            <WindTelemetryPill />

            {/* Right-Side 6-Step Challenge Panel */}
            <ChallengePanelHost />
          </div>
        </div>
      </main>

      <BottomControlDock />

      <SettingsModal />
      <HelpModal />
      <VideoDemoModal />
      <TeacherStudioModal />
    </div>
  );
}
