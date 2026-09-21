"use client";

import React, { useEffect, useRef, useState } from "react";
import { Compass, Sparkles, ShieldCheck, ArrowRight, Layers, Cpu, Server } from "lucide-react";

export default function TheWolfRun() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [activeMilestone, setActiveMilestone] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check reduced motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Compute scroll progress within this 220vh section
  useEffect(() => {
    const handleScroll = () => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      const totalScrollable = containerRef.current.offsetHeight - window.innerHeight;
      if (totalScrollable <= 0) return;

      const currentScroll = -rect.top;
      const rawProgress = currentScroll / totalScrollable;
      const clamped = Math.min(Math.max(rawProgress, 0), 1);
      setScrollProgress(clamped);

      if (clamped < 0.35) {
        setActiveMilestone(0);
      } else if (clamped < 0.7) {
        setActiveMilestone(1);
      } else {
        setActiveMilestone(2);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Render the anatomical running wolf & particles on canvas
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      // Total strides across the journey
      const strideCycles = 14;
      const cycle = (scrollProgress * strideCycles) % 1; // 0.0 to 1.0 phase of 1 gallop stride

      // Wolf X position across viewport (from 8% to 78% width)
      const wolfX = 60 + scrollProgress * (width - 180);
      const wolfY = height * 0.72; // running on the trail baseline

      // Anatomical Gallop Trigonometry (Full 4-legged gallop cycle)
      // Phase 0..0.5: Extension & Suspension | 0.5..1.0: Compression & Thrust
      const spineArch = Math.sin(cycle * Math.PI * 2); // spine flexes up and down
      const bodyBob = Math.sin(cycle * Math.PI * 4) * 9; // vertical bounce of body

      // Front Left & Right leg angles
      const frontLegLAngle = Math.sin(cycle * Math.PI * 2) * 0.65;
      const frontLegRAngle = Math.sin((cycle + 0.12) * Math.PI * 2) * 0.6;

      // Back Left & Right leg angles (phase shifted)
      const backLegLAngle = -Math.sin((cycle - 0.25) * Math.PI * 2) * 0.75;
      const backLegRAngle = -Math.sin((cycle - 0.15) * Math.PI * 2) * 0.7;

      ctx.save();
      ctx.translate(wolfX, wolfY + bodyBob);

      // 1. Draw subtle dust/dew particles kicked up behind back paws
      if (scrollProgress > 0.01 && scrollProgress < 0.99) {
        ctx.fillStyle = "rgba(180, 215, 185, 0.45)";
        for (let p = 0; p < 4; p++) {
          const px = -40 - p * 12 - (cycle * 25);
          const py = 18 - p * 3 + Math.sin(cycle * 6 + p) * 4;
          const pr = 2.5 + (p * 0.8);
          ctx.beginPath();
          ctx.arc(px, py, pr, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // 2. Back Legs (Far side - drawn darker for depth)
      ctx.strokeStyle = "#273f2c";
      ctx.lineWidth = 4.5;
      ctx.lineCap = "round";

      // Back Right Leg (Far)
      ctx.beginPath();
      const brHipX = -22;
      const brHipY = 2 + spineArch * 3;
      const brKneeX = brHipX + Math.sin(backLegRAngle) * 18 - 8;
      const brKneeY = brHipY + Math.cos(backLegRAngle) * 16;
      const brPawX = brKneeX + Math.sin(backLegRAngle + 0.4) * 16;
      const brPawY = brKneeY + Math.cos(backLegRAngle + 0.4) * 14;
      ctx.moveTo(brHipX, brHipY);
      ctx.lineTo(brKneeX, brKneeY);
      ctx.lineTo(brPawX, brPawY);
      ctx.stroke();

      // Front Right Leg (Far)
      ctx.beginPath();
      const frShoulderX = 22;
      const frShoulderY = 0 - spineArch * 2;
      const frKneeX = frShoulderX + Math.sin(frontLegRAngle) * 16;
      const frKneeY = frShoulderY + Math.cos(frontLegRAngle) * 15;
      const frPawX = frKneeX + Math.sin(frontLegRAngle - 0.3) * 15;
      const frPawY = frKneeY + Math.cos(frontLegRAngle - 0.3) * 14;
      ctx.moveTo(frShoulderX, frShoulderY);
      ctx.lineTo(frKneeX, frKneeY);
      ctx.lineTo(frPawX, frPawY);
      ctx.stroke();

      // 3. Tail (Flowing naturally in the wind behind the wolf)
      ctx.strokeStyle = "#385b3f";
      ctx.lineWidth = 5.5;
      ctx.beginPath();
      const tailBaseX = -32;
      const tailBaseY = -2 + spineArch * 4;
      const tailMidX = tailBaseX - 18 - Math.sin(cycle * Math.PI * 2) * 5;
      const tailMidY = tailBaseY - 10 + Math.cos(cycle * Math.PI * 2) * 6;
      const tailTipX = tailMidX - 16;
      const tailTipY = tailMidY + 4;
      ctx.moveTo(tailBaseX, tailBaseY);
      ctx.quadraticCurveTo(tailMidX, tailMidY, tailTipX, tailTipY);
      ctx.stroke();

      // 4. Main Athletic Body Torso (Flank & Muscular Chest)
      ctx.fillStyle = "#33553a"; // Natural Timber Meadow Wolf coat
      ctx.beginPath();
      // Rear hip
      ctx.moveTo(-30, 2 + spineArch * 3);
      // Top spine (curving dynamically with stride)
      ctx.quadraticCurveTo(-4, -8 + spineArch * 7, 20, -5);
      // Up into muscular neck
      ctx.lineTo(34, -18);
      // Throat and jaw
      ctx.lineTo(44, -20);
      // Snout
      ctx.lineTo(54, -19);
      // Lower jaw
      ctx.lineTo(42, -14);
      // Powerful chest underbelly
      ctx.lineTo(26, 8);
      // Lean stomach flank
      ctx.quadraticCurveTo(0, 4 - spineArch * 4, -24, 8);
      ctx.closePath();
      ctx.fill();

      // 5. Head Detail & Sharp Alert Ears
      // Ear Far
      ctx.fillStyle = "#273f2c";
      ctx.beginPath();
      ctx.moveTo(34, -22);
      ctx.lineTo(38, -32);
      ctx.lineTo(43, -20);
      ctx.closePath();
      ctx.fill();

      // Ear Near
      ctx.fillStyle = "#385b3f";
      ctx.beginPath();
      ctx.moveTo(37, -21);
      ctx.lineTo(42, -33);
      ctx.lineTo(46, -19);
      ctx.closePath();
      ctx.fill();

      // Glowing Intelligent Morning Eye (Golden Amber)
      ctx.fillStyle = "#f59e0b";
      ctx.beginPath();
      ctx.arc(44, -18, 2, 0, Math.PI * 2);
      ctx.fill();

      // Black Nose
      ctx.fillStyle = "#1c1917";
      ctx.beginPath();
      ctx.arc(53, -19, 2, 0, Math.PI * 2);
      ctx.fill();

      // 6. Near Legs (Front side - lighter, main focus)
      ctx.strokeStyle = "#3e6946";
      ctx.lineWidth = 5;

      // Front Left Leg (Near)
      ctx.beginPath();
      const flShoulderX = 18;
      const flShoulderY = 2;
      const flKneeX = flShoulderX + Math.sin(frontLegLAngle) * 18;
      const flKneeY = flShoulderY + Math.cos(frontLegLAngle) * 16;
      const flPawX = flKneeX + Math.sin(frontLegLAngle - 0.4) * 16;
      const flPawY = flKneeY + Math.cos(frontLegLAngle - 0.4) * 15;
      ctx.moveTo(flShoulderX, flShoulderY);
      ctx.lineTo(flKneeX, flKneeY);
      ctx.lineTo(flPawX, flPawY);
      ctx.stroke();

      // Back Left Leg (Near - Muscular Thigh)
      ctx.beginPath();
      const blHipX = -20;
      const blHipY = 4 + spineArch * 3;
      const blKneeX = blHipX + Math.sin(backLegLAngle) * 19 - 8;
      const blKneeY = blHipY + Math.cos(backLegLAngle) * 17;
      const blPawX = blKneeX + Math.sin(backLegLAngle + 0.45) * 17;
      const blPawY = blKneeY + Math.cos(backLegLAngle + 0.45) * 15;
      ctx.moveTo(blHipX, blHipY);
      ctx.lineTo(blKneeX, blKneeY);
      ctx.lineTo(blPawX, blPawY);
      ctx.stroke();

      ctx.restore();
    };

    render();
  }, [scrollProgress]);

  // Sync canvas width with window
  useEffect(() => {
    const handleResize = () => {
      if (!canvasRef.current) return;
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = 360;
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const milestones = [
    {
      id: 0,
      badge: "Chặng 01 • Khởi Đầu",
      title: "Nền Tảng Tư Duy & Lập Trình",
      desc: "Nắm vững lập trình hướng đối tượng (OOP), ngôn ngữ C#, PHP và nền tảng Web hiện đại (HTML/CSS/JS). Bước đi đầu tiên đầy kiên định của con sói trẻ khám phá thảo nguyên tri thức.",
      icon: Layers,
      skills: ["OOP", "C#", "HTML/CSS/JS", "MVC Architecture"],
    },
    {
      id: 1,
      badge: "Chặng 02 • Bứt Phá",
      title: "Chuyên Sâu Kiến Trúc Hệ Thống",
      desc: "Chinh phục kiến trúc dịch vụ Laravel Service Architecture, thiết kế RESTful API chuẩn mực, tối ưu hóa cơ sở dữ liệu MySQL và kiểm thử tự động với Postman.",
      icon: Server,
      skills: ["PHP & Laravel", "MySQL", "REST API", "Layered Architecture"],
    },
    {
      id: 2,
      badge: "Chặng 03 • Làm Chủ",
      title: "Đám Mây & Trí Tuệ Nhân Tạo",
      desc: "Hiện thực hoá các sản phẩm quy mô lớn: Lưu trữ media Cloudflare R2 với Signed URLs, quản trị Supabase PostgreSQL, tích hợp Gemini LLM và WebSocket thời gian thực (Laravel Reverb).",
      icon: Cpu,
      skills: ["Cloudflare R2", "Gemini API", "Supabase", "Laravel Reverb"],
    },
  ];

  return (
    <section
      ref={containerRef}
      id="wolf-journey"
      className="relative min-h-[220vh] bg-gradient-to-b from-sky-morning via-[#f4f9f4] to-meadow-50/70"
    >
      {/* Sticky Panoramic Viewport (100vh) */}
      <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-between py-12 sm:py-16">
        
        {/* Top Header & Context Prompt */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/90 border border-meadow-200/80 text-xs font-mono text-meadow-800 shadow-sm mb-2">
                <Compass className="w-3.5 h-3.5 text-sun-amber animate-spin" style={{ animationDuration: "12s" }} />
                <span className="font-semibold uppercase tracking-wider">The Wolf Run • Scroll-driven Story</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-display font-bold text-meadow-950 tracking-tight">
                Hành Trình Sải Bước Trên Đồng Cỏ
              </h2>
            </div>

            {/* Scroll Indicator Guide */}
            <div className="flex items-center gap-3 px-4 py-2 rounded-2xl bg-white/80 backdrop-blur-sm border border-meadow-200 text-xs font-mono text-meadow-800 shadow-sm self-start sm:self-auto">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sun-warm opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-sun-amber" />
              </span>
              <span>Cuộn chuột để tiếp sức bước chạy của sói</span>
              <span className="font-bold text-meadow-900 bg-meadow-100 px-2 py-0.5 rounded">
                {Math.round(scrollProgress * 100)}%
              </span>
            </div>
          </div>
        </div>

        {/* Milestone Dynamic Story Cards (Revealed as the wolf advances) */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-20 my-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {milestones.map((m) => {
              const isPastOrCurrent = scrollProgress >= (m.id === 0 ? 0 : m.id === 1 ? 0.35 : 0.7);
              const isCurrent = activeMilestone === m.id;
              const Icon = m.icon;

              return (
                <div
                  key={m.id}
                  className={`relative p-6 sm:p-7 rounded-3xl transition-all duration-500 flex flex-col justify-between ${
                    isCurrent
                      ? "bg-white border-2 border-meadow-500 shadow-xl shadow-meadow-900/10 scale-[1.02]"
                      : isPastOrCurrent
                      ? "bg-white/90 border border-meadow-200/90 shadow-md"
                      : "bg-white/40 border border-dashed border-meadow-200/60 opacity-60"
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-3">
                      <span
                        className={`px-2.5 py-0.5 rounded-full text-[11px] font-mono font-semibold ${
                          isCurrent
                            ? "bg-sun-amber text-white"
                            : "bg-meadow-100 text-meadow-800"
                        }`}
                      >
                        {m.badge}
                      </span>
                      <div
                        className={`w-8 h-8 rounded-xl flex items-center justify-center ${
                          isCurrent ? "bg-meadow-800 text-white" : "bg-meadow-100 text-meadow-700"
                        }`}
                      >
                        <Icon className="w-4 h-4" />
                      </div>
                    </div>

                    <h3 className="text-lg font-display font-bold text-meadow-950 mb-2">
                      {m.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-sans">
                      {m.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-meadow-100 flex flex-wrap gap-1.5">
                    {m.skills.map((s) => (
                      <span
                        key={s}
                        className="px-2 py-0.5 rounded-md text-[11px] font-mono bg-meadow-50 text-meadow-800 border border-meadow-200/70"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Multi-layered Parallax Meadow & Running Wolf Stage */}
        <div className="relative w-full h-72 z-10 select-none pointer-events-none">
          
          {/* Layer 1: Distant Misty Rolling Hills (Parallax offset) */}
          <div
            className="absolute inset-x-0 bottom-12 h-44 opacity-40 transition-transform duration-75"
            style={{
              transform: `translateX(${-scrollProgress * 60}px)`,
            }}
          >
            <svg viewBox="0 0 1440 220" fill="none" className="w-full h-full preserve-3d" preserveAspectRatio="none">
              <path
                d="M0,90 C280,30 520,130 800,70 C1080,10 1280,100 1440,60 L1440,220 L0,220 Z"
                fill="#9cc7a0"
              />
            </svg>
          </div>

          {/* Layer 2: Middle Meadow Hills (Moves faster) */}
          <div
            className="absolute inset-x-0 bottom-6 h-36 opacity-75 transition-transform duration-75"
            style={{
              transform: `translateX(${-scrollProgress * 140}px)`,
            }}
          >
            <svg viewBox="0 0 1440 180" fill="none" className="w-full h-full" preserveAspectRatio="none">
              <path
                d="M0,60 C320,110 640,30 960,80 C1200,120 1340,40 1440,70 L1440,180 L0,180 Z"
                fill="#619e68"
              />
            </svg>
          </div>

          {/* Layer 3: The Running Trail Path Ground */}
          <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-[#2d4d33] via-[#3d6945] to-transparent">
            <svg viewBox="0 0 1440 90" fill="none" className="w-full h-full" preserveAspectRatio="none">
              <path
                d="M0,45 C360,15 720,55 1080,25 C1260,10 1380,40 1440,30 L1440,90 L0,90 Z"
                fill="#2d4d33"
              />
            </svg>
          </div>

          {/* Layer 4: The Canvas Running Wolf */}
          <canvas
            ref={canvasRef}
            className="absolute inset-x-0 bottom-0 w-full h-full block"
          />

          {/* Layer 5: Foreground Prairie Grass Blades (Moving fastest) */}
          <div
            className="absolute inset-x-0 -bottom-2 h-14 opacity-90 transition-transform duration-75"
            style={{
              transform: `translateX(${-scrollProgress * 280}px)`,
            }}
          >
            <svg viewBox="0 0 1440 60" fill="none" className="w-full h-full" preserveAspectRatio="none">
              <path
                d="M0,35 Q40,10 80,35 Q140,5 200,40 Q260,15 320,38 Q380,8 440,42 Q520,12 600,38 Q680,5 760,40 Q840,15 920,36 Q1000,10 1080,40 Q1160,8 1240,38 Q1340,12 1440,35 L1440,60 L0,60 Z"
                fill="#1f3724"
              />
            </svg>
          </div>

        </div>

      </div>
    </section>
  );
}
