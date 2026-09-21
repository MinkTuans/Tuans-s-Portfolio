import React from "react";
import Image from "next/image";
import { Compass, ArrowUp, Github, Mail, Phone, MapPin, Trees } from "lucide-react";
import { ContactInfo } from "@/types/portfolio";

interface FooterProps {
  fullName: string;
  contact: ContactInfo;
}

export default function Footer({ fullName, contact }: FooterProps) {
  return (
    <footer className="relative bg-[#163B28] text-[#F7F6EC] pt-20 pb-12 overflow-hidden border-t-2 border-[#1F4D32]">
      
      {/* 1. Silhouette Layers of Pine Forest & Mountain Horizon */}
      <div className="absolute top-0 inset-x-0 h-24 overflow-hidden pointer-events-none opacity-35">
        <svg viewBox="0 0 1440 100" fill="none" className="w-full h-full" preserveAspectRatio="none">
          {/* Layer 1: Distant Misty Ridge */}
          <path
            d="M0,60 C300,30 600,70 900,40 C1200,20 1350,55 1440,35 L1440,0 L0,0 Z"
            fill="#1F4D32"
          />
          {/* Layer 2: Pine Silhouettes Peaks */}
          <path
            d="M0,80 L40,65 L80,80 L120,60 L160,80 L200,68 L240,80 L300,55 L360,80 L420,62 L480,80 L540,58 L600,80 L680,64 L740,80 L800,56 L860,80 L940,60 L1000,80 L1080,54 L1140,80 L1200,66 L1260,80 L1340,58 L1400,80 L1440,70 L1440,0 L0,0 Z"
            fill="#0e2419"
          />
        </svg>
      </div>

      {/* Small Wolf Silhouette perched at the top corner */}
      <div className="absolute top-6 right-12 sm:right-24 w-16 h-10 pointer-events-none opacity-40">
        <Image
          src="/images/forest/wolf-runner-transparent-white.png"
          alt="Small Wolf Silhouette"
          fill
          className="object-contain"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-[#1F4D32]">
          
          {/* Brand & Concept */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-[#1F4D32] border border-[#A8C9AD]/30 flex items-center justify-center text-nature-sun shadow-sm">
                <Compass className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-lg text-white">
                  {fullName}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-[#A8C9AD] uppercase font-semibold">
                  The Wolf&apos;s Journey
                </span>
              </div>
            </div>
            <p className="text-sm text-[#A8C9AD] leading-relaxed font-sans font-normal">
              Hành trình bền bỉ, nhạy bén và không ngừng tiến bước qua các miền cảnh quan công nghệ. Từng sản phẩm là một minh chứng sống động cho năng lực tự xây dựng từ gốc rễ.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-[#F7F6EC]/80">
              <MapPin className="w-3.5 h-3.5 text-nature-sun" />
              <span>{contact.location}</span>
            </div>
          </div>

          {/* Direct Verified Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-white/90 font-bold">
              Kênh Liên Hệ Trực Tiếp
            </h4>
            <div className="flex flex-col gap-2.5 text-sm">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 text-[#A8C9AD] hover:text-white transition-colors"
              >
                <Mail className="w-4 h-4 text-nature-sun" />
                <span>{contact.email}</span>
              </a>
              <a
                href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-2 text-[#A8C9AD] hover:text-white transition-colors"
              >
                <Phone className="w-4 h-4 text-nature-sun" />
                <span>{contact.phone}</span>
              </a>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-[#A8C9AD] hover:text-white transition-colors"
              >
                <Github className="w-4 h-4 text-nature-sun" />
                <span>github.com/{contact.githubUsername}</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation & Back to Top */}
          <div className="flex flex-col justify-between gap-6">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-white/90 font-bold mb-3">
                Các Chặng Hành Trình
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {[
                  { label: "Bắt Đầu", href: "#hero" },
                  { label: "Hành Trình Sói", href: "#wolf-journey" },
                  { label: "Đã Xây Dựng", href: "#what-i-built" },
                  { label: "Dự Án", href: "#projects" },
                  { label: "Kinh Nghiệm", href: "#experience" },
                  { label: "Kỹ Năng", href: "#skills" },
                  { label: "Liên Hệ", href: "#contact" },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="px-2.5 py-1 rounded-xl text-xs font-mono bg-[#1F4D32]/80 hover:bg-nature-forest text-[#A8C9AD] hover:text-white border border-[#A8C9AD]/20 transition-all"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <a
              href="#hero"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-2xl bg-[#1F4D32] hover:bg-[#255a3b] border border-[#A8C9AD]/30 text-xs font-semibold text-white transition-all self-start shadow-sm font-sans"
            >
              <ArrowUp className="w-3.5 h-3.5 text-nature-sun" />
              <span>Trở Về Đầu Trang</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#A8C9AD]">
          <p>© {new Date().getFullYear()} {fullName}. Toàn bộ dữ liệu đối soát 100% từ CV cá nhân.</p>
          <p className="font-mono text-[11px] text-[#A8C9AD]/80">
            The Wolf&apos;s Journey • Nature Edition
          </p>
        </div>
      </div>
    </footer>
  );
}
