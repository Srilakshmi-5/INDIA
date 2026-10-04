import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  Shield, 
  Wifi, 
  WifiOff, 
  Volume2, 
  VolumeX, 
  Clock, 
  ChevronDown, 
  AlertTriangle, 
  UserCheck, 
  LogOut,
  Radio,
  Lock
} from 'lucide-react';
import { THEATRES } from '../../data/mockData';

export const Header = () => {
  const {
    currentUser,
    loginUser,
    logoutUser,
    activeTheatre,
    setActiveTheatre,
    isOffline,
    toggleOfflineMode,
    soundEnabled,
    setSoundEnabled,
    playTacticalSound,
    recommendations,
    offlineSyncQueue
  } = useApp();

  const [currentTime, setCurrentTime] = useState(new Date());
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);
  const [theatreMenuOpen, setTheatreMenuOpen] = useState(false);

  // Live ticking clock (both UTC Zulu and IST)
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Format UTC Zulu: DDHHMMZ MMM YYYY (e.g., 041438Z OCT 2026)
  const zuluTime = `${String(currentTime.getUTCDate()).padStart(2, '0')}${String(currentTime.getUTCHours()).padStart(2, '0')}${String(currentTime.getUTCMinutes()).padStart(2, '0')}Z ${currentTime.toLocaleString('en-US', { month: 'short', timeZone: 'UTC' }).toUpperCase()} ${currentTime.getUTCFullYear()}`;
  
  // Format IST: HH:MM:SS IST
  const istTime = currentTime.toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }) + ' IST';

  const pendingApprovalsCount = recommendations.filter(r => r.status === 'PENDING_APPROVAL').length;
  const currentTheatreObj = THEATRES.find(t => t.id === activeTheatre) || THEATRES[0];

  const roles = ['Logistics Officer', 'Command Reviewer', 'Supply Manager', 'Admin'];

  return (
    <header className="bg-[#080E1C] border-b border-slate-800 text-slate-200 sticky top-0 z-50">
      {/* Top micro-ticker bar */}
      <div className="bg-[#050912] px-4 py-1 flex items-center justify-between text-[11px] font-mono-military text-slate-400 border-b border-slate-900">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-emerald-400 font-semibold">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span>SECURE MIL-NET DEFENCE GRID</span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="flex items-center gap-2">
            <span className="text-slate-500">DEFCON/OPSCON:</span>
            <span className="text-amber-400 font-bold bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/60">
              OPSCON 2 (ELEVATED PRE-WINTER)
            </span>
          </div>
          <span className="text-slate-600">|</span>
          <div className="text-slate-400">
            <span className="text-slate-500">CLEARANCE:</span> <span className="text-cyan-400 font-semibold">{currentUser.clearance}</span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1.5 text-cyan-300">
            <Clock className="w-3 h-3 text-cyan-400" />
            <span className="text-slate-400">ZULU:</span>
            <span className="font-semibold text-cyan-200">{zuluTime}</span>
            <span className="text-slate-500 ml-1">({istTime})</span>
          </div>
          <span className="text-slate-600">|</span>
          <button
            onClick={() => {
              setSoundEnabled(!soundEnabled);
              playTacticalSound('click');
            }}
            title={soundEnabled ? 'Disable Tactical Audio' : 'Enable Tactical Audio'}
            className="flex items-center gap-1 text-slate-400 hover:text-slate-200 cursor-pointer"
          >
            {soundEnabled ? <Volume2 className="w-3.5 h-3.5 text-cyan-400" /> : <VolumeX className="w-3.5 h-3.5 text-slate-500" />}
            <span className="text-[10px]">{soundEnabled ? 'AUDIO ON' : 'AUDIO OFF'}</span>
          </button>
        </div>
      </div>

      {/* Main command bar */}
      <div className="px-4 py-2.5 flex items-center justify-between">
        {/* Left: Brand & Insignia */}
        <div className="flex items-center gap-3">
          <div className="relative group">
            <img 
              src="/sentinel-emblem.jpg" 
              alt="Sentinel Logix Insignia" 
              className="w-11 h-11 object-contain rounded-md border border-cyan-500/40 shadow-lg shadow-cyan-950/40"
            />
            <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-[#080E1C]"></div>
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-lg font-black tracking-wider text-slate-100 flex items-center gap-2">
                SENTINEL LOGIX
                <span className="text-[10px] uppercase font-mono-military tracking-normal px-1.5 py-0.5 rounded bg-cyan-950/80 text-cyan-300 border border-cyan-700/60 font-semibold">
                  v2.6 SIH PROTOTYPE
                </span>
              </h1>
            </div>
            <p className="text-[11px] text-slate-400 font-medium">
              AI-Powered Predictive & Resilient Forward Supply Chain Decision System
            </p>
          </div>
        </div>

        {/* Center: Theatre Selector */}
        <div className="hidden lg:flex items-center gap-2 relative">
          <span className="text-xs text-slate-400 font-mono-military uppercase tracking-wide">ACTIVE THEATRE:</span>
          <div className="relative">
            <button
              onClick={() => setTheatreMenuOpen(!theatreMenuOpen)}
              className="bg-[#0D1526] hover:bg-[#131E35] border border-slate-700 hover:border-cyan-500/60 rounded px-3 py-1.5 text-xs font-semibold text-slate-200 flex items-center gap-2 cursor-pointer transition-colors"
            >
              <Radio className="w-3.5 h-3.5 text-cyan-400 animate-pulse" />
              <span>{currentTheatreObj.name}</span>
              <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
            </button>

            {theatreMenuOpen && (
              <div className="absolute top-full left-0 mt-1 w-80 bg-[#0C1424] border border-slate-700 rounded shadow-2xl py-1 z-50">
                <div className="px-3 py-1.5 text-[10px] font-mono-military text-slate-400 uppercase tracking-wider border-b border-slate-800">
                  Select Command Formation
                </div>
                {THEATRES.map(t => (
                  <button
                    key={t.id}
                    onClick={() => {
                      setActiveTheatre(t.id);
                      setTheatreMenuOpen(false);
                      playTacticalSound('click');
                    }}
                    className={`w-full text-left px-3 py-2 text-xs flex flex-col hover:bg-slate-800/80 transition-colors cursor-pointer ${
                      activeTheatre === t.id ? 'bg-cyan-950/50 text-cyan-300 border-l-2 border-cyan-400' : 'text-slate-300'
                    }`}
                  >
                    <span className="font-semibold">{t.name}</span>
                    <span className="text-[10px] text-slate-400 font-mono-military">HQ: {t.hq} | {t.alertLevel}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right: Offline / Mesh mode toggle + User Profile + Role Switcher */}
        <div className="flex items-center gap-3">
          {/* Offline Mesh Toggle */}
          <button
            onClick={toggleOfflineMode}
            title={isOffline ? 'Switch to SATCOM Online Network' : 'Simulate Forward Offline Tactical Mesh'}
            className={`px-3 py-1.5 rounded text-xs font-mono-military font-semibold flex items-center gap-2 border transition-all cursor-pointer ${
              isOffline
                ? 'bg-amber-950/80 text-amber-300 border-amber-600/80 animate-pulse'
                : 'bg-emerald-950/60 text-emerald-300 border-emerald-700/60 hover:bg-emerald-900/60'
            }`}
          >
            {isOffline ? (
              <>
                <WifiOff className="w-3.5 h-3.5 text-amber-400" />
                <span>OFFLINE MESH ({offlineSyncQueue.length} QUEUED)</span>
              </>
            ) : (
              <>
                <Wifi className="w-3.5 h-3.5 text-emerald-400" />
                <span>ONLINE: SATCOM SECURE</span>
              </>
            )}
          </button>

          {/* User Profile & Fast Role Switcher */}
          <div className="relative">
            <button
              onClick={() => setRoleMenuOpen(!roleMenuOpen)}
              className="bg-[#0D1526] hover:bg-[#131E35] border border-slate-700 hover:border-slate-600 rounded px-2.5 py-1.5 flex items-center gap-2.5 cursor-pointer transition-colors"
            >
              <div className="w-7 h-7 rounded bg-olive-900 border border-lime-600/50 flex items-center justify-center text-xs font-bold text-lime-300">
                {currentUser.avatar}
              </div>
              <div className="text-left hidden sm:block">
                <div className="text-xs font-semibold text-slate-200 leading-tight">{currentUser.name}</div>
                <div className="text-[10px] text-cyan-400 font-mono-military leading-none mt-0.5">{currentUser.role}</div>
              </div>
              <ChevronDown className="w-3 h-3 text-slate-400" />
            </button>

            {roleMenuOpen && (
              <div className="absolute top-full right-0 mt-1 w-64 bg-[#0C1424] border border-slate-700 rounded shadow-2xl py-1 z-50">
                <div className="px-3 py-2 border-b border-slate-800">
                  <div className="text-xs font-bold text-slate-200">{currentUser.name}</div>
                  <div className="text-[11px] text-slate-400">{currentUser.serviceNo} • {currentUser.formation}</div>
                  <div className="text-[10px] text-cyan-400 font-mono-military mt-1">{currentUser.clearance}</div>
                </div>

                <div className="px-3 py-1.5 text-[10px] font-mono-military text-slate-400 uppercase tracking-wider">
                  Switch Operational Role
                </div>

                {roles.map(r => (
                  <button
                    key={r}
                    onClick={() => {
                      loginUser(null, null, r);
                      setRoleMenuOpen(false);
                    }}
                    className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-slate-800 cursor-pointer ${
                      currentUser.role === r ? 'text-cyan-300 font-bold bg-cyan-950/40' : 'text-slate-300'
                    }`}
                  >
                    <span>{r}</span>
                    {currentUser.role === r && <UserCheck className="w-3.5 h-3.5 text-cyan-400" />}
                  </button>
                ))}

                <div className="border-t border-slate-800 mt-1 pt-1">
                  <button
                    onClick={() => {
                      logoutUser();
                      setRoleMenuOpen(false);
                    }}
                    className="w-full text-left px-3 py-1.5 text-xs text-rose-400 hover:bg-rose-950/30 flex items-center gap-2 cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Lock Station / Logout</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
