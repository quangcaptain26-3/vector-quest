import type { Metadata } from "next";
import "katex/dist/katex.min.css";
import "./globals.css";

export const metadata: Metadata = {
  title: "NHIỆM VỤ VECTƠ • TOÁN 10 — Phép cộng & Phép trừ Vectơ",
  description:
    "Mô phỏng buồng lái tương tác giúp học sinh lớp 10 khám phá phép cộng và phép trừ vectơ (v_R = v_A + v_W) khi hạ cánh trong gió ngang.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="vi" className="dark h-full antialiased">
      <body className="bg-surface text-on-surface font-body-md text-body-md min-h-screen flex flex-col selection:bg-primary-container selection:text-on-primary-container">
        {children}
      </body>
    </html>
  );
}
