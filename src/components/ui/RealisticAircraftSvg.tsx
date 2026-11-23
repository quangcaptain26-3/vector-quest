"use client";

import { useId } from "react";

interface RealisticAircraftSvgProps {
  /** Kích thước hiển thị: 'radar' cho sân bay chính, 'mini' cho thẻ đáp án Bước 3 */
  readonly variant?: "radar" | "mini";
  /** Chế độ Máy chiếu Sáng để tăng độ đậm viền máy bay */
  readonly isDaylight?: boolean;
  /** Trạng thái đang được chọn (dùng cho mini card Bước 3) */
  readonly isSelected?: boolean;
  /** Độ rộng SVG khi dùng độc lập */
  readonly className?: string;
}

/**
 * Biểu tượng máy bay phản lực nhìn từ trên xuống (top-down) đa lớp nội bộ:
 * - Bóng đổ mềm phía dưới tạo chiều sâu bay
 * - Thân máy bay bo tròn tạo khối sáng tối 3D từ sống lưng ra hai bên
 * - Đôi cánh xuôi có đường cánh tà & 2 động cơ phản lực
 * - Kính buồng lái tối màu phản chiếu
 * - Đèn dẫn hướng đầu cánh chuẩn hàng không (đỏ bên trái, xanh lá bên phải) & đèn đuôi
 */
export function RealisticAircraftSvg({
  variant = "radar",
  isDaylight = false,
  isSelected = false,
  className,
}: RealisticAircraftSvgProps) {
  const uid = useId().replace(/:/g, "");
  const fuselageGradId = `vq-fuselage-${uid}`;
  const wingGradId = `vq-wing-${uid}`;
  const visorGradId = `vq-visor-${uid}`;

  const strokeMain = isDaylight ? "#0f172a" : "#475569";
  const accentStripe = isSelected
    ? "#38bdf8"
    : isDaylight
      ? "#d97706"
      : "#ffc640";

  return (
    <svg
      id={variant === "radar" ? "realistic-aircraft-radar" : undefined}
      viewBox="-36 -36 72 72"
      width={variant === "radar" ? 64 : 44}
      height={variant === "radar" ? 64 : 44}
      className={className}
      aria-hidden="true"
    >
      <defs>
        {/* Gradient 3D thân máy bay từ sống lưng ra 2 bên */}
        <linearGradient id={fuselageGradId} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#94a3b8" />
          <stop offset="28%" stopColor="#e2e8f0" />
          <stop offset="50%" stopColor="#ffffff" />
          <stop offset="72%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#64748b" />
        </linearGradient>

        {/* Gradient cánh xuôi có chiều sâu khí động học */}
        <linearGradient id={wingGradId} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#f1f5f9" />
          <stop offset="65%" stopColor="#cbd5e1" />
          <stop offset="100%" stopColor="#94a3b8" />
        </linearGradient>

        {/* Gradient kính buồng lái tối màu phản chiếu */}
        <linearGradient id={visorGradId} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="50%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* Lớp 1: Bóng đổ mềm xuống mặt đường băng */}
      {variant === "radar" && (
        <g transform="translate(2.5, 4.5)" opacity={isDaylight ? 0.25 : 0.45}>
          <path
            d="M 0 -28 C 3.5 -22 4.5 -10 4.5 -4 L 29 9 L 29 14 L 4.5 8 L 3.8 20 L 13 26 L 13 29 L 1.5 26 L 0 29 L -1.5 26 L -13 29 L -13 26 L -3.8 20 L -4.5 8 L -29 14 L -29 9 L -4.5 -4 C -4.5 -10 -3.5 -22 0 -28 Z"
            fill="#020617"
          />
        </g>
      )}

      {/* Lớp 2: Hai động cơ phản lực dưới cánh (Turbofan Nacelles) */}
      <g>
        {/* Động cơ trái */}
        <rect
          x={-15.5}
          y={-6.5}
          width={5}
          height={12.5}
          rx={2.2}
          fill="#475569"
          stroke={strokeMain}
          strokeWidth={0.8}
        />
        <rect x={-14.8} y={-7} width={3.6} height={1.8} rx={0.9} fill="#e2e8f0" />
        <rect x={-14.5} y={5.2} width={3} height={1.8} rx={0.6} fill="#1e293b" />

        {/* Động cơ phải */}
        <rect
          x={10.5}
          y={-6.5}
          width={5}
          height={12.5}
          rx={2.2}
          fill="#475569"
          stroke={strokeMain}
          strokeWidth={0.8}
        />
        <rect x={11.2} y={-7} width={3.6} height={1.8} rx={0.9} fill="#e2e8f0" />
        <rect x={11.5} y={5.2} width={3} height={1.8} rx={0.6} fill="#1e293b" />
      </g>

      {/* Lớp 3: Đôi cánh chính xuôi & cánh đuôi ngang */}
      <g>
        {/* Cánh chính trái & phải */}
        <path
          d="M -4 -7 L -29 7 L -29 12.5 L -4 6.5 Z"
          fill={`url(#${wingGradId})`}
          stroke={strokeMain}
          strokeWidth={0.9}
          strokeLinejoin="round"
        />
        <path
          d="M 4 -7 L 29 7 L 29 12.5 L 4 6.5 Z"
          fill={`url(#${wingGradId})`}
          stroke={strokeMain}
          strokeWidth={0.9}
          strokeLinejoin="round"
        />
        {/* Đường rãnh cánh tà (Flaps) */}
        <line
          x1={-6}
          y1={5.5}
          x2={-24}
          y2={10.2}
          stroke="#64748b"
          strokeWidth={0.8}
        />
        <line
          x1={6}
          y1={5.5}
          x2={24}
          y2={10.2}
          stroke="#64748b"
          strokeWidth={0.8}
        />

        {/* Cánh đuôi ngang trái & phải */}
        <path
          d="M -3.2 18 L -13.5 25 L -13.5 28.5 L -2.5 25.2 Z"
          fill={`url(#${wingGradId})`}
          stroke={strokeMain}
          strokeWidth={0.85}
          strokeLinejoin="round"
        />
        <path
          d="M 3.2 18 L 13.5 25 L 13.5 28.5 L 2.5 25.2 Z"
          fill={`url(#${wingGradId})`}
          stroke={strokeMain}
          strokeWidth={0.85}
          strokeLinejoin="round"
        />
      </g>

      {/* Lớp 4: Thân máy bay bo tròn tạo khối 3D */}
      <path
        d="M 0 -29 C 3.4 -24 4.8 -14 4.8 -5 L 4.4 17 C 4 23 2.2 27 0 28.5 C -2.2 27 -4 23 -4.4 17 L -4.8 -5 C -4.8 -14 -3.4 -24 0 -29 Z"
        fill={`url(#${fuselageGradId})`}
        stroke={strokeMain}
        strokeWidth={1.1}
      />

      {/* Vạch nhận diện hàng không dọc sống lưng & cánh đuôi đứng */}
      <line
        x1={0}
        y1={-12}
        x2={0}
        y2={18}
        stroke={accentStripe}
        strokeWidth={1.3}
        strokeLinecap="round"
        opacity={0.9}
      />
      <path
        d="M 0 17 L 1.2 28 L 0 30 L -1.2 28 Z"
        fill={accentStripe}
        stroke={strokeMain}
        strokeWidth={0.6}
      />

      {/* Lớp 5: Kính buồng lái tối màu phản chiếu */}
      <path
        d="M -2.7 -17.5 C -1.8 -20.8 1.8 -20.8 2.7 -17.5 L 2.2 -14.8 C 1 -15.8 -1 -15.8 -2.2 -14.8 Z"
        fill={`url(#${visorGradId})`}
        stroke="#020617"
        strokeWidth={0.6}
      />
      {/* Điểm phản sáng trên kính lái */}
      <path
        d="M -1.5 -18.2 C -0.5 -19.2 0.8 -19.1 1.6 -18"
        fill="none"
        stroke="#e0f2fe"
        strokeWidth={0.7}
        strokeLinecap="round"
        opacity={0.75}
      />

      {/* Lớp 6: Đèn dẫn hướng đầu cánh chuẩn hàng không (Port = Đỏ, Starboard = Xanh lá) */}
      <g>
        {/* Đèn đỏ đầu cánh trái */}
        <circle cx={-29.2} cy={9.8} r={3.2} fill="#ef4444" fillOpacity={0.28} />
        <circle cx={-29.2} cy={9.8} r={1.6} fill="#ef4444" />

        {/* Đèn xanh lá đầu cánh phải */}
        <circle cx={29.2} cy={9.8} r={3.2} fill="#10b981" fillOpacity={0.28} />
        <circle cx={29.2} cy={9.8} r={1.6} fill="#10b981" />

        {/* Đèn chớp trắng ở đuôi */}
        <circle cx={0} cy={29.2} r={1.3} fill="#f8fafc" />
      </g>
    </svg>
  );
}
