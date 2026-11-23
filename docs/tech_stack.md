# Tài Liệu Lựa Chọn Công Nghệ & Thẩm Định Thư Viện (`TECH-STACK.md`)

**Dự án:** Vector Quest – Math 10 (Modern Flight-Deck HUD Edition)  
**Ngày thẩm định:** 23/11/2026  
**Kiến trúc mục tiêu:** 100% Frontend (Zero Backend), triển khai trên [Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs)

---

## 1. Ràng buộc dự án (Project Constraints)
- **Nền tảng:** Web App chạy trên trình duyệt hiện đại (Chrome, Edge, Safari, Firefox), tối ưu 16:9 cho laptop, máy chiếu và bảng tương tác cảm ứng.
- **Hạ tầng:** Không dùng Backend, không Database, không Auth, chi phí vận hành **$0** trên Vercel Static/CDN.
- **Độ mượt & Tương tác:** Hoạt ảnh gió, quỹ đạo máy bay và kéo thả vectơ $\vec{v}_A$ phải đạt 60 FPS; hỗ trợ cả chuột và cảm ứng đa điểm (`touch-action: none`).
- **Tương thích React 19:** Next.js bản mới đi kèm React 19 (`19.3.1`), nên mọi thư viện phải hỗ trợ React 19 không lỗi peer-dependency.

---

## 2. Stack được đề xuất (Recommended Stack)

| Lớp (Layer) | Công nghệ / Thư viện | Phiên bản dự kiến (Verified) | Vai trò chính |
| :--- | :--- | :--- | :--- |
| **Framework** | [Next.js](https://nextjs.org/docs) ([npm](https://www.npmjs.com/package/next)) | `16.4.x` (App Router, Static Export) | Khung ứng dụng, routing, tối ưu bundle và deploy 1-click lên Vercel |
| **UI Runtime & Ngôn ngữ** | [React](https://www.npmjs.com/package/react) + TypeScript | `19.3.x` + TypeScript `5.x` | Xây dựng UI component an toàn kiểu dữ liệu cho động cơ toán học vectơ |
| **Styling** | [Tailwind CSS](https://tailwindcss.com/docs/guides/nextjs) | `4.x` (`@tailwindcss/postcss`) | Hệ thống thiết kế Dark Cockpit HUD & Daylight Projector Mode, Glassmorphism |
| **State Management** | [Zustand](https://zustand.docs.pmnd.rs/) ([npm](https://www.npmjs.com/package/zustand)) | `5.1.x` | Đồng bộ trạng thái gió, góc $\vec{v}_A$, 6 bước học tập, `GUIDE`, `VECTORS`, `SOUND` |
| **Animation** | [Motion](https://motion.dev/docs/react) ([npm](https://www.npmjs.com/package/motion)) | `14.14.x` | Chuyển cảnh bước mượt mà, hiệu ứng hạ cánh, hoạt ảnh quy tắc hình bình hành |
| **Kéo thả Vectơ (Gesture)** | **Native SVG Pointer Events** (`setPointerCapture`) | Chuẩn trình duyệt (0 KB) | Kéo thả đầu mũi tên $\vec{v}_A$ mượt trên chuột & cảm ứng, không phụ thuộc package cũ |
| **Render Công thức Toán** | [KaTeX](https://katex.org/) ([npm](https://www.npmjs.com/package/katex)) | `0.19.x` | Render sắc nét $\vec{v}_R = \vec{v}_A + \vec{v}_W$ qua wrapper `<MathFormula />` |
| **Icons** | [Lucide React](https://lucide.dev/guide/react/) ([npm](https://www.npmjs.com/package/lucide-react)) | `1.78.x` | Bộ icon hàng không & điều khiển sắc nét, tree-shaking tốt |
| **Audio SFX** | **Web Audio API** | Chuẩn trình duyệt (0 KB) | Tổng hợp âm thanh phản hồi/cảnh báo nhẹ không cần file `.mp3` rời |
| **Hosting & CI/CD** | [Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs) | Managed CDN | Tự động build & preview mỗi lần push Git |

---

## 3. Phân tích So sánh & Lý do lựa chọn (Weighted Evaluation)

Thang điểm 1–5 với trọng số: **Phù hợp yêu cầu (25%)**, **Ổn định & Bảo trì (20%)**, **Hệ sinh thái & Tài liệu (15%)**, **Bảo mật (15%)**, **Tương thích React 19 (10%)**, **Đơn giản vận hành (10%)**, **Chi phí & License (5%)**.

### 3.1. Quản lý State: `Zustand` vs `React Context` vs `Redux Toolkit`
| Tiêu chí | Zustand `5.1.x` | React Context + `useReducer` | Redux Toolkit |
| :--- | :---: | :---: | :---: |
| Phù hợp yêu cầu (25%) | **5** (Subscribe chọn lọc, không re-render thừa khi kéo 60fps) | **3** (Dễ re-render toàn cây Canvas + HUD khi kéo $\vec{v}_A$) | **4** (Mạnh nhưng dư thừa cho app không có API/BE) |
| Ổn định & Bảo trì (20%) | **5** | **5** | **5** |
| Đơn giản vận hành (10%) | **5** (1 file store gọn) | **4** | **2** (Boilerplate nhiều) |
| **Kết luận** | **Chọn Zustand** | Dự phòng nếu muốn 0 dependency | Loại vì quá cồng kềnh |

### 3.2. Công nghệ vẽ Sân bay & Vectơ: `Native SVG + Motion` vs `HTML5 Canvas / Konva`
- **Chọn `Native SVG + Motion`:** Đường băng, máy bay, vạch chia độ 360° và 3 vectơ sắc nét tuyệt đối trên mọi màn hình máy chiếu 1080p/4K, dễ gắn sự kiện `PointerEvent` trực tiếp lên đầu mũi tên $\vec{v}_A$ và kết hợp CSS/Tailwind glassmorphism dễ dàng.
- **Loại `react-konva` / `PixiJS`:** Dư thừa cho bài toán 2D ít đối tượng (< 50 phần tử), nặng bundle và hay vướng tương thích khi nâng cấp React 19.

### 3.3. Kéo thả Vectơ: `Native Pointer Events` vs `@use-gesture/react`
- **Thẩm định `@use-gesture/react` (`10.3.1`):** Theo [npm](https://www.npmjs.com/package/@use-gesture/react) và báo cáo [Socket.dev](https://socket.dev/npm/package/@use-gesture/react), bản `10.3.1` phát hành từ tháng 3/2024 và gần đây ít cập nhật bảo trì.
- **Chọn `Native Pointer Events` (`onPointerDown` / `onPointerMove` / `setPointerCapture` + `touch-action: none`):** Chỉ ~15 dòng TypeScript thuần để quy đổi tọa độ màn hình sang hệ tọa độ SVG (`getScreenCTM().inverse()`), 0 KB bundle, không lo xung đột React 19, chạy mượt trên chuột lẫn bảng cảm ứng.

### 3.4. Render Toán học: `katex` trực tiếp vs `react-katex`
- **Loại `react-katex`:** Bản [react-katex `3.1.0`](https://www.npmjs.com/package/react-katex) đã lâu không được cập nhật (khoảng 2 năm) và `@types/react-katex` cũ hơn nữa, dễ báo lỗi peer-dependency với React 19.
- **Chọn `katex` (`0.19.x`) trực tiếp:** [KaTeX](https://www.npmjs.com/package/katex) được bảo trì liên tục (cập nhật 10/2026). Chỉ cần viết 1 component `<MathFormula tex="..." />` gọi `katex.renderToString()` là chạy an toàn tuyệt đối trên React 19.

---

## 4. Thẩm định Chi tiết Thư viện (Library Audit)

| Package | Phiên bản | License | Tình trạng bảo trì & Bảo mật | Rủi ro kỹ thuật & Cách xử lý |
| :--- | :--- | :--- | :--- | :--- |
| `next` | `^16.4.6` | MIT | Phát hành liên tục bởi Vercel (11/2026) | Cấu hình `output: 'export'` trong `next.config.ts` nếu muốn xuất thêm bản tĩnh offline |
| `react` / `react-dom` | `^19.3.1` | MIT | Phiên bản ổn định mới nhất (10/2026) | Dùng `'use client'` cho các component tương tác Canvas/Audio |
| `tailwindcss` | `^4.3.x` | MIT | Chuẩn CSS-first mới, build nhanh với Turbopack | Cấu hình `@tailwindcss/postcss` theo hướng dẫn chính thức |
| `zustand` | `^5.1.0` | MIT | Phát hành mới 11/2026, hỗ trợ tốt React 19 | Tách selector nhỏ (`useSimStore(s => s.windStrength)`) để giữ 60 FPS |
| `motion` | `^14.14.0` | MIT | Phát hành 11/2026 (thay thế `framer-motion`) | Import từ `motion/react`; dùng `LazyMotion` nếu muốn tối ưu thêm bundle |
| `katex` | `^0.19.1` | MIT | Phát hành 10/2026, ổn định cao | Nhớ import CSS `katex/dist/katex.min.css` trong `layout.tsx` |
| `lucide-react` | `^1.78.0` | ISC | Phát hành 11/2026, 0 lỗ hổng trực tiếp ([Snyk](https://security.snyk.io/package/npm/lucide-react)) | Import đích danh từng icon để tree-shaking tự động |

---

## 5. Phương án đơn giản hơn (Simpler Alternative)
Nếu muốn giảm tối đa thư viện ngoài:
- Bỏ `motion` (dùng CSS Transitions/Keyframes thuần) và bỏ `katex` (dùng Unicode `v⃗_R = v⃗_A + v⃗_W` với HTML `<sub>`).
- **Đánh đổi:** Giảm ~80KB JS/CSS nhưng mất độ mượt vật lý của lò xo (spring physics) và công thức Toán kém sắc nét khi phóng to lên máy chiếu. Với mục tiêu làm sản phẩm FE chất lượng cao trên Vercel, **Stack chính được khuyến nghị** vẫn vượt trội hơn hẳn.

---

## 6. Lộ trình cài đặt & Kiểm tra (Installation & Verification Plan)
*(Chưa thực thi trong pha nghiên cứu này — dùng cho bước khởi tạo dự án tiếp theo)*

```bash
# 1. Khởi tạo Next.js (TypeScript, Tailwind CSS v4, App Router, ESLint)
npx create-next-app@latest vector-quest --typescript --tailwind --eslint --app --src-dir

# 2. Cài đặt Runtime Dependencies đã thẩm định
npm install zustand motion katex lucide-react

# 3. Cài đặt TypeScript types cho KaTeX (Dev Dependency)
npm install -D @types/katex

# 4. Kiểm tra sau khi code
npm ls --depth=0
npm run lint
npm run build
```

---

## 7. Tài liệu tham khảo chính thức
- [Next.js Documentation](https://nextjs.org/docs) & [Next.js on Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs)
- [Install Tailwind CSS with Next.js](https://tailwindcss.com/docs/guides/nextjs)
- [Zustand Documentation](https://zustand.docs.pmnd.rs/)
- [Motion for React Documentation](https://motion.dev/docs/react)
- [KaTeX Official Website](https://katex.org/)
- [Lucide for React Guide](https://lucide.dev/guide/react/)
- [@use-gesture/react Security & Maintenance Analysis (Socket.dev)](https://socket.dev/npm/package/@use-gesture/react)
