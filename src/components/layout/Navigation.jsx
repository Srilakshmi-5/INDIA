import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  LayoutDashboard, 
  Network, 
  Cpu, 
  CheckSquare, 
  ShieldAlert, 
  FileText,
  Sparkles,
  Flame,
  Activity
} from 'lucide-react';

export const Navigation = ({ activeTab, onSelectTab }) => {
  const { recommendations, criticalCount, playTacticalSound } = useApp();

  const pendingApprovalsCount = recommendations.filter(r => r.status === 'PENDING_APPROVAL').length;

  const navItems = [
    {
      id: 'command-center',
      label: 'Command Center',
      icon: LayoutDashboard,
      badge: criticalCount > 0 ? `${criticalCount} Critical` : null,
      badgeColor: 'bg-rose-950/80 text-rose-400 border border-rose-800'
    },
    {
      id: 'digital-twin',
      label: 'Digital Twin',
      icon: Network,
      badge: 'LIVE TWIN',
      badgeColor: 'bg-cyan-950/80 text-cyan-300 border border-cyan-700/60'
    },
    {
      id: 'what-if',
      label: 'What-If Simulator',
      icon: Cpu,
      badge: 'STAR FEATURE',
      badgeColor: 'bg-amber-950/80 text-amber-300 border border-amber-700/60 font-bold'
    },
    {
      id: 'action-center',
      label: 'Action Center',
      icon: CheckSquare,
      badge: pendingApprovalsCount > 0 ? `${pendingApprovalsCount} Actions` : null,
      badgeColor: 'bg-red-600 text-white font-bold animate-pulse'
    },
    {
      id: 'resilience',
      label: 'Resilience Scores',
      icon: ShieldAlert,
      badge: '5-PILLARS',
      badgeColor: 'bg-emerald-950/80 text-emerald-300 border border-emerald-800'
    },
    {
      id: 'audit-log',
      label: 'Audit & Mesh Log',
      icon: FileText,
      badge: 'SHA-256',
      badgeColor: 'bg-slate-800 text-slate-300 border border-slate-700'
    }
  ];

  return (
    <nav className="bg-[#09101F] border-b border-slate-800 px-4 py-1.5 flex items-center justify-between overflow-x-auto">
      <div className="flex items-center gap-1 sm:gap-2">
        {navItems.map(item => {
          const Icon = item.icon;
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => {
                onSelectTab(item.id);
                playTacticalSound('click');
              }}
              className={`relative px-3 py-2 rounded text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer whitespace-nowrap ${
                isActive
                  ? 'bg-cyan-950/70 text-cyan-200 border border-cyan-500/60 shadow-lg shadow-cyan-950/50'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60 border border-transparent'
              }`}
            >
              <Icon className={`w-4 h-4 ${isActive ? 'text-cyan-400' : 'text-slate-400'}`} />
              <span>{item.label}</span>
              {item.badge && (
                <span className={`text-[10px] font-mono-military uppercase px-1.5 py-0.5 rounded ${item.badgeColor}`}>
                  {item.badge}
                </span>
              )}
              {isActive && (
                <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></span>
              )}
            </button>
          );
        })}
      </div>

      {/* Demo Flow Quick Guide Indicator */}
      <div className="hidden xl:flex items-center gap-2 text-[11px] font-mono-military text-slate-400 bg-slate-900/80 px-3 py-1 rounded border border-slate-800">
        <span className="text-cyan-400 font-semibold">DEMO FLOW:</span>
        <span className="text-slate-300">1. Command Center</span>
        <span className="text-slate-600">➔</span>
        <span className="text-slate-300">2. Digital Twin</span>
        <span className="text-slate-600">➔</span>
        <span className="text-slate-300">3. What-If Simulator</span>
        <span className="text-slate-600">➔</span>
        <span className="text-slate-300">4. Action Center</span>
        <span className="text-slate-600">➔</span>
        <span className="text-slate-300">5. Audit Log</span>
      </div>
    </nav>
  );
};
