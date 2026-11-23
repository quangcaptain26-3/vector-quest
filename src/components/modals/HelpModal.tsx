"use client";

import { HelpCircle, Keyboard, MousePointerClick, X } from "lucide-react";
import { MathFormula } from "@/components/ui/MathFormula";
import { useSimulationStore } from "@/store/useSimulationStore";

/**
 * Hộp thoại Trợ giúp hướng dẫn thao tác kéo vectơ và phím tắt lớp học.
 */
export function HelpModal() {
  const activeModal = useSimulationStore((s) => s.activeModal);
  const closeModal = useSimulationStore((s) => s.closeModal);

  if (activeModal !== "help") {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 bg-black/65 backdrop-blur-sm flex items-center justify-center p-space-md"
      onClick={closeModal}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="help-modal-title"
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-surface-container-low/95 backdrop-blur-xl border border-outline-variant/60 rounded-xl p-space-lg shadow-[0_24px_64px_rgba(0,0,0,0.75)] flex flex-col gap-space-md"
      >
        <div className="flex items-center justify-between border-b border-outline-variant/40 pb-3">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-primary" aria-hidden="true" />
            <div className="flex flex-col">
              <span className="font-label-caps text-label-caps text-primary uppercase tracking-widest">
                CẨM NANG PHI CÔNG • TOÁN 10
              </span>
              <h2
                id="help-modal-title"
                className="font-headline-sm text-headline-sm text-on-surface font-bold"
              >
                Hướng dẫn sử dụng Nhiệm vụ Vectơ
              </h2>
            </div>
          </div>

          <button
            type="button"
            aria-label="Đóng trợ giúp"
            onClick={closeModal}
            className="w-8 h-8 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Hướng dẫn thao tác */}
        <div className="flex flex-col gap-2 bg-surface-container-high/50 border border-outline-variant/40 rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-secondary">
            <MousePointerClick className="w-4 h-4" aria-hidden="true" />
            <span className="font-label-caps text-label-caps uppercase tracking-wider font-bold">
              THAO TÁC TƯƠNG TÁC TRÊN RADAR
            </span>
          </div>
          <ul className="flex flex-col gap-1.5 font-body-sm text-body-sm text-on-surface-variant">
            <li>
              <strong className="text-on-surface">
                1. Điều khiển Gió ngang:
              </strong>{" "}
              Chọn chiều gió (Phải → Trái / Trái → Phải) và cường độ gió (Nhẹ /
              Vừa / Mạnh) ở góc trên bên trái.
            </li>
            <li className="flex flex-wrap items-center gap-1">
              <strong className="text-secondary">
                2. Kéo đầu vectơ (Bước 4–5):
              </strong>{" "}
              <span>Kéo trực tiếp đầu mũi tên vàng</span>
              <MathFormula tex="\vec{v}_A" className="text-secondary" />
              <span>sao cho vectơ tổng hợp đỏ</span>
              <MathFormula tex="\vec{v}_R" className="text-error" />
              <span>song song với đường băng 36L.</span>
            </li>
            <li>
              <strong className="text-primary">
                3. Công tắc độc lập ở thanh đáy:
              </strong>{" "}
              Nút Hiện/Ẩn vectơ chỉ ẩn/hiện 3 mũi tên vectơ; nút Hướng dẫn ẩn/hiện
              gợi ý sư phạm mà không làm thay đổi vận tốc.
            </li>
          </ul>
        </div>

        {/* Phím tắt lớp học */}
        <div className="flex flex-col gap-2 bg-surface-container-lowest/80 border border-outline-variant/40 rounded-xl p-3">
          <div className="flex items-center gap-1.5 text-primary">
            <Keyboard className="w-4 h-4" aria-hidden="true" />
            <span className="font-label-caps text-label-caps uppercase tracking-wider font-bold">
              PHÍM TẮT TRÊN LỚP HỌC
            </span>
          </div>
          <div className="grid grid-cols-2 gap-2 font-telemetry-sm text-telemetry-sm">
            <div className="flex items-center justify-between bg-surface-container-high/60 px-2.5 py-1.5 rounded">
              <span className="text-on-surface-variant">Chọn đáp án Bước 3</span>
              <kbd className="px-1.5 py-0.5 rounded bg-surface-container-lowest text-primary border border-outline-variant">
                A – D
              </kbd>
            </div>
            <div className="flex items-center justify-between bg-surface-container-high/60 px-2.5 py-1.5 rounded">
              <span className="text-on-surface-variant">Tạm dừng / Tiếp tục</span>
              <kbd className="px-1.5 py-0.5 rounded bg-surface-container-lowest text-primary border border-outline-variant">
                Space
              </kbd>
            </div>
            <div className="flex items-center justify-between bg-surface-container-high/60 px-2.5 py-1.5 rounded">
              <span className="text-on-surface-variant">Quay lại / Tiếp theo</span>
              <kbd className="px-1.5 py-0.5 rounded bg-surface-container-lowest text-primary border border-outline-variant">
                ← / →
              </kbd>
            </div>
            <div className="flex items-center justify-between bg-surface-container-high/60 px-2.5 py-1.5 rounded">
              <span className="text-on-surface-variant">Đóng hộp thoại</span>
              <kbd className="px-1.5 py-0.5 rounded bg-surface-container-lowest text-primary border border-outline-variant">
                Esc
              </kbd>
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={closeModal}
          className="w-full py-2.5 rounded-lg bg-primary hover:bg-primary-fixed text-on-primary font-telemetry-sm text-telemetry-sm font-bold transition-colors cursor-pointer"
        >
          ĐÃ HIỂU
        </button>
      </div>
    </div>
  );
}
