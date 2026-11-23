# Kiến Trúc Hệ Thống & Cấu Trúc Thư Mục (`ARCHITECTURE.md`)

**Dự án:** Vector Quest – Math 10 (Next.js + Vercel Frontend-Only Edition)  
**Kiến trúc:** Modular Layered Frontend (Next.js App Router · TypeScript · Zustand · Native SVG + Motion)  
**Ngày thiết kế:** 23/11/2026

---

## 1. Kiến trúc tổng quan & Ranh giới các Module

Do ứng dụng chạy **100% ở phía Client (Zero Backend)** với bài toán trọng tâm là **mô phỏng vật lý 2D thời gian thực + luồng sư phạm 6 bước**, kiến trúc phù hợp nhất là **Layered Frontend Architecture (Kiến trúc phân lớp gọn nhẹ)** gồm 4 lớp rõ rệt:

1. **Lớp Domain (`src/domain/`):** Chứa toàn bộ toán học vectơ ($\vec{v}_R = \vec{v}_A + \vec{v}_W$), quy đổi góc, thuật toán kiểm tra song song trục đường băng (`CHECK LANDING`), logic chọn đáp án thích ứng theo hướng gió ở Bước 3 và dữ liệu song ngữ EN/VI cho từng bước. **Hoàn toàn độc lập với React, DOM và Zustand.**
2. **Lớp State (`src/store/`):** `Zustand` store duy nhất làm nguồn chân lý (Single Source of Truth) cho trạng thái mô phỏng (`windDirection`, `windStrength`, `aircraftHeadingDeg`, `currentStep`, `vectorsVisible`, `guideVisible`, `soundEnabled`, `themeMode`, `toleranceDeg`, `isPlaying`).
3. **Lớp Infrastructure / Browser Adapters (`src/lib/`):** Giao tiếp với các API trình duyệt dễ lỗi hoặc phụ thuộc môi trường như Web Audio API (`audio.ts`), chuyển đổi tọa độ chuột/chạm sang tọa độ SVG (`svgCoords.ts`), Fullscreen API, và logger phát triển (`logger.ts`).
4. **Lớp Presentation (`src/components/` & `src/app/`):** Các component hiển thị theo phong cách **Flight-Deck HUD**, đọc dữ liệu qua selector nhỏ từ `store/` để đảm bảo 60 FPS khi kéo thả.

---

## 2. Sơ đồ cây thư mục đề xuất

```text
vector-quest/
├── docs/                                # Tài liệu dự án (PRD, Tech Stack, Architecture)
│   ├── PRODUCT-PROPOSAL.md
│   ├── PRODUCT-REQUIREMENTS.md
│   ├── TECH-STACK.md
│   └── ARCHITECTURE.md
├── public/                              # Tài nguyên tĩnh (favicon, OG image cho Vercel)
│   └── icon.svg
├── src/
│   ├── app/                             # Next.js App Router entry & global error boundary
│   │   ├── layout.tsx                   # Root layout, font chữ, import KaTeX CSS
│   │   ├── page.tsx                     # Trang chính ghép khung 16:9 Flight-Deck HUD
│   │   ├── globals.css                  # Tailwind v4 @import + custom CSS variables (Dark/Daylight)
│   │   └── error.tsx                    # Route-level Error Boundary
│   ├── config/                          # Hằng số cấu hình cố định của mô phỏng
│   │   └── simulation.ts                # Tốc độ gió (kt), sai số góc mặc định (±4°), giới hạn kéo
│   ├── domain/                          # [PURE TS] Logic toán học & sư phạm (0 phụ thuộc React)
│   │   ├── types.ts                     # Kiểu dữ liệu Vector2D, WindConfig, StepId, OptionId
│   │   ├── vectorMath.ts                # Phép cộng v_R = v_A + v_W, tính góc lệch, hình bình hành
│   │   ├── landingEvaluator.ts          # Kiểm tra song song đường băng & xác định đáp án Bước 3
│   │   └── missionContent.ts            # Nội dung câu hỏi/gợi ý song ngữ EN/VI cho 6 bước
│   ├── store/                           # Quản lý trạng thái toàn cục (Zustand)
│   │   └── useSimulationStore.ts        # State + actions (setHeading, checkLanding, reset, toggle...)
│   ├── lib/                             # Tiện ích trình duyệt & hạ tầng client
│   │   ├── audio.ts                     # Web Audio API synthesizer (success chime, alert beep, click)
│   │   ├── svgCoords.ts                 # Quy đổi clientX/clientY -> SVG point qua getScreenCTM()
│   │   ├── urlSync.ts                   # [Phase 1.1] Đọc/ghi preset gió & bước qua URL query params
│   │   └── logger.ts                    # Logger an toàn (chỉ xuất log ở development)
│   └── components/                      # Giao diện người dùng (Client Components)
│       ├── hud/                         # Thanh điều hướng & điều khiển nổi
│       │   ├── TopPillBar.tsx           # Logo, tab bước, nút Video/Settings/Sound/Fullscreen/Help
│       │   ├── BottomControlDock.tsx    # Back, Reset, Pause, 6-dot progress, Guide, Vectors, Next
│       │   └── WindTelemetryPill.tsx    # Bảng chọn R→L / L→R, Light/Mod/Strong & tốc độ gió
│       ├── canvas/                      # Khu vực mô phỏng sân bay SVG toàn màn hình
│       │   ├── AirportRadarCanvas.tsx   # Khung SVG chính (runway, grid, thước đo góc 360°)
│       │   ├── WindParticlesLayer.tsx   # Luồng hạt gió chuyển động theo hướng & cường độ
│       │   ├── AircraftLayer.tsx        # Máy bay top-down + vệt quỹ đạo đứt nét
│       │   ├── VectorOverlayLayer.tsx   # 3 vectơ v_A (kéo thả), v_W, v_R + hình bình hành
│       │   └── LiveTelemetryHud.tsx     # Hộp công thức KaTeX v_R = v_A + v_W & góc lệch live
│       ├── panels/                      # Thẻ kính mờ bên phải theo từng bước
│       │   ├── ChallengePanelHost.tsx   # Điều phối chuyển cảnh Motion giữa Bước 1–6
│       │   ├── StepBriefing.tsx         # Bước 1: Opening Activity (A Sudden Crosswind!)
│       │   ├── StepPrediction.tsx       # Bước 2: Pilot Challenge (What Would You Do?)
│       │   ├── StepObserveGrid.tsx      # Bước 3: Lưới Radar 2x2 chọn A/B/C/D + Check Answer
│       │   ├── StepVectorCheck.tsx      # Bước 4 & 5: Let Us Check + Kết quả Success/Failed
│       │   └── StepExplain.tsx          # Bước 6: Parallelogram Proof Studio
│       ├── modals/                      # Các hộp thoại tiện ích (không có nút chết)
│       │   ├── SettingsModal.tsx        # Chỉnh sai số góc (±3°/±4°/±5°), EN/VI, Dark/Daylight Mode
│       │   ├── HelpModal.tsx            # Hướng dẫn thao tác & phím tắt cho giáo viên/học sinh
│       │   └── VideoDemoModal.tsx       # Minh họa trực quan cách kéo vectơ (tích hợp sẵn)
│       └── ui/                          # Component dùng chung nhỏ gọn
│           ├── MathFormula.tsx          # Wrapper an toàn gọi katex.renderToString()
│           └── CanvasErrorBoundary.tsx  # Error Boundary riêng bảo vệ khu vực SVG
├── tests/                               # Kiểm thử tự động (Vitest)
│   └── domain/
│       ├── vectorMath.test.ts           # Test phép cộng vectơ & tọa độ hình bình hành
│       └── landingEvaluator.test.ts     # Test điều kiện CHECK LANDING & đáp án động Bước 3
├── next.config.ts                       # Cấu hình Next.js (hỗ trợ static export cho Vercel)
├── postcss.config.mjs                   # Cấu hình Tailwind CSS v4
├── tsconfig.json                        # TypeScript strict mode + path alias @/*
├── package.json
└── README.md                            # Hướng dẫn cài đặt, chạy dev, test và deploy Vercel
```

---

## 3. Trách nhiệm cụ thể của từng Thư mục & Tệp tin quan trọng

| Thư mục / Tệp | Trách nhiệm chính | Không được đặt vào đây |
| :--- | :--- | :--- |
| `src/domain/vectorMath.ts` | Tính $\vec{v}_R = \vec{v}_A + \vec{v}_W$, chuẩn hóa góc, tính 4 đỉnh hình bình hành | Code React, hook, `window`/`document` |
| `src/domain/landingEvaluator.ts` | Kiểm tra $\lvert \Delta\theta(\vec{v}_R, \text{runway}) \rvert \le \varepsilon$ và suy ra đáp án đúng Bước 3 theo `windDirection` | Logic hiển thị thông báo UI hay màu sắc CSS |
| `src/store/useSimulationStore.ts` | Giữ state ứng dụng, đảm bảo `VECTOR VISIBILITY` chỉ đổi cờ hiển thị chứ không sửa $\vec{v}_A, \vec{v}_W$, và `LANDING FAILED` không tự reset | Phép toán hình học phức tạp (phải gọi từ `domain/`) |
| `src/components/canvas/VectorOverlayLayer.tsx` | Vẽ 3 vectơ SVG và xử lý `onPointerDown` / `onPointerMove` với `setPointerCapture` trên đầu mũi tên $\vec{v}_A$ | Công thức tính hạ cánh; chỉ gửi góc/độ lớn mới vào `store` |
| `src/components/ui/MathFormula.tsx` | Gọi `katex.renderToString` an toàn để hiển thị công thức Toán | State toàn cục hoặc logic nghiệp vụ |
| `src/lib/audio.ts` | Tạo âm thanh bằng `AudioContext` (chỉ chạy khi `soundEnabled === true`, bọc `try/catch` tránh lỗi autoplay policy) | Phụ thuộc vào Zustand store |

---

## 4. Luồng luân chuyển dữ liệu & Quy tắc phụ thuộc (Dependency Rules)

### 4.1. Luồng dữ liệu một chiều (Unidirectional Data Flow)
1. **Tương tác người dùng:** Học sinh kéo đầu mũi tên $\vec{v}_A$ trên `VectorOverlayLayer.tsx` (hoặc đổi gió trên `WindTelemetryPill.tsx`).
2. **Chuyển đổi tọa độ:** `svgCoords.ts` đổi tọa độ pointer sang hệ tọa độ SVG $\rightarrow$ tính góc hướng mũi máy bay mới.
3. **Cập nhật Store:** Component gọi action `setAircraftHeading(deg)` trên `useSimulationStore`.
4. **Tính toán thuần:** Store gọi `computeResultantVector()` trong `src/domain/vectorMath.ts` để cập nhật $\vec{v}_R$ tức thời.
5. **Re-render chọn lọc:** Chỉ các component subscribe vào `aircraftHeadingDeg` và `resultantVector` (`AircraftLayer`, `VectorOverlayLayer`, `LiveTelemetryHud`) re-render mượt ở 60 FPS.

### 4.2. Quy tắc phụ thuộc bắt buộc (Strict Import Direction)
```text
src/app/  ──▶  src/components/  ──▶  src/store/  ──▶  src/domain/
                     │                                     ▲
                     └──────────────▶  src/lib/ & src/config/
```
- **Cấm phụ thuộc ngược:** `src/domain/` **tuyệt đối không** import từ `store/`, `components/`, `lib/` hay `react`.
- **Cấm phụ thuộc vòng (Circular Dependency):** Các component cùng cấp (ví dụ `hud/` và `panels/`) không import chéo nhau; mọi giao tiếp đi qua `useSimulationStore`.
- **Phân ranh giới Server/Client của Next.js:** `app/layout.tsx` và `app/page.tsx` giữ ở mức nhẹ nhất, nhúng component vỏ client `<VectorQuestShell />` để toàn bộ tương tác mô phỏng chạy mượt trên client mà vẫn tận dụng tối ưu tải trang của Next.js.

---

## 5. Vị trí đặt Cấu hình, Logging, Error Handling, Unit Test & Tài liệu

- **Cấu hình (Configuration):**
  - Cấu hình build/deploy: `next.config.ts`, `postcss.config.mjs`, `tsconfig.json` ở thư mục gốc. Không cần `.env` vì không có API key hay Backend.
  - Hằng số nghiệp vụ (tốc độ gió `LIGHT/MODERATE/STRONG`, ngưỡng sai số góc mặc định `4°`, giới hạn góc kéo $\pm 60^\circ$): tập trung tại `src/config/simulation.ts`.
- **Logging:**
  - Tập trung tại `src/lib/logger.ts` với hàm `devLog` / `devWarn`: chỉ in ra console khi `process.env.NODE_ENV === 'development'`, đảm bảo bản production trên Vercel sạch hoàn toàn lỗi/log thừa.
- **Error Handling (Xử lý lỗi):**
  - Cấp toàn trang: `src/app/error.tsx` bắt lỗi không mong muốn và cung cấp nút *"Khôi phục mô phỏng"*.
  - Cấp Canvas SVG: `src/components/ui/CanvasErrorBoundary.tsx` bọc quanh `AirportRadarCanvas` để nếu trình duyệt cũ gặp trục trặc render SVG, thanh điều khiển và phần bài học vẫn hoạt động.
  - Cấp Browser API: Mọi lời gọi `AudioContext` (`audio.ts`) và `requestFullscreen` (`TopPillBar.tsx`) đều được bọc `try/catch` an toàn.
- **Unit Test:**
  - Đặt tại `tests/domain/` (tách khỏi `src/` để build production gọn nhẹ), chạy bằng **Vitest** kiểm tra 100% logic trong `vectorMath.ts` và `landingEvaluator.ts` (đặc biệt các trường hợp biên khi đổi hướng gió và ngưỡng góc $\pm \varepsilon$).
- **Tài liệu hướng dẫn:**
  - `docs/` lưu toàn bộ hồ sơ thiết kế (`PRODUCT-PROPOSAL.md`, `PRODUCT-REQUIREMENTS.md`, `TECH-STACK.md`, `ARCHITECTURE.md`).
  - `README.md` ở thư mục gốc hướng dẫn lệnh `npm run dev`, `npm test`, `npm run build` và cách deploy 1-click lên Vercel.
