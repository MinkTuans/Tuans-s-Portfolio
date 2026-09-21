import React from "react";
import { Compass, ArrowUp, Github, Mail, Phone, MapPin } from "lucide-react";
import { ContactInfo } from "@/types/portfolio";

interface FooterProps {
  fullName: string;
  contact: ContactInfo;
}

export default function Footer({ fullName, contact }: FooterProps) {
  return (
    <footer className="relative bg-white border-t border-meadow-200 pt-16 pb-12 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-meadow-100">
          
          {/* Brand & Concept */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-meadow-100 border border-meadow-200 flex items-center justify-center text-meadow-800">
                <Compass className="w-4 h-4" />
              </div>
              <span className="font-display font-semibold text-lg text-stone-900">
                {fullName}
              </span>
            </div>
            <p className="text-sm text-stone-600 leading-relaxed font-sans">
              <strong>The Wolf&apos;s Journey</strong> — Hành trình bền bỉ, nhạy bén và không ngừng tiến bước trên đồng cỏ công nghệ. Từng sản phẩm là một minh chứng cho năng lực tự xây dựng thực tế.
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-stone-600">
              <MapPin className="w-3.5 h-3.5 text-sun-amber" />
              <span>{contact.location}</span>
            </div>
          </div>

          {/* Direct Verified Links */}
          <div className="flex flex-col gap-3">
            <h4 className="text-xs font-mono uppercase tracking-widest text-stone-600 font-bold">
              Kênh Liên Hệ Trực Tiếp
            </h4>
            <div className="flex flex-col gap-2.5 text-sm">
              <a
                href={`mailto:${contact.email}`}
                className="flex items-center gap-2 text-stone-700 hover:text-meadow-800 transition-colors"
              >
                <Mail className="w-4 h-4 text-meadow-600" />
                <span>{contact.email}</span>
              </a>
              <a
                href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                className="flex items-center gap-2 text-stone-700 hover:text-meadow-800 transition-colors"
              >
                <Phone className="w-4 h-4 text-sun-amber" />
                <span>{contact.phone}</span>
              </a>
              <a
                href={contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-stone-700 hover:text-stone-900 transition-colors"
              >
                <Github className="w-4 h-4 text-stone-600" />
                <span>github.com/{contact.githubUsername}</span>
              </a>
            </div>
          </div>

          {/* Quick Navigation & Back to Top */}
          <div className="flex flex-col justify-between gap-6">
            <div>
              <h4 className="text-xs font-mono uppercase tracking-widest text-stone-600 font-bold mb-3">
                Các Chặng Hành Trình
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  { label: "bắt đầu", href: "#hero" },
                  { label: "hành trình sói", href: "#wolf-journey" },
                  { label: "đã xây dựng", href: "#what-i-built" },
                  { label: "dự án", href: "#projects" },
                  { label: "kinh nghiệm", href: "#experience" },
                  { label: "kỹ năng", href: "#skills" },
                  { label: "liên hệ", href: "#contact" },
                ].map((item) => (
                  <a
                    key={item.href}
                    href={item.href}
                    className="px-2.5 py-1 rounded-lg text-xs font-mono bg-meadow-50 hover:bg-meadow-100 text-stone-700 hover:text-stone-900 border border-meadow-200 transition-colors"
                  >
                    {item.label}
                  </a>
                ))}
              </div>
            </div>

            <a
              href="#hero"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-white hover:bg-meadow-50 border border-meadow-200 text-xs font-medium text-stone-700 hover:text-stone-950 transition-all self-start shadow-sm font-sans"
            >
              <ArrowUp className="w-3.5 h-3.5 text-meadow-700" />
              <span>Trở Về Đầu Trang</span>
            </a>
          </div>
        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-600">
          <p>© {new Date().getFullYear()} {fullName}. Dữ liệu đối soát 100% từ CV cá nhân.</p>
          <p className="font-mono text-[11px] text-stone-600">
            The Wolf&apos;s Journey • Morning Meadow Edition
          </p>
        </div>
      </div>
    </footer>
  );
}
