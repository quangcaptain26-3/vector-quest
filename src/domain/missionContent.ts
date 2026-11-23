/**
 * Nội dung sư phạm & nhãn giao diện Tiếng Việt chuẩn Toán 10 (CT GDPT 2018)
 * cho NHIỆM VỤ VECTƠ • TOÁN 10. Giữ nguyên 100% ký hiệu toán học (v_A, v_W, v_R, θ, Δθ, ε).
 */

import type {
  HeadingOptionContent,
  MissionStep,
  MissionStepContent,
  WindDirection,
} from "./types";

export const TOP_NAV_STAGES = [
  { id: "briefing", label: "01 Mở đầu", targetStep: 1 as MissionStep },
  { id: "predict", label: "02 Thử thách", targetStep: 2 as MissionStep },
  { id: "vector-lab", label: "03 Hạ cánh", targetStep: 4 as MissionStep },
  { id: "debrief", label: "04 Giải thích", targetStep: 6 as MissionStep },
] as const;

export const MISSION_STEPS: Record<MissionStep, MissionStepContent> = {
  1: {
    step: 1,
    badge: "BƯỚC 01 • MỞ ĐẦU",
    eyebrow: "HOẠT ĐỘNG MỞ ĐẦU",
    title: "CƠN GIÓ NGANG BẤT NGỜ!",
    subtitle: {
      en: "Máy bay đang tiếp cận đường băng 36L thì gặp gió ngang thổi lệch khỏi tim đường băng.",
      vi: "Máy bay đang tiếp cận đường băng 36L thì gặp gió ngang thổi lệch khỏi tim đường băng.",
    },
    prompt: {
      en: "Quan sát cách gió ngang làm lệch đường bay. Thử đổi hướng gió và cường độ gió ở bảng điều khiển bên trái.",
      vi: "Quan sát cách gió ngang làm lệch đường bay. Thử đổi hướng gió và cường độ gió ở bảng điều khiển bên trái.",
    },
    guideNote: {
      en: "Lưu ý: Quỹ đạo thực tế là kết quả cộng hai vectơ vận tốc máy bay và vận tốc gió ngang.",
      vi: "Lưu ý: Quỹ đạo thực tế là kết quả cộng hai vectơ vận tốc máy bay và vận tốc gió ngang.",
    },
  },
  2: {
    step: 2,
    badge: "BƯỚC 02 • THỬ THÁCH PHI CÔNG",
    eyebrow: "TƯƠNG TÁC VECTƠ & ĐIỀU HƯỚNG",
    title: "EM SẼ XỬ LÝ THẾ NÀO?",
    subtitle: {
      en: "Máy bay đang bị gió ngang đẩy trôi khỏi tim đường băng 36L.",
      vi: "Máy bay đang bị gió ngang đẩy trôi khỏi tim đường băng 36L.",
    },
    prompt: {
      en: "“Nếu em là phi công, em sẽ điều chỉnh hướng máy bay như thế nào để hạ cánh an toàn trên đường băng?”",
      vi: "“Nếu em là phi công, em sẽ điều chỉnh hướng máy bay như thế nào để hạ cánh an toàn trên đường băng?”",
    },
    guideNote: {
      en: "Thảo luận và dự đoán hướng điều chỉnh trước khi mở các phương án.",
      vi: "Thảo luận và dự đoán hướng điều chỉnh trước khi mở các phương án.",
    },
  },
  3: {
    step: 3,
    badge: "BƯỚC 03 • QUAN SÁT & DỰ ĐOÁN",
    eyebrow: "THỬ THÁCH BÙ GIÓ NGANG",
    title: "Phi công nên chọn hướng mũi máy bay nào để hạ cánh đúng đường băng?",
    subtitle: {
      en: "“Chọn hướng mũi máy bay thích hợp để cân bằng lực đẩy của gió ngang.”",
      vi: "“Chọn hướng mũi máy bay thích hợp để cân bằng lực đẩy của gió ngang.”",
    },
    prompt: {
      en: "Chọn một phương án [A–D] bên dưới rồi nhấn Kiểm tra đáp án.",
      vi: "Chọn một phương án [A–D] bên dưới rồi nhấn Kiểm tra đáp án.",
    },
    guideNote: {
      en: "Để giữ quỹ đạo thực tế dọc theo đường băng, hãy chếch nhẹ mũi máy bay ngược về phía gió thổi tới.",
      vi: "Để giữ quỹ đạo thực tế dọc theo đường băng, hãy chếch nhẹ mũi máy bay ngược về phía gió thổi tới.",
    },
  },
  4: {
    step: 4,
    badge: "BƯỚC 04 • KIỂM CHỨNG VECTƠ",
    eyebrow: "PHÒNG THÍ NGHIỆM MÔ PHỎNG",
    title: "CÙNG KIỂM TRA!",
    subtitle: {
      en: "Kéo đầu mũi tên vàng v_A hoặc điều chỉnh gió ngang để kiểm tra quỹ đạo tổng hợp.",
      vi: "Kéo đầu mũi tên vàng v_A hoặc điều chỉnh gió ngang để kiểm tra quỹ đạo tổng hợp.",
    },
    prompt: {
      en: "Điều chỉnh sao cho vectơ tổng hợp v_R song song với đường băng 36L, rồi nhấn Xem đường bay hoặc Kiểm tra hạ cánh.",
      vi: "Điều chỉnh sao cho vectơ tổng hợp v_R song song với đường băng 36L, rồi nhấn Xem đường bay hoặc Kiểm tra hạ cánh.",
    },
    guideNote: {
      en: "Chỉnh góc hướng mũi v_A sao cho độ lệch góc Δθ của v_R nằm trong sai số góc cho phép.",
      vi: "Chỉnh góc hướng mũi v_A sao cho độ lệch góc Δθ của v_R nằm trong sai số góc cho phép.",
    },
  },
  5: {
    step: 5,
    badge: "BƯỚC 05 • KẾT QUẢ HẠ CÁNH",
    eyebrow: "ĐÁNH GIÁ ĐỘ LỆCH TRỤC ĐƯỜNG BĂNG",
    title: "KIỂM TRA HẠ CÁNH",
    subtitle: {
      en: "Kiểm tra điều kiện vectơ vận tốc tổng hợp v_R song song với trục đường băng 36L.",
      vi: "Kiểm tra điều kiện vectơ vận tốc tổng hợp v_R song song với trục đường băng 36L.",
    },
    prompt: {
      en: "Quan sát thành phần vận tốc ngang và độ lệch góc Δθ bên dưới.",
      vi: "Quan sát thành phần vận tốc ngang và độ lệch góc Δθ bên dưới.",
    },
    guideNote: {
      en: "Hạ cánh an toàn khi độ lệch góc |Δθ| của v_R không vượt quá sai số góc cho phép ε.",
      vi: "Hạ cánh an toàn khi độ lệch góc |Δθ| của v_R không vượt quá sai số góc cho phép ε.",
    },
  },
  6: {
    step: 6,
    badge: "GIẢI THÍCH • QUY TẮC HÌNH BÌNH HÀNH",
    eyebrow: "TỔNG KẾT TOÁN HỌC LỚP 10",
    title: "CHÚNG TA ĐÃ KHÁM PHÁ ĐƯỢC GÌ?",
    subtitle: {
      en: "“Tại sao máy bay lại di chuyển theo quỹ đạo thực tế khác với hướng mũi máy bay?”",
      vi: "“Tại sao máy bay lại di chuyển theo quỹ đạo thực tế khác với hướng mũi máy bay?”",
    },
    prompt: {
      en: "“Quy tắc hình bình hành: Nếu hai vectơ v_A và v_W cùng chung điểm đầu thì vectơ tổng hợp v_R là đường chéo của hình bình hành dựng trên hai vectơ đó.”",
      vi: "“Quy tắc hình bình hành: Nếu hai vectơ v_A và v_W cùng chung điểm đầu thì vectơ tổng hợp v_R là đường chéo của hình bình hành dựng trên hai vectơ đó.”",
    },
    guideNote: {
      en: "Bật/tắt đường dựng hình bình hành và hệ trục tọa độ để kiểm chứng hình học công thức v_R = v_A + v_W.",
      vi: "Bật/tắt đường dựng hình bình hành và hệ trục tọa độ để kiểm chứng hình học công thức v_R = v_A + v_W.",
    },
  },
};

export const HEADING_OPTIONS: readonly HeadingOptionContent[] = [
  {
    id: "A",
    compassLabel: "HƯỚNG 360°",
    headingOffsetDeg: 0,
    title: {
      en: "Giữ bay thẳng",
      vi: "Giữ bay thẳng",
    },
    shortLabel: {
      en: "Giữ bay thẳng",
      vi: "Giữ bay thẳng",
    },
  },
  {
    id: "B",
    compassLabel: "HƯỚNG 045°",
    headingOffsetDeg: 45,
    title: {
      en: "Rẽ phải gắt",
      vi: "Rẽ phải gắt",
    },
    shortLabel: {
      en: "Rẽ phải gắt",
      vi: "Rẽ phải gắt",
    },
  },
  {
    id: "C",
    compassLabel: "HƯỚNG 335°",
    headingOffsetDeg: -25,
    title: {
      en: "Rẽ sang trái",
      vi: "Rẽ sang trái",
    },
    shortLabel: {
      en: "Rẽ sang trái",
      vi: "Rẽ sang trái",
    },
  },
  {
    id: "D",
    compassLabel: "+18.4°",
    headingOffsetDeg: 18.4,
    title: {
      en: "Rẽ nhẹ sang phải",
      vi: "Rẽ nhẹ sang phải",
    },
    shortLabel: {
      en: "Rẽ nhẹ sang phải",
      vi: "Rẽ nhẹ sang phải",
    },
  },
];

export const STEP3_FEEDBACK = {
  correct: {
    en: "Chính xác! Chếch mũi máy bay ngược nhẹ vào hướng gió tạo thành phần vận tốc bù trừ lực đẩy của gió ngang.",
    vi: "Chính xác! Chếch mũi máy bay ngược nhẹ vào hướng gió tạo thành phần vận tốc bù trừ lực đẩy của gió ngang.",
  },
  incorrect: {
    en: "Chưa đúng — hãy quan sát kỹ mũi tên hướng gió ngang. Hướng nào giúp triệt tiêu lực đẩy của gió?",
    vi: "Chưa đúng — hãy quan sát kỹ mũi tên hướng gió ngang. Hướng nào giúp triệt tiêu lực đẩy của gió?",
  },
} as const;

export function getStep3HintForWind(windDirection: WindDirection): {
  readonly en: string;
  readonly vi: string;
} {
  if (windDirection === "rtl") {
    return {
      en: "Gió ngang đang đẩy máy bay lệch sang trái (Phải → Trái). Em cần rẽ nhẹ sang phải để giữ quỹ đạo thẳng.",
      vi: "Gió ngang đang đẩy máy bay lệch sang trái (Phải → Trái). Em cần rẽ nhẹ sang phải để giữ quỹ đạo thẳng.",
    };
  }
  return {
    en: "Gió ngang đang đẩy máy bay lệch sang phải (Trái → Phải). Em cần rẽ sang trái để giữ quỹ đạo thẳng.",
    vi: "Gió ngang đang đẩy máy bay lệch sang phải (Trái → Phải). Em cần rẽ sang trái để giữ quỹ đạo thẳng.",
  };
}

export const STEP5_OUTCOMES = {
  success: {
    headline: "✓ HẠ CÁNH AN TOÀN!",
    badge: "HOÀN THÀNH NHIỆM VỤ!",
    subheadline: "HOÀN THÀNH NHIỆM VỤ • TRÙNG TIM ĐƯỜNG BĂNG",
    en: "Phi công đưa máy bay về tim đường băng và chếch mũi vừa đủ để cân bằng lực đẩy của gió ngang.",
    vi: "Phi công đưa máy bay về tim đường băng và chếch mũi vừa đủ để cân bằng lực đẩy của gió ngang.",
  },
  failure: {
    headline: "HẠ CÁNH CHƯA ĐẠT!",
    badge: "LỆCH TIM ĐƯỜNG BĂNG",
    subheadline: "CẦN ĐIỀU CHỈNH LẠI HƯỚNG MŨI",
    en: "Cảnh báo lệch hướng! Hãy điều chỉnh lại góc mũi máy bay và thử lại.",
    vi: "Cảnh báo lệch hướng! Hãy điều chỉnh lại góc mũi máy bay và thử lại.",
  },
} as const;
