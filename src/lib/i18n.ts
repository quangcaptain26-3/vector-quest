/**
 * Centralized Vietnamese ↔ English translation dictionary for Vector Quest – Math 10.
 * Preserves 100% of mathematical notation (v_A, v_W, v_R, θ, Δθ, ε, KT, NM, 36L).
 */

import type { Language } from "@/domain/types";

export const LANGUAGE_STORAGE_KEY = "vq_language_v1";

export interface UiTranslations {
  readonly meta: {
    readonly pageTitle: string;
  };
  readonly topBar: {
    readonly logoAlt: string;
    readonly brandEyebrow: string;
    readonly brandTitle: string;
    readonly navAria: string;
    readonly revealAnswerButton: string;
    readonly revealAnswerTitle: string;
    readonly revealAnswerAria: string;
    readonly teacherButton: string;
    readonly teacherTitle: string;
    readonly teacherAria: string;
    readonly chalkTitle: string;
    readonly videoTitle: string;
    readonly settingsTitle: string;
    readonly soundOnLabel: string;
    readonly soundOffLabel: string;
    readonly fullscreenEnterTitle: string;
    readonly fullscreenExitTitle: string;
    readonly fullscreenWarn: string;
    readonly helpTitle: string;
    readonly themeToDaylightTitle: string;
    readonly themeToDarkTitle: string;
    readonly themeAria: string;
    readonly langGroupAria: string;
    readonly langViTitle: string;
    readonly langEnTitle: string;
  };
  readonly windPill: {
    readonly header: string;
    readonly systemBadge: string;
    readonly directionLabel: string;
    readonly east090: string;
    readonly west270: string;
    readonly rtlArrow: string;
    readonly ltrArrow: string;
    readonly strengthLabel: string;
    readonly dec5Aria: string;
    readonly dec5Title: string;
    readonly inc5Aria: string;
    readonly inc5Title: string;
    readonly light: string;
    readonly lightActive: string;
    readonly moderate: string;
    readonly moderateActive: string;
    readonly strong: string;
    readonly strongActive: string;
    readonly aircraftCardLabel: string;
    readonly headingPrefix: string;
    readonly windCardLabel: string;
    readonly driftCardLabel: string;
    readonly alignedWithRunway: string;
    readonly driftingLeft: string;
    readonly driftingRight: string;
    readonly calculateManually: string;
    readonly trackCardLabel: string;
    readonly answerHidden: string;
    readonly rwyAligned: string;
    readonly rwyOffAxis: string;
    readonly vectorAddLabel: string;
    readonly vectorSubLabel: string;
  };
  readonly bottomDock: {
    readonly back: string;
    readonly reset: string;
    readonly pause: string;
    readonly resume: string;
    readonly watchFlight: string;
    readonly replay: string;
    readonly checkLanding: string;
    readonly progressAria: string;
    readonly stepPrefix: string;
    readonly guide: string;
    readonly hideVectors: string;
    readonly showVectors: string;
    readonly parallelogram: string;
    readonly explain: string;
    readonly next: string;
    readonly restart: string;
  };
  readonly panels: {
    readonly asideAria: string;
    readonly mathBadge: string;
    readonly briefing: {
      readonly currentWindLabel: string;
      readonly trackDriftLabel: string;
      readonly startChallengeBtn: string;
    };
    readonly prediction: {
      readonly arcHeader: string;
      readonly runwayTag: string;
      readonly turnLeft: string;
      readonly crabLeft: string;
      readonly flyStraight: string;
      readonly heading360: string;
      readonly turnRight: string;
      readonly crabRight: string;
      readonly trigHintLabel: string;
      readonly openOptionsBtn: string;
      readonly trigButton: string;
      readonly crabAngleFooter: string;
    };
    readonly observe: {
      readonly subtitleTemplate: (windSpeedKts: number) => string;
      readonly radioGroupAria: string;
      readonly correctStatus: string;
      readonly incorrectStatus: string;
      readonly selectedPrefix: string;
      readonly selectedSuffix: string;
      readonly idlePrompt: string;
      readonly ready: string;
      readonly waiting: string;
      readonly trigLabel: string;
      readonly verifyInLabBtn: string;
      readonly checkAnswerBtn: string;
      readonly trigButton: string;
    };
    readonly vectorCheck: {
      readonly velocityTitle: string;
      readonly headingPrefix: string;
      readonly sliderAria: string;
      readonly stepGroupAria: string;
      readonly decHeadingAria: (deg: number) => string;
      readonly incHeadingAria: (deg: number) => string;
      readonly zeroHeadingAria: string;
      readonly zeroHeadingTitle: string;
      readonly driftLabelHidden: string;
      readonly driftLabelValue: (absDeg: number) => string;
      readonly hiddenTag: string;
      readonly withinToleranceTag: (tol: number) => string;
      readonly targetToleranceTag: (tol: number) => string;
      readonly analysisHeader: string;
      readonly crosswindLabel: string;
      readonly leftWord: string;
      readonly rightWord: string;
      readonly counterCompLabel: string;
      readonly netLateralLabel: string;
      readonly selfCalcTag: string;
      readonly balancedTag: string;
      readonly driftingTag: string;
      readonly revealAnswerBtn: string;
      readonly idealHintBtn: (signedIdeal: string) => string;
      readonly viewExplainBtn: string;
      readonly watchFlightBtn: string;
      readonly checkLandingBtn: string;
      readonly retryHeadingBtn: string;
    };
    readonly explain: {
      readonly formulaHeader: string;
      readonly commonOriginTag: string;
      readonly vaLegend: string;
      readonly vwLegend: string;
      readonly vrLegend: string;
      readonly showParallelogram: string;
      readonly showCoordinateGrid: string;
      readonly ruleHeader: string;
      readonly snapIdealPrefix: string;
      readonly snapIdealSuffix: string;
      readonly replayBtn: string;
      readonly finishBtn: string;
    };
  };
  readonly canvas: {
    readonly chalkActive: string;
    readonly chalkNotes: string;
    readonly chalkClear: string;
    readonly chalkTurnOff: string;
    readonly touchdownLocked: string;
    readonly touchdownRwy: string;
    readonly projectedDriftHidden: string;
    readonly projectedDriftValue: (absMeters: number, isLeft: boolean) => string;
    readonly lateralDriftHidden: string;
    readonly lateralDriftValue: (signedMeters: string) => string;
    readonly idealPrefix: string;
    readonly radarDriftHidden: string;
    readonly radarDriftWithin: (absDeg: number, tol: number) => string;
    readonly radarDriftAdjust: (absDeg: number, tol: number) => string;
    readonly axisEast: string;
    readonly axisNorthRunway: string;
    readonly vaExplainLabel: string;
    readonly vaLabLabel: (headingLabel: string) => string;
    readonly vwExplainLabel: string;
    readonly rtlUpper: string;
    readonly ltrUpper: string;
    readonly vrExplainLabel: string;
    readonly vrTrackPrefix: string;
    readonly dragTip: string;
    readonly dragTipAria: string;
    readonly windNoticeRtl: string;
    readonly windNoticeLtr: string;
    readonly hudAlignedPrefix: string;
    readonly hudWarningPrefix: string;
    readonly hudAlignedSentence: string;
    readonly hudBlindSuffix: string;
    readonly hudDriftMeters: (absMeters: number) => string;
    readonly hudBalanceHeader: string;
    readonly hudHiddenBadge: string;
    readonly hudLockedBadge: string;
    readonly hudOffCenterBadge: string;
    readonly hudSubFormulaLabel: string;
    readonly hudAddFormulaLabel: string;
    readonly hudNoseLabel: string;
    readonly hudWindLabel: string;
    readonly hudTrackLabel: string;
    readonly hudSelfCalcShort: string;
    readonly hudAlignedShort: string;
    readonly hudDriftingShort: string;
    readonly hudStatusLabel: string;
    readonly hudHiddenShort: string;
    readonly hudCenterLockedShort: string;
    readonly hudAdjustNeededShort: string;
  };
  readonly modals: {
    readonly help: {
      readonly eyebrow: string;
      readonly title: string;
      readonly closeAria: string;
      readonly radarSectionTitle: string;
      readonly bullet1Title: string;
      readonly bullet1Body: string;
      readonly bullet2Title: string;
      readonly bullet2Part1: string;
      readonly bullet2Part2: string;
      readonly bullet2Part3: string;
      readonly bullet3Title: string;
      readonly bullet3Body: string;
      readonly shortcutsTitle: string;
      readonly shortcutStep3: string;
      readonly shortcutPlay: string;
      readonly shortcutNav: string;
      readonly shortcutEsc: string;
      readonly confirmBtn: string;
    };
    readonly settings: {
      readonly eyebrow: string;
      readonly title: string;
      readonly closeAria: string;
      readonly toleranceTitle: string;
      readonly tolerancePart1: string;
      readonly tolerancePart2: string;
      readonly tolerancePart3: string;
      readonly themeTitle: string;
      readonly themeDark: string;
      readonly themeDaylight: string;
      readonly languageTitle: string;
      readonly languageVi: string;
      readonly languageEn: string;
      readonly soundTitle: string;
      readonly soundOn: string;
      readonly soundOff: string;
      readonly doneBtn: string;
    };
    readonly video: {
      readonly eyebrow: string;
      readonly title: string;
      readonly closeAria: string;
      readonly svgRunwayAxis: string;
      readonly svgStep1: string;
      readonly svgStep2: string;
      readonly svgStep3: string;
      readonly conditionLabel: string;
      readonly closeBtn: string;
      readonly tryNowBtn: string;
    };
    readonly teacher: {
      readonly eyebrow: string;
      readonly title: string;
      readonly closeAria: string;
      readonly section1Title: string;
      readonly addModeTitle: string;
      readonly subtractModeTitle: string;
      readonly section2Title: string;
      readonly magnitudeLabel: string;
      readonly airspeedAria: string;
      readonly windSpeedAria: string;
      readonly runwayAngleLabel: string;
      readonly runwayAngleAria: string;
      readonly blindTitle: string;
      readonly blindDesc: string;
      readonly blindAria: string;
      readonly tvScaleTitle: string;
      readonly tvNormal: string;
      readonly tvLarge: string;
      readonly tvXlarge: string;
      readonly section3Title: string;
      readonly defaultPresetName: (va: number, vw: number) => string;
      readonly presetPlaceholder: string;
      readonly presetInputAria: string;
      readonly savePresetBtn: string;
      readonly deletePresetAria: (name: string) => string;
      readonly copiedBtn: string;
      readonly copyUrlBtn: string;
    };
  };
  readonly errors: {
    readonly globalEyebrow: string;
    readonly globalTitle: string;
    readonly globalBadge: string;
    readonly globalBody: string;
    readonly globalResetBtn: string;
    readonly canvasFallbackMsg: string;
    readonly canvasTitle: string;
    readonly canvasResetBtn: string;
  };
}

export const UI_COPY: Record<Language, UiTranslations> = {
  vi: {
    meta: {
      pageTitle: "NHIỆM VỤ VECTƠ • TOÁN 10 — Phép cộng & Phép trừ Vectơ",
    },
    topBar: {
      logoAlt: "Logo Nhiệm vụ Vectơ",
      brandEyebrow: "PHÉP CỘNG & PHÉP TRỪ VECTƠ",
      brandTitle: "NHIỆM VỤ VECTƠ • TOÁN 10",
      navAria: "Các giai đoạn nhiệm vụ",
      revealAnswerButton: "Mở đáp án",
      revealAnswerTitle: "Mở đáp án số liệu đang giấu",
      revealAnswerAria: "Mở đáp án số liệu",
      teacherButton: "Giáo viên",
      teacherTitle: "Chế độ Giáo viên (Ra đề & Chia sẻ)",
      teacherAria: "Chế độ Giáo viên",
      chalkTitle: "Bút ghi chú trên Radar",
      videoTitle: "Video minh họa",
      settingsTitle: "Cài đặt",
      soundOnLabel: "Âm thanh: Bật",
      soundOffLabel: "Âm thanh: Tắt",
      fullscreenEnterTitle: "Toàn màn hình",
      fullscreenExitTitle: "Thoát toàn màn hình",
      fullscreenWarn: "API Toàn màn hình không khả dụng hoặc bị chặn",
      helpTitle: "Trợ giúp",
      themeToDaylightTitle: "Chuyển sang Chế độ Máy chiếu Sáng",
      themeToDarkTitle: "Chuyển sang Chế độ Buồng lái Tối",
      themeAria: "Chuyển đổi giao diện Sáng/Tối",
      langGroupAria: "Chọn ngôn ngữ hiển thị",
      langViTitle: "Chuyển sang Tiếng Việt",
      langEnTitle: "Switch to English",
    },
    windPill: {
      header: "ĐIỀU KHIỂN GIÓ NGANG",
      systemBadge: "HỆ THỐNG 01",
      directionLabel: "HƯỚNG GIÓ NGANG",
      east090: "090° ĐÔNG",
      west270: "270° TÂY",
      rtlArrow: "Phải → Trái",
      ltrArrow: "Trái → Phải",
      strengthLabel: "CƯỜNG ĐỘ GIÓ",
      dec5Aria: "Giảm tốc độ gió 5 KT",
      dec5Title: "Giảm 5 KT",
      inc5Aria: "Tăng tốc độ gió 5 KT",
      inc5Title: "Tăng 5 KT",
      light: "Nhẹ",
      lightActive: "Nhẹ (15 KT)",
      moderate: "Vừa",
      moderateActive: "Vừa (25 KT)",
      strong: "Mạnh",
      strongActive: "Mạnh (40 KT)",
      aircraftCardLabel: "MÁY BAY",
      headingPrefix: "Hướng mũi:",
      windCardLabel: "GIÓ NGANG",
      driftCardLabel: "GÓC LỆCH (θ)",
      alignedWithRunway: "Trùng trục đường băng",
      driftingLeft: "Lệch sang trái",
      driftingRight: "Lệch sang phải",
      calculateManually: "Tự tính toán",
      trackCardLabel: "QUỸ ĐẠO",
      answerHidden: "Đang giấu đáp án",
      rwyAligned: "ĐB 36L Chuẩn trục",
      rwyOffAxis: "ĐB 36L Lệch trục",
      vectorAddLabel: "CỘNG VECTƠ:",
      vectorSubLabel: "TRỪ VECTƠ:",
    },
    bottomDock: {
      back: "Quay lại",
      reset: "Đặt lại",
      pause: "Tạm dừng",
      resume: "Tiếp tục",
      watchFlight: "Xem đường bay",
      replay: "Phát lại",
      checkLanding: "Kiểm tra hạ cánh",
      progressAria: "Tiến trình 6 bước",
      stepPrefix: "Bước",
      guide: "Hướng dẫn",
      hideVectors: "Ẩn vectơ",
      showVectors: "Hiện vectơ",
      parallelogram: "Hình bình hành",
      explain: "Giải thích",
      next: "Tiếp theo",
      restart: "Phát lại từ đầu",
    },
    panels: {
      asideAria: "Bảng nhiệm vụ học tập",
      mathBadge: "TOÁN 10 • VECTƠ",
      briefing: {
        currentWindLabel: "GIÓ NGANG HIỆN TẠI",
        trackDriftLabel: "ĐỘ LỆCH QUỸ ĐẠO",
        startChallengeBtn: "BẮT ĐẦU THỬ THÁCH",
      },
      prediction: {
        arcHeader: "CUNG DỰ ĐOÁN HƯỚNG MŨI",
        runwayTag: "ĐƯỜNG BĂNG 36L",
        turnLeft: "RẼ TRÁI",
        crabLeft: "Chếch trái",
        flyStraight: "BAY THẲNG",
        heading360: "Hướng 360°",
        turnRight: "RẼ PHẢI",
        crabRight: "Chếch phải",
        trigHintLabel: "Cân bằng thành phần ngang:",
        openOptionsBtn: "MỞ CÁC PHƯƠNG ÁN HƯỚNG BAY",
        trigButton: "Công thức lượng giác",
        crabAngleFooter: "Góc bù gió • TOÁN 10",
      },
      observe: {
        subtitleTemplate: (windSpeedKts) =>
          `“Chọn hướng mũi máy bay thích hợp để cân bằng gió ngang ${windSpeedKts} KT.”`,
        radioGroupAria: "Các phương án hướng mũi máy bay",
        correctStatus: "DỰ ĐOÁN CHÍNH XÁC!",
        incorrectStatus: "HÃY KIỂM TRA LẠI HƯỚNG GIÓ",
        selectedPrefix: "Đã chọn phương án",
        selectedSuffix: "— nhấn Kiểm tra đáp án",
        idlePrompt: "Chọn thẻ [A–D] hoặc nhấn phím A–D",
        ready: "Sẵn sàng",
        waiting: "Đang chờ",
        trigLabel: "Công thức góc bù gió:",
        verifyInLabBtn: "KIỂM CHỨNG TRÊN MÔ PHỎNG",
        checkAnswerBtn: "Kiểm tra đáp án",
        trigButton: "Công thức góc bù gió",
      },
      vectorCheck: {
        velocityTitle: "VẬN TỐC MÁY BAY",
        headingPrefix: "Hướng",
        sliderAria: "Điều chỉnh góc hướng mũi vectơ v_A",
        stepGroupAria: "Nút tinh chỉnh góc mũi máy bay",
        decHeadingAria: (deg) => `Giảm góc mũi ${deg} độ`,
        incHeadingAria: (deg) => `Tăng góc mũi ${deg} độ`,
        zeroHeadingAria: "Đưa góc mũi về 0 độ thẳng",
        zeroHeadingTitle: "Về 0° (Thẳng)",
        driftLabelHidden: "Độ lệch quỹ đạo: ??.?°",
        driftLabelValue: (absDeg) => `Độ lệch quỹ đạo: ${absDeg.toFixed(1)}°`,
        hiddenTag: "• Đang giấu số",
        withinToleranceTag: (tol) => `• Đạt ngưỡng ±${tol}°`,
        targetToleranceTag: (tol) => `• Ngưỡng đạt ±${tol}°`,
        analysisHeader: "PHÂN TÍCH THÀNH PHẦN VECTƠ",
        crosswindLabel: "GIÓ NGANG",
        leftWord: "Trái",
        rightWord: "Phải",
        counterCompLabel: "THÀNH PHẦN BÙ",
        netLateralLabel: "TỔNG THÀNH PHẦN NGANG:",
        selfCalcTag: "?? KT (Tự tính)",
        balancedTag: "0 KT (CÂN BẰNG)",
        driftingTag: "ĐANG LỆCH",
        revealAnswerBtn: "Mở đáp án số liệu",
        idealHintBtn: (signedIdeal) =>
          `Gợi ý góc cân bằng (${signedIdeal}°)`,
        viewExplainBtn: "XEM GIẢI THÍCH TOÁN HỌC",
        watchFlightBtn: "Xem đường bay",
        checkLandingBtn: "Kiểm tra hạ cánh",
        retryHeadingBtn: "Thử lại góc bay",
      },
      explain: {
        formulaHeader: "CÔNG THỨC PHÉP CỘNG & TRỪ VECTƠ",
        commonOriginTag: "CHUNG ĐIỂM ĐẦU O",
        vaLegend: "— Vận tốc máy bay (hướng mũi)",
        vwLegend: "— Vận tốc gió ngang",
        vrLegend: "— Vận tốc tổng hợp (quỹ đạo thực tế)",
        showParallelogram: "Hiện đường dựng hình bình hành",
        showCoordinateGrid: "Hiện hệ trục tọa độ Oxy",
        ruleHeader: "QUY TẮC HÌNH BÌNH HÀNH (TOÁN 10)",
        snapIdealPrefix: "Đưa vectơ",
        snapIdealSuffix: "về đúng góc cân bằng lý tưởng",
        replayBtn: "PHÁT LẠI ↺",
        finishBtn: "HOÀN THÀNH ✓",
      },
    },
    canvas: {
      chalkActive: "Bút ghi chú đang bật",
      chalkNotes: "Ghi chú trên Radar",
      chalkClear: "Xóa nét",
      chalkTurnOff: "Tắt bút",
      touchdownLocked: "ĐIỂM CHẠM ĐẤT • ĐÃ KHÓA",
      touchdownRwy: "ĐIỂM CHẠM ĐẤT • ĐB 36L",
      projectedDriftHidden: "DỰ KIẾN LỆCH (??m)",
      projectedDriftValue: (absMeters, isLeft) =>
        `DỰ KIẾN LỆCH (${absMeters}m ${isLeft ? "TRÁI" : "PHẢI"})`,
      lateralDriftHidden: "LỆCH NGANG: ??m",
      lateralDriftValue: (signedMeters) => `LỆCH NGANG: ${signedMeters}m`,
      idealPrefix: "Chuẩn",
      radarDriftHidden: "Độ lệch: ??.?° • Đang giấu số liệu",
      radarDriftWithin: (absDeg, tol) =>
        `Độ lệch: ${absDeg.toFixed(1)}° • Đạt ngưỡng ±${tol}°`,
      radarDriftAdjust: (absDeg, tol) =>
        `Độ lệch: ${absDeg.toFixed(1)}° • Cần chỉnh vào ±${tol}°`,
      axisEast: "+x (ĐÔNG)",
      axisNorthRunway: "+y (BẮC / TRỤC ĐƯỜNG BĂNG)",
      vaExplainLabel: "v_A (Vận tốc máy bay)",
      vaLabLabel: (headingLabel) => `v_A (Góc bù ${headingLabel})`,
      vwExplainLabel: "v_W (Gió ngang)",
      rtlUpper: "PHẢI → TRÁI",
      ltrUpper: "TRÁI → PHẢI",
      vrExplainLabel: "v_R (Quỹ đạo thực tế)",
      vrTrackPrefix: "Quỹ đạo",
      dragTip: "KÉO ĐẦU",
      dragTipAria: "Kéo đầu mũi tên vectơ v_A để chỉnh hướng mũi máy bay",
      windNoticeRtl: "Gió ngang đang đẩy máy bay lệch sang trái.",
      windNoticeLtr: "Gió ngang đang đẩy máy bay lệch sang phải.",
      hudAlignedPrefix: "CHUẨN TRỤC:",
      hudWarningPrefix: "CẢNH BÁO:",
      hudAlignedSentence: "Quỹ đạo máy bay trùng với tim đường băng 36L.",
      hudBlindSuffix: "(Lệch ??m • Tự tính)",
      hudDriftMeters: (absMeters) => `(Lệch ${absMeters}m)`,
      hudBalanceHeader: "CÂN BẰNG VECTƠ",
      hudHiddenBadge: "ĐANG GIẤU ĐÁP ÁN",
      hudLockedBadge: "KHÓA ĐƯỜNG BĂNG",
      hudOffCenterBadge: "LỆCH TIM ĐƯỜNG BĂNG",
      hudSubFormulaLabel: "PHÉP TRỪ VECTƠ:",
      hudAddFormulaLabel: "CÔNG THỨC VECTƠ:",
      hudNoseLabel: "MŨI MÁY BAY",
      hudWindLabel: "GIÓ NGANG",
      hudTrackLabel: "QUỸ ĐẠO",
      hudSelfCalcShort: "??.?° (Tự tính)",
      hudAlignedShort: "Chuẩn trục",
      hudDriftingShort: "Đang lệch",
      hudStatusLabel: "TRẠNG THÁI",
      hudHiddenShort: "GIẤU SỐ LIỆU",
      hudCenterLockedShort: "TRÙNG TIM ĐB",
      hudAdjustNeededShort: "CẦN CHỈNH HƯỚNG",
    },
    modals: {
      help: {
        eyebrow: "CẨM NANG PHI CÔNG • TOÁN 10",
        title: "Hướng dẫn sử dụng Nhiệm vụ Vectơ",
        closeAria: "Đóng trợ giúp",
        radarSectionTitle: "THAO TÁC TƯƠNG TÁC TRÊN RADAR",
        bullet1Title: "1. Điều khiển Gió ngang:",
        bullet1Body:
          "Chọn chiều gió (Phải → Trái / Trái → Phải) và cường độ gió (Nhẹ / Vừa / Mạnh) ở góc trên bên trái.",
        bullet2Title: "2. Kéo đầu vectơ (Bước 4–5):",
        bullet2Part1: "Kéo trực tiếp đầu mũi tên vàng",
        bullet2Part2: "sao cho vectơ tổng hợp đỏ",
        bullet2Part3: "song song với đường băng 36L.",
        bullet3Title: "3. Công tắc độc lập ở thanh đáy:",
        bullet3Body:
          "Nút Hiện/Ẩn vectơ chỉ ẩn/hiện 3 mũi tên vectơ; nút Hướng dẫn ẩn/hiện gợi ý sư phạm mà không làm thay đổi vận tốc.",
        shortcutsTitle: "PHÍM TẮT TRÊN LỚP HỌC",
        shortcutStep3: "Chọn đáp án Bước 3",
        shortcutPlay: "Tạm dừng / Tiếp tục",
        shortcutNav: "Quay lại / Tiếp theo",
        shortcutEsc: "Đóng hộp thoại",
        confirmBtn: "ĐÃ HIỂU",
      },
      settings: {
        eyebrow: "TÙY CHỈNH MÔ PHỎNG",
        title: "Cài đặt Buồng lái",
        closeAria: "Đóng cài đặt",
        toleranceTitle: "SAI SỐ GÓC CHO PHÉP (ε)",
        tolerancePart1: "Ngưỡng góc lệch tối đa",
        tolerancePart2: "của vectơ",
        tolerancePart3: "so với trục đường băng 36L.",
        themeTitle: "CHẾ ĐỘ HIỂN THỊ LỚP HỌC",
        themeDark: "Buồng lái tối",
        themeDaylight: "Máy chiếu sáng",
        languageTitle: "NGÔN NGỮ HIỂN THỊ",
        languageVi: "Tiếng Việt (VI)",
        languageEn: "English (EN)",
        soundTitle: "ÂM THANH PHẢN HỒI",
        soundOn: "Âm thanh: Bật",
        soundOff: "Âm thanh: Tắt",
        doneBtn: "HOÀN TẤT",
      },
      video: {
        eyebrow: "MINH HỌA TRỰC QUAN",
        title: "Cách bù gió ngang bằng phép cộng vectơ",
        closeAria: "Đóng minh họa",
        svgRunwayAxis: "TRỤC ĐƯỜNG BĂNG 36L",
        svgStep1: "1. Kéo đầu v_A (+18.4°)",
        svgStep2: "2. Gió ngang v_W",
        svgStep3: "3. Vectơ tổng hợp v_R trùng trục!",
        conditionLabel: "Điều kiện hạ cánh an toàn:",
        closeBtn: "ĐÓNG",
        tryNowBtn: "THỰC HÀNH NGAY",
      },
      teacher: {
        eyebrow: "TEACHER STUDIO • TOÁN 10",
        title: "Ngăn Tùy biến Giáo viên & Ra đề Nhanh",
        closeAria: "Đóng Chế độ Giáo viên",
        section1Title: "1. CHẾ ĐỘ PHÉP TOÁN VECTƠ",
        addModeTitle: "Phép cộng Vectơ",
        subtractModeTitle: "Phép trừ Vectơ",
        section2Title: "2. BỘ ĐỀ SỐ ĐẸP TÍNH NHẨM & ĐƯỜNG BĂNG NGHIÊNG",
        magnitudeLabel: "Độ lớn",
        airspeedAria: "Chỉnh độ lớn vận tốc máy bay",
        windSpeedAria: "Chỉnh độ lớn vận tốc gió",
        runwayAngleLabel: "Góc đường băng",
        runwayAngleAria: "Xoay góc đường băng từ -45 đến +45 độ",
        blindTitle: "Chế độ Giấu số liệu",
        blindDesc: "Ẩn góc lệch & v_R để học sinh tự tính",
        blindAria: "Chế độ giấu số liệu",
        tvScaleTitle: "Cỡ chữ TV / Máy chiếu",
        tvNormal: "100% (Chuẩn)",
        tvLarge: "115% (Lớn)",
        tvXlarge: "125% (Rất lớn)",
        section3Title: "3. LƯU BỘ ĐỀ CÁ NHÂN & CHIA SẺ LINK BÀI GIẢNG",
        defaultPresetName: (va, vw) => `Bài giảng Toán 10 (${va}/${vw})`,
        presetPlaceholder: "Đặt tên bài giảng (VD: Tiết 12 - Góc 30 độ)...",
        presetInputAria: "Tên bộ đề bài giảng",
        savePresetBtn: "Lưu bộ đề",
        deletePresetAria: (name) => `Xóa bộ đề ${name}`,
        copiedBtn: "Đã sao chép!",
        copyUrlBtn: "Sao chép Link bài giảng",
      },
    },
    errors: {
      globalEyebrow: "SỰ CỐ HỆ THỐNG",
      globalTitle: "Mô phỏng tạm thời gián đoạn",
      globalBadge: "MÃ LỖI HUD",
      globalBody:
        "Hệ thống hiển thị hoặc tính toán vừa gặp sự cố ngoài ý muốn. Nhấn nút bên dưới để khôi phục buồng lái mô phỏng.",
      globalResetBtn: "Khôi phục mô phỏng",
      canvasFallbackMsg: "Lỗi hiển thị màn hình Radar",
      canvasTitle: "MÀN HÌNH RADAR TẠM NGƯNG",
      canvasResetBtn: "Khởi động lại Radar",
    },
  },
  en: {
    meta: {
      pageTitle: "VECTOR QUEST • MATH 10 — Vector Addition & Subtraction",
    },
    topBar: {
      logoAlt: "Vector Quest Logo",
      brandEyebrow: "VECTOR ADDITION & SUBTRACTION",
      brandTitle: "VECTOR QUEST • MATH 10",
      navAria: "Mission stages",
      revealAnswerButton: "Reveal Answer",
      revealAnswerTitle: "Reveal hidden numeric values",
      revealAnswerAria: "Reveal hidden numeric values",
      teacherButton: "Teacher",
      teacherTitle: "Teacher Studio (Presets & Share)",
      teacherAria: "Teacher Studio",
      chalkTitle: "Radar Chalk Pen",
      videoTitle: "Visual Demo",
      settingsTitle: "Settings",
      soundOnLabel: "Audio: On",
      soundOffLabel: "Audio: Off",
      fullscreenEnterTitle: "Fullscreen",
      fullscreenExitTitle: "Exit Fullscreen",
      fullscreenWarn: "Fullscreen API unavailable or blocked",
      helpTitle: "Help",
      themeToDaylightTitle: "Switch to Daylight Projector Mode",
      themeToDarkTitle: "Switch to Dark Cockpit Mode",
      themeAria: "Toggle Light/Dark theme",
      langGroupAria: "Select display language",
      langViTitle: "Chuyển sang Tiếng Việt",
      langEnTitle: "Switch to English",
    },
    windPill: {
      header: "CROSSWIND CONTROL",
      systemBadge: "SYSTEM 01",
      directionLabel: "WIND DIRECTION",
      east090: "090° EAST",
      west270: "270° WEST",
      rtlArrow: "Right → Left",
      ltrArrow: "Left → Right",
      strengthLabel: "WIND SPEED",
      dec5Aria: "Decrease wind speed by 5 KT",
      dec5Title: "Decrease 5 KT",
      inc5Aria: "Increase wind speed by 5 KT",
      inc5Title: "Increase 5 KT",
      light: "Light",
      lightActive: "Light (15 KT)",
      moderate: "Mod",
      moderateActive: "Mod (25 KT)",
      strong: "Strong",
      strongActive: "Strong (40 KT)",
      aircraftCardLabel: "AIRCRAFT",
      headingPrefix: "Heading:",
      windCardLabel: "CROSSWIND",
      driftCardLabel: "DRIFT ANGLE (θ)",
      alignedWithRunway: "Aligned with Runway",
      driftingLeft: "Drifting Left",
      driftingRight: "Drifting Right",
      calculateManually: "Calculate manually",
      trackCardLabel: "GROUND TRACK",
      answerHidden: "Answer hidden",
      rwyAligned: "RWY 36L Aligned",
      rwyOffAxis: "RWY 36L Off-Axis",
      vectorAddLabel: "VECTOR ADD:",
      vectorSubLabel: "VECTOR SUB:",
    },
    bottomDock: {
      back: "Back",
      reset: "Reset",
      pause: "Pause",
      resume: "Resume",
      watchFlight: "Watch Flight",
      replay: "Replay",
      checkLanding: "Check Landing",
      progressAria: "6-step progress",
      stepPrefix: "Step",
      guide: "Guide",
      hideVectors: "Hide Vectors",
      showVectors: "Show Vectors",
      parallelogram: "Parallelogram",
      explain: "Explain",
      next: "Next",
      restart: "Restart",
    },
    panels: {
      asideAria: "Learning mission panel",
      mathBadge: "MATH 10 • VECTORS",
      briefing: {
        currentWindLabel: "CURRENT CROSSWIND",
        trackDriftLabel: "TRACK DEFLECTION",
        startChallengeBtn: "START CHALLENGE",
      },
      prediction: {
        arcHeader: "HEADING PREDICTION ARC",
        runwayTag: "RUNWAY 36L",
        turnLeft: "TURN LEFT",
        crabLeft: "Crab Left",
        flyStraight: "FLY STRAIGHT",
        heading360: "HDG 360°",
        turnRight: "TURN RIGHT",
        crabRight: "Crab Right",
        trigHintLabel: "Balance lateral component:",
        openOptionsBtn: "OPEN HEADING OPTIONS",
        trigButton: "Trigonometry Formula",
        crabAngleFooter: "Crab Angle • MATH 10",
      },
      observe: {
        subtitleTemplate: (windSpeedKts) =>
          `“Choose the right aircraft heading to balance the ${windSpeedKts} KT crosswind.”`,
        radioGroupAria: "Aircraft heading options",
        correctStatus: "CORRECT PREDICTION!",
        incorrectStatus: "CHECK WIND DIRECTION AGAIN",
        selectedPrefix: "Selected option",
        selectedSuffix: "— click Check Answer",
        idlePrompt: "Select a card [A–D] or press keys A–D",
        ready: "Ready",
        waiting: "Waiting",
        trigLabel: "Crab angle formula:",
        verifyInLabBtn: "VERIFY IN FLIGHT LAB",
        checkAnswerBtn: "Check Answer",
        trigButton: "Crab angle formula",
      },
      vectorCheck: {
        velocityTitle: "AIRCRAFT VELOCITY",
        headingPrefix: "HDG",
        sliderAria: "Adjust aircraft vector v_A heading angle",
        stepGroupAria: "Fine heading step buttons",
        decHeadingAria: (deg) => `Decrease heading by ${deg} degrees`,
        incHeadingAria: (deg) => `Increase heading by ${deg} degrees`,
        zeroHeadingAria: "Reset heading to 0 degrees straight",
        zeroHeadingTitle: "Reset to 0° (Straight)",
        driftLabelHidden: "Track Drift: ??.?°",
        driftLabelValue: (absDeg) => `Track Drift: ${absDeg.toFixed(1)}°`,
        hiddenTag: "• Hidden",
        withinToleranceTag: (tol) => `• Within ±${tol}°`,
        targetToleranceTag: (tol) => `• Target ±${tol}°`,
        analysisHeader: "VECTOR COMPONENT ANALYSIS",
        crosswindLabel: "CROSSWIND",
        leftWord: "Left",
        rightWord: "Right",
        counterCompLabel: "COMPENSATION",
        netLateralLabel: "NET LATERAL COMPONENT:",
        selfCalcTag: "?? KT (Calculate)",
        balancedTag: "0 KT (BALANCED)",
        driftingTag: "DRIFTING",
        revealAnswerBtn: "Reveal Numeric Values",
        idealHintBtn: (signedIdeal) =>
          `Hint: Ideal Crab Angle (${signedIdeal}°)`,
        viewExplainBtn: "VIEW MATH EXPLANATION",
        watchFlightBtn: "Watch Flight",
        checkLandingBtn: "Check Landing",
        retryHeadingBtn: "Adjust Heading",
      },
      explain: {
        formulaHeader: "VECTOR ADDITION & SUBTRACTION",
        commonOriginTag: "COMMON ORIGIN O",
        vaLegend: "— Aircraft airspeed (heading)",
        vwLegend: "— Crosswind velocity",
        vrLegend: "— Resultant velocity (ground track)",
        showParallelogram: "Show Parallelogram Guides",
        showCoordinateGrid: "Show Oxy Coordinate Axes",
        ruleHeader: "PARALLELOGRAM RULE (MATH 10)",
        snapIdealPrefix: "Snap vector",
        snapIdealSuffix: "to the exact equilibrium crab angle",
        replayBtn: "REPLAY ↺",
        finishBtn: "COMPLETE ✓",
      },
    },
    canvas: {
      chalkActive: "Radar Chalk Active",
      chalkNotes: "Radar Notes",
      chalkClear: "Clear",
      chalkTurnOff: "Turn Off",
      touchdownLocked: "TOUCHDOWN • LOCKED",
      touchdownRwy: "TOUCHDOWN • RWY 36L",
      projectedDriftHidden: "PROJECTED DRIFT (??m)",
      projectedDriftValue: (absMeters, isLeft) =>
        `PROJECTED DRIFT (${absMeters}m ${isLeft ? "LEFT" : "RIGHT"})`,
      lateralDriftHidden: "LATERAL DRIFT: ??m",
      lateralDriftValue: (signedMeters) => `LATERAL DRIFT: ${signedMeters}m`,
      idealPrefix: "Ideal",
      radarDriftHidden: "Drift: ??.?° • Values hidden",
      radarDriftWithin: (absDeg, tol) =>
        `Drift: ${absDeg.toFixed(1)}° • Within ±${tol}°`,
      radarDriftAdjust: (absDeg, tol) =>
        `Drift: ${absDeg.toFixed(1)}° • Aim within ±${tol}°`,
      axisEast: "+x (EAST)",
      axisNorthRunway: "+y (NORTH / RUNWAY AXIS)",
      vaExplainLabel: "v_A (Aircraft velocity)",
      vaLabLabel: (headingLabel) => `v_A (Crab ${headingLabel})`,
      vwExplainLabel: "v_W (Crosswind)",
      rtlUpper: "RIGHT → LEFT",
      ltrUpper: "LEFT → RIGHT",
      vrExplainLabel: "v_R (Resultant track)",
      vrTrackPrefix: "Track",
      dragTip: "DRAG TIP",
      dragTipAria: "Drag the tip of vector v_A to adjust aircraft heading",
      windNoticeRtl: "Crosswind is pushing the aircraft to the left.",
      windNoticeLtr: "Crosswind is pushing the aircraft to the right.",
      hudAlignedPrefix: "ON AXIS:",
      hudWarningPrefix: "WARNING:",
      hudAlignedSentence: "Flight track is aligned with Runway 36L centerline.",
      hudBlindSuffix: "(Drift ??m • Calculate)",
      hudDriftMeters: (absMeters) => `(Drift ${absMeters}m)`,
      hudBalanceHeader: "VECTOR EQUILIBRIUM",
      hudHiddenBadge: "VALUES HIDDEN",
      hudLockedBadge: "RUNWAY LOCKED",
      hudOffCenterBadge: "OFF CENTERLINE",
      hudSubFormulaLabel: "VECTOR SUBTRACTION:",
      hudAddFormulaLabel: "VECTOR EQUATION:",
      hudNoseLabel: "AIRCRAFT NOSE",
      hudWindLabel: "CROSSWIND",
      hudTrackLabel: "GROUND TRACK",
      hudSelfCalcShort: "??.?° (Calculate)",
      hudAlignedShort: "Aligned",
      hudDriftingShort: "Drifting",
      hudStatusLabel: "STATUS",
      hudHiddenShort: "HIDDEN",
      hudCenterLockedShort: "CENTERLINE LOCKED",
      hudAdjustNeededShort: "ADJUST HEADING",
    },
    modals: {
      help: {
        eyebrow: "PILOT HANDBOOK • MATH 10",
        title: "How to Use Vector Quest",
        closeAria: "Close help",
        radarSectionTitle: "RADAR INTERACTION CONTROLS",
        bullet1Title: "1. Crosswind Control:",
        bullet1Body:
          "Select wind direction (Right → Left / Left → Right) and speed (Light / Mod / Strong) in the top-left panel.",
        bullet2Title: "2. Drag Vector Tip (Steps 4–5):",
        bullet2Part1: "Drag the amber arrow tip",
        bullet2Part2: "so the red resultant vector",
        bullet2Part3: "runs parallel to Runway 36L.",
        bullet3Title: "3. Independent Bottom Bar Toggles:",
        bullet3Body:
          "Show/Hide Vectors only toggles the 3 arrows; Guide toggles pedagogical hints without altering velocities.",
        shortcutsTitle: "CLASSROOM KEYBOARD SHORTCUTS",
        shortcutStep3: "Pick Step 3 option",
        shortcutPlay: "Pause / Resume",
        shortcutNav: "Previous / Next step",
        shortcutEsc: "Close modal",
        confirmBtn: "GOT IT",
      },
      settings: {
        eyebrow: "SIMULATION SETTINGS",
        title: "Cockpit Preferences",
        closeAria: "Close settings",
        toleranceTitle: "ALLOWED ANGULAR TOLERANCE (ε)",
        tolerancePart1: "Maximum drift threshold",
        tolerancePart2: "for vector",
        tolerancePart3: "relative to Runway 36L centerline.",
        themeTitle: "CLASSROOM DISPLAY THEME",
        themeDark: "Dark Cockpit",
        themeDaylight: "Daylight Projector",
        languageTitle: "DISPLAY LANGUAGE",
        languageVi: "Tiếng Việt (VI)",
        languageEn: "English (EN)",
        soundTitle: "AUDIO FEEDBACK",
        soundOn: "Audio: On",
        soundOff: "Audio: Off",
        doneBtn: "DONE",
      },
      video: {
        eyebrow: "VISUAL WALKTHROUGH",
        title: "Compensating Crosswind with Vector Addition",
        closeAria: "Close demo",
        svgRunwayAxis: "RUNWAY 36L AXIS",
        svgStep1: "1. Drag v_A tip (+18.4°)",
        svgStep2: "2. Crosswind v_W",
        svgStep3: "3. Resultant v_R aligned!",
        conditionLabel: "Safe landing condition:",
        closeBtn: "CLOSE",
        tryNowBtn: "TRY IN LAB",
      },
      teacher: {
        eyebrow: "TEACHER STUDIO • MATH 10",
        title: "Teacher Customization & Quick Problem Builder",
        closeAria: "Close Teacher Studio",
        section1Title: "1. VECTOR OPERATION MODE",
        addModeTitle: "Vector Addition",
        subtractModeTitle: "Vector Subtraction",
        section2Title: "2. CLEAN-ANGLE PRESETS & ROTATED RUNWAY",
        magnitudeLabel: "Magnitude",
        airspeedAria: "Adjust aircraft speed magnitude",
        windSpeedAria: "Adjust wind speed magnitude",
        runwayAngleLabel: "Runway Angle",
        runwayAngleAria: "Rotate runway angle from -45 to +45 degrees",
        blindTitle: "Blind Classroom Mode",
        blindDesc: "Hide drift & v_R so students compute manually",
        blindAria: "Blind classroom mode",
        tvScaleTitle: "TV / Projector Font Scale",
        tvNormal: "100% (Standard)",
        tvLarge: "115% (Large)",
        tvXlarge: "125% (X-Large)",
        section3Title: "3. SAVE PERSONAL PRESETS & SHARE LESSON LINK",
        defaultPresetName: (va, vw) => `Math 10 Lesson (${va}/${vw})`,
        presetPlaceholder: "Name this lesson (e.g. Period 12 - 30 deg)...",
        presetInputAria: "Lesson preset name",
        savePresetBtn: "Save Preset",
        deletePresetAria: (name) => `Delete preset ${name}`,
        copiedBtn: "Copied!",
        copyUrlBtn: "Copy Lesson Link",
      },
    },
    errors: {
      globalEyebrow: "SYSTEM FAULT",
      globalTitle: "Simulation Temporarily Interrupted",
      globalBadge: "HUD ERROR",
      globalBody:
        "The cockpit renderer or calculation engine encountered an unexpected issue. Click below to restore the simulation.",
      globalResetBtn: "Restore Simulation",
      canvasFallbackMsg: "Radar display rendering error",
      canvasTitle: "RADAR DISPLAY PAUSED",
      canvasResetBtn: "Restart Radar",
    },
  },
};

export function getTranslations(language: Language): UiTranslations {
  return UI_COPY[language] ?? UI_COPY.vi;
}
