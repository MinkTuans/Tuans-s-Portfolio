"use client";

import React, { useState } from "react";
import { ContactInfo } from "@/types/portfolio";
import { Mail, Phone, MapPin, Github, Copy, Check, ArrowUpRight } from "lucide-react";

interface ContactProps {
  contact: ContactInfo;
  fullName: string;
}

export default function Contact({ contact, fullName }: ContactProps) {
  const [copiedField, setCopiedField] = useState<string | null>(null);

  const copyToClipboard = (text: string, field: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    setTimeout(() => setCopiedField(null), 2500);
  };

  return (
    <section id="contact" className="py-20 lg:py-28 relative bg-gradient-to-b from-[#fbfcf9] to-meadow-50/80 border-t border-meadow-200/80 overflow-hidden">
      {/* Background sunrise glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-sun-light/50 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-meadow-200 text-xs font-mono text-meadow-800 uppercase tracking-wider mb-3 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-sun-amber" />
            <span>Section 06 • Kết Nối & Hợp Tác</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-stone-900 tracking-tight">
            Liên Hệ Trực Tiếp
          </h2>
          <p className="mt-3 text-base text-stone-600 leading-relaxed font-sans">
            Sẵn sàng trao đổi về các cơ hội phát triển dự án web, kiến trúc backend Laravel và các giải pháp đám mây, AI.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Email Direct */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-meadow-200/90 hover:border-meadow-400 transition-all shadow-sm hover:shadow-lg hover:shadow-meadow-900/5 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="w-11 h-11 rounded-2xl bg-meadow-100 border border-meadow-200 flex items-center justify-center text-meadow-800">
                <Mail className="w-5 h-5" />
              </div>
              <button
                onClick={() => copyToClipboard(contact.email, "email")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-stone-600 hover:text-stone-900 bg-meadow-50 hover:bg-meadow-100 border border-meadow-200 transition-colors shadow-sm"
                title="Sao chép Email"
              >
                {copiedField === "email" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-meadow-600" />
                    <span className="text-meadow-700 font-semibold">Đã chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Sao chép</span>
                  </>
                )}
              </button>
            </div>
            <div className="mt-6">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-600">Email Cá Nhân</span>
              <a
                href={`mailto:${contact.email}`}
                className="block mt-1 text-lg font-mono font-bold text-stone-900 hover:text-meadow-800 transition-colors"
              >
                {contact.email}
              </a>
            </div>
          </div>

          {/* Phone Direct */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white border border-meadow-200/90 hover:border-meadow-400 transition-all shadow-sm hover:shadow-lg hover:shadow-meadow-900/5 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="w-11 h-11 rounded-2xl bg-sun-light border border-sun-amber/20 flex items-center justify-center text-sun-amber">
                <Phone className="w-5 h-5" />
              </div>
              <button
                onClick={() => copyToClipboard(contact.phone, "phone")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-stone-600 hover:text-stone-900 bg-meadow-50 hover:bg-meadow-100 border border-meadow-200 transition-colors shadow-sm"
                title="Sao chép Số điện thoại"
              >
                {copiedField === "phone" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-meadow-600" />
                    <span className="text-meadow-700 font-semibold">Đã chép</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Sao chép</span>
                  </>
                )}
              </button>
            </div>
            <div className="mt-6">
              <span className="text-xs font-mono uppercase tracking-wider text-stone-600">Số Điện Thoại</span>
              <a
                href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                className="block mt-1 text-lg font-mono font-bold text-stone-900 hover:text-meadow-800 transition-colors"
              >
                {contact.phone}
              </a>
            </div>
          </div>

          {/* Location Info */}
          <div className="p-6 rounded-3xl bg-white border border-meadow-200/90 flex items-center gap-4 shadow-sm">
            <div className="w-11 h-11 rounded-2xl bg-meadow-100 border border-meadow-200 flex items-center justify-center text-meadow-800 flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-stone-600">Địa Điểm Sinh Sống</span>
              <p className="text-base font-bold text-stone-900 mt-0.5">
                {contact.location}
              </p>
            </div>
          </div>

          {/* GitHub Repository Profile */}
          <div className="p-6 rounded-3xl bg-white border border-meadow-200/90 hover:border-meadow-400 transition-all flex items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-11 h-11 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center text-stone-800 flex-shrink-0">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-stone-600">Mã Nguồn Mở</span>
                <p className="text-base font-mono font-bold text-stone-900 mt-0.5">
                  @{contact.githubUsername}
                </p>
              </div>
            </div>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3.5 py-2 rounded-xl text-xs font-mono text-meadow-900 bg-meadow-50 hover:bg-meadow-100 border border-meadow-200 transition-colors font-medium"
            >
              <span>Ghé thăm</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

      </div>
    </section>
  );
}
