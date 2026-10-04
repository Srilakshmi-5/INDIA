import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldAlert, 
  Activity, 
  AlertTriangle, 
  ArrowRight, 
  CheckCircle2, 
  Flame, 
  Crosshair, 
  HeartPulse, 
  Utensils, 
  Shield, 
  Radio, 
  ChevronRight,
  TrendingDown,
  Clock,
  Send,
  Zap,
  ExternalLink,
  Compass
} from 'lucide-react';
import { TacticalCard } from '../components/common/TacticalCard';
import { Badge } from '../components/common/Badge';
import { StatGauge } from '../components/common/StatGauge';

export const CommandCenterPage = ({ onNavigateTab }) => {
  const {
    nodes,
    routes,
    recommendations,
    approveRecommendation,
    setSelectedNodeId,
    averageNetworkHealth,
    criticalCount,
    highRiskCount,
    stableCount,
    strongCount,
    playTacticalSound
  } = useApp();

  const criticalNodes = nodes.filter(n => n.resilienceStatus === 'Critical');
  const vulnerableNodes = nodes.filter(n => n.resilienceStatus === 'Vulnerable');
  const pendingUrgentRecs = recommendations.filter(r => r.status === 'PENDING_APPROVAL').slice(0, 3);

  // Supply Class Overview calculation
  const supplyClasses = [
    {
      code: 'Class III',
      name: 'POL (Arctic Diesel & ATF)',
      icon: Flame,
      avgStockPct: 56,
      criticalNodesCount: 3,
      status: 'critical',
      note: 'Siachen & Dras sub-zero reserves low'
    },
    {
      code: 'Class V',
      name: 'Ammunition & Munitions',
      icon: Crosshair,
      avgStockPct: 68,
      criticalNodesCount: 2,
      status: 'warning',
      note: 'DBO Outpost 155mm buffer deficit'
    },
    {
      code: 'Class VIII',
      name: 'Medical & Blood Plasma',
      icon: HeartPulse,
      avgStockPct: 62,
      criticalNodesCount: 2,
      status: 'warning',
      note: 'High-altitude pulmonary kits needed'
    },
    {
      code: 'Class I',
      name: 'Combat Rations & Water',
      icon: Utensils,
      avgStockPct: 84,
      criticalNodesCount: 0,
      status: 'stable',
      note: 'Winter stocking quota 84% complete'
    },
    {
      code: 'Class II',
      name: 'Extreme Cold Weather Gear',
      icon: Shield,
      avgStockPct: 89,
      criticalNodesCount: 0,
      status: 'stable',
      note: 'Buffer secured at staging hubs'
    }
  ];

  // Mountain Passes Operational Status
  const mountainPasses = [
    { name: 'Zojila Pass (NH-1D)', elevation: '11,575 ft', status: 'CRITICAL HAZARD', risk: 92, note: 'Blizzard alert: 92% closure in 18h', color: 'rose' },
    { name: 'Khardung La Pass', elevation: '17,582 ft', status: 'HIGH RISK', risk: 88, note: 'Gale wind 65kt, drifting snow', color: 'rose' },
    { name: 'Shyok Axis (KM-120)', elevation: '14,200 ft', status: 'BRIDGE SEVERED', risk: 94, note: 'River flash flood mudslide', color: 'rose' },
    { name: 'Shinku La / Atal Tunnel', elevation: '16,580 ft', status: 'ALL-WEATHER CLEAR', risk: 12, note: 'Operational southern bypass', color: 'emerald' },
    { name: 'Fotu La Pass', elevation: '13,478 ft', status: 'MODERATE CAUTION', risk: 42, note: 'Sub-zero night black ice', color: 'amber' }
  ];

  const handleNodeClick = (nodeId) => {
    setSelectedNodeId(nodeId);
    playTacticalSound('click');
    onNavigateTab('digital-twin');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Strategic Positioning Header Banner */}
      <div className="bg-gradient-to-r from-[#0C1527] via-[#0E1A33] to-[#0A1222] border-l-4 border-cyan-400 border-y border-r border-slate-800 p-4 rounded flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="bg-cyan-950 text-cyan-300 border border-cyan-700/60 font-mono-military text-[10px] uppercase font-bold px-2 py-0.5 rounded">
              HQ NORTHERN COMMAND • 14 CORPS TACTICAL CELL
            </span>
            <span className="text-slate-500 font-mono-military text-xs">|</span>
            <span className="text-emerald-400 font-mono-military text-xs flex items-center gap-1 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              PREDICTIVE ENGINE RUNNING (SHAP XAI ACTIVE)
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-black text-slate-100 tracking-wide">
            OPERATIONAL LOGISTICS PICTURE: SECTOR NORTH (LADAKH / SIACHEN / KARGIL)
          </h2>
          <p className="text-xs text-slate-300 max-w-3xl mt-0.5">
            Real-time multi-stream predictive resilience layer integrating weather telemetry, pass accessibility, inventory burn rates, and terrain risk.
          </p>
        </div>

        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={() => onNavigateTab('what-if')}
            className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-3 py-2 rounded text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-lg shadow-amber-950/40"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>LAUNCH WHAT-IF SIMULATOR</span>
          </button>
          <button
            onClick={() => onNavigateTab('action-center')}
            className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold px-3 py-2 rounded text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <span>ACTION CENTER ({pendingUrgentRecs.length})</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Top High-Impact Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
        
        {/* Large Network Health Card (4 cols) */}
        <div className="md:col-span-4 bg-[#0D1526] border border-slate-800 rounded p-4 flex flex-col justify-between hud-bracket">
          <div className="flex items-center justify-between border-b border-slate-800/80 pb-2.5">
            <div className="flex items-center gap-2">
              <Activity className="w-4 h-4 text-cyan-400" />
              <span className="text-xs font-mono-military uppercase tracking-wider text-slate-200 font-bold">
                COMPOSITE NETWORK HEALTH
              </span>
            </div>
            <Badge status={averageNetworkHealth > 75 ? 'stable' : 'warning'} text="ELEVATED RISK" size="sm" />
          </div>

          <div className="my-3 flex items-center justify-around">
            <StatGauge
              value={averageNetworkHealth}
              max={100}
              label="THEATRE HEALTH INDEX"
              sublabel="14 CORPS GRID"
              size={130}
              strokeWidth={11}
              colorScheme="amber"
            />
            <div className="space-y-2 text-left">
              <div className="text-[11px] text-slate-400">
                <span className="text-slate-500 block uppercase font-mono-military text-[10px]">TOTAL FORMATIONS:</span>
                <span className="text-slate-200 font-bold text-sm font-mono-military">{nodes.length} Key Nodes</span>
              </div>
              <div className="text-[11px] text-slate-400">
                <span className="text-slate-500 block uppercase font-mono-military text-[10px]">ACTIVE CORRIDORS:</span>
                <span className="text-slate-200 font-bold text-sm font-mono-military">{routes.length} Supply Axes</span>
              </div>
              <div className="text-[11px] text-slate-400">
                <span className="text-slate-500 block uppercase font-mono-military text-[10px]">PREDICTIVE HORIZON:</span>
                <span className="text-cyan-300 font-bold text-sm font-mono-military">14 Days Out</span>
              </div>
            </div>
          </div>

          <div className="text-[11px] font-mono-military bg-slate-900/80 p-2 rounded border border-slate-800 text-slate-300 flex items-center justify-between">
            <span className="text-slate-400">STOCKOUT RISK WINDOW:</span>
            <span className="text-rose-400 font-bold">CRITICAL DEFICIT &lt; 3.0 DAYS</span>
          </div>
        </div>

        {/* Severity Count Cards (8 cols) */}
        <div className="md:col-span-8 grid grid-cols-2 sm:grid-cols-4 gap-3">
          
          {/* Critical Nodes */}
          <div 
            onClick={() => onNavigateTab('digital-twin')}
            className="bg-[#140D15] border border-rose-800/80 hover:border-rose-500 rounded p-4 flex flex-col justify-between cursor-pointer transition-all shadow-[0_0_15px_rgba(239,68,68,0.15)] group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono-military uppercase tracking-wider text-rose-300 font-bold">
                CRITICAL NODES
              </span>
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-rose-500"></span>
              </span>
            </div>
            <div className="my-2">
              <div className="text-3xl font-black font-mono-military text-rose-400 group-hover:scale-105 transition-transform">
                {criticalCount}
              </div>
              <div className="text-[11px] text-rose-200/80 leading-tight mt-1">
                Siachen Base &amp; DBO
              </div>
            </div>
            <div className="text-[10px] font-mono-military text-rose-400 flex items-center gap-1 group-hover:underline">
              <span>View Twin Drawer</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </div>
          </div>

          {/* High / Vulnerable Nodes */}
          <div 
            onClick={() => onNavigateTab('digital-twin')}
            className="bg-[#14120D] border border-amber-800/80 hover:border-amber-500 rounded p-4 flex flex-col justify-between cursor-pointer transition-all shadow-[0_0_15px_rgba(245,158,11,0.12)] group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono-military uppercase tracking-wider text-amber-300 font-bold">
                VULNERABLE NODES
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-amber-400 animate-pulse"></span>
            </div>
            <div className="my-2">
              <div className="text-3xl font-black font-mono-military text-amber-400 group-hover:scale-105 transition-transform">
                {highRiskCount}
              </div>
              <div className="text-[11px] text-amber-200/80 leading-tight mt-1">
                Kargil, Dras &amp; Leh Hub
              </div>
            </div>
            <div className="text-[10px] font-mono-military text-amber-400 flex items-center gap-1 group-hover:underline">
              <span>Inspect Factors</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </div>
          </div>

          {/* Stable Nodes */}
          <div 
            onClick={() => onNavigateTab('resilience')}
            className="bg-[#0D151F] border border-slate-700/80 hover:border-cyan-500 rounded p-4 flex flex-col justify-between cursor-pointer transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono-military uppercase tracking-wider text-cyan-300 font-bold">
                STABLE NODES
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400"></span>
            </div>
            <div className="my-2">
              <div className="text-3xl font-black font-mono-military text-cyan-400 group-hover:scale-105 transition-transform">
                {stableCount}
              </div>
              <div className="text-[11px] text-slate-300 leading-tight mt-1">
                Galwan, Chushul &amp; SXR
              </div>
            </div>
            <div className="text-[10px] font-mono-military text-cyan-400 flex items-center gap-1 group-hover:underline">
              <span>View Resilience</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </div>
          </div>

          {/* Strong Base Depots */}
          <div 
            onClick={() => onNavigateTab('resilience')}
            className="bg-[#0C1714] border border-emerald-800/80 hover:border-emerald-500 rounded p-4 flex flex-col justify-between cursor-pointer transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono-military uppercase tracking-wider text-emerald-300 font-bold">
                STRATEGIC STRONG
              </span>
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400"></span>
            </div>
            <div className="my-2">
              <div className="text-3xl font-black font-mono-military text-emerald-400 group-hover:scale-105 transition-transform">
                {strongCount}
              </div>
              <div className="text-[11px] text-emerald-200/80 leading-tight mt-1">
                Pathankot, Udhampur &amp; Nyoma
              </div>
            </div>
            <div className="text-[10px] font-mono-military text-emerald-400 flex items-center gap-1 group-hover:underline">
              <span>View Stockpiles</span>
              <ArrowRight className="w-2.5 h-2.5" />
            </div>
          </div>

          {/* Full-width corridor disruption telemetry */}
          <div className="col-span-2 sm:col-span-4 bg-[#0A101E] border border-slate-800 rounded p-3 flex flex-wrap items-center justify-between gap-3 font-mono-military text-xs">
            <div className="flex items-center gap-2">
              <span className="text-rose-400 font-bold flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-rose-400 animate-pulse" />
                PRIMARY CHOKEPOINT DETECTED:
              </span>
              <span className="text-slate-200 font-semibold">Zojila Pass (NH-1D)</span>
              <span className="text-slate-500">•</span>
              <span className="text-amber-400">92% Snow Blockage Prob</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="text-slate-400">RECOMMENDED DIVERSION:</span>
              <span className="text-emerald-400 font-bold bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-800">
                Shinku La Axis (ROUTE-05)
              </span>
              <button
                onClick={() => onNavigateTab('what-if')}
                className="text-cyan-400 hover:text-cyan-300 underline cursor-pointer text-[11px]"
              >
                Simulate Impact &rarr;
              </button>
            </div>
          </div>

        </div>

      </div>

      {/* Middle Row: Priority Actions (Human-in-the-loop) + Supply Classes */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Priority AI Recommendations (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-rose-400" />
              <h3 className="text-xs font-mono-military uppercase tracking-wider font-bold text-slate-200">
                PRIORITY ACTIONS (HUMAN-IN-THE-LOOP APPROVAL NEEDED)
              </h3>
            </div>
            <button
              onClick={() => onNavigateTab('action-center')}
              className="text-xs font-mono-military text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
            >
              <span>View All ({recommendations.length})</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-3">
            {pendingUrgentRecs.map(rec => (
              <div 
                key={rec.id}
                className="bg-[#0C1424] border border-slate-800 hover:border-slate-700 rounded p-4 transition-all hud-bracket"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono-military font-bold px-2 py-0.5 rounded bg-rose-950 text-rose-300 border border-rose-800">
                      {rec.urgency}
                    </span>
                    <span className="text-xs font-bold text-slate-100">{rec.headline}</span>
                  </div>
                  <div className="text-[10px] font-mono-military text-cyan-400 shrink-0">
                    CONFIDENCE: <strong className="text-cyan-200 font-bold">{rec.confidence}%</strong>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-slate-300 my-2.5 bg-slate-900/60 p-2.5 rounded border border-slate-800/80 font-mono-military">
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">WHAT & HOW MUCH:</span>
                    <span className="text-slate-200 font-semibold">{rec.what}</span>
                  </div>
                  <div>
                    <span className="text-slate-500 block text-[10px] uppercase">WHEN & ROUTE:</span>
                    <span className="text-amber-300 font-semibold">{rec.when}</span>
                  </div>
                </div>

                <p className="text-[11px] text-slate-400 mb-3 line-clamp-2">
                  <strong className="text-slate-300">Why: </strong>{rec.why}
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                  <div className="flex items-center gap-2 text-[11px] font-mono-military text-emerald-400">
                    <TrendingDown className="w-3.5 h-3.5" />
                    <span>Reduces Risk from {rec.impactSummary.initialStockoutRisk}% &rarr; {rec.impactSummary.postApprovalStockoutRisk}%</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onNavigateTab('action-center')}
                      className="px-2.5 py-1 text-slate-300 hover:text-slate-100 hover:bg-slate-800 rounded text-xs font-mono-military cursor-pointer"
                    >
                      Inspect Explainability
                    </button>
                    <button
                      onClick={() => approveRecommendation(rec.id)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black px-3.5 py-1.5 rounded text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-md shadow-emerald-950"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>APPROVE &amp; DISPATCH</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right: Supply Class Readiness Gauges & Pass Status (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          
          {/* Supply Class Readiness */}
          <TacticalCard
            title="SUPPLY CLASS READINESS GAUGES"
            subtitle="Current theatre stockpile vs threshold"
            icon={Shield}
          >
            <div className="space-y-3">
              {supplyClasses.map(cls => {
                const Icon = cls.icon;
                return (
                  <div key={cls.code} className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2">
                        <Icon className="w-3.5 h-3.5 text-cyan-400" />
                        <span className="font-semibold text-slate-200">{cls.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono-military">({cls.code})</span>
                      </div>
                      <div className="flex items-center gap-2 font-mono-military text-xs">
                        {cls.criticalNodesCount > 0 && (
                          <span className="text-rose-400 text-[10px] font-bold">
                            {cls.criticalNodesCount} low
                          </span>
                        )}
                        <span className={`font-bold ${
                          cls.avgStockPct < 60 ? 'text-rose-400' :
                          cls.avgStockPct < 75 ? 'text-amber-400' : 'text-emerald-400'
                        }`}>
                          {cls.avgStockPct}%
                        </span>
                      </div>
                    </div>

                    <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all duration-700 ${
                          cls.avgStockPct < 60 ? 'bg-rose-500' :
                          cls.avgStockPct < 75 ? 'bg-amber-500' : 'bg-emerald-500'
                        }`}
                        style={{ width: `${cls.avgStockPct}%` }}
                      ></div>
                    </div>
                    <div className="text-[10px] text-slate-400 font-mono-military flex justify-between">
                      <span>{cls.note}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </TacticalCard>

          {/* Mountain Passes Status Telemetry */}
          <TacticalCard
            title="HIMALAYAN PASSES OPERATIONAL STATUS"
            subtitle="Real-time route weather & closure probability"
            icon={Compass}
          >
            <div className="space-y-2 font-mono-military text-xs">
              {mountainPasses.map(pass => (
                <div 
                  key={pass.name}
                  className="bg-slate-900/60 p-2.5 rounded border border-slate-800 flex items-center justify-between gap-2"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-slate-200 font-bold">{pass.name}</span>
                      <span className="text-[10px] text-slate-500">[{pass.elevation}]</span>
                    </div>
                    <div className="text-[10px] text-slate-400">{pass.note}</div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border ${
                      pass.color === 'rose' ? 'bg-rose-950/80 text-rose-300 border-rose-800' :
                      pass.color === 'amber' ? 'bg-amber-950/80 text-amber-300 border-amber-800' :
                      'bg-emerald-950/80 text-emerald-300 border-emerald-800'
                    }`}>
                      {pass.status}
                    </span>
                    <div className="text-[10px] text-slate-400 mt-1">
                      Closure: <strong className={pass.risk > 70 ? 'text-rose-400' : 'text-slate-300'}>{pass.risk}%</strong>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </TacticalCard>

        </div>

      </div>

      {/* Bottom Row: Mini Network Overview & Quick Node Jumper */}
      <TacticalCard
        title="FORWARD LOGISTICS FORMATIONS OVERVIEW"
        subtitle="Click any formation to inspect live Digital Twin, stockout risk & 5-pillar resilience"
        icon={Radio}
        actionButton={
          <button
            onClick={() => onNavigateTab('digital-twin')}
            className="text-xs font-mono-military text-cyan-400 hover:text-cyan-300 flex items-center gap-1 cursor-pointer"
          >
            <span>Open Full Interactive Twin</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </button>
        }
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {nodes.slice(0, 8).map(node => (
            <div
              key={node.id}
              onClick={() => handleNodeClick(node.id)}
              className="bg-[#0B1222] hover:bg-[#111C33] border border-slate-800 hover:border-cyan-500/60 p-3 rounded cursor-pointer transition-all group"
            >
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono-military text-slate-500 font-bold uppercase">{node.type}</span>
                <Badge status={node.resilienceStatus} text={node.resilienceStatus} size="sm" />
              </div>

              <div className="text-xs font-bold text-slate-200 group-hover:text-cyan-300 transition-colors truncate">
                {node.name}
              </div>
              <div className="text-[10px] text-slate-400 font-mono-military mb-2">
                Elev: {node.elevation}
              </div>

              <div className="grid grid-cols-2 gap-1.5 pt-2 border-t border-slate-800/80 font-mono-military text-[11px]">
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase">Stockout Risk:</span>
                  <span className={`font-bold ${
                    node.stockoutRisk > 75 ? 'text-rose-400' :
                    node.stockoutRisk > 40 ? 'text-amber-400' : 'text-emerald-400'
                  }`}>
                    {node.stockoutRisk}%
                  </span>
                </div>
                <div>
                  <span className="text-slate-500 block text-[9px] uppercase">Resilience:</span>
                  <span className="text-slate-200 font-bold">
                    {node.overallResilience}/100
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </TacticalCard>

    </div>
  );
};
