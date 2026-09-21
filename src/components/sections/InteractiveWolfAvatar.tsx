"use client";

import React, { useState, useEffect, useRef } from "react";

export default function InteractiveWolfAvatar() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [pupilPos, setPupilPos] = useState({ x: 0, y: 0 });
  const [headTilt, setHeadTilt] = useState({ rotateX: 0, rotateY: 0 });
  const [isBlinking, setIsBlinking] = useState(false);
  const [isPerked, setIsPerked] = useState(false);

  // Mouse tracking logic
  useEffect(() => {
    let animationFrameId: number;

    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;

      cancelAnimationFrame(animationFrameId);
      animationFrameId = requestAnimationFrame(() => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const boxCenterX = rect.left + rect.width / 2;
        const boxCenterY = rect.top + rect.height / 2;

        const deltaX = e.clientX - boxCenterX;
        const deltaY = e.clientY - boxCenterY;

        // Angle and clamped distance for eye pupils (max 4.5px offset)
        const angle = Math.atan2(deltaY, deltaX);
        const distance = Math.min(Math.hypot(deltaX, deltaY) / 30, 4.5);

        const px = Math.cos(angle) * distance;
        const py = Math.sin(angle) * distance;

        setPupilPos({ x: px, y: py });

        // Gentle 3D head tilt (max +/- 10 degrees)
        const rotY = Math.max(Math.min((deltaX / window.innerWidth) * 16, 12), -12);
        const rotX = Math.max(Math.min((-deltaY / window.innerHeight) * 16, 10), -10);

        setHeadTilt({ rotateX: rotX, rotateY: rotY });
      });
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    // Natural eye blinking intervals
    const blinkInterval = setInterval(() => {
      setIsBlinking(true);
      setTimeout(() => {
        setIsBlinking(false);
      }, 180);
    }, 4500);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
      clearInterval(blinkInterval);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsPerked(true)}
      onMouseLeave={() => setIsPerked(false)}
      className="group relative w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-gradient-to-b from-sky-soft/90 via-meadow-50 to-meadow-100 flex items-center justify-center border-2 border-meadow-200/90 shadow-inner mb-3 select-none cursor-pointer transition-all duration-300 hover:border-meadow-400 hover:shadow-md"
      title="Sói con đang dõi theo con chuột của bạn!"
    >
      {/* 3D Tilting Wolf Head Container */}
      <div
        className="w-full h-full flex items-center justify-center will-change-transform transition-transform duration-150 ease-out"
        style={{
          transform: `perspective(500px) rotateX(${headTilt.rotateX}deg) rotateY(${headTilt.rotateY}deg)`,
        }}
      >
        <svg
          viewBox="0 0 120 120"
          className="w-20 h-20 sm:w-24 sm:h-24 drop-shadow-md"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Left Ear */}
          <polygon
            points="32,48 18,12 50,34"
            className="fill-stone-700 transition-transform duration-300 origin-bottom"
            style={{
              transform: isPerked ? "rotate(-6deg)" : "rotate(0deg)",
            }}
          />
          {/* Left Ear Inner */}
          <polygon
            points="33,42 24,18 46,33"
            className="fill-amber-400/80"
          />

          {/* Right Ear */}
          <polygon
            points="88,48 102,12 70,34"
            className="fill-stone-700 transition-transform duration-300 origin-bottom"
            style={{
              transform: isPerked ? "rotate(6deg)" : "rotate(0deg)",
            }}
          />
          {/* Right Ear Inner */}
          <polygon
            points="87,42 96,18 74,33"
            className="fill-amber-400/80"
          />

          {/* Wolf Head Base Contour */}
          <polygon
            points="60,25 86,40 102,68 88,96 60,112 32,96 18,68 34,40"
            className="fill-stone-800"
          />

          {/* Wolf Cheek Tufts */}
          <polygon points="18,68 6,76 24,84" className="fill-stone-600" />
          <polygon points="102,68 114,76 96,84" className="fill-stone-600" />

          {/* Forehead Shadow & Mane */}
          <polygon points="60,28 78,52 60,65 42,52" className="fill-stone-900/60" />

          {/* White Muzzle Mask */}
          <polygon
            points="60,65 74,84 60,105 46,84"
            className="fill-stone-100"
          />

          {/* Snout Details */}
          <polygon points="60,78 68,90 60,95 52,90" className="fill-stone-900" />
          <line x1="60" y1="95" x2="60" y2="102" stroke="#1c1917" strokeWidth="2" />
          <line x1="55" y1="102" x2="65" y2="102" stroke="#1c1917" strokeWidth="1.5" />

          {/* Whiskers */}
          <line x1="48" y1="92" x2="28" y2="90" stroke="#a8a29e" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="48" y1="96" x2="26" y2="98" stroke="#a8a29e" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="72" y1="92" x2="92" y2="90" stroke="#a8a29e" strokeWidth="1.2" strokeLinecap="round" />
          <line x1="72" y1="96" x2="94" y2="98" stroke="#a8a29e" strokeWidth="1.2" strokeLinecap="round" />

          {/* LEFT EYE CONTAINER */}
          <g>
            {/* Eye socket / background */}
            <polygon points="34,54 50,56 46,67 36,65" className="fill-stone-950" />
            
            {/* White Cornea */}
            <ellipse cx="42" cy="61" rx="6" ry="5" className="fill-white" />

            {/* Amber Iris (Moves with mouse) */}
            <g
              style={{
                transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)`,
                transition: "transform 0.05s linear",
              }}
            >
              {/* Iris */}
              <circle cx="42" cy="61" r="3.6" className="fill-amber-500" />
              {/* Pupil */}
              <circle cx="42" cy="61" r="2.2" className="fill-stone-950" />
              {/* Light glint */}
              <circle cx="43" cy="60" r="0.8" className="fill-white" />
            </g>

            {/* Eyelid (Blinking) */}
            <rect
              x="34"
              y="53"
              width="16"
              height={isBlinking ? "15" : "0"}
              className="fill-stone-800 transition-all duration-100 ease-in-out"
            />
          </g>

          {/* RIGHT EYE CONTAINER */}
          <g>
            {/* Eye socket / background */}
            <polygon points="86,54 70,56 74,67 84,65" className="fill-stone-950" />

            {/* White Cornea */}
            <ellipse cx="78" cy="61" rx="6" ry="5" className="fill-white" />

            {/* Amber Iris (Moves with mouse) */}
            <g
              style={{
                transform: `translate(${pupilPos.x}px, ${pupilPos.y}px)`,
                transition: "transform 0.05s linear",
              }}
            >
              {/* Iris */}
              <circle cx="78" cy="61" r="3.6" className="fill-amber-500" />
              {/* Pupil */}
              <circle cx="78" cy="61" r="2.2" className="fill-stone-950" />
              {/* Light glint */}
              <circle cx="79" cy="60" r="0.8" className="fill-white" />
            </g>

            {/* Eyelid (Blinking) */}
            <rect
              x="70"
              y="53"
              width="16"
              height={isBlinking ? "15" : "0"}
              className="fill-stone-800 transition-all duration-100 ease-in-out"
            />
          </g>
        </svg>
      </div>

      {/* Subtle Live Tracking Dot */}
      <span className="absolute bottom-1.5 right-2 flex h-2 w-2">
        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
        <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
      </span>
    </div>
  );
}
