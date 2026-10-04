import React from 'react';
import { useApp } from '../../context/AppContext';
import { 
  X, 
  Shield, 
  AlertTriangle, 
  Flame, 
  Crosshair, 
  HeartPulse, 
  Utensils, 
  Radio, 
  MapPin, 
  TrendingDown, 
  ChevronRight, 
  Zap, 
  CheckCircle2,
  Clock,
  Layers,
  Thermometer,
  Wind
} from 'lucide-react';
import { Badge } from '../common/Badge';

export const NodeDetailDrawer = ({ node, onClose, onLaunchSimulation, onApproveAction }) => {
  const { routes, recommendations, playTacticalSound } = useApp();

  if (!node) return null;

  // Find incoming & outgoing routes
  const connectedRoutes = routes.filter(r => r.from === node.id || r.to === node.id);

  // Find relevant pending recommendations for this node
  const nodeRecommendations = recommendations.filter(
    r => r.where.includes(node.id) || r.where.includes(node.name)
  );

  return (
    <div className="fixed inset-y-0 right-0 w-full max-w-lg bg-[#0A111F]/95 backdrop-blur-xl border-l border-cyan-500/40 shadow-2xl z-50 flex flex-col justify-between text-slate-100 overflow-y-auto">
      
      {/* Top Header */}
      <div className="p-4 border-b border-slate-800 bg-[#060B14] flex items-start justify-between gap-3 sticky top-0 z-10">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono-military uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
              {node.code} • {node.type}
            </span>
            <Badge status={node.resilienceStatus} text={node.resilienceStatus} size="sm" />
          </div>
          <h2 className="text-base font-bold text-slate-100 leading-tight">
            {node.name}
          </h2>
          <div className="text-[11px] text-slate-400 font-mono-military mt-0.5 flex items-center gap-2">
            <MapPin className="w-3 h-3 text-cyan-400" />
            <span>Elev: {node.elevation}</span>
            <span>•</span>
            <span>Coord: [{node.coordinates[0]}°N, {node.coordinates[1]}°E]</span>
          </div>
        </div>

        <button
          onClick={() => {
            playTacticalSound('click');
            onClose();
          }}
          className="p-1.5 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 border border-slate-700 cursor-pointer"
        >
          <X className="w-4 h-4" />
        </button>
      </div>

      {/* Main Drawer Body */}
      <div className="p-4 space-y-5 text-xs">
        
        {/* Urgent Stockout Risk & Critical Timeline */}
        <div className={`p-3.5 rounded border ${
          node.stockoutRisk > 75 ? 'bg-rose-950/40 border-rose-600/80 shadow-[0_0_15px_rgba(239,68,68,0.2)]' :
          node.stockoutRisk > 40 ? 'bg-amber-950/40 border-amber-600/80' :
          'bg-emerald-950/40 border-emerald-600/80'
        }`}>
          <div className="flex items-center justify-between mb-2">
            <span className="font-mono-military font-bold uppercase text-[10px] text-slate-300 flex items-center gap-1.5">
              <AlertTriangle className={`w-3.5 h-3.5 ${node.stockoutRisk > 75 ? 'text-rose-400' : 'text-amber-400'}`} />
              STOCKOUT PROBABILITY (PREDICTIVE AI)
            </span>
            <span className="text-[10px] font-mono-military text-slate-400">Model: XGBoost-Himalaya</span>
          </div>

          <div className="flex items-baseline justify-between mb-1.5">
            <div className="text-3xl font-black font-mono-military tracking-tight">
              <span className={node.stockoutRisk > 75 ? 'text-rose-400' : node.stockoutRisk > 40 ? 'text-amber-400' : 'text-emerald-400'}>
                {node.stockoutRisk}%
              </span>
            </div>
            <div className="text-right font-mono-military">
              <span className="text-slate-400 text-[10px] block">ESTIMATED CRITICAL POINT:</span>
              <span className={`font-bold text-sm ${node.criticalDaysRemaining < 4 ? 'text-rose-400' : 'text-slate-200'}`}>
                {node.criticalDaysRemaining} Days Remaining
              </span>
            </div>
          </div>

          <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden mb-2">
            <div 
              className={`h-full rounded-full transition-all duration-700 ${
                node.stockoutRisk > 75 ? 'bg-rose-500' :
                node.stockoutRisk > 40 ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${node.stockoutRisk}%` }}
            ></div>
          </div>

          <div className="flex items-center justify-between text-[11px] font-mono-military text-slate-400">
            <span>Burn Rate: <strong className="text-slate-200">{node.dailyBurnRate} units/day</strong></span>
            <span>Range: <strong className="text-cyan-300">{node.demandRange}</strong></span>
          </div>
        </div>

        {/* 5-Bar Dynamic Resilience Breakdown */}
        <div className="bg-[#0D1629] p-3.5 rounded border border-slate-800 space-y-3">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-1.5 text-slate-200 font-bold font-mono-military text-[11px]">
              <Shield className="w-3.5 h-3.5 text-cyan-400" />
              <span>5-PILLAR RESILIENCE PROFILE</span>
            </div>
            <span className="text-xs font-mono-military font-bold text-cyan-300">
              OVERALL: {node.overallResilience}/100
            </span>
          </div>

          <div className="space-y-2 font-mono-military text-[11px]">
            {/* Inventory Resilience */}
            <div>
              <div className="flex justify-between text-slate-300 mb-0.5">
                <span>1. Inventory Resilience (Buffer Depth)</span>
                <span className="font-bold text-slate-200">{node.resilienceDimensions.inventory}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${node.resilienceDimensions.inventory < 50 ? 'bg-rose-500' : 'bg-cyan-500'}`} style={{ width: `${node.resilienceDimensions.inventory}%` }}></div>
              </div>
            </div>

            {/* Transport Resilience */}
            <div>
              <div className="flex justify-between text-slate-300 mb-0.5">
                <span>2. Transport Resilience (Fleet / Convoys)</span>
                <span className="font-bold text-slate-200">{node.resilienceDimensions.transport}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${node.resilienceDimensions.transport < 50 ? 'bg-rose-500' : 'bg-cyan-500'}`} style={{ width: `${node.resilienceDimensions.transport}%` }}></div>
              </div>
            </div>

            {/* Weather Resilience */}
            <div>
              <div className="flex justify-between text-slate-300 mb-0.5">
                <span>3. Weather Resilience (Sub-Zero Freeze)</span>
                <span className="font-bold text-slate-200">{node.resilienceDimensions.weather}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${node.resilienceDimensions.weather < 50 ? 'bg-rose-500' : 'bg-cyan-500'}`} style={{ width: `${node.resilienceDimensions.weather}%` }}></div>
              </div>
            </div>

            {/* Demand Resilience */}
            <div>
              <div className="flex justify-between text-slate-300 mb-0.5">
                <span>4. Demand Resilience (Surge Tolerance)</span>
                <span className="font-bold text-slate-200">{node.resilienceDimensions.demand}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${node.resilienceDimensions.demand < 50 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${node.resilienceDimensions.demand}%` }}></div>
              </div>
            </div>

            {/* Route Resilience */}
            <div>
              <div className="flex justify-between text-slate-300 mb-0.5">
                <span>5. Route Resilience (Alternative Paths)</span>
                <span className="font-bold text-slate-200">{node.resilienceDimensions.route}%</span>
              </div>
              <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${node.resilienceDimensions.route < 50 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${node.resilienceDimensions.route}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Current Supply Inventory Table */}
        <div className="bg-[#0D1629] p-3.5 rounded border border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-200 font-bold font-mono-military text-[11px] uppercase">
              CURRENT STOCKPILE INVENTORY
            </span>
            <span className="text-[10px] text-slate-400 font-mono-military">5 Key Classes</span>
          </div>

          <div className="space-y-2">
            {node.inventory.map(item => (
              <div key={item.category} className="bg-slate-900/60 p-2 rounded border border-slate-800/80">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="font-semibold text-slate-200">{item.category}</span>
                  <span className={`font-mono-military font-bold text-[10px] px-1.5 py-0.5 rounded border ${
                    item.status === 'critical' ? 'bg-rose-950 text-rose-300 border-rose-800' :
                    item.status === 'warning' ? 'bg-amber-950 text-amber-300 border-amber-800' :
                    'bg-emerald-950 text-emerald-300 border-emerald-800'
                  }`}>
                    {item.daysLeft} Days Stock
                  </span>
                </div>

                <div className="flex items-center justify-between text-[11px] font-mono-military text-slate-400">
                  <span>Current: <strong className="text-slate-200">{item.current.toLocaleString()} {item.unit}</strong></span>
                  <span>Min Safe: <strong className="text-slate-400">{item.min.toLocaleString()}</strong></span>
                </div>

                <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden mt-1.5">
                  <div
                    className={`h-full rounded-full ${
                      item.current <= item.min ? 'bg-rose-500' :
                      item.current <= item.min * 1.4 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${Math.min(100, (item.current / item.max) * 100)}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Explainable AI: Top Risk Drivers */}
        <div className="bg-[#0D1629] p-3.5 rounded border border-slate-800 space-y-2.5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-200 font-bold font-mono-military text-[11px] uppercase">
              EXPLAINABLE AI: TOP RISK CONTRIBUTORS
            </span>
            <span className="text-[10px] text-cyan-400 font-mono-military">SHAP Weight Attribution</span>
          </div>

          <div className="space-y-2">
            {node.topRiskFactors.map(rf => (
              <div key={rf.factor} className="bg-slate-900/60 p-2 rounded border border-slate-800 text-[11px]">
                <div className="flex justify-between items-center mb-1">
                  <span className="text-slate-300 font-medium">{rf.factor}</span>
                  <span className="text-rose-400 font-mono-military font-bold">{rf.impact}</span>
                </div>
                <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                  <div className="h-full bg-rose-500 rounded-full" style={{ width: `${rf.weight}%` }}></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Connected Logistics Corridors */}
        <div className="bg-[#0D1629] p-3.5 rounded border border-slate-800 space-y-2">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <span className="text-slate-200 font-bold font-mono-military text-[11px] uppercase">
              CONNECTING LOGISTICS AXES ({connectedRoutes.length})
            </span>
          </div>

          <div className="space-y-1.5 font-mono-military text-[11px]">
            {connectedRoutes.map(rt => (
              <div key={rt.id} className="bg-slate-900/60 p-2 rounded border border-slate-800 flex items-center justify-between">
                <div>
                  <div className="text-slate-200 font-bold">{rt.name}</div>
                  <div className="text-[10px] text-slate-400">{rt.distanceKm} km • {rt.transitHours}h transit • {rt.weatherStatus}</div>
                </div>
                <span className={`text-[10px] uppercase font-bold px-1.5 py-0.5 rounded border ${
                  rt.riskLevel === 'critical' ? 'bg-rose-950 text-rose-300 border-rose-800' :
                  rt.riskLevel === 'high' ? 'bg-amber-950 text-amber-300 border-amber-800' :
                  'bg-emerald-950 text-emerald-300 border-emerald-800'
                }`}>
                  {rt.riskLevel}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Base Commander & Communications Status */}
        <div className="bg-slate-900/80 p-3 rounded border border-slate-800 font-mono-military text-[11px] text-slate-400 space-y-1">
          <div><strong className="text-slate-300">COMMANDER:</strong> {node.commander}</div>
          <div><strong className="text-slate-300">COMMS STATUS:</strong> <span className="text-emerald-400 font-bold">{node.satcomStatus}</span></div>
          <div><strong className="text-slate-300">FIELD NOTES:</strong> {node.notes}</div>
        </div>

      </div>

      {/* Drawer Action Controls */}
      <div className="p-4 border-t border-slate-800 bg-[#060B14] sticky bottom-0 z-10 flex items-center gap-2">
        <button
          onClick={() => {
            playTacticalSound('alarm');
            onLaunchSimulation(node.id);
          }}
          className="flex-1 bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold py-2 px-3 rounded text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
        >
          <Zap className="w-3.5 h-3.5" />
          <span>SIMULATE DISRUPTION FOR THIS NODE</span>
        </button>

        {nodeRecommendations.length > 0 && (
          <button
            onClick={() => {
              playTacticalSound('approve');
              onApproveAction(nodeRecommendations[0].id);
            }}
            className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black py-2 px-3 rounded text-xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>APPROVE PRE-POSITIONING</span>
          </button>
        )}
      </div>

    </div>
  );
};
