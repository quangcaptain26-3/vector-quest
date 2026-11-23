# Kế Hoạch Triển Khai Chi Tiết (`IMPLEMENTATION-PLAN.md`)

**Dự án:** Vector Quest – Math 10 (Next.js + Vercel Frontend-Only Edition)  
**Tài liệu tham chiếu:** `docs/PROJECT-BLUEPRINT.md`  
**Ngày lập:** 23/11/2026

---

## 1. Tổng quan Phân rã theo Phase & Đồ thị Phụ thuộc

Vì dự án là **100% Frontend (Zero Backend)**, kế hoạch bỏ qua các phase Database/API/Auth và tập trung vào **6 Phase** theo thứ tự phụ thuộc chặt chẽ:

```text
[Phase 1: Foundation & Config]
        │
        ▼
[Phase 2: Pure Domain & Vitest] ──▶ [Checkpoint 1: Math & Logic Gate]
        │
        ▼
[Phase 3: Store & Browser Libs]
        │
        ├──────────────────┬──────────────────┐
        ▼                  ▼                  ▼
  [Task 4.1–4.3]     [Task 4.4–4.5]     [Task 5.1–5.3]   ◀── (Chạy song song được)
  Radar & Vectors    HUD & Telemetry    Panels & Modals
        │                  │                  │
        └──────────────────┴──────────────────┘
                           │
                           ▼
             [Checkpoint 2: UI & Drag Integration]
                           │
                           ▼
             [Phase 6: QA, Polish & Vercel Deploy] ──▶ [Checkpoint 3: Release Gate]
```

---

## 2. Chi tiết các Phase & Task

### Phase 1: Foundation, Config & Global Shell
*Mục tiêu: Chuẩn bị khung Next.js, hệ thống biến CSS (Dark Cockpit & Daylight Projector), Error Boundary và hằng số mô phỏng.*

| Task ID | Mục tiêu & Phạm vi | File / Module liên quan | Dependency | Acceptance Criteria & Cách kiểm tra |
| :--- | :--- | :--- | :--- | :--- |
| **T1.1** | Cấu hình Next.js, Tailwind v4 CSS variables (Dark/Daylight), KaTeX CSS và Error Boundary toàn trang | `next.config.ts`, `src/app/layout.tsx`, `src/app/globals.css`, `src/app/error.tsx` | Đã chạy scaffold | `npm run build` pass; class `.theme-daylight` và dark mặc định đổi màu nền/viền đúng thiết kế |
| **T1.2** | Định nghĩa hằng số mô phỏng & wrapper `<MathFormula />` | `src/config/simulation.ts`, `src/components/ui/MathFormula.tsx`, `src/components/ui/CanvasErrorBoundary.tsx` | T1.1 | Render được $\vec{v}_R = \vec{v}_A + \vec{v}_W$ không lỗi SSR/hydration; `simulation.ts` export đủ tốc độ gió & sai số mặc định `4°` |

---

### Phase 2: Pure Domain Engine & Unit Tests
*Mục tiêu: Hoàn thiện toàn bộ toán học vectơ và logic sư phạm bằng TypeScript thuần (0 phụ thuộc React/DOM).*

| Task ID | Mục tiêu & Phạm vi | File / Module liên quan | Dependency | Acceptance Criteria & Cách kiểm tra |
| :--- | :--- | :--- | :--- | :--- |
| **T2.1** | Định nghĩa kiểu dữ liệu cốt lõi (`Vector2D`, `WindDirection`, `WindStrength`, `MissionStep`, `HeadingOption`) | `src/domain/types.ts` | Không | `tsc --noEmit` pass; không có `any` |
| **T2.2** | Xây dựng động cơ toán học vectơ (cộng $\vec{v}_R = \vec{v}_A + \vec{v}_W$, góc lệch so với trục dọc đường băng, 4 đỉnh hình bình hành) | `src/domain/vectorMath.ts`, `tests/domain/vectorMath.test.ts` | T2.1 | Unit test Vitest pass 100% các góc âm/dương, gió 2 chiều và tọa độ hình bình hành |
| **T2.3** | Xây dựng logic chấm `CHECK LANDING`, đáp án động Bước 3 theo hướng gió và nội dung song ngữ EN/VI 6 bước | `src/domain/landingEvaluator.ts`, `src/domain/missionContent.ts`, `tests/domain/landingEvaluator.test.ts` | T2.1, T2.2 | Đổi gió `R→L` sang `L→R` tự đổi đáp án Bước 3; `CHECK LANDING` chỉ pass khi $\lvert \Delta\theta \rvert \le \varepsilon$ |

> **CHECKPOINT 1 (Math & Logic Gate):** Chạy `npx vitest run` — toàn bộ test trong `tests/domain/` phải **PASS 100%** và `src/domain/` không chứa bất kỳ import `react` hoặc `window` nào trước khi sang Phase 3.

---

### Phase 3: State Store & Browser Adapters
*Mục tiêu: Kết nối Domain Engine vào Zustand Store và bọc an toàn các API trình duyệt.*

| Task ID | Mục tiêu & Phạm vi | File / Module liên quan | Dependency | Acceptance Criteria & Cách kiểm tra |
| :--- | :--- | :--- | :--- | :--- |
| **T3.1** | Xây dựng browser adapters: Web Audio SFX, quy đổi tọa độ SVG `getScreenCTM().inverse()`, logger dev-only | `src/lib/audio.ts`, `src/lib/svgCoords.ts`, `src/lib/logger.ts` | Không | Gọi `playSuccess()`/`playAlert()` không văng lỗi khi trình duyệt chặn autoplay |
| **T3.2** | Xây dựng `useSimulationStore` (quản lý 6 bước, gió, góc $\vec{v}_A$, cờ `vectorsVisible`, `guideVisible`, `soundEnabled`, `themeMode`, `toleranceDeg`) | `src/store/useSimulationStore.ts` | T2.2, T2.3, T3.1 | `toggleVectors()` không đổi giá trị $\vec{v}_A, \vec{v}_W$; `checkLanding()` thất bại không tự reset góc máy bay |

---

### Phase 4: Core UI — Airport Radar Canvas & HUD Chrome
*Mục tiêu: Dựng sân bay SVG toàn màn hình, kéo thả vectơ 60 FPS và thanh điều hướng nổi.*

| Task ID | Mục tiêu & Phạm vi | File / Module liên quan | Dependency | Acceptance Criteria & Cách kiểm tra |
| :--- | :--- | :--- | :--- | :--- |
| **T4.1** | Dựng khung sân bay SVG, đường băng, lưới tọa độ, thước đo góc 360° và lớp hạt gió động | `src/components/canvas/AirportRadarCanvas.tsx`, `src/components/canvas/WindParticlesLayer.tsx` | T3.2 | Đường băng sắc nét ở 1080p; hạt gió đổi chiều/tốc độ ngay khi đổi wind state |
| **T4.2** | Dựng máy bay top-down, quỹ đạo đứt nét và lớp 3 vectơ SVG + kéo thả đầu $\vec{v}_A$ bằng Native Pointer Events (`touch-action: none`, hit-area ≥ 44px) | `src/components/canvas/AircraftLayer.tsx`, `src/components/canvas/VectorOverlayLayer.tsx`, `src/components/canvas/LiveTelemetryHud.tsx` | T3.1, T3.2, T4.1 | Kéo đầu $\vec{v}_A$ bằng chuột/chạm mượt 60 FPS; $\vec{v}_R$ & góc lệch trên HUD cập nhật tức thời |
| **T4.3** | Dựng `TopPillBar`, `BottomControlDock` (6 chấm tiến trình) và `WindTelemetryPill` | `src/components/hud/TopPillBar.tsx`, `src/components/hud/BottomControlDock.tsx`, `src/components/hud/WindTelemetryPill.tsx` | T3.2 | 100% nút bấm kích hoạt đúng action store hoặc mở modal; `Fullscreen` bọc `try/catch` |

---

### Phase 5: 6-Step Pedagogical Panels & Utility Modals
*Mục tiêu: Hoàn thiện thẻ kính mờ bên phải cho 6 bước học tập và 3 modal tiện ích.*

| Task ID | Mục tiêu & Phạm vi | File / Module liên quan | Dependency | Acceptance Criteria & Cách kiểm tra |
| :--- | :--- | :--- | :--- | :--- |
| **T5.1** | Dựng `ChallengePanelHost` (Motion transition) + Bước 1 (`StepBriefing`) + Bước 2 (`StepPrediction`) | `src/components/panels/ChallengePanelHost.tsx`, `StepBriefing.tsx`, `StepPrediction.tsx` | T3.2 | Chuyển bước mượt; nút `EN/VI` đổi ngôn ngữ tức thời; Bước 2 chưa lộ đáp án |
| **T5.2** | Dựng Bước 3 (`StepObserveGrid` 2×2 mini-radar) + Bước 4–5 (`StepVectorCheck`) + Bước 6 (`StepExplain` bật/tắt hình bình hành) | `src/components/panels/StepObserveGrid.tsx`, `StepVectorCheck.tsx`, `StepExplain.tsx` | T3.2, T5.1 | Chọn A/B/C/D ở Bước 3 kiểm tra đúng theo gió; Bước 5 hiển thị khung Xanh/Đỏ chuẩn; Bước 6 bật/tắt hình bình hành |
| **T5.3** | Dựng 3 modal: `SettingsModal` (chỉnh sai số $\pm 3^\circ/\pm 4^\circ/\pm 5^\circ$, EN/VI, Dark/Daylight), `HelpModal`, `VideoDemoModal` | `src/components/modals/SettingsModal.tsx`, `HelpModal.tsx`, `VideoDemoModal.tsx` | T3.2 | Không có nút nào trên Header bị vô tác dụng; đổi sai số góc ảnh hưởng ngay tới `CHECK LANDING` |

> **CHECKPOINT 2 (UI & Integration Review):** Ghép toàn bộ vào `src/app/page.tsx`. Kiểm tra thủ công luồng từ Bước 1 → Bước 6 trên cả Dark Cockpit và Daylight Projector Mode, xác nhận `VECTOR VISIBILITY`, `GUIDE`, `RESET`, `PAUSE/PLAY` hoạt động đúng độc lập.

---

### Phase 6: Polish, Accessibility, QA & Vercel Release
*Mục tiêu: Tối ưu trải nghiệm lớp học (phím tắt, URL preset) và kiểm định trước khi đưa lên Vercel.*

| Task ID | Mục tiêu & Phạm vi | File / Module liên quan | Dependency | Acceptance Criteria & Cách kiểm tra |
| :--- | :--- | :--- | :--- | :--- |
| **T6.1** | Thêm phím tắt bàn phím (`A–D` chọn đáp án, `Space` Pause/Play, `←/→` chuyển bước) và đồng bộ URL query params (`?dir=...&strength=...`) | `src/lib/urlSync.ts`, `src/app/page.tsx` | Checkpoint 2 | Mở link có query params khôi phục đúng kịch bản gió; phím tắt hoạt động khi không mở modal |
| **T6.2** | Viết `README.md`, kiểm tra responsive 16:9 (1280×720, 1920×1080), chạy full audit `lint`, `test`, `build` và deploy Vercel | `README.md`, toàn bộ repo | T6.1 | `npm run lint`, `npm test`, `npm run build` đều **0 error**; chạy ổn định trên Vercel Preview URL |

> **CHECKPOINT 3 (Release Gate):** Xác nhận 4 tiêu chí nghiệm thu trong `PROJECT-BLUEPRINT.md` (0 nút chết, 0 lỗi console, toán học chính xác khi đảo gió, `next build` thành công).

---

## 3. Chiến lược Chạy Song Song (Parallel Execution)

Sau khi **Phase 3 (`T3.2`)** hoàn tất và khóa xong interface của `useSimulationStore`:
- **Luồng A (Canvas Engineer):** Thực hiện `T4.1` → `T4.2` (sở hữu độc quyền thư mục `src/components/canvas/`).
- **Luồng B (HUD Engineer):** Thực hiện `T4.3` (sở hữu độc quyền thư mục `src/components/hud/`).
- **Luồng C (Panels & Modals Engineer):** Thực hiện `T5.1` → `T5.2` + `T5.3` (sở hữu độc quyền `src/components/panels/` và `src/components/modals/`).

*Quy tắc chống xung đột:* Không luồng nào được tự ý sửa `src/domain/` hoặc `src/store/` trong khi chạy song song; mọi thay đổi interface store phải được đồng bộ qua agent điều phối trước.

---

## 4. Mẫu Execution Prompt cho Từng Giai đoạn (Dùng khi giao việc cho Agent)

```text
[TASK ID]: T2.2 & T2.3 – Pure Domain Engine & Unit Tests
[CONTEXT]: Đọc docs/PROJECT-BLUEPRINT.md (mục 2, 5, 7).
[SCOPE]: Chỉ tạo/sửa file trong src/domain/ và tests/domain/. KHÔNG import react, zustand hay DOM API.
[ACCEPTANCE]:
1. computeResultantVector() tính chính xác v_R = v_A + v_W.
2. evaluateLanding() trả về success=true khi |deltaAngle| <= toleranceDeg.
3. getCorrectOptionForWind() tự động đổi đáp án đúng theo hướng gió R→L hoặc L→R.
[VERIFY]: Chạy `npx vitest run` và báo cáo kết quả thực tế.
```
