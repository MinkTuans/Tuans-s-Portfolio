import React from "react";
import Link from "next/link";
import { Compass, ArrowUp, Github, Mail, Phone, MapPin } from "lucide-react";
import { ContactInfo } from "@/types/portfolio";

interface FooterProps {
  fullName: string;
  contact: ContactInfo;
}

export default function Footer({ fullName, contact }: FooterProps) {
  return (
    <footer className="relative bg-steppe-950 border-t border-steppe-800/80 pt-16 pb-12 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-4xl h-32 bg-gradient-to-b from-steppe-900/40 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-steppe-850">
          {/* Brand & Concept */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-steppe-800 border border-steppe-700 flex items-center justify-center text-amber-sun">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-display font-semibold text-lg text-steppe-100">
                {fullName}
              </span>
            </div>
            <p className="text-sm text-steppe-400 leading-relaxed">
              <strong>The Wolf&apos;s Journey</strong> — Hành trình bền bỉ, nhạy bén và không ngừng tiến bước trên thảo nguyên công nghệ. Từng sản phẩm là một minh chứng cho năng lực tự xây dựng thực tế.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-steppe-400">
              <MapPin className="w-3.5 h-3.5 text-amber-sun" />
              <span>{contact.location}</span>
            </div>
          </div>

          {/* Direct Verified Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-steppe-300 font-semibold">
              Kênh Liên Hệ Trực Tiếp
            </h4>
            <div className="flex flex-col gap-2.5 text-sm">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 text-steppe-300 hover:text-steppe-100 transition-colors"
              >
                <Mail className="w-4 h-4 text-tech-emerald" />
                <span>{contact.email}</span>
              </a>
              <a
                href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-2 text-steppe-300 hover:text-steppe-100 transition-colors"
              >
                <Phone className="w-4 h-4 text-amber-sun" />
                <span>{contact.phone}</span>
              </a>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-steppe-300 hover:text-steppe-100 transition-colors"
              >
                <Github className="w-4 h-4 text-steppe-400" />
                <span>github.com/{contact.githubUsername}</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation & Back to Top */}
          <div className="flex flex-col justify-between gap-6">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-steppe-300 font-semibold mb-3">
                Các Chặng Hành Trình
              </h4>
              <div className="flex flex-wrap gap-2">
                {["#hero", "#what-i-built", "#projects", "#experience", "#skills", "#contact"].map((hash) => (
                  <a
                    key={hash}
                    href={hash}
                    className="px-2.5 py-1 rounded-md text-xs font-mono bg-steppe-900 hover:bg-steppe-800 text-steppe-300 hover:text-white border border-steppe-800 transition-colors"
                  >
                    {hash.replace("#", "")}
                  </a>
                ))}
              </div>
            </div>

            <a
              href="#hero"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-steppe-900 hover:bg-steppe-850 border border-steppe-800 text-xs font-medium text-steppe-300 hover:text-steppe-100 transition-all self-start"
            >
              <ArrowUp className="w-3.5 h-3.5" />
              <span>Trở Về Đầu Trang</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-steppe-400">
          <p>© {new Date().getFullYear()} {fullName}. Dữ liệu đối soát 100% từ CV cá nhân.</p>
          <p className="font-mono text-[11px] text-steppe-400">
            Powered by Next.js & Three.js • Single Source of Truth Architecture
          </p>
        </div>
      </div>
    </footer>
  );
}
