import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Lock, Key, UserCheck, ArrowRight, AlertCircle, Terminal, Eye, EyeOff, Radio } from 'lucide-react';

export const LoginPage = ({ onLoginSuccess }) => {
  const { loginUser } = useApp();
  const [username, setUsername] = useState('IC-54892M');
  const [password, setPassword] = useState('••••••••••••');
  const [selectedRole, setSelectedRole] = useState('Logistics Officer');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const roles = [
    {
      role: 'Logistics Officer',
      officer: 'Col. Vikram Rathore, SM',
      clearance: 'TACTICAL OPS LEVEL 4',
      scope: 'Forward garrisons, direct convoys & air dispatch',
      badgeColor: 'border-emerald-600/80 bg-emerald-950/40 text-emerald-300'
    },
    {
      role: 'Command Reviewer',
      officer: 'Brig. S. K. Rawat, VSM',
      clearance: 'THEATRE REVIEW LEVEL 3',
      scope: 'Multi-corps simulation approval & buffer shifts',
      badgeColor: 'border-cyan-600/80 bg-cyan-950/40 text-cyan-300'
    },
    {
      role: 'Supply Manager',
      officer: 'Maj. Ananya Sen, ASC',
      clearance: 'DEPOT INVENTORY LEVEL 2',
      scope: 'Depot burn rate monitoring & stock adjustments',
      badgeColor: 'border-amber-600/80 bg-amber-950/40 text-amber-300'
    },
    {
      role: 'Admin',
      officer: 'Maj. Gen. Rajiv Sharma, AVSM',
      clearance: 'THEATRE COMMAND CHIEF',
      scope: 'Strategic policy overrides & doctrine control',
      badgeColor: 'border-rose-600/80 bg-rose-950/40 text-rose-300'
    }
  ];

  const handleSubmit = (e) => {
    if (e) e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      loginUser(username, password, selectedRole);
      setIsLoading(false);
      if (onLoginSuccess) onLoginSuccess();
    }, 600);
  };

  const handleQuickRoleLogin = (role) => {
    setSelectedRole(role);
    setIsLoading(true);
    setTimeout(() => {
      loginUser(null, null, role);
      setIsLoading(false);
      if (onLoginSuccess) onLoginSuccess();
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#060B13] text-slate-100 flex flex-col justify-between relative overflow-hidden font-sans">
      {/* Background with dark military satellite map */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-screen pointer-events-none"
        style={{ backgroundImage: `url('/command-warroom-bg.jpg')` }}
      />
      
      {/* Tactical scanlines & grid */}
      <div className="absolute inset-0 tactical-grid pointer-events-none opacity-40"></div>
      <div className="absolute inset-0 scanlines pointer-events-none opacity-30"></div>

      {/* Top Banner */}
      <header className="relative z-10 px-6 py-4 flex items-center justify-between border-b border-slate-800/80 bg-[#080E1C]/80 backdrop-blur-md">
        <div className="flex items-center gap-3">
          <img 
            src="/sentinel-emblem.jpg" 
            alt="Sentinel Logix Insignia" 
            className="w-10 h-10 object-contain rounded border border-cyan-500/50 shadow-md shadow-cyan-950"
          />
          <div>
            <div className="flex items-center gap-2">
              <span className="text-base font-black tracking-widest text-slate-100">INDIAN ARMY</span>
              <span className="text-[10px] font-mono-military uppercase px-2 py-0.5 rounded bg-emerald-950/80 text-emerald-400 border border-emerald-800">
                MIL-NET SECURE GATEWAY
              </span>
            </div>
            <div className="text-xs text-cyan-400 font-mono-military">FORWARD LOGISTICS DECISION SYSTEM</div>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-4 text-xs font-mono-military text-slate-400">
          <div className="flex items-center gap-2">
            <Radio className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>HQ 14 CORPS // NORTHERN SECTOR</span>
          </div>
          <span className="text-slate-700">|</span>
          <span className="text-amber-400 font-semibold">SIH 2026 PROTOTYPE</span>
        </div>
      </header>

      {/* Main Container */}
      <main className="relative z-10 flex-1 flex items-center justify-center p-4 sm:p-6">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column: Mission & Strategic Context */}
          <div className="md:col-span-6 bg-[#0B1222]/90 border border-slate-800 rounded-lg p-6 flex flex-col justify-between hud-bracket">
            <div>
              <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-700/60 text-cyan-300 text-xs font-mono-military mb-4">
                <Shield className="w-3.5 h-3.5" />
                <span>PREDICTIVE RESILIENCE LAYER</span>
              </div>

              <h2 className="text-2xl font-black text-slate-100 tracking-wide mb-2 leading-tight">
                SENTINEL LOGIX
              </h2>
              <p className="text-xs font-mono-military text-cyan-400 mb-4 uppercase">
                AI-Powered Predictive & Resilient Forward Supply Chain
              </p>

              <div className="text-xs text-slate-300 leading-relaxed space-y-3 mb-6">
                <p className="bg-slate-900/80 border-l-2 border-cyan-400 p-3 rounded-r text-[11px] text-slate-300">
                  <strong className="text-cyan-300">Core Positioning:</strong> "We are not replacing existing Army logistics systems (IQMP, MISO); we are adding an AI-powered predictive resilience layer that converts fragmented logistics signals into early warnings, what-if simulations, adaptive pre-positioning and explainable, human-approved contingency decisions."
                </p>

                <div className="space-y-1.5 pt-2">
                  <div className="text-[11px] font-mono-military uppercase tracking-wider text-slate-400 font-bold">
                    Four Critical Operational Questions:
                  </div>
                  <div className="grid grid-cols-2 gap-2 text-[11px]">
                    <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                      <span className="text-rose-400 font-bold block">1. What could go wrong?</span>
                      <span className="text-slate-400 text-[10px]">Pass closures & stockouts</span>
                    </div>
                    <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                      <span className="text-amber-400 font-bold block">2. When will it happen?</span>
                      <span className="text-slate-400 text-[10px]">Critical point ETA hours</span>
                    </div>
                    <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                      <span className="text-yellow-400 font-bold block">3. What if it happens?</span>
                      <span className="text-slate-400 text-[10px]">What-if stress simulator</span>
                    </div>
                    <div className="bg-slate-900/60 p-2 rounded border border-slate-800">
                      <span className="text-emerald-400 font-bold block">4. What should we do?</span>
                      <span className="text-slate-400 text-[10px]">Adaptive pre-positioning</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800/80 flex items-center justify-between text-[11px] font-mono-military text-slate-400">
              <span>SECURITY PROTOCOL: SHA-256</span>
              <span className="text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping"></span>
                TAMPER-EVIDENT LEDGER
              </span>
            </div>
          </div>

          {/* Right Column: Authentication Terminal */}
          <div className="md:col-span-6 bg-[#0D1629]/95 border border-slate-800 rounded-lg p-6 flex flex-col justify-between hud-bracket">
            <div>
              <div className="flex items-center justify-between mb-4 border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-cyan-400" />
                  <span className="text-xs font-mono-military uppercase tracking-wider text-slate-200 font-bold">
                    OFFICER AUTHENTICATION
                  </span>
                </div>
                <span className="text-[10px] font-mono-military px-2 py-0.5 rounded bg-amber-950/80 text-amber-300 border border-amber-800">
                  CLASSIFIED ACCESS
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-[11px] font-mono-military uppercase text-slate-300 mb-1">
                    OFFICER SERVICE NUMBER / ID:
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="w-full bg-[#080E1A] border border-slate-700 rounded px-3 py-2 text-xs text-slate-100 font-mono-military focus:outline-none focus:border-cyan-400 transition-colors"
                      placeholder="e.g. IC-54892M"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[11px] font-mono-military uppercase text-slate-300 mb-1">
                    TACTICAL ENCRYPTED PIN:
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full bg-[#080E1A] border border-slate-700 rounded px-3 py-2 text-xs text-slate-100 font-mono-military focus:outline-none focus:border-cyan-400 transition-colors"
                      placeholder="••••••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-2.5 top-2.5 text-slate-400 hover:text-slate-200 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                {/* Role Selection */}
                <div>
                  <label className="block text-[11px] font-mono-military uppercase text-slate-300 mb-1.5">
                    SELECT COMMAND ROLE:
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {roles.map(r => (
                      <button
                        type="button"
                        key={r.role}
                        onClick={() => setSelectedRole(r.role)}
                        className={`text-left p-2 rounded border transition-all cursor-pointer ${
                          selectedRole === r.role
                            ? 'bg-cyan-950/80 border-cyan-400 text-cyan-200 shadow-md shadow-cyan-950'
                            : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:border-slate-700'
                        }`}
                      >
                        <div className="text-[11px] font-bold truncate">{r.role}</div>
                        <div className="text-[9px] font-mono-military text-slate-400 truncate">{r.officer}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full mt-2 bg-gradient-to-r from-emerald-600 to-cyan-600 hover:from-emerald-500 hover:to-cyan-500 text-slate-950 font-black text-xs py-2.5 rounded transition-all flex items-center justify-center gap-2 cursor-pointer shadow-lg shadow-cyan-950/50"
                >
                  {isLoading ? (
                    <span>AUTHENTICATING SECURE MIL-NET...</span>
                  ) : (
                    <>
                      <span>AUTHENTICATE & ENTER WAR ROOM</span>
                      <ArrowRight className="w-4 h-4" />
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Quick Demo Bypass for Evaluators/Judges */}
            <div className="mt-4 pt-3 border-t border-slate-800/80">
              <div className="text-[10px] font-mono-military text-slate-400 mb-2 uppercase flex items-center justify-between">
                <span>EVALUATOR 1-CLICK ROLE ENTRY:</span>
                <span className="text-cyan-400">INSTANT ACCESS</span>
              </div>
              <div className="grid grid-cols-2 gap-1.5">
                {roles.map(r => (
                  <button
                    key={r.role}
                    type="button"
                    onClick={() => handleQuickRoleLogin(r.role)}
                    className="text-left px-2 py-1 bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-cyan-500/50 rounded text-[10px] font-mono-military text-slate-300 flex items-center justify-between cursor-pointer transition-colors"
                  >
                    <span className="truncate">{r.role}</span>
                    <ArrowRight className="w-2.5 h-2.5 text-cyan-400" />
                  </button>
                ))}
              </div>
            </div>

          </div>

        </div>
      </main>

      {/* Bottom Classification bar */}
      <footer className="relative z-10 px-6 py-2.5 bg-[#050912] border-t border-slate-800 text-center text-[11px] font-mono-military text-slate-500 flex items-center justify-between">
        <span>STRICT RESTRICTION: NOT FOR PUBLIC DISSEMINATION</span>
        <span>INDIAN ARMY LOGISTICS COMMAND // SENTINEL LOGIX</span>
        <span>VERSION 2.6 (HACKATHON DEPLOYMENT)</span>
      </footer>
    </div>
  );
};
