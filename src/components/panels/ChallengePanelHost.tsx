"use client";

import { AnimatePresence, motion } from "motion/react";
import { useSimulationStore } from "@/store/useSimulationStore";
import { StepBriefing } from "./StepBriefing";
import { StepExplain } from "./StepExplain";
import { StepObserveGrid } from "./StepObserveGrid";
import { StepPrediction } from "./StepPrediction";
import { StepVectorCheck } from "./StepVectorCheck";

/**
 * Khung thẻ kính mờ bên phải điều phối chuyển cảnh mượt giữa 6 bước học tập.
 */
export function ChallengePanelHost() {
  const currentStep = useSimulationStore((s) => s.currentStep);

  const widthClass =
    currentStep <= 2 ? "w-[384px] max-w-[384px]" : "w-[420px] max-w-[420px]";

  const renderStepPanel = () => {
    switch (currentStep) {
      case 1:
        return <StepBriefing />;
      case 2:
        return <StepPrediction />;
      case 3:
        return <StepObserveGrid />;
      case 4:
      case 5:
        return <StepVectorCheck />;
      case 6:
        return <StepExplain />;
      default:
        return <StepBriefing />;
    }
  };

  return (
    <aside
      aria-label="Bảng nhiệm vụ học tập"
      className={`absolute top-6 right-8 ${widthClass} z-10 bg-surface-container-low/90 backdrop-blur-xl p-space-lg rounded-xl shadow-[0_16px_48px_rgba(0,0,0,0.65)] border border-outline-variant/30 max-h-[calc(100%-3rem)] overflow-y-auto`}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={
            currentStep === 4 || currentStep === 5
              ? `step-${currentStep}`
              : currentStep
          }
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.2, ease: "easeOut" }}
        >
          {renderStepPanel()}
        </motion.div>
      </AnimatePresence>
    </aside>
  );
}
