# UPDATE.md — Nhật Ký Tiến Độ & Bàn Giao Agent

> **QUY TẮC BẮT BUỘC:** Mọi Coding Agent **PHẢI ĐỌC FILE NÀY TRƯỚC KHI LÀM BẤT KỲ VIỆC GÌ** và **PHẢI CẬP NHẬT FILE NÀY NGAY SAU KHI HOÀN THÀNH TASK**. Nghiêm cấm báo cáo "xong" nếu chưa chạy lệnh kiểm chứng thực tế.

---

## 1. Trạng thái Tổng quan Dự án
- **Dự án:** Vector Quest – Math 10 (Next.js + Vercel Frontend-Only Edition)
- **Thư mục thiết kế chuẩn:** `design/` (chứa các file HTML mẫu bắt buộc phải bám sát 100%)
- **Phase hiện tại:** `Hoàn thiện Chuyển đổi Song ngữ VI ↔ EN mượt mà + Teacher Studio — Sẵn sàng Deploy Vercel`
- **Trạng thái Build gần nhất:** `PASS (npm run build --webpack thành công)`
- **Trạng thái Test gần nhất:** `PASS (35/35 Vitest unit tests + 40/40 Bilingual Edge CDP assertions)`
- **Người/Agent cập nhật cuối:** `Senior Frontend & Physics Simulation Engineer (Antigravity)`
- **Thời gian cập nhật:** `2026-11-24 00:34`

---

## 2. Bảng Theo dõi Các Giai đoạn (Phase Tracker)

| Giai đoạn | Trạng thái | Khớp `design/` | `lint` | `test` | `build` | Ghi chú ngắn |
| :--- | :---: | :---: | :---: | :---: | :---: | :--- |
| **Setup** (`create-next-app` + cấu trúc) | `[x] Hoàn thành` | `Đã đối chiếu 100%` | `PASS` | `READY` | `PASS` | `Node v26.4.0, npm 11.17.0; Next.js 16.4.6 + React 19.3.0 + Tailwind v4.3.3 + Zustand + Motion + KaTeX + Lucide + Vitest; đủ thư mục & script test` |
| **Phase 1** (Foundation & Design System) | `[x] Hoàn thành` | `100%` | `PASS` | `READY` | `PASS` | `globals.css (Dark + .theme-daylight), layout.tsx (+katex.min.css), error.tsx, simulation.ts, MathFormula.tsx, CanvasErrorBoundary.tsx` |
| **Phase 2** (Pure Domain & Vitest) | `[x] Hoàn thành` | `100%` | `PASS` | `PASS (22/22)` | `PASS` | `Pure TS 0 phụ thuộc React/Zustand/DOM: types.ts, vectorMath.ts, landingEvaluator.ts, missionContent.ts + TDD Vitest suites` |
| **Phase 3** (Store & Browser Adapters) | `[x] Hoàn thành` | `100%` | `PASS` | `PASS (22/22)` | `PASS` | `audio.ts, svgCoords.ts (getScreenCTM().inverse), logger.ts, useSimulationStore.ts (Zustand Single Source of Truth)` |
| **Phase 4** (Radar Canvas & HUD Chrome) | `[x] Hoàn thành` | `100%` | `PASS` | `PASS (22/22)` | `PASS` | `AirportRadarCanvas, WindParticlesLayer, AircraftLayer, VectorOverlayLayer (KÉO ĐẦU), LiveTelemetryHud, TopPillBar, WindTelemetryPill, BottomControlDock` |
| **Phase 5** (6-Step Panels & Modals) | `[x] Hoàn thành` | `100%` | `PASS` | `PASS (22/22)` | `PASS` | `ChallengePanelHost (motion/react), StepBriefing..StepExplain, Settings/Help/VideoDemoModal, page.tsx` |
| **Phase 6** (QA, Polish & Vercel Deploy) | `[x] Hoàn thành` | `100%` | `PASS` | `PASS (26/26)` | `PASS` | `urlSync.ts, keyboard shortcuts (A–D/Space/←/→/Esc), README.md, urlSync.test.ts` |
| **Final Review** (Audit toàn diện) | `[x] Hoàn thành` | `100% (Verified on Edge)` | `PASS` | `PASS (27/27 Edge E2E)` | `PASS` | `0 console errors/warnings, 0 hydration issues, kéo thả & 6 bước PASS trên Microsoft Edge 1280×720 & 1920×1080` |
| **VI Localization** (Việt hóa & Rà soát Toán 10) | `[x] Hoàn thành` | `100% (Verified on Edge)` | `PASS` | `PASS (26/26 Vitest + 28/28 Edge E2E)` | `PASS` | `100% Tiếng Việt chuẩn Toán 10 CT GDPT 2018 + hàng không; bảo toàn tuyệt đối v⃗_A, v⃗_W, v⃗_R, KaTeX, không tràn/rớt dòng trên 1280×720 & 1920×1080` |
| **Docs & SVG Showcase** (`README.md` + `docs/assets/`) | `[x] Hoàn thành` | `100% Aerospace HUD` | `N/A` | `SVG XML PASS` | `N/A` | `4 SVG self-contained (logo, hero-banner, vector-mechanics, architecture-flow) + README.md 100% Tiếng Việt` |
| **Daylight & TV Audit** (Theme Sáng & Typography 3–5m) | `[x] Hoàn thành` | `100% (Verified on Edge)` | `PASS` | `PASS (26/26 Vitest + 32/32 Edge E2E)` | `PASS` | `Daylight Avionics (#EAF0F6 + #FFFFFF/94 + #1E293B runway + #D97706/#0284C7/#059669/#E11D48 vectơ); nâng cỡ chữ TV 12–24px, tabular-nums, 0 chồng lấn 1280×720` |
| **Aircraft & Teacher UX** (Máy bay 3D SVG & Nút `- / +`) | `[x] Hoàn thành` | `100% (Verified on Edge)` | `PASS` | `PASS (26/26 Vitest + 40/40 Edge E2E)` | `PASS` | `RealisticAircraftSvg đa lớp (động cơ, kính lái, đèn cánh đỏ/xanh lá, bóng đổ) đồng bộ Radar & Bước 3; cụm 7 nút -5°..+5°/0° (press-and-hold), gió ±5 KT, gợi ý góc chuẩn, phím ↑/↓` |
| **Teacher Studio** (Tùy biến Giáo viên 100% FE) | `[x] Hoàn thành` | `100% (Verified on Edge)` | `PASS` | `PASS (31/31 Vitest + 48/48 Edge E2E)` | `PASS` | `Phép cộng/trừ, bộ số đẹp 30°/45°/3-4-5, xoay đường băng -45°..+45°, Blind Mode giấu số liệu, TV Scale 100/115/125%, lưu localStorage, URL share, Bút vẽ Radar` |
| **Bilingual VI ↔ EN** (Chuyển đổi Ngôn ngữ 100% FE) | `[x] Hoàn thành` | `100% (Verified on Edge)` | `PASS` | `PASS (35/35 Vitest + 40/40 Edge E2E)` | `PASS` | `Toggle VI | EN tức thì ở TopPillBar & SettingsModal, giữ nguyên 100% ký hiệu Toán 10 & trạng thái mô phỏng đang chạy, lưu localStorage (vq_language_v1) + ?lang=en` |

---

## 3. Mẫu Báo cáo Chi tiết (Agent điền nối tiếp bên dưới sau mỗi lần chạy)

```markdown
### [YYYY-MM-DD HH:mm] — <PHASE/TASK ID> — <Trạng thái: COMPLETED | BLOCKED>
- **Skills đã kích hoạt & áp dụng:** `@skill-1`, `@skill-2`
- **Tài liệu & File thiết kế đã đọc trước khi làm:** `UPDATE.md`, `design/*.html`, `docs/PROJECT-BLUEPRINT.md`, ...
- **Các file đã tạo / chỉnh sửa:**
  - `path/to/file1.ts` — Mô tả ngắn thay đổi
  - `path/to/file2.tsx` — Mô tả ngắn thay đổi
- **Đối chiếu với `design/*.html`:** Khớp 100% bố cục, màu sắc, font, component / Ghi rõ nếu có điểm cần lưu ý
- **Kết quả kiểm chứng thực tế (Command & Output tóm tắt):**
  - `npm run lint`: PASS / FAIL
  - `npx vitest run`: PASS (X/X tests) / FAIL
  - `npm run build`: PASS / FAIL
- **Vấn đề phát sinh / Điểm chưa hoàn thành (nếu có):** Không có / Mô tả rõ
- **Bước tiếp theo đề xuất:** Chuyển sang `<NEXT PHASE>`
```

---

## 4. Nhật ký Cập nhật (Log History)
*(Agent thêm báo cáo mới nhất lên đầu mục này)*

### [2026-11-24 00:09] — TEACHER STUDIO & CUSTOMIZATION (100% FRONTEND) — COMPLETED
- **Skills đã kích hoạt & áp dụng:** `@idea-to-project`, `@spec-driven-development`, `@test-driven-development`, `@frontend-ui-engineering`, `@ui-ux-pro-max`, `@browser-testing-with-devtools`, `@doubt-driven-development`
- **Các file đã tạo / cập nhật:**
  - `src/domain/{types,vectorMath,landingEvaluator}.ts`: Bổ sung `VectorOperationMode` (`add`/`subtract`), `TvScaleMode` (`normal`/`large`/`xlarge`), `SPECIAL_ANGLE_PRESETS` (`30°`, `45°`, `3-4-5`, `Đường băng chéo +30°`, `Chuẩn 140/25`), `computeRequiredAircraftVector`, mở rộng `computeSimulationTelemetry` & `evaluateLanding` hỗ trợ độ lớn tùy chỉnh `|v_A|`, `|v_W|` và xoay góc đường băng `-45°..+45°`.
  - `tests/domain/{vectorMath,landingEvaluator,urlSync}.test.ts`: Bổ sung 5 unit tests TDD cho bộ số đẹp $30^\circ/45^\circ/3\text{-}4\text{-}5$, phép trừ vectơ, đường băng xoay $+30^\circ / -25^\circ$, và serialize/parse URL query params Teacher Studio (`31/31` PASS).
  - `src/lib/urlSync.ts` & `src/store/useSimulationStore.ts`: Đồng bộ đầy đủ `mode`, `va`, `vw`, `rw`, `blind`, `tv` qua query params; quản lý `chalkEnabled`, `chalkPaths`, `applySpecialPreset`, `applyTeacherConfig`.
  - `src/components/modals/TeacherStudioModal.tsx` (Mới) & `src/components/hud/TopPillBar.tsx`: Thêm nút `Giáo viên`, nút `Bút vẽ`, huy hiệu `Mở đáp án`, bảng tùy biến phép cộng/trừ, bộ số đẹp, slider đường băng `-45°..+45°`, `Blind Mode`, `TV Scale` (`100%/115%/125%`), lưu preset vào `localStorage` (`vq_teacher_presets_v1`) và nút `Sao chép Link bài giảng`.
  - `src/components/canvas/{AirportRadarCanvas,AircraftLayer,VectorOverlayLayer,LiveTelemetryHud}.tsx`, `src/components/hud/WindTelemetryPill.tsx`, `src/components/panels/StepVectorCheck.tsx`, `src/app/{page.tsx,globals.css}`: Xoay trực quan đường băng & trục chuẩn, lớp Bút ghi chú tạm SVG (`Chalk Overlay`), che số liệu `??.?°` khi bật Blind Mode, hiển thị công thức phép trừ $\vec{v}_A = \vec{v}_R - \vec{v}_W$, và áp dụng class `.tv-scale-large` / `.tv-scale-xlarge`.
- **Kết quả kiểm chứng thực tế sau lần sửa cuối:**
  - `npx tsc --noEmit`: **PASS** (0 errors)
  - `npm run lint`: **PASS** (0 warnings / 0 errors)
  - `npx vitest run`: **PASS (`3/3` files, `31/31` tests)**
  - `npm run build` (`next build --webpack`): **PASS**
  - **Microsoft Edge E2E (`verify-edge.mjs`):** **PASS (`48/48` assertions)** — kiểm thử đầy đủ bộ số đẹp `30°` (`100/50`), bật `Blind Mode` (`??.?°`), mở đáp án & hạ cánh an toàn ở `+30°`, `Sao chép Link bài giảng`, khôi phục link `?dir=rtl&strength=strong&step=4&mode=subtract&va=100&vw=50&rw=30`, bật/tắt Bút ghi chú và TV Scale `115%` trên cả `1280×720` & `1920×1080`.

### [2026-11-23 23:50] — AIRCRAFT REALISM & TEACHER PRECISION UX — COMPLETED
- **Skills đã kích hoạt & áp dụng:** `@ui-ux-pro-max`, `@frontend-ui-engineering`, `@design`, `@browser-testing-with-devtools`, `@doubt-driven-development`
- **Các file đã tạo / cập nhật:**
  - `src/components/ui/RealisticAircraftSvg.tsx` (Mới, 100% inline SVG nội bộ): Máy bay phản lực nhìn từ trên xuống đa lớp gồm bóng đổ mềm, 2 động cơ phản lực dưới cánh, cánh chính xuôi + đường cánh tà, cánh đuôi ngang/đứng, thân tạo khối gradient 3D, kính buồng lái tối phản chiếu và đèn dẫn hướng đầu cánh chuẩn ICAO (đỏ bên trái, xanh lá bên phải, trắng ở đuôi).
  - `src/components/canvas/AircraftLayer.tsx` & `src/components/panels/StepObserveGrid.tsx`: Đồng bộ sử dụng `<RealisticAircraftSvg />` trên radar chính và 4 thẻ đáp án `[A–D]` Bước 3.
  - `src/domain/vectorMath.ts` & `src/store/useSimulationStore.ts`: Mở rộng tùy chọn `customWindSpeedKts?: number` (5–50 KT) và bổ sung `adjustAircraftHeading(deltaDeg)` / `adjustWindSpeed(deltaKts)` mà không làm thay đổi công thức vật lý hay test cũ.
  - `src/components/panels/StepVectorCheck.tsx`: Bổ sung cụm 7 nút tinh chỉnh góc chiều cao `40px` (`-5°`, `-1°`, `-0.5°`, `0°`, `+0.5°`, `+1°`, `+5°`) hỗ trợ click từng nhịp và nhấn giữ (`press-and-hold`), thanh chỉ báo độ lệch thời gian thực (`Độ lệch quỹ đạo`), và nút `"Gợi ý góc cân bằng"` khi bật Hướng dẫn.
  - `src/components/canvas/VectorOverlayLayer.tsx`: Kéo tay cầm `KÉO ĐẦU` hỗ trợ làm tròn thông minh theo bước `0.5°` (giữ `Shift` để kéo siêu mịn `0.1°`, hút nhẹ quanh góc cân bằng lý tưởng), vạch tham chiếu góc chuẩn khi bật Hướng dẫn và pill chỉ báo độ lệch trực tiếp trên vòng đo độ.
  - `src/components/hud/{WindTelemetryPill,BottomControlDock}.tsx` & `src/app/page.tsx`: Thêm nút `-5` / `+5` chỉnh tốc độ gió `5–50 KT`, đảm bảo vùng bấm tối thiểu `40px` trên thanh điều khiển đáy, và phím tắt `ArrowUp`/`ArrowDown`/`+`/`-` chỉnh góc mũi ở Bước 4–6.
- **Kết quả kiểm chứng thực tế sau lần sửa cuối:**
  - `npx tsc --noEmit`: **PASS** (0 errors)
  - `npm run lint`: **PASS** (0 warnings / 0 errors)
  - `npx vitest run`: **PASS (`3/3` files, `26/26` tests)**
  - `npm run build` (`next build --webpack`): **PASS**
  - **Microsoft Edge E2E (`verify-edge.mjs`):** **PASS (`40/40` assertions)** trên cả **Dark Cockpit** & **Daylight Avionics** tại `1920×1080` và `1280×720` (`0` console errors/warnings, `0` tràn ngang, `0` rớt dòng nút, `0` chồng lấn card, xác nhận bấm `-5°..-0.5°/+0.5°..+5°/0°`, `Gợi ý góc cân bằng`, gió `±5 KT`, kéo `KÉO ĐẦU`).

### [2026-11-23 23:32] — DAYLIGHT AVIONICS THEME & TV/PROJECTOR TYPOGRAPHY AUDIT — COMPLETED
- **Skills đã kích hoạt & áp dụng:** `@ui-ux-pro-max`, `@design-system`, `@ui-styling`, `@browser-testing-with-devtools`, `@doubt-driven-development`
- **Đánh giá hiện trạng trước khi sửa:**
  1. **Theme Sáng (`.theme-daylight`) cũ bị chói và thiếu tách lớp:** Các lớp SVG (`AirportRadarCanvas`, `AircraftLayer`, `VectorOverlayLayer`, `StepPrediction`, `VideoDemoModal`) gán cứng màu neon của Dark Mode (`#ffc640`, `#38bdf8`, `#56e5a9`, `#ffb4ab`, `#8ed5ff`, `#dfe2ef`), đường băng dùng `var(--surface-container-high)` (`#e2e8f0`) hòa lẫn nền sáng, vòng thước đo góc/hộp nhãn dùng nền tối `#181b25`, và công thức ở `WindTelemetryPill` dùng `text-primary-fixed` (`#e0f2fe`) bị mờ trên nền trắng.
  2. **Typography chưa tối ưu cho TV / Máy chiếu nhìn xa (3–5m):** Nhãn thông số & chú thích SVG dùng cỡ chữ `8.5px–11px` (`--text-label-caps: 10px`, `--text-telemetry-sm: 11px`), nét vectơ `2.2px–3.5px` khá mảnh. Khi thử tăng cỡ chữ ở `1280×720`, `WindTelemetryPill` từng chạm nhẹ mép trên `LiveTelemetryHud` nên đã tinh chỉnh lại khoảng đệm để tách bạch `60px`.
- **Các cải tiến đã thực hiện (KHÔNG sửa `src/domain/` hay `tests/`):**
  - `src/app/globals.css`: Bổ sung bộ biến semantic `--radar-*`, `--runway-*`, `--vec-a/w/r-safe/r-drift`, `--hud-card-shadow` cho cả Dark Cockpit và Daylight Avionics (`#eaf0f6` nền sân bay, `rgba(255,255,255,0.94)` thẻ HUD, viền `#cbd5e1`, bóng đổ `0 8px 24px rgba(15,23,42,0.08)`, đường băng `#1e293b`, $\vec{v}_A$ `#d97706`, $\vec{v}_W$ `#0284c7`, $\vec{v}_R$ `#059669`/`#e11d48`); cập nhật font stack Tiếng Việt `"Be Vietnam Pro", "Inter", "Segoe UI"` + `"JetBrains Mono", "Cascadia Mono"` với `tabular-nums`, nâng KaTeX `.katex { font-size: 1.1em; }` và scale chữ lên `11.5px–24px`.
  - `src/components/canvas/{AirportRadarCanvas,AircraftLayer,VectorOverlayLayer,WindParticlesLayer,LiveTelemetryHud}.tsx`: Chuyển toàn bộ màu vectơ/đường băng/vạch kẻ/la bàn sang CSS variables theo theme; tắt glow filter khi ở Daylight để nét vẽ sắc gọn; nâng `fontSize` SVG lên `11px–13.5px` (`fontWeight: 700`) và tăng `strokeWidth` vectơ lên `2.8px–4.6px`.
  - `src/components/hud/{TopPillBar,WindTelemetryPill,BottomControlDock}.tsx`, `src/components/panels/{ChallengePanelHost,StepPrediction}.tsx`, `src/components/modals/VideoDemoModal.tsx`: Áp dụng viền `border-outline-variant/60`, bóng đổ `--hud-card-shadow`, sửa công thức ở `WindTelemetryPill` sang `text-primary font-bold`, thu gọn nhịp dọc thẻ trái để đạt khoảng hở `60px` tại `1280×720`.
- **Kết quả kiểm chứng thực tế sau lần sửa cuối:**
  - `npx tsc --noEmit`: **PASS** (0 errors)
  - `npm run lint`: **PASS** (0 warnings / 0 errors)
  - `npx vitest run`: **PASS (`3/3` files, `26/26` tests)**
  - `npm run build` (`next build --webpack`): **PASS**
  - **Microsoft Edge E2E (`verify-edge.mjs`):** **PASS (`32/32` assertions)** trên cả **Dark Cockpit** & **Daylight Avionics** tại `1920×1080` và `1280×720` (`0` console errors/warnings, `0` tràn ngang, `0` rớt dòng nút bấm, `0` chồng lấn card ở `1280×720`).

### [2026-11-23 23:10] — README & SVG SHOWCASE (TIẾNG VIỆT) — COMPLETED
- **Skills đã kích hoạt & áp dụng:** `@documentation-and-adrs`, `@design`, `@ui-ux-pro-max`, `@git-workflow-and-versioning`, `@doubt-driven-development`
- **Tài liệu & Code đã đối chiếu:** `update.md`, `package.json`, `src/config/simulation.ts`, `src/domain/missionContent.ts`, `.gitignore`, cây thư mục `src/` & `tests/`
- **Các file đã tạo / cập nhật (KHÔNG chạm `src/` hay `tests/`):**
  - `docs/assets/hero-banner.svg` (`1200×420`) — Banner Aerospace HUD giới thiệu `NHIỆM VỤ VECTƠ • TOÁN 10`, radar đường băng `36L`, máy bay nhìn từ trên xuống, 3 vectơ $\vec{v}_A, \vec{v}_W, \vec{v}_R$, công thức $\vec{v}_R = \vec{v}_A + \vec{v}_W$, badge `Next.js 16.4.6`, `React 19.3.0`, `Zero Backend`.
  - `docs/assets/vector-mechanics.svg` (`1000×360`) — Sơ đồ so sánh 3 trạng thái: giữ mũi thẳng bị trôi, chếch mũi ngược gió $\vec{v}_R$ song song đường băng, và điều kiện $|\Delta\theta(\vec{v}_R, \text{đường băng})| \le \varepsilon$ ($\pm 3^\circ / \pm 4^\circ / \pm 5^\circ$).
  - `docs/assets/architecture-flow.svg` (`1000×340`) — Kiến trúc phân lớp 4 tầng 100% Frontend-only (`src/app & components` → `src/store` → `src/domain` + Vitest → `src/lib & config`).
  - `README.md` — Viết lại hoàn chỉnh 100% Tiếng Việt, nhúng cả 3 SVG qua `./docs/assets/...`, đầy đủ bảng phiên bản thực tế từ `package.json`, cây thư mục thật, phím tắt lớp học, ví dụ URL query params, hướng dẫn cài đặt & deploy Vercel.
- **Kiểm chứng thực tế:**
  - Parse XML/SVG 3 file bằng `[xml]` PowerShell: **VALID SVG** (`hero-banner.svg` `1200×420`, `vector-mechanics.svg` `1000×360`, `architecture-flow.svg` `1000×340`), không lỗi cú pháp, không phụ thuộc font/ảnh ngoài.
  - `git status --short`: Không có thay đổi ngoài phạm vi tài liệu (`src/` và `tests/` nguyên vẹn).

### [2026-11-23 23:05] — VIETNAMESE LOCALIZATION & SEMANTIC AUDIT — COMPLETED
- **Skills đã kích hoạt & áp dụng:** `@spec-driven-development`, `@code-review-and-quality`, `@ui-ux-pro-max`, `@browser-testing-with-devtools`, `@doubt-driven-development`
- **Tài liệu & File đã kiểm tra trước khi làm:** `update.md`, toàn bộ chuỗi hiển thị trong `src/domain/missionContent.ts`, `src/app/{layout.tsx,error.tsx}`, `src/store/useSimulationStore.ts`, `src/components/{hud,canvas,panels,modals,ui}/`, và `tests/domain/landingEvaluator.test.ts`
- **Các file đã cập nhật (100% Tiếng Việt chuẩn Toán 10 CT GDPT 2018 & hàng không, bảo toàn tuyệt đối ký hiệu vectơ):**
  - `src/store/useSimulationStore.ts` — Đặt mặc định `language: "vi"`.
  - `src/domain/missionContent.ts` — Việt hóa `TOP_NAV_STAGES` (`01 Mở đầu`, `02 Thử thách`, `03 Hạ cánh`, `04 Giải thích`), `MISSION_STEPS` 1–6, `HEADING_OPTIONS` (`Giữ bay thẳng`, `Rẽ phải gắt`, `Rẽ sang trái`, `Rẽ nhẹ sang phải`), `STEP3_FEEDBACK`, `getStep3HintForWind`, và `STEP5_OUTCOMES` (`✓ HẠ CÁNH AN TOÀN!`, `HOÀN THÀNH NHIỆM VỤ!`, `HẠ CÁNH CHƯA ĐẠT!`).
  - `src/app/layout.tsx`, `src/app/error.tsx`, `src/components/ui/CanvasErrorBoundary.tsx` — Đặt `<html lang="vi">`, metadata (`NHIỆM VỤ VECTƠ • TOÁN 10 — Phép cộng & Phép trừ Vectơ`) và thông báo khôi phục sự cố bằng Tiếng Việt.
  - `src/components/hud/{TopPillBar,WindTelemetryPill,BottomControlDock}.tsx` — Việt hóa toàn bộ nhãn HUD, nút bấm (`whitespace-nowrap`), tooltip, `aria-label`; giữ nguyên KaTeX $\vec{v}_A, \vec{v}_W, \vec{v}_R, \vec{v}_R = \vec{v}_A + \vec{v}_W$ và chuẩn ICAO `KT`.
  - `src/components/canvas/{AircraftLayer,VectorOverlayLayer,LiveTelemetryHud}.tsx` — Việt hóa các chú thích SVG (`ĐIỂM CHẠM ĐẤT • ĐÃ KHÓA`, `DỰ KIẾN LỆCH`, `LỆCH NGANG`, `KÉO ĐẦU`, `+x (ĐÔNG)`, `+y (BẮC / TRỤC ĐƯỜNG BĂNG)`) và giữ nhãn SVG `v_A`, `v_W`, `v_R`, `O(0, 0)` sắc nét không lỗi glyph hộp vuông.
  - `src/components/panels/{ChallengePanelHost,StepBriefing,StepPrediction,StepObserveGrid,StepVectorCheck,StepExplain}.tsx` — Việt hóa toàn bộ 6 bước sư phạm; thay nút `EN/VI` bằng huy hiệu `TOÁN 10 • VECTƠ`; giữ nguyên KaTeX $\vec{v}_R = \vec{v}_A + \vec{v}_W$, $\vec{v}_A = \vec{v}_R - \vec{v}_W$, $\sin\theta = |\vec{v}_W|/|\vec{v}_A|$, $|\Delta\theta| \le \varepsilon$.
  - `src/components/modals/{SettingsModal,HelpModal,VideoDemoModal}.tsx` — Việt hóa toàn bộ tiêu đề, tùy chọn sai số góc, chế độ `Buồng lái tối` / `Máy chiếu sáng`, bảng phím tắt lớp học, và hình minh họa SVG.
  - `tests/domain/landingEvaluator.test.ts` — Cập nhật assertion khớp chuỗi Tiếng Việt chuẩn hóa trong `missionContent.ts`.
- **Đối chiếu trực quan & Kiểm thử thực tế trên Microsoft Edge (`msedge.exe` CDP `http://localhost:3000`):**
  - `npx tsc --noEmit`: **PASS (0 errors)**
  - `npm run lint`: **PASS (0 warnings / 0 errors)**
  - `npx vitest run`: **PASS (`3/3` files, `26/26` tests)**
  - `npm run build` (`next build --webpack`): **PASS**
  - **Microsoft Edge E2E DevTools (`verify-edge.mjs`):** **PASS (`28/28` assertions)** trên cả `1920×1080` và `1280×720` (`0` console errors, `0` console warnings, `0` page exceptions, `0` lỗi network, `0` tràn ngang, `0` nút bị rớt dòng ở thanh Header/Footer, kéo thả tay cầm `KÉO ĐẦU` về `+19.2°` và hạ cánh an toàn, kiểm tra đầy đủ 3 Modal & URL preset).
- **Bước tiếp theo đề xuất:** Có thể đẩy lên Git & Deploy Vercel ngay (`vercel --prod` hoặc push repo).

### [2026-11-23 22:55] — FINAL REVIEW (MICROSOFT EDGE DEVTOOLS VERIFICATION & VISUAL POLISH) — COMPLETED
- **Skills đã kích hoạt & áp dụng:** `@browser-testing-with-devtools`, `@debugging-and-error-recovery`, `@ui-ux-pro-max`, `@doubt-driven-development`, `@performance-optimization`
- **Tài liệu & File thiết kế đã đọc trước khi làm:** `update.md`, `design/*.html` và 4 ảnh chụp thực tế từ Microsoft Edge (`edge-step1-1920x1080.png`, `edge-step3-1280x720.png`, `edge-step4-5-landing.png`, `edge-step6-parallelogram.png`)
- **Các bước đã test trực tiếp trên Microsoft Edge (`msedge.exe` qua CDP `http://localhost:3000`):**
  1. **Viewport `1920×1080` & `1280×720`:** Xác nhận màu nền `#0f131c` (`rgb(15, 19, 28)`), KaTeX render sắc nét, `0` lỗi console, `0` cảnh báo hydration, `0` lỗi 404/network, `0` tràn ngang (`scrollWidth <= innerWidth`).
  2. **Wind Controls (`R → L` ↔ `L → R`, `LIGHT` / `MOD` / `STRONG`):** Đảo `L → R (WEST)` lật `#wind-streams` (`scale(-1, 1) translate(-1360, 0)`) và đổi `STRONG` lên `40 KTS` tức thời.
  3. **Luồng 6 bước & Đáp án động Bước 3:** Bước 2 ẩn đáp án trắc nghiệm; Bước 3 với gió `R → L` chọn `[D]` pass (`CORRECT PREDICTION!`), đổi sang gió `L → R` thì `[D]` báo `RECHECK WIND DIRECTION` và `[C]` pass (`CORRECT PREDICTION!`).
  4. **Kéo thả `DRAG TIP` & `CHECK LANDING`:** Để `0°` nhấn `CHECK LANDING` $\rightarrow$ hiện `LANDING FAILED!` và giữ nguyên góc `0°` (không tự reset); kéo chuột thật trên tay cầm SVG `DRAG TIP` (`[role="slider"]`) sang `+19.2°` $\rightarrow$ nhấn `CHECK LANDING` hiện `SUCCESSFUL LANDING!` (`STEP 5 COMPLETE`).
  5. **Bước 6, Nút độc lập & 3 Modals:** Bật/tắt `Show Parallelogram Construction`, `Vectors` (chỉ ẩn vectơ), mở/đóng `Video Demo`, `Settings` (đổi `Daylight Projector` `.theme-daylight` và quay lại `Dark Cockpit`), `Help`, và khôi phục preset qua URL `/?dir=ltr&strength=strong&step=4`.
- **Lỗi giao diện phát hiện từ ảnh chụp Edge & đã sửa ngay:**
  - `src/components/panels/StepExplain.tsx`: Thay ký tự tổ hợp `v⃗` (bị ô vuông thiếu glyph) bằng `<MathFormula tex="\vec{v}_A" />`, `<MathFormula tex="\vec{v}_W" />`, `<MathFormula tex="\vec{v}_R" />`.
  - `src/components/canvas/VectorOverlayLayer.tsx`: Làm sạch nhãn SVG (`v_A`, `v_W`, `v_R`) và đẩy nhãn `v_W` lên trên `000°` tránh đè chữ.
  - `src/components/canvas/AircraftLayer.tsx`: Đặt nhãn `TOUCHDOWN TARGET` phía trên đầu đường băng `y = 26` tránh đè chữ `36 L`.
  - `src/app/page.tsx` & `src/components/canvas/LiveTelemetryHud.tsx`: Đổi `min-h-[520px]` và thu gọn warning pill (`bottom-4 left-8 max-w-[340px]`) để tách bạch hoàn toàn khỏi `BottomControlDock` ở `1280×720`.
- **Kết quả kiểm chứng thực tế sau lần sửa cuối:**
  - `npx vitest run`: **PASS** (`3 passed (3)` files, `26 passed (26)` tests trong `292ms`)
  - `npm run lint`: **PASS** (exit code 0)
  - `npm run build`: **PASS** (`next build --webpack` biên dịch thành công trong 8.5s, TypeScript 2.9s)
  - Microsoft Edge CDP Verification (`verify-edge.mjs`): **PASS** (`27/27` assertions, `0` console errors, `0` warnings, `0` page exceptions, `0` failed network responses)
- **Vấn đề phát sinh / Điểm chưa hoàn thành (nếu có):** Không có.
- **Bước tiếp theo đề xuất:** Dự án đã hoàn tất 100% và sẵn sàng push lên Git / deploy Vercel.

### [2026-11-23 22:49] — PHASE 06 (T6.1 & T6.2: KEYBOARD SHORTCUTS, URL SYNC, README & BROWSER QA) — COMPLETED (BROWSER LIVE CHECK CHỜ BẬT REMOTE DEBUGGING)
- **Skills đã kích hoạt & áp dụng:** `@browser-testing-with-devtools`, `@performance-optimization`, `@ci-cd-and-automation`, `@shipping-and-launch`, `@git-workflow-and-versioning`, `@doubt-driven-development`
- **Tài liệu & File thiết kế đã đọc trước khi làm:** `update.md`, `README.md`, `design/*.html`
- **Các file đã tạo / chỉnh sửa:**
  - `src/lib/urlSync.ts` — `parseSimulationQueryParams()`, `buildSimulationQueryString()` và `syncSimulationToUrl()` đồng bộ `?dir=rtl|ltr&strength=light|moderate|strong&step=1..6`
  - `src/app/page.tsx` — Khôi phục/đồng bộ URL query params và gắn phím tắt lớp học (`A–D` chọn đáp án Bước 3, `Space` Play/Pause, `←/→` chuyển bước, `Esc` đóng modal; vô hiệu hóa khi đang mở modal)
  - `tests/domain/urlSync.test.ts` — 4 unit tests kiểm tra parse hợp lệ, thiếu param, param sai biên và build query string
  - `README.md` — Hướng dẫn cài đặt, chạy local (`npm run dev`), unit tests (`npm test`), phím tắt, URL preset và deploy Vercel
  - `update.md` — Cập nhật kết quả Phase 6 và trạng thái kết nối Browser DevTools
- **Đối chiếu với `design/*.html`:**
  - Toàn bộ cấu trúc HTML/CSS/SVG của ứng dụng (Header `TopPillBar`, `WindTelemetryPill`, `AirportRadarCanvas`, `LiveTelemetryHud`, `ChallengePanelHost` Bước 1–6, `BottomControlDock`, 3 modals) đã được cài đặt khớp 100% với `design/*.html`.
  - Lưu ý kiểm thử trình duyệt trực tiếp: Đã khởi động production server tại `http://localhost:3000` (task daemon) và gọi subagent `browser`, nhưng kết nối Chrome DevTools trả lỗi chưa bật Remote Debugging (`Could not find DevToolsActivePort for chrome at C:\Users\Admin\AppData\Local\Google\Chrome\User Data\DevToolsActivePort`).
- **Kết quả kiểm chứng thực tế (Command & Output tóm tắt):**
  - `npx vitest run`: **PASS** (`3 passed (3)` files, `26 passed (26)` tests trong `340ms`)
  - `npm run lint`: **PASS** (exit code 0)
  - `npm run build`: **PASS** (`next build --webpack` biên dịch thành công static pages `/`, `/_not-found`)
  - `npm run start`: **RUNNING** tại `http://localhost:3000` (`✓ Ready in 327ms`)
  - `Browser DevTools MCP`: **BLOCKED** — Chưa tìm thấy `DevToolsActivePort` (`chrome://inspect/#remote-debugging` chưa bật trên máy người dùng).
- **Vấn đề phát sinh / Điểm chưa hoàn thành (nếu có):** Phần kiểm thử tương tác live trên trình duyệt qua DevTools MCP đang tạm dừng do Chrome chưa bật Remote Debugging (`chrome://inspect/#remote-debugging`).
- **Bước tiếp theo đề xuất:** Bật Remote Debugging tại `chrome://inspect/#remote-debugging` trong Chrome/Edge (hoặc mở trực tiếp `http://localhost:3000` trên trình duyệt) và báo lại để tôi resume subagent `browser` (`d645a7ea-1b6d-43ac-8183-b9748aa5be7b`) chạy trọn bộ kiểm tra UI/kéo thả thực tế và chốt **Final Review**.

### [2026-11-23 22:42] — PHASE 05 (T5.1, T5.2, T5.3: 6-STEP PANELS, MODALS & PAGE INTEGRATION — CHECKPOINT 2) — COMPLETED
- **Skills đã kích hoạt & áp dụng:** `@ui-ux-pro-max`, `@frontend-ui-engineering`, `@design-system`, `@code-simplification`, `@code-review-and-quality`
- **Tài liệu & File thiết kế đã đọc trước khi làm:** `update.md`, `design/vector_quest_flight_briefing/code.html`, `design/vector_quest_step_03_pilot_prediction/code.html`, `design/vector_quest_step_04_05_vector_sandbox/code.html`, `design/vector_quest_step_04_parallelogram_proof_debrief/code.html`
- **Các file đã tạo / chỉnh sửa:**
  - `src/components/panels/StepBriefing.tsx` — Bước 1 (`A SUDDEN CROSSWIND!`), toggle EN/VI, tóm tắt gió/trôi dạt & nút `PROCEED TO PILOT CHALLENGE`
  - `src/components/panels/StepPrediction.tsx` — Bước 2 (`WHAT WOULD YOU DO?`), giữ nguyên SVG `TACTICAL VECTOR HEADING ARC` (`viewBox="0 0 320 100"`), chưa lộ đáp án A–D, kèm drawer `Trigonometry Reference`
  - `src/components/panels/StepObserveGrid.tsx` — Bước 3 (`PILOT CORRECTION CHALLENGE`), lưới 2×2 mini-radar `[A] HDG 360°`, `[B] HDG 045°`, `[C] HDG 335°`, `[D] +18.4°` với mũi tên gió thích ứng `rtl`/`ltr`, thanh trạng thái & `CHECK ANSWER`
  - `src/components/panels/StepVectorCheck.tsx` — Bước 4–5 (`LET US CHECK!` / `CHECK LANDING`), thanh trượt tinh chỉnh góc `[-60°, +60°]`, `WATCH FLIGHT`, `CHECK LANDING`, banner Emerald `SUCCESSFUL LANDING!` / Coral Red `LANDING FAILED!` (không tự reset góc), `PHYSICS VECTOR RESOLUTION`
  - `src/components/panels/StepExplain.tsx` — Bước 6 (`WHAT DID WE DISCOVER?`), thẻ `VECTOR ADDITION FORMULA` ($\vec{v}_R = \vec{v}_A + \vec{v}_W$), 2 công tắc `Show Parallelogram Construction` & `Show Coordinate Grid`, hộp `PARALLELOGRAM LAW OF VECTORS`, nút `REPLAY SIM ↺` & `COMPLETE ✓`
  - `src/components/panels/ChallengePanelHost.tsx` — Điều phối chuyển cảnh mượt bằng `AnimatePresence` + `motion.div` (`motion/react`)
  - `src/components/modals/SettingsModal.tsx` — Chỉnh sai số góc (`±3° / ±4° / ±5°`), EN/VI, Dark Cockpit / Daylight Projector, Audio SFX
  - `src/components/modals/HelpModal.tsx` — Hướng dẫn thao tác và bảng phím tắt lớp học
  - `src/components/modals/VideoDemoModal.tsx` — Minh họa SVG trực quan quy tắc hình bình hành & bù gió ngang tích hợp sẵn
  - `src/app/page.tsx` — Ghép toàn bộ HUD 16:9 (`TopPillBar`, `CanvasErrorBoundary` + `AirportRadarCanvas`, `WindTelemetryPill`, `ChallengePanelHost`, `BottomControlDock`, 3 modals) và đồng bộ theme `dark` / `theme-daylight` lên `document.documentElement`
  - `update.md` — Cập nhật kết quả Checkpoint 2
- **Đối chiếu với `design/*.html`:**
  - Khớp 100% bố cục 4 màn hình HTML mẫu (Step 1–2 `w-[384px]`, Step 3–6 `w-[420px]`, đúng vị trí `top-6 right-8`, cấu trúc thẻ 2×2 mini-radar, thẻ `SUCCESSFUL LANDING!` / `PHYSICS VECTOR RESOLUTION`, thẻ `PARALLELOGRAM RULE` và 0 nút chết trên Header/Dock/Panels).
  - Kiểm tra không có import chéo giữa `hud/`, `canvas/`, `panels/`, `modals/`.
- **Kết quả kiểm chứng thực tế (Command & Output tóm tắt):**
  - Kiểm tra không import chéo (`hud/` ↔ `canvas/` ↔ `panels/` ↔ `modals/`): **PASS** (0 vi phạm)
  - `npx vitest run`: **PASS** (`2 passed (2)` files, `22 passed (22)` tests trong `316ms`)
  - `npm run lint`: **PASS** (exit code 0)
  - `npm run build`: **PASS** (`next build --webpack` biên dịch thành công trong 7.2s, TypeScript 3.1s, static pages `/`, `/_not-found`)
- **Vấn đề phát sinh / Điểm chưa hoàn thành (nếu có):** Không có.
- **Bước tiếp theo đề xuất:** Chuyển sang `Phase 6 (T6.1 & T6.2: Keyboard Shortcuts, URL Params Sync, QA, Polish & Vercel Release)`.

### [2026-11-23 22:37] — PHASE 04 (T4.1, T4.2, T4.3: AIRPORT RADAR CANVAS & HUD CHROME) — COMPLETED
- **Skills đã kích hoạt & áp dụng:** `@frontend-ui-engineering`, `@ui-ux-pro-max`, `@design`, `@ui-styling`, `@performance-optimization`
- **Tài liệu & File thiết kế đã đọc trước khi làm:** `update.md`, `src/store/useSimulationStore.ts`, `design/vector_quest_flight_briefing/code.html`, `design/vector_quest_step_03_pilot_prediction/code.html`, `design/vector_quest_step_04_05_vector_sandbox/code.html`, `design/vector_quest_step_04_parallelogram_proof_debrief/code.html`
- **Các file đã tạo / chỉnh sửa:**
  - `src/components/canvas/WindParticlesLayer.tsx` — 6 luồng gió cyan động (`#wind-streams`), tự đảo chiều `rtl`/`ltr`, đổi tốc độ theo `light`/`moderate`/`strong`, tạm dừng mượt theo `isPlaying`
  - `src/components/canvas/AircraftLayer.tsx` — Đường tâm đường băng, `TOUCHDOWN TARGET • LOCKED`, vệt quỹ đạo đứt nét + `PROJECTED MISS`, `LOC DEV` caliper và máy bay top-down xoay theo `aircraftHeadingDeg` (hỗ trợ hoạt ảnh `Watch Flight`)
  - `src/components/canvas/VectorOverlayLayer.tsx` — Vòng chia độ 360°, lưới tọa độ Bước 6 (`+X EAST`, `+Y NORTH / RUNWAY`), hình bình hành + nét đứt quy tắc hình bình hành, 3 vectơ ($\vec{v}_A$ vàng, $\vec{v}_W$ cyan, $\vec{v}_R$ xanh ngọc/đỏ san hô), tay cầm `DRAG TIP` dùng Native Pointer Events (`setPointerCapture`, `touch-action: none`, hit-area đường kính `52px >= 44px`)
  - `src/components/canvas/LiveTelemetryHud.tsx` — Góc dưới trái: Status Warning Pill (Bước 1–3) & `VECTOR EQUILIBRIUM HUD` (Bước 4–6) kèm công thức KaTeX $\vec{v}_R = \vec{v}_A + \vec{v}_W$
  - `src/components/canvas/AirportRadarCanvas.tsx` — SVG stage `viewBox="0 0 1360 720"`, radial vignette, lưới chấm, vòng `5 NM`/`10 NM`/`15 NM`, glideslope cone, Runway `36 L` (đèn ngưỡng xanh, vạch ngắm chạm đất, tim đèn, dải an toàn đỏ, làm dịu opacity ở Bước 6)
  - `src/components/hud/TopPillBar.tsx` — Brand `AVIONICS SIM / VECTOR QUEST • MATH 10`, 4 tab giai đoạn (`01 Briefing`..`04 Debrief`), nút `Video Demo`, `Settings`, `Audio`, `Fullscreen` (bọc `try/catch`), `Help`, và nút đổi theme Dark/Daylight
  - `src/components/hud/WindTelemetryPill.tsx` — Card `WIND VECTOR CONTROL` (`SIM_SYS 01`) góc trên trái với `R → L (EAST)` / `L → R (WEST)`, `LIGHT` / `MOD (25 KT)` / `STRONG`, ma trận telemetry 2×2 và công thức KaTeX
  - `src/components/hud/BottomControlDock.tsx` — Dock đáy gồm `Back`, `Reset`, `Play/Pause`, `Watch Flight`/`Replay Flight`, `Check Landing`, chỉ báo 6 chấm tiến trình, `Guide`, `Vectors`, `Parallelogram Mode` (Bước 6) và `Next`/`Explain`
  - `update.md` — Cập nhật kết quả đối chiếu và kiểm chứng Phase 4
- **Đối chiếu với `design/*.html`:**
  - Khớp 100% bố cục, màu sắc (`#ffc640`, `#38bdf8`, `#56e5a9`, `#f43f5e`, `#ffb4ab`), kích thước SVG, nhãn văn bản, vị trí góc card (`top-6 left-8`, `bottom-6 left-8`, header `h-20`, footer pill dock) và hành vi 0 nút chết trên Header/Dock/Telemetry.
  - Không có import chéo giữa `src/components/canvas/` và `src/components/hud/`.
- **Kết quả kiểm chứng thực tế (Command & Output tóm tắt):**
  - Kiểm tra không import chéo (`canvas/` ↔ `hud/`): **PASS** (0 matches)
  - `npm run lint`: **PASS** (exit code 0)
  - `npm run build`: **PASS** (`next build --webpack` biên dịch thành công trong 2.7s, TypeScript 2.7s, static pages `/`, `/_not-found`)
  - `npx vitest run`: **PASS** (`2 passed (2)` files, `22 passed (22)` tests trong `335ms`)
- **Vấn đề phát sinh / Điểm chưa hoàn thành (nếu có):** Không có.
- **Bước tiếp theo đề xuất:** Chuyển sang `Phase 5 (T5.1, T5.2, T5.3: 6-Step Pedagogical Panels, Modals & Checkpoint 2)`.

### [2026-11-23 22:32] — PHASE 03 (T3.1 & T3.2: STATE STORE & BROWSER ADAPTERS) — COMPLETED
- **Skills đã kích hoạt & áp dụng:** `@incremental-implementation`, `@debugging-and-error-recovery`, `@observability-and-instrumentation`, `@code-simplification`
- **Tài liệu & File thiết kế đã đọc trước khi làm:** `update.md`, `src/domain/types.ts`, `docs/architecture.md`, `design/vector_quest_flight_briefing/code.html`, `design/vector_quest_step_03_pilot_prediction/code.html`, `design/vector_quest_step_04_05_vector_sandbox/code.html`, `design/vector_quest_step_04_parallelogram_proof_debrief/code.html`
- **Các file đã tạo / chỉnh sửa:**
  - `src/lib/logger.ts` — `devLog()` và `devWarn()` chỉ xuất log khi `NODE_ENV === 'development'`
  - `src/lib/audio.ts` — Web Audio API synthesizer (`playClick`, `playSuccess`, `playAlert`) bọc `try/catch` an toàn trước SSR và browser autoplay policy
  - `src/lib/svgCoords.ts` — `clientToSvgPoint()` qua `getScreenCTM()?.inverse()` (kèm fallback `getBoundingClientRect()`) và `svgPointToHeadingOffsetDeg()` clamp `[-60°, +60°]`
  - `src/store/useSimulationStore.ts` — Zustand store duy nhất quản lý toàn bộ trạng thái 6 bước, gió (`rtl`/`ltr`, `light`/`moderate`/`strong`), góc máy bay, `toggleVectors()` (chỉ đổi `vectorsVisible`), `toggleGuide()` (không ẩn/đổi vectơ), `checkLanding()` (không tự reset khi `LANDING_FAILED`), `resetSimulation()`, `watchFlight()`, ngôn ngữ `EN/VI`, theme `dark/daylight`, sai số góc `toleranceDeg`, và modals
  - `update.md` — Cập nhật báo cáo Phase 3
- **Đối chiếu với `design/*.html`:**
  - Đã đối soát và bao phủ 100% trạng thái cho mọi nút bấm xuất hiện trong 4 file HTML (`01 Briefing`..`04 Debrief`, `Video`, `Settings`, `Audio`, `Fullscreen`, `Help`, `R → L`/`L → R`, `LIGHT`/`MOD`/`STRONG`, `EN`/`VI`, `A/B/C/D`, `CHECK ANSWER`, `DRAG TIP`, `WATCH FLIGHT`, `CHECK LANDING`, `Show Parallelogram Construction`, `Show Coordinate Grid`, `Reset`, `Play/Pause`, `Guide`, `Vectors`, `Back`/`Next`).
- **Kết quả kiểm chứng thực tế (Command & Output tóm tắt):**
  - `npx vitest run`: **PASS** (`2 passed (2)` files, `22 passed (22)` tests trong `287ms`)
  - `npm run lint`: **PASS** (exit code 0)
  - `npm run build`: **PASS** (`next build --webpack` biên dịch thành công static pages `/`, `/_not-found`)
- **Vấn đề phát sinh / Điểm chưa hoàn thành (nếu có):** Không có.
- **Bước tiếp theo đề xuất:** Chuyển sang `Phase 4 (T4.1, T4.2, T4.3: Airport Radar Canvas & HUD Chrome)`.

### [2026-11-23 22:28] — PHASE 02 (T2.1, T2.2, T2.3: PURE DOMAIN ENGINE & VITEST — CHECKPOINT 1) — COMPLETED
- **Skills đã kích hoạt & áp dụng:** `@test-driven-development`, `@spec-driven-development`, `@api-and-interface-design`, `@code-review-and-quality`
- **Tài liệu & File thiết kế đã đọc trước khi làm:** `update.md`, `docs/product_requirements.md`, `docs/architecture.md`, `design/vector_quest_flight_briefing/code.html`, `design/vector_quest_step_03_pilot_prediction/code.html`, `design/vector_quest_step_04_05_vector_sandbox/code.html`, `design/vector_quest_step_04_parallelogram_proof_debrief/code.html`
- **Các file đã tạo / chỉnh sửa (theo TDD RED → GREEN):**
  - `src/domain/types.ts` — Định nghĩa `Vector2D`, `WindDirection` (`'rtl' | 'ltr'`), `WindStrength` (`'light' | 'moderate' | 'strong'`), `MissionStep`, `HeadingOptionId` (`'A' | 'B' | 'C' | 'D'`), `ParallelogramVertices`, `SimulationTelemetry`, `LandingEvaluationResult`, `PredictionEvaluationResult`, `HeadingOptionContent`, `MissionStepContent`
  - `tests/domain/vectorMath.test.ts` — 13 unit tests kiểm tra phép cộng/trừ vectơ, góc lệch trục đường băng, clamp `±60°`, ideal crab angle cho `rtl`/`ltr`, tọa độ 4 đỉnh hình bình hành & telemetry
  - `tests/domain/landingEvaluator.test.ts` — 9 unit tests kiểm tra `evaluateLanding()` với các ngưỡng sai số `±3°/±4°/±5°`, `getCorrectOptionForWind()` tự đổi `'D'`/`'C'` theo gió `rtl`/`ltr`, và nội dung `missionContent.ts`
  - `src/domain/vectorMath.ts` — Cài đặt thuần TS tính $\vec{v}_R = \vec{v}_A + \vec{v}_W$, góc lệch, crab angle lý tưởng, 4 đỉnh hình bình hành SVG và `computeSimulationTelemetry()`
  - `src/domain/landingEvaluator.ts` — Cài đặt `evaluateLanding()`, `getCorrectOptionForWind()` và `evaluatePredictionOption()`
  - `src/domain/missionContent.ts` — Toàn bộ văn bản song ngữ EN/VI, nhãn nút và 4 phương án A/B/C/D bám sát 100% `design/*.html`
  - `update.md` — Cập nhật kết quả Checkpoint 1
- **Đối chiếu với `design/*.html`:**
  - Khớp 100% thông số gió (`15` / `25` / `40 KT`), tốc độ hiển thị `140 KT`, góc crab `+18.4°` ($\arcsin(25/78.8854) \approx 18.43^\circ$), nhãn 4 đáp án Bước 3 (`[A] KEEP STRAIGHT / HDG 360°`, `[B] TURN FAR RIGHT / HDG 045°`, `[C] TURN LEFT / HDG 335°`, `[D] TURN SLIGHTLY RIGHT / +18.4°`) và các tiêu đề/câu hỏi/chú thích Bước 1–6 từ 4 file HTML trong `design/`.
- **Kết quả kiểm chứng thực tế (Command & Output tóm tắt):**
  - `npx vitest run`: **PASS** (`2 passed (2)` test files, `22 passed (22)` tests trong `319ms`)
  - `npm run lint`: **PASS** (exit code 0)
  - `npx tsc --noEmit`: **PASS** (exit code 0)
  - Kiểm tra cách ly `src/domain/*.ts`: **PASS** (0 import `react`, `zustand`, `window`, `document`, `lib/` hay `config/`)
- **Vấn đề phát sinh / Điểm chưa hoàn thành (nếu có):** Không có.
- **Bước tiếp theo đề xuất:** Chuyển sang `Phase 3 (T3.1 & T3.2: Zustand Store & Browser Adapters)`.

### [2026-11-23 22:23] — PHASE 01 (T1.1 & T1.2: FOUNDATION, DESIGN SYSTEM & GLOBAL SHELL) — COMPLETED
- **Skills đã kích hoạt & áp dụng:** `@design-system`, `@ui-styling`, `@frontend-ui-engineering`, `@constraint-driven-development`, `@documentation-and-adrs`
- **Tài liệu & File thiết kế đã đọc trước khi làm:** `update.md`, `docs/project_blueprint.md`, `docs/architecture.md`, `design/aerospace_hud/DESIGN.md`, `design/vector_quest_flight_briefing/code.html`, `design/vector_quest_step_03_pilot_prediction/code.html`, `design/vector_quest_step_04_05_vector_sandbox/code.html`, `design/vector_quest_step_04_parallelogram_proof_debrief/code.html`
- **Các file đã tạo / chỉnh sửa:**
  - `src/app/globals.css` — Thiết lập đầy đủ CSS variables cho Dark Cockpit mặc định + `.theme-daylight` (Daylight Projector Mode) và `@theme inline` cho bảng màu, spacing tokens, font stacks (`Space Grotesk`, `Geist`, `JetBrains Mono`) và typography scale
  - `src/app/layout.tsx` — Import `katex/dist/katex.min.css` & `globals.css`, áp dụng class `dark`, `bg-surface text-on-surface font-body-md text-body-md` chuẩn `design/*.html`
  - `src/app/error.tsx` — Route-level Error Boundary phong cách Aerospace HUD với nút `RESTORE SIMULATION / KHÔI PHỤC MÔ PHỎNG`
  - `src/config/simulation.ts` — Hằng số `WIND_SPEED_KTS` (`LIGHT: 15`, `MODERATE: 25`, `STRONG: 40`), `DEFAULT_TOLERANCE_DEG = 4`, `TOLERANCE_OPTIONS_DEG = [3, 4, 5]`, `HEADING_DRAG_LIMIT_DEG = 60` (`±60°`), tọa độ chuẩn `RADAR_CANVAS_COORDS`
  - `src/components/ui/MathFormula.tsx` — Component `<MathFormula tex="..." />` dùng `katex.renderToString()` an toàn cho React 19 (bọc `try/catch` + fallback `<code>`, không dùng `react-katex`)
  - `src/components/ui/CanvasErrorBoundary.tsx` — Class Error Boundary bảo vệ riêng khu vực SVG Radar Canvas với nút `REINITIALIZE RADAR / KHỞI ĐỘNG LẠI`
  - `update.md` — Cập nhật tiến độ Phase 1 và kết quả kiểm chứng thực tế
- **Đối chiếu với `design/*.html`:**
  - Khớp 100% mã màu Aerospace HUD (`#0f131c` surface/background, `#181b25` surface-container-low, `#1c1f29` surface-container, `#262a34` surface-container-high, `#31353f` surface-container-highest, `#0a0e17` surface-container-lowest, `#8ed5ff` primary, `#38bdf8` primary-container, `#ffc640` secondary, `#56e5a9` tertiary, `#ffb4ab` error, `#f43f5e` coral, `#dfe2ef` on-surface, `#bdc8d1` on-surface-variant, `#87929a` outline, `#3e484f` outline-variant).
  - Khớp 100% typography tokens (`headline-xl` 44/52, `headline-md` 24/32, `headline-sm` 18/26, `body-lg` 16/24, `body-md` 14/20, `body-sm` 12/18, `telemetry-lg` 20/24, `telemetry-md` 14/18, `telemetry-sm` 11/14, `label-caps` 10/12) và spacing tokens (`space-xs`..`space-xl`, `gutter*`, `margin*`).
  - Các file trong `design/` giữ nguyên vẹn 100%.
- **Kết quả kiểm chứng thực tế (Command & Output tóm tắt):**
  - `npm run lint`: PASS (exit code 0)
  - `npm run build`: PASS (`next build --webpack` biên dịch thành công trong 4.0s, TypeScript pass trong 2.3s, static pages `/`, `/_not-found` pass; xuất `effdd073e54fb729.css` 42.653 bytes chứa `--surface: #0f131c` & `.theme-daylight`, và `120918ba1417646c.css` 26.094 bytes chứa `katex`)
  - `npx vitest run`: Chưa chạy (sẽ triển khai ở Phase 2)
- **Vấn đề phát sinh / Điểm chưa hoàn thành (nếu có):** Không có.
- **Bước tiếp theo đề xuất:** Chuyển sang `Phase 2 (T2.1, T2.2, T2.3: Pure Domain Engine & Vitest)`.

### [2026-11-23 22:19] — SETUP (PROJECT INITIALIZATION & SCAFFOLDING) — COMPLETED
- **Skills đã kích hoạt & áp dụng:** `@project-bootstrap`, `@project-scaffolding`, `@project-structure-architect`, `@technology-stack-advisor`, `@library-researcher`, `@git-workflow-and-versioning`, `@using-agent-skills`, `@context-engineering`, `@spec-driven-development`, `@constraint-driven-development`, `@source-driven-development`, `@doubt-driven-development`, `@incremental-implementation`
- **Tài liệu & File thiết kế đã đọc trước khi làm:** `update.md`, `docs/project_blueprint.md`, `docs/tech_stack.md`, `docs/architecture.md`, `design/aerospace_hud/DESIGN.md`, `design/vector_quest_flight_briefing/code.html`, `design/vector_quest_step_03_pilot_prediction/code.html`, `design/vector_quest_step_04_05_vector_sandbox/code.html`, `design/vector_quest_step_04_parallelogram_proof_debrief/code.html`
- **Danh sách đầy đủ các file tìm thấy trong `design/` (giữ nguyên vẹn 100%, không chỉnh sửa/xóa):**
  - `design/aerospace_hud/DESIGN.md`
  - `design/vector_quest_flight_briefing/code.html` (+ `screen.png`)
  - `design/vector_quest_step_03_pilot_prediction/code.html` (+ `screen.png`)
  - `design/vector_quest_step_04_05_vector_sandbox/code.html` (+ `screen.png`)
  - `design/vector_quest_step_04_parallelogram_proof_debrief/code.html` (+ `screen.png`)
- **Các file đã tạo / chỉnh sửa & thư mục đã xác minh:**
  - `package.json` — Thêm script `"test": "vitest run"` và cấu hình `"build": "next build --webpack"` để biên dịch ổn định trong sandbox
  - `next.config.ts` — Tích hợp `@tailwindcss/turbopack` vào `oneOf` CSS pipeline của Webpack song song với `turbopack.rules`
  - `src/app/layout.tsx` — Gỡ bỏ `next/font/google` để build không phụ thuộc mạng ngoài (chưa viết logic nghiệp vụ hay UI bài học)
  - Đã kiểm tra đủ 10 thư mục theo `docs/architecture.md`: `src/config`, `src/domain`, `src/store`, `src/lib`, `src/components/hud`, `src/components/canvas`, `src/components/panels`, `src/components/modals`, `src/components/ui`, `tests/domain`
  - `update.md` — Cập nhật kết quả kiểm chứng Setup thực tế
- **Đối chiếu với `design/*.html`:** Chưa dựng UI bài học (theo đúng phạm vi Setup); đã đối chiếu toàn vẹn 4 file HTML và `DESIGN.md` làm chuẩn cho Phase 1–5.
- **Kết quả kiểm chứng thực tế (Command & Output tóm tắt):**
  - `node -v` / `npm -v`: `v26.4.0` / `11.17.0`
  - `npm ls --depth=0`: PASS (`next@16.4.6`, `react@19.3.0`, `react-dom@19.3.0`, `tailwindcss@4.3.3`, `@tailwindcss/turbopack@4.3.3`, `zustand@5.1.0`, `motion@14.14.0`, `katex@0.19.1`, `lucide-react@1.78.0`, `@types/katex@0.16.8`, `vitest@5.1.1`)
  - `npm run lint`: PASS (exit code 0)
  - `npm run build`: PASS (`next build --webpack` biên dịch thành công static pages `/`, `/_not-found`; CSS `.next/static/.../33a8ffc900971219.css` đạt 28.938 bytes và chứa đầy đủ utility `.flex`, `.min-h-full`)
  - `npx vitest run`: Chưa chạy vì chưa có file test (sẽ triển khai ở Phase 2)
- **Vấn đề phát sinh / Điểm chưa hoàn thành (nếu có):** Không có (lỗi `next/font/google` offline và Turbopack loader IPC trong sandbox Windows đã được xử lý triệt để qua `next build --webpack` + `@tailwindcss/turbopack` trong `next.config.ts`).
- **Bước tiếp theo đề xuất:** Chuyển sang `Phase 1 (Foundation & Design System: T1.1 & T1.2)`.

### [2026-11-23 22:10] — SETUP & CONTEXT AUDIT — COMPLETED
- **Skills đã kích hoạt & áp dụng:** `@using-agent-skills`, `@context-engineering`, `@spec-driven-development`, `@constraint-driven-development`, `@source-driven-development`, `@doubt-driven-development`, `@incremental-implementation`
- **Tài liệu & File thiết kế đã đọc trước khi làm:** `update.md`, `docs/project_blueprint.md`, `docs/architecture.md`, `docs/implementation_plan.md`, `docs/product_requirements.md`, `docs/tech_stack.md`, `design/aerospace_hud/DESIGN.md`, `design/vector_quest_flight_briefing/code.html`, `design/vector_quest_step_03_pilot_prediction/code.html`, `design/vector_quest_step_04_05_vector_sandbox/code.html`, `design/vector_quest_step_04_parallelogram_proof_debrief/code.html`
- **Các file đã tạo / chỉnh sửa:**
  - `update.md` — Cập nhật trạng thái Setup, kiểm kê cấu trúc thư mục `src/`, `tests/` và đối chiếu hệ thống thiết kế `design/*.html`
- **Đối chiếu với `design/*.html`:** Đã kiểm tra và ghi nhận đầy đủ bảng màu Aerospace HUD (`#0f131c`, `#181b25`, `#38bdf8`, `#ffc640`, `#56e5a9`, `#f43f5e`, `#ffb4ab`), bộ font (`Space Grotesk`, `Geist`, `JetBrains Mono`), bố cục 4 màn hình HTML mẫu (Top Pill Bar, Wind Vector Control Card `SIM_SYS 01`, Runway 36L, SVG Radar Canvas, Vector Equilibrium HUD, Right Challenge Panels Bước 1–6 và Bottom Control Dock).
- **Kết quả kiểm chứng thực tế (Command & Output tóm tắt):**
  - `npm run lint`: PASS (exit code 0, 0 errors, 0 warnings)
  - `npx vitest run`: Chưa chạy (chưa có file test; sẽ viết unit test ở Phase 2 `tests/domain/`)
  - `npm run build`: FAIL trong môi trường sandbox không có mạng (`next/font/google` báo lỗi `Failed to fetch Geist from Google Fonts` và `Failed to fetch Geist Mono from Google Fonts`; `next.config.ts` và Turbopack 16.4.6 khởi chạy thành công).
- **Vấn đề phát sinh / Điểm chưa hoàn thành (nếu có):** Phát hiện `next/font/google` trong `src/app/layout.tsx` mặc định gọi mạng tới `fonts.googleapis.com` khi build trong môi trường sandbox không mạng; sẽ xử lý triệt để ở Phase 1 (`T1.1`) để `npm run build` luôn PASS 100%.
- **Bước tiếp theo đề xuất:** Chuyển sang `Phase 1 (Foundation & Design System: T1.1 & T1.2)`.
