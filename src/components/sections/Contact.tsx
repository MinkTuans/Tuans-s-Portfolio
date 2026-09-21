"use client";

import React, { useState } from "react";
import Image from "next/image";
import { ContactInfo } from "@/types/portfolio";
import {
  Mail,
  Phone,
  MapPin,
  Github,
  Copy,
  Check,
  ArrowUpRight,
  Send,
  Compass,
  Tent,
  Sparkles,
} from "lucide-react";

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
    <section id="contact" className="py-24 lg:py-32 relative overflow-hidden border-t border-[#A8C9AD]/40">
      {/* 1. Campsite Background: Sunset Lake, Rustic Wooden Signpost, Sitting Wolf on Hilltop */}
      <div className="absolute inset-0 z-0 select-none pointer-events-none">
        <Image
          src="/images/forest/nature-campsite-contact.jpg"
          alt="Sunset Campsite Trail End with Signpost and Wolf"
          fill
          quality={85}
          className="object-cover object-center transform scale-[1.01]"
        />
        {/* Soft overlay for reading contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-white/90 via-white/70 to-white/80 sm:from-white/85 sm:via-white/60 sm:to-white/75" />
        <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-[#163B28] to-transparent opacity-85" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="max-w-2xl mx-auto text-center mb-14">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/90 backdrop-blur-md border border-[#A8C9AD]/60 text-xs font-mono text-nature-deep uppercase tracking-wider mb-3 shadow-xs">
            <Tent className="w-3.5 h-3.5 text-nature-forest" />
            <span>Section 06 • Khu Cắm Trại Cuối Hành Trình</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-nature-deep tracking-tight">
            Liên Hệ Trực Tiếp & Kết Nối Hợp Tác
          </h2>
          <p className="mt-3 text-base text-stone-800 leading-relaxed font-sans font-normal">
            Sẵn sàng trao đổi về các cơ hội thực tập, phát triển dự án web, kiến trúc backend Laravel và các giải pháp đám mây, AI.
          </p>
        </div>

        {/* Contact Cards Grid */}
        <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-5 mb-10">
          
          {/* Email Direct */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white/85 hover:bg-white backdrop-blur-xl border border-[#A8C9AD]/60 hover:border-nature-forest transition-all shadow-sm hover:shadow-xl hover:shadow-nature-forest/10 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-nature-forest/10 border border-[#A8C9AD]/60 flex items-center justify-center text-nature-forest shadow-2xs">
                <Mail className="w-5 h-5" />
              </div>
              <button
                onClick={() => copyToClipboard(contact.email, "email")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-stone-700 hover:text-nature-deep bg-[#F7F6EC] hover:bg-white border border-[#A8C9AD]/60 transition-all shadow-2xs"
                title="Sao chép Email"
              >
                {copiedField === "email" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Đã chép</span>
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
              <span className="text-xs font-mono uppercase tracking-wider text-stone-500 font-semibold">Email Cá Nhân</span>
              <a
                href={`mailto:${contact.email}`}
                className="block mt-1 text-lg font-mono font-bold text-nature-deep hover:text-nature-forest transition-colors"
              >
                {contact.email}
              </a>
            </div>
          </div>

          {/* Phone Direct */}
          <div className="p-6 sm:p-7 rounded-3xl bg-white/85 hover:bg-white backdrop-blur-xl border border-[#A8C9AD]/60 hover:border-nature-forest transition-all shadow-sm hover:shadow-xl hover:shadow-nature-forest/10 flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="w-12 h-12 rounded-2xl bg-nature-sun/20 border border-nature-amber/30 flex items-center justify-center text-nature-amber shadow-2xs">
                <Phone className="w-5 h-5" />
              </div>
              <button
                onClick={() => copyToClipboard(contact.phone, "phone")}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-mono text-stone-700 hover:text-nature-deep bg-[#F7F6EC] hover:bg-white border border-[#A8C9AD]/60 transition-all shadow-2xs"
                title="Sao chép Số điện thoại"
              >
                {copiedField === "phone" ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-700 font-bold">Đã chép</span>
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
              <span className="text-xs font-mono uppercase tracking-wider text-stone-500 font-semibold">Số Điện Thoại</span>
              <a
                href={`tel:${contact.phone.replace(/\s+/g, "")}`}
                className="block mt-1 text-lg font-mono font-bold text-nature-deep hover:text-nature-forest transition-colors"
              >
                {contact.phone}
              </a>
            </div>
          </div>

          {/* Location Info */}
          <div className="p-6 rounded-3xl bg-white/85 backdrop-blur-xl border border-[#A8C9AD]/60 flex items-center gap-4 shadow-sm">
            <div className="w-12 h-12 rounded-2xl bg-nature-forest/10 border border-[#A8C9AD]/60 flex items-center justify-center text-nature-forest flex-shrink-0 shadow-2xs">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-stone-500 font-semibold">Địa Điểm Sinh Sống</span>
              <p className="text-base font-bold text-nature-deep mt-0.5">
                {contact.location}
              </p>
            </div>
          </div>

          {/* GitHub Repository Profile */}
          <div className="p-6 rounded-3xl bg-white/85 hover:bg-white backdrop-blur-xl border border-[#A8C9AD]/60 hover:border-nature-forest transition-all flex items-center justify-between gap-4 shadow-sm">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-stone-100 border border-stone-200 flex items-center justify-center text-nature-deep flex-shrink-0 shadow-2xs">
                <Github className="w-5 h-5" />
              </div>
              <div>
                <span className="text-xs font-mono uppercase tracking-wider text-stone-500 font-semibold">Mã Nguồn Mở</span>
                <p className="text-base font-mono font-bold text-nature-deep mt-0.5">
                  @{contact.githubUsername}
                </p>
              </div>
            </div>
            <a
              href={contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1 px-4 py-2 rounded-xl text-xs font-mono font-bold text-nature-forest bg-[#F7F6EC] hover:bg-nature-forest hover:text-white border border-[#A8C9AD]/60 transition-all"
            >
              <span>Ghé thăm</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

        </div>

        {/* Big CTA Banner: "Let's Build Something" */}
        <div className="max-w-2xl mx-auto text-center">
          <a
            href={`mailto:${contact.email}?subject=Trao%20đổi%20cơ%20hội%20hợp%20tác%20với%20${encodeURIComponent(fullName)}`}
            className="inline-flex items-center gap-2.5 px-8 py-4 rounded-2xl text-base font-bold text-white bg-nature-forest hover:bg-nature-deep shadow-xl shadow-nature-forest/25 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300 font-sans"
          >
            <Send className="w-4 h-4 text-nature-sun" />
            <span>Gửi Tin Nhắn • Let&apos;s Build Something</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>

      </div>
    </section>
  );
}
