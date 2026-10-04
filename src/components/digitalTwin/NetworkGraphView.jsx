import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  ZoomIn, 
  ZoomOut, 
  RotateCcw, 
  Filter, 
  Layers, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  Flame,
  Crosshair,
  HeartPulse,
  Utensils,
  MapPin
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const NetworkGraphView = ({ onSelectNode }) => {
  const { nodes, routes, selectedNodeId, activeSupplyFilter, setActiveSupplyFilter, playTacticalSound } = useApp();
  
  const [zoomLevel, setZoomLevel] = useState(1);
  const [filterTier, setFilterTier] = useState('ALL'); // 'ALL' | 1 | 2 | 3
  const [hoveredNodeId, setHoveredNodeId] = useState(null);

  // Group nodes by Tier for the 3-column / 3-tier tactical layout
  const tier1Nodes = nodes.filter(n => n.tier === 1);
  const tier2Nodes = nodes.filter(n => n.tier === 2);
  const tier3Nodes = nodes.filter(n => n.tier === 3);

  // Compute node position for SVG coordinate connections
  // Canvas virtual dimension: 1100 x 680
  const getNodeCoordinates = (node) => {
    if (node.tier === 1) {
      const idx = tier1Nodes.findIndex(n => n.id === node.id);
      return { x: 140, y: 220 + idx * 220 };
    } else if (node.tier === 2) {
      const idx = tier2Nodes.findIndex(n => n.id === node.id);
      return { x: 480, y: 140 + idx * 190 };
    } else {
      const idx = tier3Nodes.findIndex(n => n.id === node.id);
      return { x: 880, y: 70 + idx * 85 };
    }
  };

  const isRouteVisible = (route) => {
    if (filterTier === 'ALL') return true;
    const fromNode = nodes.find(n => n.id === route.from);
    const toNode = nodes.find(n => n.id === route.to);
    return fromNode?.tier === filterTier || toNode?.tier === filterTier;
  };

  const getRouteStroke = (riskLevel) => {
    switch (riskLevel) {
      case 'critical': return { stroke: '#EF4444', dash: '6 4', width: 3 };
      case 'high': return { stroke: '#F59E0B', dash: '4 4', width: 2.5 };
      case 'medium': return { stroke: '#EAB308', dash: 'none', width: 2 };
      default: return { stroke: '#22C55E', dash: 'none', width: 2 };
    }
  };

  return (
    <div className="relative bg-[#070D1A] border border-slate-800 rounded-lg overflow-hidden hud-bracket flex flex-col h-[700px]">
      
      {/* Top Filter and Zoom Controls */}
      <div className="p-3 bg-[#0A1120] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs z-10 font-mono-military">
        
        {/* Tier filter */}
        <div className="flex items-center gap-2">
          <span className="text-slate-400 font-bold uppercase flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            HIERARCHY TIER:
          </span>
          <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded border border-slate-800">
            {['ALL', 1, 2, 3].map(t => (
              <button
                key={t}
                onClick={() => {
                  setFilterTier(t);
                  playTacticalSound('click');
                }}
                className={`px-2 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                  filterTier === t
                    ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60'
                    : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {t === 'ALL' ? 'ALL TIERS' : `TIER ${t} ${t === 1 ? '(CENTRAL)' : t === 2 ? '(STAGING)' : '(FORWARD)'}`}
              </button>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="hidden lg:flex items-center gap-4 text-[11px]">
          <div className="flex items-center gap-1.5 text-slate-300">
            <span className="w-3 h-0.5 bg-emerald-500 inline-block"></span>
            <span>Stable Route (&lt;30% Risk)</span>
          </div>
          <div className="flex items-center gap-1.5 text-amber-300">
            <span className="w-3 h-0.5 bg-amber-500 border-b border-dashed border-amber-400 inline-block"></span>
            <span>Degraded Route</span>
          </div>
          <div className="flex items-center gap-1.5 text-rose-300">
            <span className="w-3 h-0.5 bg-rose-500 border-b-2 border-dashed border-rose-400 inline-block"></span>
            <span>Imminent Chokepoint (&gt;80%)</span>
          </div>
        </div>

        {/* Zoom Controls */}
        <div className="flex items-center gap-1 bg-slate-900 p-1 rounded border border-slate-800">
          <button
            onClick={() => setZoomLevel(prev => Math.min(prev + 0.15, 1.4))}
            title="Zoom In"
            className="p-1 hover:bg-slate-800 rounded text-slate-300 cursor-pointer"
          >
            <ZoomIn className="w-3.5 h-3.5" />
          </button>
          <span className="text-[10px] text-slate-400 px-1">{Math.round(zoomLevel * 100)}%</span>
          <button
            onClick={() => setZoomLevel(prev => Math.max(prev - 0.15, 0.7))}
            title="Zoom Out"
            className="p-1 hover:bg-slate-800 rounded text-slate-300 cursor-pointer"
          >
            <ZoomOut className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setZoomLevel(1)}
            title="Reset Zoom"
            className="p-1 hover:bg-slate-800 rounded text-slate-300 cursor-pointer ml-1"
          >
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>

      {/* Main Graph Canvas Area */}
      <div className="flex-1 relative overflow-auto tactical-grid p-6">
        
        {/* Tier Column Headers (watermark style) */}
        <div className="absolute inset-x-0 top-3 flex justify-between px-16 text-slate-600 font-mono-military text-[11px] font-bold pointer-events-none uppercase tracking-wider z-0">
          <div className="w-56 text-center border-b border-slate-800 pb-1">
            TIER 1: STRATEGIC REAR BASES (RAILHEADS)
          </div>
          <div className="w-64 text-center border-b border-slate-800 pb-1">
            TIER 2: INTERMEDIATE STAGING HUBS
          </div>
          <div className="w-72 text-center border-b border-slate-800 pb-1">
            TIER 3: HIGH-ALTITUDE FORWARD GARRISONS
          </div>
        </div>

        {/* SVG Interactive Canvas */}
        <div 
          className="relative transition-transform duration-300 origin-top-left"
          style={{ 
            width: '1100px', 
            height: '660px',
            transform: `scale(${zoomLevel})`
          }}
        >
          {/* SVG Route Lines */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
            <defs>
              <linearGradient id="flowGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#06B6D4" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#06B6D4" stopOpacity="0.8" />
              </linearGradient>
            </defs>

            {routes.map(route => {
              if (!isRouteVisible(route)) return null;
              const fromNode = nodes.find(n => n.id === route.from);
              const toNode = nodes.find(n => n.id === route.to);
              if (!fromNode || !toNode) return null;

              const c1 = getNodeCoordinates(fromNode);
              const c2 = getNodeCoordinates(toNode);
              const strokeConfig = getRouteStroke(route.riskLevel);
              const isHighlighted = hoveredNodeId === fromNode.id || hoveredNodeId === toNode.id;

              // Quadratic bezier curve for organic supply corridors
              const midX = (c1.x + c2.x) / 2;
              const midY = (c1.y + c2.y) / 2 + (c1.y > c2.y ? -15 : 15);
              const pathD = `M ${c1.x} ${c1.y} Q ${midX} ${midY} ${c2.x} ${c2.y}`;

              return (
                <g key={route.id} className="transition-opacity duration-300">
                  {/* Background shadow path */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke="#000"
                    strokeWidth={strokeConfig.width + 2}
                    opacity="0.6"
                  />
                  {/* Main corridor path */}
                  <path
                    d={pathD}
                    fill="none"
                    stroke={isHighlighted ? '#38BDF8' : strokeConfig.stroke}
                    strokeWidth={isHighlighted ? strokeConfig.width + 2 : strokeConfig.width}
                    strokeDasharray={strokeConfig.dash}
                    opacity={isHighlighted ? 1 : 0.75}
                  />
                  {/* Animated pulse dot on active routes */}
                  {route.riskLevel === 'critical' && (
                    <circle r="4" fill="#EF4444">
                      <animateMotion path={pathD} dur="4s" repeatCount="indefinite" />
                    </circle>
                  )}
                  {route.riskLevel === 'stable' && (
                    <circle r="3" fill="#22C55E" opacity="0.8">
                      <animateMotion path={pathD} dur="6s" repeatCount="indefinite" />
                    </circle>
                  )}
                </g>
              );
            })}
          </svg>

          {/* Interactive Node Cards Overlay */}
          {nodes.map(node => {
            if (filterTier !== 'ALL' && node.tier !== filterTier) return null;
            const coord = getNodeCoordinates(node);
            const isSelected = selectedNodeId === node.id;
            const isHovered = hoveredNodeId === node.id;

            return (
              <div
                key={node.id}
                onClick={() => {
                  onSelectNode(node.id);
                  playTacticalSound('click');
                }}
                onMouseEnter={() => setHoveredNodeId(node.id)}
                onMouseLeave={() => setHoveredNodeId(null)}
                style={{
                  position: 'absolute',
                  left: `${coord.x}px`,
                  top: `${coord.y}px`,
                  transform: 'translate(-50%, -50%)'
                }}
                className={`z-20 w-52 bg-[#0B1324]/95 backdrop-blur-md rounded border p-2.5 cursor-pointer transition-all duration-200 select-none ${
                  isSelected
                    ? 'border-cyan-400 ring-2 ring-cyan-500/50 shadow-[0_0_25px_rgba(6,182,212,0.4)] scale-105'
                    : isHovered
                    ? 'border-slate-500 scale-102 shadow-lg'
                    : node.resilienceStatus === 'Critical'
                    ? 'border-rose-600/80 shadow-[0_0_15px_rgba(239,68,68,0.25)]'
                    : node.resilienceStatus === 'Vulnerable'
                    ? 'border-amber-600/70'
                    : 'border-slate-800'
                }`}
              >
                {/* Node Card Header */}
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[9px] font-mono-military font-bold text-slate-400 uppercase">
                    {node.code}
                  </span>
                  <Badge status={node.resilienceStatus} text={node.resilienceStatus} size="sm" />
                </div>

                {/* Node Name */}
                <div className="text-xs font-bold text-slate-100 truncate mb-1">
                  {node.name}
                </div>

                <div className="text-[10px] text-slate-400 font-mono-military flex items-center justify-between mb-2">
                  <span>Elev: {node.elevation}</span>
                  <span className="text-cyan-400">Res: {node.overallResilience}%</span>
                </div>

                {/* Stockout Risk Bar */}
                <div className="space-y-1 pt-1.5 border-t border-slate-800/80 font-mono-military text-[10px]">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-400">Stockout Risk:</span>
                    <span className={`font-bold ${
                      node.stockoutRisk > 75 ? 'text-rose-400' :
                      node.stockoutRisk > 40 ? 'text-amber-400' : 'text-emerald-400'
                    }`}>
                      {node.stockoutRisk}%
                    </span>
                  </div>

                  <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        node.stockoutRisk > 75 ? 'bg-rose-500' :
                        node.stockoutRisk > 40 ? 'bg-amber-500' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${node.stockoutRisk}%` }}
                    ></div>
                  </div>

                  <div className="text-[9px] text-slate-500 flex justify-between pt-0.5">
                    <span>Critical Pt: <strong className="text-slate-300">{node.criticalDaysRemaining}d</strong></span>
                    <span className="text-cyan-400 underline group-hover:text-cyan-300">Inspect &rarr;</span>
                  </div>
                </div>

                {/* Pinging pulse beacon for critical nodes */}
                {node.resilienceStatus === 'Critical' && (
                  <span className="absolute -top-1 -right-1 flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-rose-500"></span>
                  </span>
                )}
              </div>
            );
          })}
        </div>

      </div>

      {/* Bottom Status Ticker */}
      <div className="px-4 py-2 bg-[#090F1D] border-t border-slate-800 flex items-center justify-between text-[11px] font-mono-military text-slate-400">
        <div className="flex items-center gap-3">
          <span className="text-cyan-400 font-bold">DIGITAL TWIN STATUS:</span>
          <span>12 Formations Synchronized • 12 Active Corridors Monitored</span>
        </div>
        <div className="text-slate-400">
          Click any formation card to inspect 5-pillar resilience &amp; execute actions
        </div>
      </div>

    </div>
  );
};
