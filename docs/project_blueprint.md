# Project Blueprint: Vector Quest – Math 10 (Next.js + Vercel Edition)

**Phiên bản Blueprint:** 1.0 (Master Document hợp nhất)  
**Ngày lập:** 23/11/2026  
**Mô hình triển khai:** 100% Frontend-only (Zero Backend) trên [Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs)  
**Phong cách thiết kế:** Modern Flight-Deck HUD & Interactive Physics Studio (Dark Cockpit + Daylight Projector Mode)

---

## 1. Tổng quan, Mục tiêu & Chân dung người dùng

- **Mục tiêu sư phạm:** Giúp học sinh lớp 10 hiểu bản chất vật lý và hình học của phép cộng, phép trừ vectơ ($\vec{v}_R = \vec{v}_A + \vec{v}_W$) thông qua nhập vai phi công xử lý gió ngang khi hạ cánh.
- **Mục tiêu sản phẩm:** Nâng cấp từ file HTML đơn lẻ (`hd kết thúc.docx`) thành ứng dụng web Next.js tương tác mượt ở 60 FPS, chia sẻ tức thì qua một URL Vercel duy nhất, không cần cài đặt hay backend.

| Chân dung | Bối cảnh sử dụng | Nhu cầu cốt lõi |
| :--- | :--- | :--- |
| **Giáo viên Toán THPT** | Máy chiếu 16:9, bảng tương tác, gửi link cho lớp | Điều khiển từng bước (`GUIDE`, `EXPLAIN`, `PAUSE`), chữ rõ từ cuối lớp, chế độ sáng cho máy chiếu |
| **Học sinh lớp 10** | Laptop, tablet hoặc màn hình cảm ứng | Kéo thả đầu vectơ $\vec{v}_A$, đổi hướng/cường độ gió và kiểm chứng quy tắc hình bình hành trực tiếp |

---

## 2. Luồng trải nghiệm 6 bước & Tính năng cốt lõi

1. **Bước 1 – Tactical Briefing (`A SUDDEN CROSSWIND!`):** Máy bay tiếp cận đường băng trên nền Radar toàn màn hình, gió ngang (`R → L` mặc định) làm lệch quỹ đạo. Học sinh đọc câu hỏi song ngữ EN/VI và thử đổi hướng/cường độ gió tại `WindTelemetryPill`.
2. **Bước 2 – Pilot Prediction (`WHAT WOULD YOU DO?`):** Hiển thị câu hỏi dự đoán mở kèm vòng cung la bàn trực quan; chưa lộ đáp án trắc nghiệm để học sinh suy nghĩ.
3. **Bước 3 – Observe & Predict (Lưới Radar 2×2):** Chọn 1 trong 4 phương án `[A] KEEP STRAIGHT`, `[B] TURN FAR RIGHT`, `[C] TURN LEFT`, `[D] TURN SLIGHTLY RIGHT` (hỗ trợ click/chạm/phím tắt `A–D`). Đáp án đúng thích ứng động theo hướng gió hiện hành.
4. **Bước 4 – Interactive Vector Lab (`LET US CHECK!`):** Hiển thị 3 vectơ SVG sắc nét ($\vec{v}_A$ vàng có tay cầm kéo thả, $\vec{v}_W$ cyan, $\vec{v}_R$ đỏ) + công thức KaTeX $\vec{v}_R = \vec{v}_A + \vec{v}_W$. Kéo đầu $\vec{v}_A$ để xem quỹ đạo đứt nét cập nhật tức thời; bấm `WATCH FLIGHT` để xem hoạt ảnh bay.
5. **Bước 5 – Landing Result (`CHECK LANDING`):** Kiểm tra $\lvert \Delta\theta(\vec{v}_R, \text{trục đường băng}) \rvert \le \varepsilon$ (mặc định $\pm 4^\circ$, chỉnh được trong `SETTINGS`).
   - **Thành công:** Banner Emerald `✓ SUCCESSFUL LANDING! / MISSION COMPLETED!` + mở khóa `EXPLAIN`.
   - **Thất bại:** Banner Coral Red `LANDING FAILED!` + âm báo nhẹ, **không tự reset** để học sinh tự chỉnh tiếp.
6. **Bước 6 – Explain (`PARALLELOGRAM PROOF STUDIO`):** Làm dịu nền sân bay, bật/tắt đường nét đứt dựng hình bình hành và lưới tọa độ từ cùng một gốc vectơ.

**Thanh điều khiển & Tiện ích không nút chết:**
- **Top Pill Bar:** `Briefing`, `Predict`, `Vector Lab`, `Debrief`, `Video`, `Settings` (sai số góc, EN/VI, Dark/Daylight Mode), `Sound On/Off` (Web Audio API), `Fullscreen`, `Help`.
- **Bottom Control Dock:** `Back`, `Reset`, `Pause/Play`, chỉ báo 6 chấm tiến trình, `Guide On/Off` (không ẩn vectơ), `Vector Visibility` (chỉ ẩn 3 vectơ, giữ nguyên máy bay/đường băng/quỹ đạo), `Watch Flight`/`Replay`, `Next`.

---

## 3. Phạm vi MVP & Hạng mục trì hoãn

| Nhóm ưu tiên | Hạng mục |
| :--- | :--- |
| **Must Have (MVP)** | Luồng 6 bước hoàn chỉnh; Canvas SVG Radar + kéo thả $\vec{v}_A$ bằng Native Pointer Events; Wind Controls; Logic `CHECK ANSWER` & `CHECK LANDING` động; Header & Bottom Dock đầy đủ chức năng; Web Audio SFX; Deploy Vercel |
| **Should Have (Phase 1.1)** | **Daylight Projector Mode** (nền sáng cho phòng học nhiều ánh sáng); Chia sẻ kịch bản qua URL query params (`?dir=ltr&strength=strong&step=4`); Phím tắt `A–D`, `Space`, `←/→` |
| **Could Have (Phase 2)** | Chế độ **Phép trừ vectơ** ($\vec{v}_A = \vec{v}_R - \vec{v}_W$), đường băng nghiêng góc tùy ý, nhiều nhiệm vụ bay lưu bằng `localStorage` |
| **Won't Have (Ngoài phạm vi)** | Backend API, cơ sở dữ liệu, đăng nhập/tài khoản, lưu điểm trên server |

---

## 4. Tech Stack & Thư viện đã thẩm định

| Lớp | Công nghệ / Package | Phiên bản | License | Ghi chú thẩm định |
| :--- | :--- | :---: | :---: | :--- |
| **Framework & Hosting** | [Next.js](https://nextjs.org/docs) + [Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs) | `^16.4.6` | MIT | App Router, hỗ trợ Static Export (`output: 'export'`) |
| **UI Runtime** | [React](https://www.npmjs.com/package/react) + TypeScript | `^19.3.1` | MIT | Strict mode, ranh giới `'use client'` rõ ràng |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/docs/guides/nextjs) | `^4.3.x` | MIT | CSS-first với `@tailwindcss/postcss` |
| **State Management** | [Zustand](https://zustand.docs.pmnd.rs/) ([npm](https://www.npmjs.com/package/zustand)) | `^5.1.0` | MIT | Selector nhỏ giữ 60 FPS khi kéo vectơ |
| **Animation** | [Motion](https://motion.dev/docs/react) ([npm](https://www.npmjs.com/package/motion)) | `^14.14.0` | MIT | Thay thế `framer-motion`, hỗ trợ React 19 |
| **Toán học (LaTeX)** | [KaTeX](https://katex.org/) ([npm](https://www.npmjs.com/package/katex)) | `^0.19.1` | MIT | Dùng trực tiếp qua `<MathFormula />` (loại `react-katex` vì cũ) |
| **Icons** | [Lucide React](https://lucide.dev/guide/react/) ([npm](https://www.npmjs.com/package/lucide-react)) | `^1.78.0` | ISC | Tree-shakable, 0 lỗ hổng trực tiếp |
| **Kéo thả & Âm thanh** | **Native SVG Pointer Events** + **Web Audio API** | Chuẩn Web | — | 0 KB bundle; thay `@use-gesture/react` (ít bảo trì từ 2024) |

---

## 5. Kiến trúc hệ thống, Quy tắc phụ thuộc & Cây thư mục

### 5.1. Quy tắc phụ thuộc (Strict Import Direction)
```text
src/app/  ──▶  src/components/  ──▶  src/store/  ──▶  src/domain/
                     │                                     ▲
                     └──────────────▶  src/lib/ & src/config/
```
- `src/domain/` là **TypeScript thuần**, không import `react`, `zustand`, `lib/` hay DOM API.
- Các component cùng cấp (`hud/`, `canvas/`, `panels/`, `modals/`) không import chéo nhau; giao tiếp qua `useSimulationStore`.

### 5.2. Cây thư mục dự án
```text
vector-quest/
├── docs/                                # PRODUCT-PROPOSAL, PRODUCT-REQUIREMENTS, TECH-STACK, ARCHITECTURE, PROJECT-BLUEPRINT
├── public/
│   └── icon.svg
├── src/
│   ├── app/
│   │   ├── layout.tsx                   # Root layout, fonts, KaTeX CSS
│   │   ├── page.tsx                     # Trang chính 16:9 Flight-Deck HUD
│   │   ├── globals.css                  # Tailwind v4 + CSS variables (Dark/Daylight)
│   │   └── error.tsx                    # Route-level Error Boundary
│   ├── config/
│   │   └── simulation.ts                # Tốc độ gió (kt), sai số góc (±4°), giới hạn góc kéo
│   ├── domain/                          # [PURE TS] Toán học & sư phạm
│   │   ├── types.ts
│   │   ├── vectorMath.ts                # v_R = v_A + v_W, góc lệch, 4 đỉnh hình bình hành
│   │   ├── landingEvaluator.ts          # Kiểm tra song song đường băng & đáp án động Bước 3
│   │   └── missionContent.ts            # Nội dung song ngữ EN/VI cho 6 bước
│   ├── store/
│   │   └── useSimulationStore.ts        # Zustand Single Source of Truth
│   ├── lib/
│   │   ├── audio.ts                     # Web Audio API SFX (bọc try/catch)
│   │   ├── svgCoords.ts                 # clientX/Y -> SVG Point qua getScreenCTM().inverse()
│   │   ├── urlSync.ts                   # [Phase 1.1] Đồng bộ preset qua URL params
│   │   └── logger.ts                    # devLog/devWarn (chỉ chạy ở development)
│   └── components/
│       ├── hud/                         # TopPillBar, BottomControlDock, WindTelemetryPill
│       ├── canvas/                      # AirportRadarCanvas, WindParticlesLayer, AircraftLayer, VectorOverlayLayer, LiveTelemetryHud
│       ├── panels/                      # ChallengePanelHost, StepBriefing, StepPrediction, StepObserveGrid, StepVectorCheck, StepExplain
│       ├── modals/                      # SettingsModal, HelpModal, VideoDemoModal
│       └── ui/                          # MathFormula, CanvasErrorBoundary
├── tests/
│   └── domain/                          # Vitest: vectorMath.test.ts, landingEvaluator.test.ts
├── next.config.ts
├── postcss.config.mjs
├── tsconfig.json
├── package.json
└── README.md
```

---

## 6. Cấu hình, Error Handling, Unit Test & Yêu cầu phi chức năng

- **Cấu hình & Bảo mật:** Không cần `.env`, không thu thập PII, 100% client-side. Hằng số mô phỏng đặt tại `src/config/simulation.ts`.
- **Error Handling:** `src/app/error.tsx` (toàn trang) + `CanvasErrorBoundary.tsx` (bảo vệ riêng SVG Canvas) + `try/catch` quanh `AudioContext` và `requestFullscreen`.
- **Hiệu năng & Tương thích:** 60 FPS khi kéo thả; hit-area chạm tối thiểu `44×44px` với `touch-action: none` trên đầu mũi tên $\vec{v}_A$; tối ưu 16:9 (1280×720, 1920×1080) trên Chrome, Edge, Safari, Firefox.
- **Unit Test (Vitest):** Kiểm tra toàn bộ `vectorMath.ts` và `landingEvaluator.ts` trong `tests/domain/` (đặc biệt khi đổi chiều gió `R → L` / `L → R` và ngưỡng sai số $\pm \varepsilon$).

---

## 7. Tiêu chí nghiệm thu (Acceptance Criteria)

1. **Không nút chết & Không lỗi console:** 100% nút trên Top Pill Bar, Challenge Panel và Bottom Dock hoạt động thực sự.
2. **Toán học chính xác:** Đổi hướng gió cập nhật đồng bộ $\vec{v}_W$, chú thích sân bay và đáp án đúng Bước 3; kéo $\vec{v}_A$ cập nhật $\vec{v}_R$ tức thời; `CHECK LANDING` chấm dựa trên góc song song đường băng ($\lvert \Delta\theta \rvert \le \varepsilon$).
3. **Độc lập trạng thái:** `VECTOR VISIBILITY` chỉ ẩn/hiện 3 vectơ; `GUIDE ON/OFF` không làm đổi vectơ; `LANDING FAILED!` không tự động reset vị trí/hướng máy bay.
4. **Sẵn sàng Vercel:** `npm run lint`, `npm test`, `npm run build` pass hoàn toàn và chạy trực tiếp trên Vercel không cần cấu hình backend.

---

## 8. Lệnh khởi tạo & Kiểm tra nhanh

```bash
npx create-next-app@latest vector-quest --typescript --tailwind --eslint --app --src-dir
cd vector-quest
npm install zustand motion katex lucide-react
npm install -D @types/katex vitest
npm run lint && npm test && npm run build
```
