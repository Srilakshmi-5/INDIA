import React from 'react';

export const Badge = ({ status, text, size = 'md', glow = true }) => {
  const getStyles = () => {
    switch (status?.toLowerCase()) {
      case 'critical':
        return {
          bg: 'bg-rose-950/80 text-rose-300 border-rose-600/80',
          dot: 'bg-rose-500',
          glow: glow ? 'shadow-[0_0_12px_rgba(239,68,68,0.4)]' : ''
        };
      case 'high':
      case 'vulnerable':
      case 'warning':
        return {
          bg: 'bg-amber-950/80 text-amber-300 border-amber-600/80',
          dot: 'bg-amber-400',
          glow: glow ? 'shadow-[0_0_12px_rgba(245,158,11,0.35)]' : ''
        };
      case 'medium':
        return {
          bg: 'bg-yellow-950/70 text-yellow-300 border-yellow-600/70',
          dot: 'bg-yellow-400',
          glow: glow ? 'shadow-[0_0_10px_rgba(234,179,8,0.3)]' : ''
        };
      case 'stable':
      case 'strong':
      case 'optimal':
        return {
          bg: 'bg-emerald-950/80 text-emerald-300 border-emerald-600/80',
          dot: 'bg-emerald-400',
          glow: glow ? 'shadow-[0_0_12px_rgba(34,197,94,0.35)]' : ''
        };
      case 'cyan':
      case 'info':
        return {
          bg: 'bg-cyan-950/80 text-cyan-300 border-cyan-600/80',
          dot: 'bg-cyan-400',
          glow: glow ? 'shadow-[0_0_10px_rgba(6,182,212,0.3)]' : ''
        };
      default:
        return {
          bg: 'bg-slate-900 text-slate-300 border-slate-700',
          dot: 'bg-slate-400',
          glow: ''
        };
    }
  };

  const style = getStyles();
  const sizeClasses = size === 'sm' 
    ? 'text-[10px] px-1.5 py-0.5' 
    : size === 'lg' 
    ? 'text-xs px-3 py-1 font-bold' 
    : 'text-[11px] px-2 py-0.5 font-semibold';

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded font-mono-military uppercase tracking-wider border ${style.bg} ${style.glow} ${sizeClasses}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${style.dot} animate-pulse`}></span>
      <span>{text || status}</span>
    </span>
  );
};
