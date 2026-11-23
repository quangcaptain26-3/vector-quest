# Tài Liệu Yêu Cầu Sản Phẩm (PRD): Vector Quest – Math 10

**Phiên bản:** 1.0 (Next.js + Vercel Frontend-Only Edition)  
**Ngày lập:** 23/11/2026  
**Kiến trúc đề xuất:** [Next.js](https://nextjs.org/docs) (App Router, Static/Client-First) · [Tailwind CSS](https://tailwindcss.com/docs) · [Zustand](https://zustand.docs.pmnd.rs/) · [Motion](https://motion.dev/docs/react) · [@use-gesture/react](https://use-gesture.netlify.app/docs/gestures/) · [KaTeX](https://katex.org/) · [Lucide React](https://lucide.dev/guide/react/) · Deploy trên [Vercel](https://vercel.com/docs/frameworks/full-stack/nextjs)

---

## 1. Mục tiêu và Chân dung người dùng mục tiêu

### 1.1. Mục tiêu sản phẩm
- **Mục tiêu sư phạm:** Giúp học sinh lớp 10 hiểu bản chất vật lý và hình học của **phép cộng, phép trừ vectơ** ($\vec{v}_R = \vec{v}_A + \vec{v}_W$) thông qua trải nghiệm nhập vai phi công xử lý gió ngang khi hạ cánh, thay vì học công thức khô khan.
- **Mục tiêu công nghệ & sản phẩm:** Nâng cấp từ đặc tả file HTML đơn lẻ (`hd kết thúc.docx`) thành một ứng dụng web tương tác hiện đại theo phong cách **Modern Flight-Deck HUD & Interactive Physics Studio**, chạy hoàn toàn ở phía Client (Zero Backend), chia sẻ tức thì qua một đường link Vercel duy nhất.

### 1.2. Chân dung người dùng mục tiêu (Target Personas)

| Chân dung | Bối cảnh sử dụng | Nhu cầu cốt lõi | Điểm đau hiện tại |
| :--- | :--- | :--- | :--- |
| **Giáo viên Toán THPT** | Giảng dạy trên lớp qua máy chiếu 16:9, bảng tương tác hoặc gửi link cho học sinh tự học | Giao diện trực quan, chữ rõ từ cuối lớp, điều khiển từng bước giảng (`GUIDE`, `EXPLAIN`, `PAUSE`), không bị gián đoạn bởi cài đặt | File HTML rời khó chia sẻ đồng bộ, giao diện kiểu quiz cũ kém hấp dẫn, thiếu tương tác kéo thả mượt trên bảng cảm ứng |
| **Học sinh lớp 10** | Thực hành trên laptop, tablet hoặc màn hình cảm ứng | Được tự tay kéo vectơ $\vec{v}_A$, đổi hướng gió/cường độ gió để thấy ngay hậu quả quỹ đạo bay và kiểm tra quy tắc hình bình hành | Khó hình dung sự tổng hợp hai vận tốc cùng lúc khi chỉ nhìn hình vẽ tĩnh trong sách giáo khoa |

---

## 2. User Journey / Luồng trải nghiệm người dùng (Workflow)

Ứng dụng vận hành theo mô hình **5 bước nhiệm vụ + 1 bước giải thích toán học** (tương ứng 6 chấm tiến trình ở thanh điều khiển dưới đáy):

1. **Bước 1 – Tactical Briefing (`OPENING ACTIVITY: A SUDDEN CROSSWIND!`):**
   - Học sinh quan sát máy bay tiếp cận đường băng từ dưới lên trong khung cảnh Radar toàn màn hình.
   - Gió ngang thổi (mặc định Phải $\rightarrow$ Trái), làm máy bay lệch khỏi trục đường băng kèm vệt quỹ đạo đứt nét.
   - Giáo viên/học sinh đọc câu hỏi gợi mở song ngữ (EN/VI) và có thể thử đổi hướng gió (`R → L` / `L → R`) hoặc cường độ gió (`LIGHT` / `MODERATE` / `STRONG`) ngay tại HUD Telemetry.
2. **Bước 2 – Pilot Prediction (`PILOT CHALLENGE: WHAT WOULD YOU DO?`):**
   - Thẻ HUD phải chuyển sang câu hỏi dự đoán mở (*"If you were the pilot, which way would you turn to land safely on the runway?"*) kèm vòng cung la bàn trực quan.
   - Chưa hiển thị đáp án trắc nghiệm để học sinh thảo luận nhóm hoặc suy nghĩ trước.
3. **Bước 3 – Observe & Predict (Lưới Radar 2×2):**
   - Hiển thị 4 thẻ phương án trực quan `[A] KEEP STRAIGHT`, `[B] TURN FAR RIGHT`, `[C] TURN LEFT`, `[D] TURN SLIGHTLY RIGHT` (mỗi thẻ có mini-radar hướng mũi máy bay + hướng gió hiện hành).
   - Học sinh chọn 1 thẻ (hỗ trợ click/chạm hoặc nhấn phím `A/B/C/D`), trạng thái báo *"Option X selected — press CHECK ANSWER"*.
   - Nhấn `CHECK ANSWER`: Nếu chưa phù hợp với hướng gió hiện tại $\rightarrow$ hiển thị phản hồi gợi ý suy nghĩ lại (không khóa màn hình). Nếu phù hợp $\rightarrow$ mở khóa Bước 4.
4. **Bước 4 – Interactive Vector Lab (`LET US CHECK!`):**
   - Hiển thị 3 vectơ SVG sắc nét ngay trên máy bay: $\vec{v}_A$ (Vàng, có tay cầm kéo thả ở đầu mũi tên), $\vec{v}_W$ (Xanh cyan), $\vec{v}_R$ (Đỏ san hô) cùng công thức KaTeX $\vec{v}_R = \vec{v}_A + \vec{v}_W$.
   - Học sinh kéo đầu mũi tên $\vec{v}_A$ hoặc đổi gió để quan sát $\vec{v}_R$ và quỹ đạo bay đứt nét cập nhật theo thời gian thực; nhấn `WATCH FLIGHT` để xem máy bay bay theo $\vec{v}_R$.
5. **Bước 5 – Landing Result (`CHECK LANDING`):**
   - Hệ thống kiểm tra điều kiện toán học: phương của $\vec{v}_R$ có song song với trục đường băng trong sai số góc cho phép hay không.
   - **Thành công:** Khung Emerald `✓ SUCCESSFUL LANDING! / MISSION COMPLETED!` kèm hiệu ứng nhẹ, mở khóa nút `EXPLAIN`.
   - **Thất bại:** Khung Coral Red `LANDING FAILED! — Adjust the heading and try again.` kèm âm thanh cảnh báo nhẹ, **không tự động reset** để học sinh tự chỉnh tiếp hướng $\vec{v}_A$.
6. **Bước 6 – Explain (`PARALLELOGRAM PROOF STUDIO: WHAT DID WE DISCOVER?`):**
   - Làm dịu nền sân bay, giữ nguyên 3 vectơ xuất phát từ cùng một điểm trên máy bay.
   - Bật/tắt đường nét đứt dựng hình bình hành (*Show Parallelogram Construction*) và lưới tọa độ (*Show Coordinate Grid*) để minh họa trực quan quy tắc hình bình hành.

---

## 3. Các chức năng chính (Core Features)

### 3.1. Canvas Mô phỏng Sân bay & Vật lý Vectơ (SVG + Gesture)
- Hiển thị sân bay nhìn từ trên xuống theo phong cách Radar/HUD, đường băng thẳng đứng ở giữa với vạch tâm, vạch ngưỡng và vùng hạ cánh.
- Hiệu ứng hạt gió chuyển động đồng bộ với hướng (`R → L` / `L → R`) và cường độ (`LIGHT` / `MODERATE` / `STRONG`).
- Vẽ 3 vectơ bằng SVG sắc nét ở mọi độ phân giải: $\vec{v}_A$ (Vàng), $\vec{v}_W$ (Cyan/Trắng), $\vec{v}_R$ (Đỏ).
- Kéo thả trực tiếp đầu mũi tên $\vec{v}_A$ bằng chuột hoặc ngón tay qua `@use-gesture/react`, cập nhật tức thời góc lệch, $\vec{v}_R$ và đường bay dự kiến.

### 3.2. Động cơ Toán học & Kiểm tra Hạ cánh (Vector Math Engine)
- Tính toán thời gian thực: $\vec{v}_R = \vec{v}_A + \vec{v}_W$.
- Đáp án đúng ở Bước 3 được xác định động dựa trên hướng gió hiện hành (ví dụ: gió Phải $\rightarrow$ Trái thì chọn quay nhẹ sang Phải; gió Trái $\rightarrow$ Phải thì chọn quay nhẹ sang Trái), không cố định cứng một chữ cái.
- `CHECK LANDING` kiểm tra độ lệch góc giữa $\vec{v}_R$ và phương trục dọc đường băng ($\lvert \Delta\theta \rvert \le \varepsilon$, mặc định $\varepsilon = 4^\circ$, chỉnh được trong `SETTINGS`), không dùng vùng đích cảm tính.

### 3.3. Hệ thống Điều hướng & Tiện ích lớp học
- **Top Pill Bar:** Chuyển nhanh các giai đoạn (`Briefing`, `Predict`, `Vector Lab`, `Debrief`), cùng các nút modal/tiện ích hoạt động thực sự: `VIDEO` (hướng dẫn nhanh), `SETTINGS` (chỉnh sai số góc $\varepsilon$, bật/tắt song ngữ EN/VI, chuyển Dark Cockpit / Daylight Projector Mode), `SOUND ON/OFF` (tổng hợp âm thanh bằng Web Audio API), `FULL SCREEN`, `HELP`.
- **Bottom Control Dock:**
  - `BACK` / `NEXT`: Chuyển bước kèm chỉ báo 6 chấm tiến trình.
  - `RESET`: Đưa máy bay, hướng gió, cường độ gió về mặc định và xóa đường bay thử (có xác nhận nhẹ nếu đang ở giữa thí nghiệm).
  - `PAUSE / PLAY`: Tạm dừng/tiếp tục hoạt ảnh gió và máy bay.
  - `GUIDE ON/OFF`: Ẩn/hiện gợi ý sư phạm mà không làm thay đổi hay ẩn các vectơ.
  - `VECTOR VISIBILITY`: Ẩn/hiện đồng thời 3 vectơ; tuyệt đối giữ nguyên máy bay, đường băng, đường bay và các giá trị mô phỏng.
  - `WATCH FLIGHT` / `REPLAY`: Chạy lại hoạt ảnh máy bay di chuyển theo vectơ tổng hợp $\vec{v}_R$.

---

## 4. Phạm vi MVP và các hạng mục trì hoãn

| Mức độ ưu tiên | Hạng mục tính năng | Lý do |
| :--- | :--- | :--- |
| **Must Have (MVP)** | Toàn bộ luồng 5 bước + Explain quy tắc hình bình hành; Canvas SVG Radar + kéo thả $\vec{v}_A$; Wind Controls; Logic `CHECK ANSWER` & `CHECK LANDING` động; Thanh Header & Bottom Dock không có nút chết; Web Audio SFX; Deploy Vercel | Đáp ứng đầy đủ 100% giá trị cốt lõi của tiết học Toán 10 và chạy ổn định trên trình duyệt |
| **Should Have (Phase 1.1)** | Nút chuyển **Daylight Projector Mode** (nền sáng độ tương phản cao cho phòng học nhiều ánh sáng); Chia sẻ kịch bản qua URL query params (ví dụ `?dir=ltr&strength=strong&step=4`); Phím tắt bàn phím (`A-D`, `Space`, `←/→`) | Tăng mạnh tính thực dụng cho giáo viên đứng lớp mà không cần Backend |
| **Could Have (Phase 2)** | Mở rộng thêm chế độ **Phép trừ vectơ** ($\vec{v}_A = \vec{v}_R - \vec{v}_W$), đường băng nghiêng góc tùy ý, hoặc bộ nhiều nhiệm vụ bay (Multi-mission Academy) lưu tiến độ bằng `localStorage` | Làm giàu nội dung luyện tập sau khi bản cốt lõi đã được kiểm chứng trên lớp |
| **Won't Have (Ngoài phạm vi)** | Hệ thống đăng nhập/tài khoản, Backend API, cơ sở dữ liệu lưu điểm học sinh, chấm bài trực tuyến trên server | Giữ đúng kiến trúc Frontend-only, chi phí vận hành $0, không phức tạp hóa việc dùng thử |

---

## 5. Yêu cầu phi chức năng (Non-Functional Requirements)

- **Performance (Hiệu năng):**
  - Hoạt ảnh gió, chuyển động máy bay và kéo thả vectơ đạt tối thiểu **60 FPS** trên laptop phổ thông và bảng tương tác.
  - Đóng gói dạng Static Export / Client-rendered trên Vercel CDN với thời gian tải trang đầu (FCP) < 1.5 giây.
- **Compatibility & Responsiveness (Tương thích):**
  - Tối ưu tỷ lệ **16:9** (1280×720, 1920×1080) cho laptop và máy chiếu; tự động co giãn hợp lý trên tablet ngang.
  - Hỗ trợ mượt cả chuột, trackpad và màn hình cảm ứng (thiết lập `touch-action: none` trên vùng kéo đầu vectơ để tránh cuộn trang nhầm).
  - Chạy ổn định trên Chrome, Edge, Safari và Firefox phiên bản mới.
- **Security & Privacy (Bảo mật & Quyền riêng tư):**
  - 100% xử lý tại trình duyệt (client-side), không thu thập dữ liệu cá nhân (PII), không cookie theo dõi, không cần biến môi trường bí mật.
- **Scalability & Reliability (Khả năng mở rộng & Độ tin cậy):**
  - Nhờ kiến trúc tĩnh trên Vercel Edge Network, hàng trăm học sinh cùng trường hoặc nhiều lớp có thể truy cập đồng thời mà không lo quá tải server.
- **Accessibility & Classroom Readability:**
  - Kích thước chữ tối thiểu 14–16px cho nội dung chính, công thức Toán render bằng KaTeX sắc nét khi phóng to lên máy chiếu.

---

## 6. Tiêu chí nghiệm thu (Acceptance Criteria)

1. **Tính toàn vẹn điều khiển:** 100% nút trên Header, Thẻ thử thách và Bottom Dock đều có hành vi thực tế; không có nút bấm vô tác dụng hoặc lỗi console JavaScript.
2. **Độ chính xác toán học:**
   - Khi thay đổi hướng gió (`R → L` $\leftrightarrow$ `L → R`), đáp án đúng ở Bước 3, chú thích dưới sân bay và vectơ $\vec{v}_W$ cập nhật đồng bộ ngay lập tức.
   - Khi kéo đầu vectơ $\vec{v}_A$, vectơ tổng hợp $\vec{v}_R = \vec{v}_A + \vec{v}_W$ cập nhật tức thời theo thời gian thực.
   - `CHECK LANDING` chỉ báo thành công khi góc giữa $\vec{v}_R$ và phương trục đường băng nằm trong ngưỡng sai số $\varepsilon$ đã cấu hình.
3. **Tính độc lập của trạng thái hiển thị:**
   - Nhấn `VECTOR VISIBILITY` chỉ ẩn/hiện 3 vectơ và nhãn vectơ; máy bay, đường băng, đường bay và thông số mô phỏng vẫn giữ nguyên.
   - Nhấn `GUIDE ON/OFF` chỉ ẩn/hiện phần hướng dẫn, không làm biến đổi vectơ.
   - Khi `LANDING FAILED!`, hệ thống **không** tự động reset vị trí máy bay hoặc hướng $\vec{v}_A$.
4. **Sẵn sàng Deploy Vercel:** `next build` chạy thành công không lỗi TypeScript/ESLint và hoạt động đầy đủ khi deploy lên Vercel không cần cấu hình biến môi trường hay backend.

---

## 7. Giả định, Rủi ro tiềm ẩn và Câu hỏi còn mở

### 7.1. Giả định (Assumptions)
- Đã chuyển hẳn mục tiêu từ *1 file HTML chạy offline* sang *ứng dụng web Next.js deploy online trên Vercel* (trường hợp cần mang đi nơi mất mạng sẽ dùng bản `next export` hoặc trình duyệt đã cache).
- Các nút `VIDEO`, `SETTINGS`, `HELP` sẽ được thiết kế thành các modal gọn nhẹ tích hợp sẵn bên trong app (không phụ thuộc link YouTube hay server ngoài bị chặn ở mạng trường học).

### 7.2. Rủi ro tiềm ẩn & Hướng giảm thiểu
- **Rủi ro 1 (Ánh sáng phòng học):** Giao diện Dark Cockpit HUD đẹp trên màn hình cá nhân nhưng có thể hơi tối khi chiếu qua máy chiếu cũ trong phòng sáng đèn.  
  $\rightarrow$ *Giảm thiểu:* Tích hợp sẵn nút chuyển **Daylight Projector Mode** (nền sáng tương phản cao) trong `SETTINGS`.
- **Rủi ro 2 (Lệch cảm ứng khi kéo vectơ):** Trên bảng tương tác hoặc tablet, đầu mũi tên vectơ nhỏ dễ bị trượt ngón tay.  
  $\rightarrow$ *Giảm thiểu:* Tạo vùng nhận chạm (hit-area) vô hình rộng tối thiểu `44×44px` quanh đầu mũi tên $\vec{v}_A$ kết hợp `@use-gesture/react`.

### 7.3. Câu hỏi còn mở (Open Questions)
1. Bạn có muốn bổ sung **Daylight Projector Mode** (giao diện sáng cho máy chiếu) song song với **Dark Cockpit HUD** ngay trong MVP không?
2. Ngưỡng sai số góc mặc định khi chấm `CHECK LANDING` bạn muốn để là **$\pm 4^\circ$** hay chặt/nới hơn (ví dụ $\pm 3^\circ$ hoặc $\pm 5^\circ$)?
3. Bạn đã có ảnh chụp hoặc file export từ Google Stitch chưa, hay muốn tôi bắt đầu dựng luôn cấu trúc dự án Next.js theo bộ prompt HUD vừa thiết kế?
