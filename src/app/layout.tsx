import type { Metadata, Viewport } from "next";
import { Inter, Cinzel } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin", "vietnamese"],
  variable: "--font-inter",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  variable: "--font-cinzel",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://minktuans.github.io"),
  title: "Phạm Minh Tuấn (MinkTuans) — The Wolf's Journey Portfolio",
  description:
    "Portfolio cá nhân của Phạm Minh Tuấn (MinkTuans) — Lập trình viên Web chuyên sâu kiến trúc Laravel Service, Next.js và Supabase. Khám phá các dự án MindNova AI, AI Cooking và kinh nghiệm thực tế.",
  keywords: [
    "Phạm Minh Tuấn",
    "MinkTuans",
    "Portfolio",
    "The Wolf's Journey",
    "Laravel",
    "Next.js",
    "React",
    "Supabase",
    "MySQL",
    "Cloudflare R2",
    "Gemini API",
    "Web Developer",
  ],
  authors: [{ name: "Phạm Minh Tuấn", url: "https://github.com/MinkTuans" }],
  creator: "Phạm Minh Tuấn",
  openGraph: {
    title: "Phạm Minh Tuấn (MinkTuans) — The Wolf's Journey Portfolio",
    description:
      "Lập trình viên Web chuyên sâu kiến trúc Laravel Service, Next.js và Supabase. Khám phá năng lực thực tế qua các sản phẩm đã trực tiếp xây dựng.",
    url: "https://github.com/MinkTuans",
    siteName: "Phạm Minh Tuấn Portfolio",
    locale: "vi_VN",
    type: "website",
    images: [
      {
        url: "/images/avatar.jpg",
        width: 800,
        height: 800,
        alt: "Phạm Minh Tuấn Portrait",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Phạm Minh Tuấn (MinkTuans) — The Wolf's Journey Portfolio",
    description:
      "Khám phá năng lực thực tế qua các sản phẩm đã trực tiếp xây dựng: MindNova AI, AI Cooking, Tour Management.",
    images: ["/images/avatar.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#fbfcf9",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${inter.variable} ${cinzel.variable}`}>
      <body className="bg-[#fbfcf9] text-stone-900 min-h-screen antialiased selection:bg-meadow-800 selection:text-white">
        {children}
      </body>
    </html>
  );
}
