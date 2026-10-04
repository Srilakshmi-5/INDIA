import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Cpu, 
  Play, 
  Sparkles, 
  AlertTriangle, 
  CheckCircle2, 
  ArrowRight, 
  RefreshCw, 
  TrendingUp, 
  TrendingDown, 
  Clock, 
  ShieldAlert, 
  Layers, 
  Sliders, 
  Send,
  Zap,
  MapPin,
  Calendar,
  Compass
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend 
} from 'recharts';
import { TacticalCard } from '../components/common/TacticalCard';
import { Badge } from '../components/common/Badge';
import { SIMULATION_SCENARIOS } from '../data/mockData';

export const WhatIfSimulatorPage = ({ onNavigateTab }) => {
  const {
    activeScenarioId,
    setActiveScenarioId,
    simulationHorizonDays,
    setSimulationHorizonDays,
    isSimulating,
    simulationResult,
    runSimulation,
    commitSimulationPlanToActionCenter,
    customParams,
    setCustomParams,
    playTacticalSound
  } = useApp();

  const [activeTab, setActiveTab] = useState('PRESET'); // 'PRESET' | 'CUSTOM'
  const [committedSuccess, setCommittedSuccess] = useState(false);

  const selectedScenario = SIMULATION_SCENARIOS.find(s => s.id === activeScenarioId) || SIMULATION_SCENARIOS[0];

  const handleRunSimulation = () => {
    runSimulation(activeScenarioId, simulationHorizonDays, customParams);
    setCommittedSuccess(false);
  };

  const handleCommitPlan = () => {
    if (!simulationResult) return;
    const newId = commitSimulationPlanToActionCenter(simulationResult.recommendedPlan, simulationResult.scenarioName);
    setCommittedSuccess(true);
    setTimeout(() => {
      onNavigateTab('action-center');
    }, 1000);
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Banner */}
      <div className="bg-[#0C1527] border-l-4 border-amber-500 border-y border-r border-slate-800 p-4 rounded flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono-military uppercase px-2 py-0.5 rounded bg-amber-950 text-amber-300 border border-amber-800 font-bold">
              STAR FEATURE: WHAT-IF SCENARIO STRESS SIMULATOR
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-amber-400 font-mono-military text-xs flex items-center gap-1 font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              COUNTERFACTUAL PREDICTIVE REASONING
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-black text-slate-100 tracking-wide">
            FORWARD LOGISTICS DISRUPTION &amp; RESILIENCE STRESS-TEST ENGINE
          </h2>
          <p className="text-xs text-slate-300 max-w-3xl">
            Simulate operational disruptions (avalanches, route severed, blizzard, demand surge) BEFORE they happen to dynamically generate explainable adaptive pre-positioning plans.
          </p>
        </div>

        <div className="text-right font-mono-military text-xs text-slate-400 hidden sm:block">
          <div>ALGORITHM: <span className="text-cyan-300 font-bold">MIL-SIM-LP v4</span></div>
          <div>HORIZON: <span className="text-amber-300 font-bold">{simulationHorizonDays} Days Projection</span></div>
        </div>
      </div>

      {/* Simulator Inputs & Configuration Row */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Scenario Selector (7 cols) */}
        <div className="lg:col-span-7 space-y-4">
          <TacticalCard
            title="SELECT DISRUPTION SCENARIO"
            subtitle="Choose an operational hazard scenario to inject into the Digital Twin"
            icon={Sliders}
          >
            {/* Preset Scenarios List */}
            <div className="space-y-2.5">
              {SIMULATION_SCENARIOS.map(sc => (
                <div
                  key={sc.id}
                  onClick={() => {
                    setActiveScenarioId(sc.id);
                    playTacticalSound('click');
                  }}
                  className={`p-3 rounded border cursor-pointer transition-all ${
                    activeScenarioId === sc.id
                      ? 'bg-amber-950/40 border-amber-500 ring-1 ring-amber-500/40 shadow-lg'
                      : 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div className="flex items-center gap-2">
                      <span className={`text-[9px] font-mono-military font-bold uppercase px-1.5 py-0.5 rounded border ${
                        sc.severity === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border-rose-800' : 'bg-amber-950 text-amber-300 border-amber-800'
                      }`}>
                        {sc.severity}
                      </span>
                      <span className="text-xs font-bold text-slate-100">{sc.name}</span>
                    </div>
                    <span className="text-[10px] font-mono-military text-slate-500 uppercase">{sc.type}</span>
                  </div>

                  <p className="text-[11px] text-slate-400 mt-1 line-clamp-2">
                    {sc.description}
                  </p>

                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-800/80 font-mono-military text-[10px] text-slate-400">
                    <span>Impacted Axes: <strong className="text-slate-300">{sc.affectedRouteIds.join(', ')}</strong></span>
                    <span className="text-amber-400">Closure: {sc.impactFactor.routeClosureRate}%</span>
                  </div>
                </div>
              ))}
            </div>
          </TacticalCard>
        </div>

        {/* Right: Horizon & Stress Parameters + Big Run Button (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          <TacticalCard
            title="SIMULATION HORIZON & PARAMETERS"
            subtitle="Define simulation duration and multi-factor multipliers"
            icon={Clock}
          >
            <div className="space-y-4">
              {/* Duration Horizon Buttons */}
              <div>
                <label className="block text-[11px] font-mono-military text-slate-300 uppercase mb-2">
                  PROJECTION HORIZON (DAYS):
                </label>
                <div className="grid grid-cols-4 gap-2 font-mono-military text-xs">
                  {[3, 7, 14, 30].map(days => (
                    <button
                      key={days}
                      onClick={() => {
                        setSimulationHorizonDays(days);
                        playTacticalSound('click');
                      }}
                      className={`py-2 rounded font-bold border transition-all cursor-pointer ${
                        simulationHorizonDays === days
                          ? 'bg-cyan-950 text-cyan-200 border-cyan-400 shadow-md shadow-cyan-950'
                          : 'bg-slate-900/80 text-slate-400 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      {days} DAYS
                    </button>
                  ))}
                </div>
              </div>

              {/* Stress Multiplier Sliders */}
              <div className="space-y-3 pt-2 border-t border-slate-800">
                <div>
                  <div className="flex justify-between text-[11px] font-mono-military text-slate-300 mb-1">
                    <span>Snowfall Accumulation / Freeze</span>
                    <span className="text-amber-400 font-bold">{customParams.snowfallIntensity}%</span>
                  </div>
                  <input
                    type="range"
                    min="20"
                    max="100"
                    value={customParams.snowfallIntensity}
                    onChange={(e) => setCustomParams({ ...customParams, snowfallIntensity: Number(e.target.value) })}
                    className="w-full accent-amber-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-mono-military text-slate-300 mb-1">
                    <span>Route Blockage Probability</span>
                    <span className="text-rose-400 font-bold">{customParams.routeClosurePct}%</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={customParams.routeClosurePct}
                    onChange={(e) => setCustomParams({ ...customParams, routeClosurePct: Number(e.target.value) })}
                    className="w-full accent-rose-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[11px] font-mono-military text-slate-300 mb-1">
                    <span>Tactical Munitions Demand Surge</span>
                    <span className="text-cyan-400 font-bold">{customParams.demandMultiplier}x (+{Math.round((customParams.demandMultiplier - 1) * 100)}%)</span>
                  </div>
                  <input
                    type="range"
                    min="1.0"
                    max="3.0"
                    step="0.1"
                    value={customParams.demandMultiplier}
                    onChange={(e) => setCustomParams({ ...customParams, demandMultiplier: Number(e.target.value) })}
                    className="w-full accent-cyan-500 cursor-pointer h-1.5 bg-slate-800 rounded-lg"
                  />
                </div>
              </div>

              {/* Big Animated Run Simulation Button */}
              <div className="pt-2">
                <button
                  onClick={handleRunSimulation}
                  disabled={isSimulating}
                  className="w-full py-3.5 px-4 rounded bg-gradient-to-r from-amber-600 via-orange-600 to-amber-500 hover:from-amber-500 hover:to-orange-500 text-slate-950 font-black text-xs font-mono-military uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xl shadow-amber-950/60 group"
                >
                  {isSimulating ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin text-slate-950" />
                      <span>COMPUTING NEURAL RESILIENCE DELTA...</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-slate-950" />
                      <span>RUN TACTICAL RESILIENCE SIMULATION</span>
                    </>
                  )}
                </button>
              </div>

            </div>
          </TacticalCard>
        </div>

      </div>

      {/* Neural Telemetry Loading State */}
      {isSimulating && (
        <div className="bg-[#0A1224] border border-cyan-500/60 rounded p-6 text-center space-y-3 font-mono-military">
          <div className="flex items-center justify-center gap-2 text-cyan-400 font-bold text-sm">
            <RefreshCw className="w-5 h-5 animate-spin" />
            <span>EXECUTING MIL-SIM COUNTERFACTUAL DISRUPTION PIPELINE</span>
          </div>
          <div className="text-xs text-slate-400 max-w-lg mx-auto">
            Ingesting 10-year Himalayan weather patterns • Evaluating alternative pass routes (Shinku La / Atal Axis) • Computing stockout curves for Siachen &amp; DBO...
          </div>
          <div className="w-64 h-1.5 bg-slate-800 rounded-full mx-auto overflow-hidden">
            <div className="h-full bg-cyan-400 animate-pulse w-3/4"></div>
          </div>
        </div>
      )}

      {/* Simulation Results Section (Displayed if result exists) */}
      {simulationResult && !isSimulating && (
        <div className="space-y-6 pt-2">
          
          {/* Results Summary Ribbon */}
          <div className="bg-[#0D182E] border border-amber-600/60 p-4 rounded flex flex-wrap items-center justify-between gap-4 font-mono-military text-xs">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded bg-amber-950 text-amber-300 border border-amber-700">
                <AlertTriangle className="w-5 h-5" />
              </span>
              <div>
                <div className="text-sm font-bold text-slate-100 uppercase">
                  SIMULATION RESULTS: {simulationResult.scenarioName}
                </div>
                <div className="text-[11px] text-slate-400">
                  Executed at {simulationResult.runTimestamp} • Projection Horizon: {simulationResult.durationDays} Days
                </div>
              </div>
            </div>

            <div className="flex items-center gap-6">
              <div>
                <span className="text-slate-500 text-[10px] block">AFFECTED NODES:</span>
                <span className="text-rose-400 font-black text-sm">{simulationResult.affectedNodesCount} Formations</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">AVG RISK ESCALATION:</span>
                <span className="text-amber-400 font-black text-sm">+{simulationResult.avgRiskEscalation}%</span>
              </div>
              <div>
                <span className="text-slate-500 text-[10px] block">PROJECTED DELAYS:</span>
                <span className="text-slate-200 font-black text-sm">+{simulationResult.projectedDelaysDays} Days</span>
              </div>
            </div>
          </div>

          {/* Comparative Stockout Risk Progression Chart (Before vs After) */}
          <TacticalCard
            title="BEFORE VS AFTER STOCKOUT RISK TRAJECTORY (14-DAY FORECAST)"
            subtitle="Demonstrating Sentinel Logix pre-emptive pre-positioning vs unmanaged disruption"
            icon={TrendingDown}
          >
            <div className="h-72 w-full mt-2">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={simulationResult.timeSeriesData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                  <defs>
                    <linearGradient id="unmanagedGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="5%" stopColor="#EF4444" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#EF4444" stopOpacity={0.0}/>
                    </linearGradient>
                    <linearGradient id="sentinelGrad" x1="0%" y1="0%" x2="0%" y2="100%">
                      <stop offset="5%" stopColor="#22C55E" stopOpacity={0.6}/>
                      <stop offset="95%" stopColor="#22C55E" stopOpacity={0.0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1E293B" />
                  <XAxis dataKey="day" stroke="#64748B" tick={{ fill: '#94A3B8', fontSize: 11 }} />
                  <YAxis stroke="#64748B" tick={{ fill: '#94A3B8', fontSize: 11 }} unit="%" domain={[0, 100]} />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0B1222', borderColor: '#334155', borderRadius: '4px', color: '#F1F5F9', fontSize: '11px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                  <Area
                    type="monotone"
                    dataKey="withoutPrePositioning"
                    name="Disruption WITHOUT Sentinel Logix (Unmanaged Route Cutoff)"
                    stroke="#EF4444"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#unmanagedGrad)"
                  />
                  <Area
                    type="monotone"
                    dataKey="withSentinelLogix"
                    name="WITH Sentinel Logix Adaptive Pre-Positioning"
                    stroke="#22C55E"
                    strokeWidth={2.5}
                    fillOpacity={1}
                    fill="url(#sentinelGrad)"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </TacticalCard>

          {/* Node Impact Comparison Table & Adaptive Plan Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            
            {/* Left: Affected Formations Table (6 cols) */}
            <div className="lg:col-span-6 space-y-3">
              <TacticalCard
                title="AFFECTED FORMATIONS DETAILED DELTA"
                subtitle="Predicted stockout risk shifts without proactive pre-positioning"
                icon={ShieldAlert}
              >
                <div className="space-y-3 font-mono-military text-xs">
                  {simulationResult.nodeImpacts.map(impact => (
                    <div
                      key={impact.nodeId}
                      className="bg-slate-900/70 p-3 rounded border border-slate-800 space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-slate-100 font-bold">{impact.nodeName}</span>
                        <span className="text-rose-400 font-bold bg-rose-950/80 px-2 py-0.5 rounded border border-rose-800">
                          Critical in {impact.daysToStockout} Days
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400 pt-1">
                        <div>
                          <span>Baseline Risk: </span>
                          <strong className="text-slate-200">{impact.initialRisk}%</strong>
                        </div>
                        <div>
                          <span>Simulated Risk: </span>
                          <strong className="text-rose-400">{impact.simulatedRisk}% ({impact.delta})</strong>
                        </div>
                      </div>

                      <div className="text-[11px] text-slate-400 pt-1 border-t border-slate-800 flex items-center justify-between">
                        <span>Critical Commodity Deficit:</span>
                        <span className="text-amber-300 font-bold">{impact.criticalSupply}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </TacticalCard>
            </div>

            {/* Right: AI-Generated Adaptive Pre-Positioning Plan (6 cols) */}
            <div className="lg:col-span-6 space-y-3">
              <TacticalCard
                title="AI-RECOMMENDED ADAPTIVE PRE-POSITIONING PLAN"
                subtitle="Execute BEFORE the pass closes / disruption peak occurs"
                icon={Zap}
                glowColor="cyan"
              >
                <div className="space-y-3.5">
                  <div className="bg-[#0A1629] p-3 rounded border border-cyan-700/60">
                    <span className="text-[10px] font-mono-military text-cyan-400 uppercase font-bold block mb-1">
                      DIRECTIVE CODENAME:
                    </span>
                    <h4 className="text-xs font-bold text-slate-100">
                      {simulationResult.recommendedPlan.title}
                    </h4>
                    <p className="text-[11px] text-slate-300 mt-1">
                      {simulationResult.recommendedPlan.summary}
                    </p>
                  </div>

                  {/* Step-by-step actions */}
                  <div className="space-y-2">
                    <span className="text-[10px] font-mono-military text-slate-400 uppercase font-bold block">
                      PREVENTIVE ACTION CHECKLIST:
                    </span>
                    {simulationResult.recommendedPlan.actions.map((act, idx) => (
                      <div key={idx} className="bg-slate-900/60 p-2.5 rounded border border-slate-800 flex items-start gap-2.5 text-xs">
                        <span className="w-5 h-5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center justify-center shrink-0 font-mono-military text-[10px] font-bold">
                          0{idx + 1}
                        </span>
                        <span className="text-slate-300">{act}</span>
                      </div>
                    ))}
                  </div>

                  {/* Projected Risk Reduction & Commit Button */}
                  <div className="pt-2 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
                    <div className="font-mono-military text-xs">
                      <span className="text-slate-400 block text-[10px]">PROJECTED MITIGATION:</span>
                      <span className="text-emerald-400 font-bold">{simulationResult.recommendedPlan.riskReduction}</span>
                    </div>

                    <button
                      onClick={handleCommitPlan}
                      className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black px-4 py-2 rounded text-xs font-mono-military flex items-center gap-1.5 transition-colors cursor-pointer shadow-lg shadow-emerald-950"
                    >
                      {committedSuccess ? (
                        <>
                          <CheckCircle2 className="w-4 h-4 text-slate-950" />
                          <span>COMMITTED TO ACTION CENTER!</span>
                        </>
                      ) : (
                        <>
                          <Send className="w-3.5 h-3.5" />
                          <span>SEND DIRECTIVE TO ACTION CENTER</span>
                        </>
                      )}
                    </button>
                  </div>

                </div>
              </TacticalCard>
            </div>

          </div>

        </div>
      )}

    </div>
  );
};
