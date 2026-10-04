import React from 'react';
import { Shield, Lock, Cpu, Server, CheckCircle2 } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-[#050912] border-t border-slate-800/80 text-slate-400 py-4 px-6 text-xs font-mono-military mt-auto">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Left: Security Classification */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-amber-400 font-bold bg-amber-950/40 px-2.5 py-1 rounded border border-amber-800/50">
            <Lock className="w-3.5 h-3.5" />
            <span>CLASSIFICATION: RESTRICTED // MIL-NET SECURE</span>
          </div>
          <span className="text-slate-600 hidden sm:inline">|</span>
          <span className="text-slate-500 hidden sm:inline">FOR OFFICIAL DEFENCE USE ONLY (FOUO)</span>
        </div>

        {/* Center / Right: Positioning Statement */}
        <div className="text-[11px] text-slate-400 max-w-xl text-center md:text-right leading-relaxed font-sans">
          <span className="text-cyan-400 font-semibold font-mono-military">SENTINEL LOGIX:</span> Adding an AI Predictive Resilience Layer atop existing IQMP & MISO systems for early warnings, what-if simulations, and explainable human-approved pre-positioning.
        </div>
      </div>
    </footer>
  );
};
