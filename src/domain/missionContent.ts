/**
 * Nội dung sư phạm & nhãn giao diện song ngữ Việt – Anh chuẩn Toán 10 (CT GDPT 2018)
 * cho Vector Quest • Math 10. Giữ nguyên 100% ký hiệu toán học (v_A, v_W, v_R, θ, Δθ, ε).
 */

import type {
  HeadingOptionContent,
  LocalizedText,
  MissionStep,
  MissionStepContent,
  WindDirection,
} from "./types";

export const TOP_NAV_STAGES: readonly {
  readonly id: string;
  readonly label: LocalizedText;
  readonly targetStep: MissionStep;
}[] = [
  { id: "briefing", label: { vi: "01 Mở đầu", en: "01 Briefing" }, targetStep: 1 },
  { id: "predict", label: { vi: "02 Thử thách", en: "02 Challenge" }, targetStep: 2 },
  { id: "vector-lab", label: { vi: "03 Hạ cánh", en: "03 Landing" }, targetStep: 4 },
  { id: "debrief", label: { vi: "04 Giải thích", en: "04 Explain" }, targetStep: 6 },
];

export const MISSION_STEPS: Record<MissionStep, MissionStepContent> = {
  1: {
    step: 1,
    badge: {
      vi: "BƯỚC 01 • MỞ ĐẦU",
      en: "STEP 01 • BRIEFING",
    },
    eyebrow: {
      vi: "HOẠT ĐỘNG MỞ ĐẦU",
      en: "OPENING MISSION",
    },
    title: {
      vi: "CƠN GIÓ NGANG BẤT NGỜ!",
      en: "SUDDEN CROSSWIND!",
    },
    subtitle: {
      vi: "Máy bay đang tiếp cận đường băng 36L thì gặp gió ngang thổi lệch khỏi tim đường băng.",
      en: "The aircraft is approaching Runway 36L when a crosswind pushes it off the runway centerline.",
    },
    prompt: {
      vi: "Quan sát cách gió ngang làm lệch đường bay. Thử đổi hướng gió và cường độ gió ở bảng điều khiển bên trái.",
      en: "Observe how crosswind deflects the flight path. Try changing wind direction and strength on the left panel.",
    },
    guideNote: {
      vi: "Lưu ý: Quỹ đạo thực tế là kết quả cộng hai vectơ vận tốc máy bay và vận tốc gió ngang.",
      en: "Note: The actual ground track is the vector sum of aircraft airspeed and crosswind velocity.",
    },
  },
  2: {
    step: 2,
    badge: {
      vi: "BƯỚC 02 • THỬ THÁCH PHI CÔNG",
      en: "STEP 02 • PILOT CHALLENGE",
    },
    eyebrow: {
      vi: "TƯƠNG TÁC VECTƠ & ĐIỀU HƯỚNG",
      en: "VECTOR INTERACTION & NAVIGATION",
    },
    title: {
      vi: "EM SẼ XỬ LÝ THẾ NÀO?",
      en: "HOW WOULD YOU RESPOND?",
    },
    subtitle: {
      vi: "Máy bay đang bị gió ngang đẩy trôi khỏi tim đường băng 36L.",
      en: "The aircraft is drifting off Runway 36L centerline under a steady crosswind.",
    },
    prompt: {
      vi: "“Nếu em là phi công, em sẽ điều chỉnh hướng máy bay như thế nào để hạ cánh an toàn trên đường băng?”",
      en: "“If you were the pilot, how would you adjust the aircraft heading to land safely on the runway?”",
    },
    guideNote: {
      vi: "Thảo luận và dự đoán hướng điều chỉnh trước khi mở các phương án.",
      en: "Discuss and predict the corrective heading before revealing the options.",
    },
  },
  3: {
    step: 3,
    badge: {
      vi: "BƯỚC 03 • QUAN SÁT & DỰ ĐOÁN",
      en: "STEP 03 • OBSERVE & PREDICT",
    },
    eyebrow: {
      vi: "THỬ THÁCH BÙ GIÓ NGANG",
      en: "CROSSWIND COMPENSATION CHALLENGE",
    },
    title: {
      vi: "Phi công nên chọn hướng mũi máy bay nào để hạ cánh đúng đường băng?",
      en: "Which heading should the pilot choose to land aligned with the runway?",
    },
    subtitle: {
      vi: "“Chọn hướng mũi máy bay thích hợp để cân bằng lực đẩy của gió ngang.”",
      en: "“Choose the right aircraft heading to balance the crosswind drift.”",
    },
    prompt: {
      vi: "Chọn một phương án [A–D] bên dưới rồi nhấn Kiểm tra đáp án.",
      en: "Select one option [A–D] below, then click Check Answer.",
    },
    guideNote: {
      vi: "Để giữ quỹ đạo thực tế dọc theo đường băng, hãy chếch nhẹ mũi máy bay ngược về phía gió thổi tới.",
      en: "To keep the resultant track along the runway, angle the aircraft nose slightly into the incoming wind.",
    },
  },
  4: {
    step: 4,
    badge: {
      vi: "BƯỚC 04 • KIỂM CHỨNG VECTƠ",
      en: "STEP 04 • VECTOR VERIFICATION",
    },
    eyebrow: {
      vi: "PHÒNG THÍ NGHIỆM MÔ PHỎNG",
      en: "INTERACTIVE FLIGHT LAB",
    },
    title: {
      vi: "CÙNG KIỂM TRA!",
      en: "LET'S TEST IT!",
    },
    subtitle: {
      vi: "Kéo đầu mũi tên vàng v_A hoặc điều chỉnh gió ngang để kiểm tra quỹ đạo tổng hợp.",
      en: "Drag the amber v_A arrow tip or adjust the crosswind to test the resultant track.",
    },
    prompt: {
      vi: "Điều chỉnh sao cho vectơ tổng hợp v_R song song với đường băng 36L, rồi nhấn Xem đường bay hoặc Kiểm tra hạ cánh.",
      en: "Align the resultant vector v_R parallel to Runway 36L, then click Watch Flight or Check Landing.",
    },
    guideNote: {
      vi: "Chỉnh góc hướng mũi v_A sao cho độ lệch góc Δθ của v_R nằm trong sai số góc cho phép.",
      en: "Adjust v_A heading so the track drift angle Δθ of v_R stays within the allowed tolerance.",
    },
  },
  5: {
    step: 5,
    badge: {
      vi: "BƯỚC 05 • KẾT QUẢ HẠ CÁNH",
      en: "STEP 05 • LANDING RESULT",
    },
    eyebrow: {
      vi: "ĐÁNH GIÁ ĐỘ LỆCH TRỤC ĐƯỜNG BĂNG",
      en: "RUNWAY ALIGNMENT EVALUATION",
    },
    title: {
      vi: "KIỂM TRA HẠ CÁNH",
      en: "LANDING CHECK",
    },
    subtitle: {
      vi: "Kiểm tra điều kiện vectơ vận tốc tổng hợp v_R song song với trục đường băng 36L.",
      en: "Verify that the resultant velocity vector v_R aligns parallel to Runway 36L.",
    },
    prompt: {
      vi: "Quan sát thành phần vận tốc ngang và độ lệch góc Δθ bên dưới.",
      en: "Observe the lateral velocity component and drift angle Δθ below.",
    },
    guideNote: {
      vi: "Hạ cánh an toàn khi độ lệch góc |Δθ| của v_R không vượt quá sai số góc cho phép ε.",
      en: "Landing succeeds when the drift angle |Δθ| of v_R does not exceed tolerance ε.",
    },
  },
  6: {
    step: 6,
    badge: {
      vi: "GIẢI THÍCH • QUY TẮC HÌNH BÌNH HÀNH",
      en: "EXPLAIN • PARALLELOGRAM RULE",
    },
    eyebrow: {
      vi: "TỔNG KẾT TOÁN HỌC LỚP 10",
      en: "MATH 10 GEOMETRIC SYNTHESIS",
    },
    title: {
      vi: "CHÚNG TA ĐÃ KHÁM PHÁ ĐƯỢC GÌ?",
      en: "WHAT DID WE DISCOVER?",
    },
    subtitle: {
      vi: "“Tại sao máy bay lại di chuyển theo quỹ đạo thực tế khác với hướng mũi máy bay?”",
      en: "“Why does the aircraft travel along a ground track different from where its nose points?”",
    },
    prompt: {
      vi: "“Quy tắc hình bình hành: Nếu hai vectơ v_A và v_W cùng chung điểm đầu thì vectơ tổng hợp v_R là đường chéo của hình bình hành dựng trên hai vectơ đó.”",
      en: "“Parallelogram Rule: When two vectors v_A and v_W share a common origin, their resultant vector v_R is the diagonal of the parallelogram they span.”",
    },
    guideNote: {
      vi: "Bật/tắt đường dựng hình bình hành và hệ trục tọa độ để kiểm chứng hình học công thức v_R = v_A + v_W.",
      en: "Toggle the parallelogram guides and coordinate axes to geometrically verify v_R = v_A + v_W.",
    },
  },
};

export const HEADING_OPTIONS: readonly HeadingOptionContent[] = [
  {
    id: "A",
    compassLabel: { vi: "HƯỚNG 360°", en: "HDG 360°" },
    headingOffsetDeg: 0,
    title: {
      vi: "Giữ bay thẳng",
      en: "Keep Straight",
    },
    shortLabel: {
      vi: "Giữ bay thẳng",
      en: "Keep Straight",
    },
  },
  {
    id: "B",
    compassLabel: { vi: "HƯỚNG 045°", en: "HDG 045°" },
    headingOffsetDeg: 45,
    title: {
      vi: "Rẽ phải gắt",
      en: "Sharp Right",
    },
    shortLabel: {
      vi: "Rẽ phải gắt",
      en: "Sharp Right",
    },
  },
  {
    id: "C",
    compassLabel: { vi: "HƯỚNG 335°", en: "HDG 335°" },
    headingOffsetDeg: -25,
    title: {
      vi: "Rẽ sang trái",
      en: "Turn Left",
    },
    shortLabel: {
      vi: "Rẽ sang trái",
      en: "Turn Left",
    },
  },
  {
    id: "D",
    compassLabel: { vi: "+18.4°", en: "+18.4°" },
    headingOffsetDeg: 18.4,
    title: {
      vi: "Rẽ nhẹ sang phải",
      en: "Slight Right",
    },
    shortLabel: {
      vi: "Rẽ nhẹ sang phải",
      en: "Slight Right",
    },
  },
];

export const STEP3_FEEDBACK = {
  correct: {
    vi: "Chính xác! Chếch mũi máy bay ngược nhẹ vào hướng gió tạo thành phần vận tốc bù trừ lực đẩy của gió ngang.",
    en: "Correct! Crabbing the aircraft nose slightly into the wind creates a lateral component that cancels crosswind drift.",
  },
  incorrect: {
    vi: "Chưa đúng — hãy quan sát kỹ mũi tên hướng gió ngang. Hướng nào giúp triệt tiêu lực đẩy của gió?",
    en: "Not quite — look closely at the crosswind arrow. Which heading cancels the wind's lateral push?",
  },
} as const;

export function getStep3HintForWind(windDirection: WindDirection): LocalizedText {
  if (windDirection === "rtl") {
    return {
      vi: "Gió ngang đang đẩy máy bay lệch sang trái (Phải → Trái). Em cần rẽ nhẹ sang phải để giữ quỹ đạo thẳng.",
      en: "The crosswind is pushing the aircraft left (Right → Left). Turn slightly right to keep the track straight.",
    };
  }
  return {
    vi: "Gió ngang đang đẩy máy bay lệch sang phải (Trái → Phải). Em cần rẽ sang trái để giữ quỹ đạo thẳng.",
    en: "The crosswind is pushing the aircraft right (Left → Right). Turn left to keep the track straight.",
  };
}

export const STEP5_OUTCOMES = {
  success: {
    headline: {
      vi: "✓ HẠ CÁNH AN TOÀN!",
      en: "✓ SAFE LANDING!",
    },
    badge: {
      vi: "HOÀN THÀNH NHIỆM VỤ!",
      en: "MISSION COMPLETE!",
    },
    subheadline: {
      vi: "HOÀN THÀNH NHIỆM VỤ • TRÙNG TIM ĐƯỜNG BĂNG",
      en: "MISSION COMPLETE • RUNWAY CENTERLINE LOCKED",
    },
    description: {
      vi: "Phi công đưa máy bay về tim đường băng và chếch mũi vừa đủ để cân bằng lực đẩy của gió ngang.",
      en: "The pilot aligned the aircraft with the runway centerline and angled the nose just enough to balance the crosswind.",
    },
  },
  failure: {
    headline: {
      vi: "HẠ CÁNH CHƯA ĐẠT!",
      en: "LANDING MISALIGNED!",
    },
    badge: {
      vi: "LỆCH TIM ĐƯỜNG BĂNG",
      en: "OFF CENTERLINE",
    },
    subheadline: {
      vi: "CẦN ĐIỀU CHỈNH LẠI HƯỚNG MŨI",
      en: "ADJUST AIRCRAFT HEADING",
    },
    description: {
      vi: "Cảnh báo lệch hướng! Hãy điều chỉnh lại góc mũi máy bay và thử lại.",
      en: "Heading drift alert! Adjust the aircraft heading angle and try again.",
    },
  },
} as const;
