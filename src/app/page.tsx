"use client";

import { useEffect, useRef } from "react";
import { AirportRadarCanvas } from "@/components/canvas/AirportRadarCanvas";
import { BottomControlDock } from "@/components/hud/BottomControlDock";
import { TopPillBar } from "@/components/hud/TopPillBar";
import { WindTelemetryPill } from "@/components/hud/WindTelemetryPill";
import { HelpModal } from "@/components/modals/HelpModal";
import { SettingsModal } from "@/components/modals/SettingsModal";
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
  const hasHydratedUrlRef = useRef(false);

  // Sync Dark Cockpit vs Daylight Projector theme class on <html>
  useEffect(() => {
    const root = document.documentElement;
    if (themeMode === "daylight") {
      root.classList.remove("dark");
      root.classList.add("theme-daylight");
    } else {
      root.classList.remove("theme-daylight");
      root.classList.add("dark");
    }
  }, [themeMode]);

  // Hydrate initial wind & step preset from URL query params once on mount
  useEffect(() => {
    const preset = parseSimulationQueryParams(window.location.search);
    if (
      preset.windDirection ||
      preset.windStrength ||
      preset.currentStep
    ) {
      const current = useSimulationStore.getState();
      const nextDirection = preset.windDirection ?? current.windDirection;
      const nextStrength = preset.windStrength ?? current.windStrength;
      const nextStep = preset.currentStep ?? current.currentStep;

      useSimulationStore.setState({
        windDirection: nextDirection,
        windStrength: nextStrength,
        currentStep: nextStep,
        telemetry: computeSimulationTelemetry({
          windDirection: nextDirection,
          windStrength: nextStrength,
          headingOffsetDeg: current.aircraftHeadingDeg,
        }),
      });
    }
    hasHydratedUrlRef.current = true;
  }, []);

  // Keep URL query params synchronized when wind or step changes
  useEffect(() => {
    if (!hasHydratedUrlRef.current) {
      return;
    }
    syncSimulationToUrl({
      windDirection,
      windStrength,
      currentStep,
    });
  }, [windDirection, windStrength, currentStep]);

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
    </div>
  );
}
