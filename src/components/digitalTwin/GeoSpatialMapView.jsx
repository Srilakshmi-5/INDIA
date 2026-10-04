import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { 
  MapPin, 
  Navigation, 
  Layers, 
  Compass, 
  Maximize2, 
  ShieldAlert, 
  Flame, 
  Crosshair, 
  Mountain,
  Eye,
  AlertTriangle
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const GeoSpatialMapView = ({ onSelectNode }) => {
  const { nodes, routes, selectedNodeId, playTacticalSound } = useApp();

  const [activeLayer, setActiveLayer] = useState('ALL'); // 'ALL' | 'CORRIDORS' | 'PASSES'
  const [mapZoom, setMapZoom] = useState(1);

  // Geographic bounds for Northern Command operational theater
  // Lat: 32.0°N to 36.0°N
  // Long: 74.0°E to 79.5°E
  const minLat = 32.0, maxLat = 36.0;
  const minLng = 74.0, maxLng = 79.5;

  // Convert GPS lat/long to percentage coordinates on the canvas
  const getMapPosition = (lat, lng) => {
    const x = ((lng - minLng) / (maxLng - minLng)) * 100;
    const y = 100 - ((lat - minLat) / (maxLat - minLat)) * 100;
    return { x: Math.max(5, Math.min(95, x)), y: Math.max(5, Math.min(95, y)) };
  };

  // Strategic Mountain Passes with military significance
  const tacticalPasses = [
    { name: 'Zojila Pass', lat: 34.28, lng: 75.47, elevation: '11,575 ft', status: 'CRITICAL', risk: 92, axis: 'NH-1D Axis' },
    { name: 'Khardung La Pass', lat: 34.27, lng: 77.60, elevation: '17,582 ft', status: 'HIGH RISK', risk: 88, axis: 'Nubra Lifeline' },
    { name: 'Fotu La Pass', lat: 34.28, lng: 76.72, elevation: '13,478 ft', status: 'MODERATE', risk: 42, axis: 'Kargil-Leh' },
    { name: 'Chang La Pass', lat: 34.05, lng: 77.92, elevation: '17,688 ft', status: 'HIGH RISK', risk: 75, axis: 'Pangong Axis' },
    { name: 'Shinku La Pass', lat: 32.90, lng: 77.20, elevation: '16,580 ft', status: 'STABLE', risk: 12, axis: 'Atal Bypass' }
  ];

  return (
    <div className="relative bg-[#060C18] border border-slate-800 rounded-lg overflow-hidden hud-bracket flex flex-col h-[700px]">
      
      {/* Top Map HUD Bar */}
      <div className="p-3 bg-[#0A1120] border-b border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs z-10 font-mono-military">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
            <Compass className="w-4 h-4 text-cyan-400 animate-spin" style={{ animationDuration: '15s' }} />
            <span>GEO-SPATIAL THEATRE RADAR (NORTHERN COMMAND // 14 CORPS)</span>
          </div>
          <span className="text-slate-600">|</span>
          <span className="text-slate-400">BOUNDS: 32.0°N–36.0°N, 74.0°E–79.5°E</span>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-[11px]">DISPLAY LAYERS:</span>
          <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded border border-slate-800">
            {['ALL', 'CORRIDORS', 'PASSES'].map(layer => (
              <button
                key={layer}
                onClick={() => {
                  setActiveLayer(layer);
                  playTacticalSound('click');
                }}
                className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                  activeLayer === layer ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {layer}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Map Visual Surface */}
      <div className="flex-1 relative overflow-hidden tactical-grid bg-[#060B14]">
        
        {/* Terrain Topography Background Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center opacity-30 mix-blend-screen pointer-events-none"
          style={{ backgroundImage: `url('/command-warroom-bg.jpg')` }}
        />

        {/* Range Rings & Crosshairs */}
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-20">
          <div className="w-[500px] h-[500px] rounded-full border border-cyan-500/40"></div>
          <div className="w-[300px] h-[300px] rounded-full border border-cyan-500/40 absolute"></div>
          <div className="w-full h-[1px] bg-cyan-500/20 absolute"></div>
          <div className="h-full w-[1px] bg-cyan-500/20 absolute"></div>
        </div>

        {/* Sector Watermarks */}
        <div className="absolute top-6 left-8 text-slate-700 font-mono-military text-xs font-bold pointer-events-none select-none">
          SUB-SECTOR WEST (15 CORPS / KASHMIR)
        </div>
        <div className="absolute top-6 right-8 text-slate-700 font-mono-military text-xs font-bold pointer-events-none select-none">
          SUB-SECTOR NORTH / EAST (14 CORPS / DBO / SIACHEN)
        </div>
        <div className="absolute bottom-6 left-8 text-slate-700 font-mono-military text-xs font-bold pointer-events-none select-none">
          SOUTHERN REAR COMMAND (UDHAMPUR / PATHANKOT)
        </div>

        {/* SVG Route Lines on Map */}
        {(activeLayer === 'ALL' || activeLayer === 'CORRIDORS') && (
          <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
            {routes.map(route => {
              const fromNode = nodes.find(n => n.id === route.from);
              const toNode = nodes.find(n => n.id === route.to);
              if (!fromNode || !toNode) return null;

              const p1 = getMapPosition(fromNode.coordinates[0], fromNode.coordinates[1]);
              const p2 = getMapPosition(toNode.coordinates[0], toNode.coordinates[1]);

              const strokeColor = route.riskLevel === 'critical' ? '#EF4444' :
                                  route.riskLevel === 'high' ? '#F59E0B' :
                                  route.riskLevel === 'medium' ? '#EAB308' : '#22C55E';

              return (
                <line
                  key={route.id}
                  x1={`${p1.x}%`}
                  y1={`${p1.y}%`}
                  x2={`${p2.x}%`}
                  y2={`${p2.y}%`}
                  stroke={strokeColor}
                  strokeWidth="2.5"
                  strokeDasharray={route.riskLevel === 'critical' ? '5 4' : 'none'}
                  opacity="0.8"
                />
              );
            })}
          </svg>
        )}

        {/* Tactical Mountain Passes Markers */}
        {(activeLayer === 'ALL' || activeLayer === 'PASSES') && tacticalPasses.map(pass => {
          const pos = getMapPosition(pass.lat, pass.lng);
          return (
            <div
              key={pass.name}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20 group cursor-pointer"
            >
              <div className="flex flex-col items-center">
                <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${
                  pass.status === 'CRITICAL' ? 'bg-rose-950 text-rose-400 border-rose-500 animate-pulse' :
                  pass.status === 'HIGH RISK' ? 'bg-amber-950 text-amber-400 border-amber-500' :
                  'bg-emerald-950 text-emerald-400 border-emerald-500'
                }`}>
                  <Mountain className="w-2.5 h-2.5" />
                </div>
                <span className="text-[9px] font-mono-military font-bold text-slate-300 bg-slate-950/80 px-1 rounded mt-0.5 border border-slate-800 whitespace-nowrap">
                  {pass.name} ({pass.elevation})
                </span>
              </div>

              {/* Pass Tooltip */}
              <div className="hidden group-hover:block absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1.5 w-44 bg-[#0A101D] border border-slate-700 p-2 rounded shadow-2xl z-40 text-[10px] font-mono-military text-slate-200">
                <div className="font-bold text-cyan-300">{pass.name}</div>
                <div>Elev: {pass.elevation}</div>
                <div>Status: <span className={pass.risk > 70 ? 'text-rose-400 font-bold' : 'text-emerald-400 font-bold'}>{pass.status}</span></div>
                <div>Closure Prob: <strong className="text-amber-400">{pass.risk}%</strong></div>
              </div>
            </div>
          );
        })}

        {/* Nodes Geographic Pins */}
        {nodes.map(node => {
          const pos = getMapPosition(node.coordinates[0], node.coordinates[1]);
          const isSelected = selectedNodeId === node.id;

          return (
            <div
              key={node.id}
              onClick={() => {
                onSelectNode(node.id);
                playTacticalSound('click');
              }}
              style={{ left: `${pos.x}%`, top: `${pos.y}%` }}
              className={`absolute transform -translate-x-1/2 -translate-y-1/2 z-30 cursor-pointer transition-all duration-200 group ${
                isSelected ? 'scale-125 z-40' : 'hover:scale-115'
              }`}
            >
              {/* Outer Pulse for Critical Nodes */}
              {node.resilienceStatus === 'Critical' && (
                <span className="absolute -inset-1.5 rounded-full bg-rose-500/40 animate-ping"></span>
              )}

              {/* Node Marker Pin */}
              <div className={`px-2 py-1 rounded flex items-center gap-1.5 text-[10px] font-mono-military font-bold border shadow-xl ${
                isSelected
                  ? 'bg-cyan-950 text-cyan-200 border-cyan-400 ring-2 ring-cyan-500/60 shadow-[0_0_15px_rgba(6,182,212,0.6)]'
                  : node.resilienceStatus === 'Critical'
                  ? 'bg-rose-950/90 text-rose-200 border-rose-600 shadow-[0_0_12px_rgba(239,68,68,0.4)]'
                  : node.resilienceStatus === 'Vulnerable'
                  ? 'bg-amber-950/90 text-amber-200 border-amber-600'
                  : 'bg-slate-900/90 text-slate-200 border-slate-700'
              }`}>
                <MapPin className="w-3 h-3 text-cyan-400 shrink-0" />
                <span className="whitespace-nowrap">{node.name}</span>
                <span className={`text-[9px] px-1 rounded ${
                  node.stockoutRisk > 75 ? 'bg-rose-900 text-rose-300' :
                  node.stockoutRisk > 40 ? 'bg-amber-900 text-amber-300' : 'bg-emerald-900 text-emerald-300'
                }`}>
                  {node.stockoutRisk}%
                </span>
              </div>
            </div>
          );
        })}

      </div>

      {/* Map Footer Information */}
      <div className="p-2.5 bg-[#090F1D] border-t border-slate-800 flex items-center justify-between text-[11px] font-mono-military text-slate-400">
        <div className="flex items-center gap-4">
          <span className="text-cyan-400 font-bold">MILITARY CODES:</span>
          <span>Red: Critical Deficit (&lt;3 Days)</span>
          <span>•</span>
          <span>Amber: Vulnerable Pass Axis</span>
          <span>•</span>
          <span>Green: All-Weather Secure Corridor</span>
        </div>
        <div className="text-slate-400 hidden sm:inline">
          Satellite link updated every 15s • Drag / Click to inspect node drawer
        </div>
      </div>

    </div>
  );
};
