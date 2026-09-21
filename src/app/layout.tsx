import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Merienda } from "next/font/google";
import "./globals.css";

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin", "vietnamese"],
  variable: "--font-sans",
  display: "swap",
});

const handFont = Merienda({
  subsets: ["latin", "vietnamese"],
  variable: "--font-hand",
  display: "swap",
  weight: ["500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://minktuans.github.io"),
  title: "Animals in the Forest — Discover Nature's Wonders",
  description:
    "An immersive visual journey through the living wild. Discover the deer, the fox, the wolf, and the bear through cinematic scroll storytelling.",
  keywords: [
    "Animals in the Forest",
    "Nature Documentary",
    "Wildlife",
    "Visual Storytelling",
    "Scroll Animation",
    "Forest Experience",
  ],
  openGraph: {
    title: "Animals in the Forest — Discover Nature's Wonders",
    description:
      "Explore the secret life of creatures that call the ancient forest home. A cinematic scroll-driven nature experience.",
    images: [
      {
        url: "/images/forest/hero-morning.jpg",
        width: 1920,
        height: 1080,
        alt: "Animals in the Forest Morning Vista",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#1b382b",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${sansFont.variable} ${handFont.variable}`}>
      <body className="bg-[#0b1a12] text-[#f4efe6] min-h-screen antialiased selection:bg-[#326038] selection:text-white">
        {children}
      </body>
    </html>
  );
}
