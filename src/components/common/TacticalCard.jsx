import React from 'react';

export const TacticalCard = ({
  title,
  subtitle,
  icon: Icon,
  badge,
  badgeStatus,
  actionButton,
  children,
  className = '',
  hasBrackets = true,
  glowColor = 'none' // 'critical', 'warning', 'stable', 'cyan', 'none'
}) => {
  const getGlow = () => {
    switch (glowColor) {
      case 'critical': return 'border-rose-600/60 shadow-[0_0_20px_rgba(239,68,68,0.2)]';
      case 'warning': return 'border-amber-600/60 shadow-[0_0_20px_rgba(245,158,11,0.2)]';
      case 'stable': return 'border-emerald-600/60 shadow-[0_0_20px_rgba(34,197,94,0.2)]';
      case 'cyan': return 'border-cyan-500/60 shadow-[0_0_20px_rgba(6,182,212,0.2)]';
      default: return 'border-slate-800 hover:border-slate-700';
    }
  };

  return (
    <div className={`relative bg-[#0D1526]/90 backdrop-blur-md rounded border transition-all ${getGlow()} ${hasBrackets ? 'hud-bracket' : ''} ${className}`}>
      {/* Optional Card Header */}
      {(title || Icon || badge || actionButton) && (
        <div className="px-4 py-2.5 border-b border-slate-800/80 flex items-center justify-between gap-3 bg-[#0A101E]/60">
          <div className="flex items-center gap-2.5 min-w-0">
            {Icon && <Icon className="w-4 h-4 text-cyan-400 shrink-0" />}
            <div className="min-w-0">
              {title && <h3 className="text-xs font-bold uppercase tracking-wider text-slate-200 truncate font-mono-military">{title}</h3>}
              {subtitle && <p className="text-[10px] text-slate-400 truncate">{subtitle}</p>}
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {badge && (
              <span className={`text-[10px] font-mono-military uppercase px-2 py-0.5 rounded font-bold border ${
                badgeStatus === 'critical' ? 'bg-rose-950/80 text-rose-300 border-rose-700' :
                badgeStatus === 'warning' ? 'bg-amber-950/80 text-amber-300 border-amber-700' :
                badgeStatus === 'stable' ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700' :
                'bg-cyan-950/80 text-cyan-300 border-cyan-800'
              }`}>
                {badge}
              </span>
            )}
            {actionButton}
          </div>
        </div>
      )}

      {/* Card Body */}
      <div className="p-4">
        {children}
      </div>
    </div>
  );
};
