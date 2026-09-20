"use client";

import React, { useState } from "react";
import { ContactInfo } from "@/types/portfolio";
import { Mail, Phone, MapPin, Github, Copy, Check, Send, ArrowUpRight, Compass } from "lucide-react";

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
    <section id="contact" className="py-20 lg:py-28 relative bg-steppe-950/90 border-t border-steppe-850 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-amber-sun/5 blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-md bg-steppe-900 border border-steppe-750 text-xs font-mono text-amber-sun uppercase tracking-wider mb-3">
            <span>Section 06 • The Wolf&apos;s Rendezvous</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-steppe-50 tracking-tight">
            Kết Nối & Hợp Tác
          </h2>
          <p className="mt-3 text-base text-steppe-300 leading-relaxed font-sans">
            Sẵn sàng thảo luận về các cơ hội phát triển sản phẩm web, kiến trúc backend Laravel và ứng dụng thời gian thực.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5">
          
          {/* Email Direct */}
          <div className="p-6 rounded-3xl bg-steppe-900/70 border border-steppe-800/80 hover:border-steppe-700 transition-all flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-steppe-800 border border-steppe-700 flex items-center justify-center text-tech-emerald">
                <Mail className="w-5 h-5" />
              </div>
              <button
                onClick={() => copyToClipboard(contact.email, "email")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-steppe-300 hover:text-white bg-steppe-850 hover:bg-steppe-800 border border-steppe-750 transition-colors"
                title="Sao chép Email"
              >
                {copiedField === "email" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-tech-emerald" />
                    <span>Đã chép</span>
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
              <span className="text-xs font-mono uppercase tracking-wider text-steppe-400">Email Cá Nhân</span>
              <a
                href={`mailto:${contact.email}`}
                className="block mt-1 text-lg font-mono font-semibold text-steppe-100 hover:text-amber-sun transition-colors"
              >
                {contact.email}
              </a>
            </div>
          </div>

          {/* Phone Direct */}
          <div className="p-6 rounded-3xl bg-steppe-900/70 border border-steppe-800/80 hover:border-steppe-700 transition-all flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="w-10 h-10 rounded-xl bg-steppe-800 border border-steppe-700 flex items-center justify-center text-amber-sun">
                <Phone className="w-5 h-5" />
              </div>
              <button
                onClick={() => copyToClipboard(contact.phone, "phone")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono text-steppe-300 hover:text-white bg-steppe-850 hover:bg-steppe-800 border border-steppe-750 transition-colors"
                title="Sao chép Số điện thoại"
              >
                {copiedField === "phone" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-tech-emerald" />
                    <span>Đã chép</span>
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
              <span className="text-xs font-mono uppercase tracking-wider text-steppe-400">Số Điện Thoại</span>
              <a
                href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                className="block mt-1 text-lg font-mono font-semibold text-steppe-100 hover:text-amber-sun transition-colors"
              >
                {contact.phone}
              </a>
            </div>
          </div>

          {/* Location Info */}
          <div className="p-6 rounded-3xl bg-steppe-900/70 border border-steppe-800/80 flex items-center gap-4">
            <div className="w-10 h-10 rounded-xl bg-steppe-800 border border-steppe-700 flex items-center justify-center text-steppe-300 flex-shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-steppe-400">Địa Điểm Sinh Sống</span>
              <p className="text-base font-semibold text-steppe-100 mt-0.5">
                {contact.location}
              </p>
            </div>
          </div>

          {/* GitHub Repository Profile */}
          <div className="p-6 rounded-3xl bg-steppe-900/70 border border-steppe-800/80 hover:border-steppe-700 transition-all flex items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-xl bg-steppe-800 border border-steppe-700 flex items-center justify-center text-steppe-200 flex-shrink-0">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-steppe-400">Mã Nguồn Mở</span>
                <p className="text-base font-mono font-semibold text-steppe-100 mt-0.5">
                  @{contact.githubUsername}
                </p>
              </div>
            </div>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-mono text-steppe-200 bg-steppe-850 hover:bg-steppe-800 border border-steppe-750 transition-colors"
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
