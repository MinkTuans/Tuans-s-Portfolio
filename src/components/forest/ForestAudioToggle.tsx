"use client";

import React, { useState, useEffect, useRef } from "react";
import { Volume2, VolumeX } from "lucide-react";

export default function ForestAudioToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const birdTimerRef = useRef<number | null>(null);

  const startAmbientSound = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      const ctx = new AudioCtx();
      audioCtxRef.current = ctx;

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.08, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // 1. Wind noise generator (brownish noise filtered)
      const bufferSize = ctx.sampleRate * 2;
      const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = noiseBuffer.getChannelData(0);
      let lastOut = 0.0;
      for (let i = 0; i < bufferSize; i++) {
        const white = Math.random() * 2 - 1;
        output[i] = (lastOut + 0.02 * white) / 1.02;
        lastOut = output[i];
        output[i] *= 3.5;
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = noiseBuffer;
      whiteNoise.loop = true;

      const filter = ctx.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.setValueAtTime(320, ctx.currentTime);

      whiteNoise.connect(filter);
      filter.connect(masterGain);
      whiteNoise.start();

      // 2. Synthesize gentle birdsong intervals
      const playChirp = () => {
        if (!ctx || ctx.state === "closed") return;
        const osc = ctx.createOscillator();
        const chirpGain = ctx.createGain();

        const now = ctx.currentTime;
        const baseFreq = 2200 + Math.random() * 800;

        osc.type = "sine";
        osc.frequency.setValueAtTime(baseFreq, now);
        osc.frequency.exponentialRampToValueAtTime(baseFreq + 700, now + 0.08);
        osc.frequency.exponentialRampToValueAtTime(baseFreq - 300, now + 0.16);

        chirpGain.gain.setValueAtTime(0.001, now);
        chirpGain.gain.linearRampToValueAtTime(0.04, now + 0.04);
        chirpGain.gain.exponentialRampToValueAtTime(0.0001, now + 0.22);

        osc.connect(chirpGain);
        chirpGain.connect(masterGain);

        osc.start(now);
        osc.stop(now + 0.25);

        // Schedule next chirp naturally
        const nextDelay = 3500 + Math.random() * 6000;
        birdTimerRef.current = window.setTimeout(playChirp, nextDelay);
      };

      playChirp();
      setIsPlaying(true);
    } catch {
      console.warn("Web Audio not supported or blocked");
    }
  };

  const stopAmbientSound = () => {
    if (birdTimerRef.current) {
      clearTimeout(birdTimerRef.current);
      birdTimerRef.current = null;
    }
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.linearRampToValueAtTime(0.0001, audioCtxRef.current.currentTime + 0.5);
      setTimeout(() => {
        if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
          audioCtxRef.current.close();
        }
        audioCtxRef.current = null;
      }, 550);
    }
    setIsPlaying(false);
  };

  const toggleSound = () => {
    if (isPlaying) {
      stopAmbientSound();
    } else {
      startAmbientSound();
    }
  };

  useEffect(() => {
    return () => {
      if (birdTimerRef.current) clearTimeout(birdTimerRef.current);
      if (audioCtxRef.current && audioCtxRef.current.state !== "closed") {
        audioCtxRef.current.close();
      }
    };
  }, []);

  return (
    <button
      onClick={toggleSound}
      type="button"
      className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-forest-900/60 backdrop-blur-md border border-forest-600/40 text-xs text-forest-100 hover:text-white hover:bg-forest-800/80 transition-all duration-300 shadow-md group"
      title={isPlaying ? "Mute forest sounds" : "Listen to forest atmosphere"}
    >
      {isPlaying ? (
        <>
          <Volume2 className="w-4 h-4 text-emerald-400 animate-pulse" />
          <span className="hidden sm:inline font-sans">Sound On</span>
          <span className="flex space-x-0.5 items-end h-3">
            <span className="w-0.5 h-2 bg-emerald-400 rounded-full animate-bounce [animation-delay:-0.3s]"></span>
            <span className="w-0.5 h-3 bg-emerald-300 rounded-full animate-bounce [animation-delay:-0.15s]"></span>
            <span className="w-0.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"></span>
          </span>
        </>
      ) : (
        <>
          <VolumeX className="w-4 h-4 text-forest-300 group-hover:text-emerald-300 transition-colors" />
          <span className="hidden sm:inline font-sans">Sound Off</span>
        </>
      )}
    </button>
  );
}
