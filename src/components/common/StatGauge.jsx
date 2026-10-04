import React from 'react';

export const StatGauge = ({
  value,
  max = 100,
  label,
  sublabel,
  size = 110,
  strokeWidth = 9,
  colorScheme = 'auto', // 'auto', 'emerald', 'amber', 'rose', 'cyan'
  unit = '%'
}) => {
  const percentage = Math.min(100, Math.max(0, (value / max) * 100));
  const radius = (size - strokeWidth * 2) / 2;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  const getColor = () => {
    if (colorScheme !== 'auto') {
      switch (colorScheme) {
        case 'rose': return '#EF4444';
        case 'amber': return '#F59E0B';
        case 'emerald': return '#22C55E';
        case 'cyan': return '#06B6D4';
        default: return '#06B6D4';
      }
    }
    if (percentage < 40) return '#EF4444'; // critical
    if (percentage < 65) return '#F59E0B'; // warning
    return '#22C55E'; // healthy
  };

  const ringColor = getColor();

  return (
    <div className="flex flex-col items-center justify-center text-center">
      <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
        {/* Background track */}
        <svg className="transform -rotate-90" width={size} height={size}>
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke="#1E293B"
            strokeWidth={strokeWidth}
            fill="transparent"
          />
          {/* Animated fill circle */}
          <circle
            cx={size / 2}
            cy={size / 2}
            r={radius}
            stroke={ringColor}
            strokeWidth={strokeWidth}
            strokeDasharray={circumference}
            strokeDashoffset={strokeDashoffset}
            strokeLinecap="round"
            fill="transparent"
            style={{
              transition: 'stroke-dashoffset 0.8s cubic-bezier(0.4, 0, 0.2, 1)',
              filter: `drop-shadow(0 0 6px ${ringColor}80)`
            }}
          />
        </svg>

        {/* Center reading */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-black font-mono-military tracking-tight text-slate-100">
            {value}
            <span className="text-xs font-normal text-slate-400 ml-0.5">{unit}</span>
          </span>
          {sublabel && (
            <span className="text-[9px] uppercase tracking-wider text-slate-400 font-mono-military">
              {sublabel}
            </span>
          )}
        </div>
      </div>

      {label && (
        <span className="text-xs font-bold font-mono-military uppercase tracking-wider text-slate-300 mt-2">
          {label}
        </span>
      )}
    </div>
  );
};
