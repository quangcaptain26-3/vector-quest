"use client";

import { ArrowRight, PlaySquare, X } from "lucide-react";
import { MathFormula } from "@/components/ui/MathFormula";
import { useSimulationStore } from "@/store/useSimulationStore";

/**
 * Hộp thoại Video Minh họa tích hợp sẵn bằng SVG.
 */
export function VideoDemoModal() {
  const activeModal = useSimulationStore((s) => s.activeModal);
  const closeModal = useSimulationStore((s) => s.closeModal);
  const setStep = useSimulationStore((s) => s.setStep);

  if (activeModal !== "video") {
    return null;
  }

  const handleTryInLab = () => {
    closeModal();
    setStep(4);
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-space-md"
      onClick={closeModal}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="video-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-xl bg-surface-container-low/95 backdrop-blur-xl border border-outline-variant/60 rounded-xl p-space-lg shadow-[0_24px_64px_rgba(0,0,0,0.75)] flex flex-col gap-space-md"
      >
        <div className="flex items-center justify-between border-b border-outline-variant/40 pb-3">
          <div className="flex items-center gap-2">
            <PlaySquare className="w-5 h-5 text-primary" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">
                MINH HỌA TRỰC QUAN
              </span>
              <h2
                id="video-modal-title"
                className="font-headline-sm text-headline-sm text-on-surface font-bold"
              >
                Cách bù gió ngang bằng phép cộng vectơ
              </h2>
            </div>
          </div>

          <button
            type="button"
            aria-label="Đóng minh họa"
            onClick={closeModal}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Hình minh họa SVG tích hợp */}
        <div className="w-full h-[220px] bg-surface-container-lowest rounded-xl border border-primary/25 p-3 flex items-center justify-center">
          <svg viewBox="0 0 420 200" className="w-full h-full">
            <line
              x1="210"
              y1="20"
              x2="210"
              y2="180"
              stroke="rgba(86,229,169,0.5)"
              strokeDasharray="6 4"
              strokeWidth="2"
            />
            <text
              x="210"
              y="14"
              fill="#56e5a9"
              fontFamily="var(--font-jetbrains-mono)"
              fontSize="9"
              textAnchor="middle"
            >
              TRỤC ĐƯỜNG BĂNG 36L
            </text>

            <polygon
              points="210,170 265,45 210,45 155,170"
              fill="rgba(56,189,248,0.08)"
              stroke="rgba(56,189,248,0.35)"
              strokeWidth="1"
            />

            <line
              x1="210"
              y1="170"
              x2="265"
              y2="45"
              stroke="#ffc640"
              strokeWidth="3"
            />
            <circle
              cx="265"
              cy="45"
              r="7"
              fill="rgba(255,198,64,0.3)"
              stroke="#ffc640"
              strokeWidth="2"
            />
            <text
              x="278"
              y="108"
              fill="#ffc640"
              fontFamily="var(--font-jetbrains-mono)"
              fontSize="10"
              fontWeight="700"
            >
              1. Kéo đầu v_A (+18.4°)
            </text>

            <line
              x1="265"
              y1="45"
              x2="210"
              y2="45"
              stroke="#38bdf8"
              strokeDasharray="4 3"
              strokeWidth="2.5"
            />
            <text
              x="238"
              y="35"
              fill="#38bdf8"
              fontFamily="var(--font-jetbrains-mono)"
              fontSize="10"
              fontWeight="700"
              textAnchor="middle"
            >
              2. Gió ngang v_W
            </text>

            <line
              x1="210"
              y1="170"
              x2="210"
              y2="45"
              stroke="#f43f5e"
              strokeWidth="3.5"
            />
            <text
              x="196"
              y="112"
              fill="#f43f5e"
              fontFamily="var(--font-jetbrains-mono)"
              fontSize="10"
              fontWeight="700"
              textAnchor="end"
            >
              3. Vectơ tổng hợp v_R trùng trục!
            </text>
          </svg>
        </div>

        <div className="flex items-center justify-between bg-surface-container-high/50 rounded-lg px-3 py-2">
          <span className="font-body-sm text-body-sm text-on-surface-variant">
            Điều kiện hạ cánh an toàn:
          </span>
          <MathFormula
            tex="\vec{v}_R = \vec{v}_A + \vec{v}_W,\ |\Delta\theta| \le \varepsilon"
            className="font-telemetry-sm text-telemetry-sm text-primary"
          />
        </div>

        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={closeModal}
            className="py-2.5 rounded-lg bg-surface-container-highest hover:bg-surface-container-high text-on-surface font-telemetry-sm text-telemetry-sm font-semibold border border-outline-variant/60 transition-colors cursor-pointer"
          >
            ĐÓNG
          </button>

          <button
            type="button"
            onClick={handleTryInLab}
            className="py-2.5 rounded-lg bg-primary hover:bg-primary-fixed text-on-primary font-telemetry-sm text-telemetry-sm font-bold flex items-center justify-center gap-1.5 shadow-[0_0_20px_rgba(56,189,248,0.45)] transition-colors cursor-pointer"
          >
            <span>THỰC HÀNH NGAY</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}
