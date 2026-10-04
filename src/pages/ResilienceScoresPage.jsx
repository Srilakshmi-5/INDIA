import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldAlert, 
  ShieldCheck, 
  BarChart3, 
  Radar, 
  Filter, 
  ArrowUpDown, 
  CheckCircle2, 
  AlertTriangle,
  ArrowRight,
  TrendingDown,
  Layers,
  Thermometer,
  Truck,
  Activity,
  MapPin
} from 'lucide-react';
import { 
  RadarChart, 
  PolarGrid, 
  PolarAngleAxis, 
  PolarRadiusAxis, 
  Radar as RechartsRadar, 
  ResponsiveContainer, 
  Legend, 
  Tooltip 
} from 'recharts';
import { TacticalCard } from '../components/common/TacticalCard';
import { Badge } from '../components/common/Badge';

export const ResilienceScoresPage = ({ onNavigateTab }) => {
  const { nodes, setSelectedNodeId, playTacticalSound } = useApp();

  const [sortField, setSortField] = useState('overallResilience'); // 'overallResilience' | 'inventory' | 'weather' | 'route'
  const [sortAsc, setSortAsc] = useState(true); // ascending = most vulnerable first
  const [filterStatus, setFilterStatus] = useState('ALL');
  const [comparisonNode1, setComparisonNode1] = useState('NODE-FW-01'); // Siachen
  const [comparisonNode2, setComparisonNode2] = useState('NODE-CP-01'); // Pathankot

  // Filter and sort nodes
  const filteredNodes = nodes.filter(n => {
    if (filterStatus !== 'ALL' && n.resilienceStatus !== filterStatus) return false;
    return true;
  }).sort((a, b) => {
    let valA, valB;
    if (sortField === 'overallResilience') {
      valA = a.overallResilience;
      valB = b.overallResilience;
    } else {
      valA = a.resilienceDimensions[sortField];
      valB = b.resilienceDimensions[sortField];
    }
    return sortAsc ? valA - valB : valB - valA;
  });

  // Prepare Radar chart comparison data
  const n1 = nodes.find(n => n.id === comparisonNode1) || nodes[0];
  const n2 = nodes.find(n => n.id === comparisonNode2) || nodes[1];

  const radarData = [
    { subject: 'Inventory Buffer', node1: n1.resilienceDimensions.inventory, node2: n2.resilienceDimensions.inventory, fullMark: 100 },
    { subject: 'Transport Mobility', node1: n1.resilienceDimensions.transport, node2: n2.resilienceDimensions.transport, fullMark: 100 },
    { subject: 'Weather Tolerance', node1: n1.resilienceDimensions.weather, node2: n2.resilienceDimensions.weather, fullMark: 100 },
    { subject: 'Demand Surge Buff', node1: n1.resilienceDimensions.demand, node2: n2.resilienceDimensions.demand, fullMark: 100 },
    { subject: 'Route Redundancy', node1: n1.resilienceDimensions.route, node2: n2.resilienceDimensions.route, fullMark: 100 }
  ];

  const handleInspectNode = (nodeId) => {
    setSelectedNodeId(nodeId);
    playTacticalSound('click');
    onNavigateTab('digital-twin');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Banner */}
      <div className="bg-[#0C1527] border-l-4 border-emerald-500 border-y border-r border-slate-800 p-4 rounded flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono-military uppercase px-2 py-0.5 rounded bg-emerald-950 text-emerald-300 border border-emerald-800 font-bold">
              MULTI-DIMENSIONAL RESILIENCE MATRIX
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-cyan-400 font-mono-military text-xs flex items-center gap-1 font-semibold">
              DYNAMIC 5-PILLAR RESILIENCE SCORING
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-black text-slate-100 tracking-wide">
            LOGISTICS FORMATION RESILIENCE PROFILES &amp; VULNERABILITY RANKING
          </h2>
          <p className="text-xs text-slate-300 max-w-3xl">
            Calculated across five fundamental defense resilience dimensions: Inventory Buffer, Fleet Transport, Sub-zero Weather Tolerance, Tactical Demand Surge, and Alternative Route Redundancy.
          </p>
        </div>

        <div className="text-right font-mono-military text-xs text-slate-400 hidden sm:block">
          <div>ALGORITHM: <span className="text-emerald-400 font-bold">ResilienceIndex-v2</span></div>
          <div>UPDATED: <span className="text-cyan-300 font-bold">Real-Time Sensor Telemetry</span></div>
        </div>
      </div>

      {/* Radar Comparison Card */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Radar Chart (5 cols) */}
        <div className="lg:col-span-5">
          <TacticalCard
            title="COMPARATIVE 5-PILLAR RADAR PROFILE"
            subtitle="Benchmark any two forward formations side-by-side"
            icon={Radar}
          >
            {/* Node Selectors */}
            <div className="grid grid-cols-2 gap-2 mb-3 font-mono-military text-xs">
              <div>
                <label className="text-[10px] text-rose-400 uppercase font-bold block mb-1">FORMATION A (RED):</label>
                <select
                  value={comparisonNode1}
                  onChange={(e) => setComparisonNode1(e.target.value)}
                  className="w-full bg-[#080E1A] border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none"
                >
                  {nodes.map(n => (
                    <option key={n.id} value={n.id}>{n.name}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-[10px] text-cyan-400 uppercase font-bold block mb-1">FORMATION B (CYAN):</label>
                <select
                  value={comparisonNode2}
                  onChange={(e) => setComparisonNode2(e.target.value)}
                  className="w-full bg-[#080E1A] border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none"
                >
                  {nodes.map(n => (
                    <option key={n.id} value={n.id}>{n.name}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Radar Diagram */}
            <div className="h-64 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="75%" data={radarData}>
                  <PolarGrid stroke="#334155" />
                  <PolarAngleAxis dataKey="subject" stroke="#94A3B8" tick={{ fill: '#94A3B8', fontSize: 10 }} />
                  <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" tick={{ fill: '#64748B', fontSize: 9 }} />
                  <RechartsRadar
                    name={n1.name}
                    dataKey="node1"
                    stroke="#EF4444"
                    fill="#EF4444"
                    fillOpacity={0.35}
                  />
                  <RechartsRadar
                    name={n2.name}
                    dataKey="node2"
                    stroke="#06B6D4"
                    fill="#06B6D4"
                    fillOpacity={0.35}
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: '#0B1222', borderColor: '#334155', borderRadius: '4px', color: '#F1F5F9', fontSize: '11px' }}
                  />
                  <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '8px' }} />
                </RadarChart>
              </ResponsiveContainer>
            </div>

            <div className="mt-2 pt-2 border-t border-slate-800 text-[11px] font-mono-military text-slate-400 flex justify-between">
              <span>{n1.name}: <strong className="text-rose-400">{n1.overallResilience}/100</strong></span>
              <span>{n2.name}: <strong className="text-cyan-400">{n2.overallResilience}/100</strong></span>
            </div>
          </TacticalCard>
        </div>

        {/* 5 Pillars Explanation & Defense Definition (7 cols) */}
        <div className="lg:col-span-7 space-y-3">
          <TacticalCard
            title="THE FIVE PILLARS OF FORWARD SUPPLY RESILIENCE"
            subtitle="Scientific mathematical weights derived from high-altitude operational parameters"
            icon={Layers}
          >
            <div className="space-y-3 font-mono-military text-xs">
              <div className="bg-slate-900/70 p-2.5 rounded border border-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  1
                </span>
                <div>
                  <div className="text-slate-100 font-bold flex items-center gap-2">
                    <span>INVENTORY RESILIENCE (WEIGHT: 25%)</span>
                    <span className="text-[10px] text-slate-500">Days of Supply Buffer</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-sans">
                    Evaluates forward stockpiles against projected burn rates under extreme cold weather (-35°C heater consumption).
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/70 p-2.5 rounded border border-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  2
                </span>
                <div>
                  <div className="text-slate-100 font-bold flex items-center gap-2">
                    <span>TRANSPORT RESILIENCE (WEIGHT: 20%)</span>
                    <span className="text-[10px] text-slate-500">Fleet &amp; Aviation Assets</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-sans">
                    Availability of Tatra 8x8 heavy-mobility vehicles, Chinook external sling capacity, and IAF C-130J airdrop slots.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/70 p-2.5 rounded border border-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  3
                </span>
                <div>
                  <div className="text-slate-100 font-bold flex items-center gap-2">
                    <span>WEATHER RESILIENCE (WEIGHT: 25%)</span>
                    <span className="text-[10px] text-slate-500">Snow &amp; Avalanche Tolerance</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-sans">
                    Vulnerability to blizzard whiteouts, high-altitude crosswinds &gt;45kt, and seasonal freeze of mountain passes.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/70 p-2.5 rounded border border-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  4
                </span>
                <div>
                  <div className="text-slate-100 font-bold flex items-center gap-2">
                    <span>DEMAND RESILIENCE (WEIGHT: 15%)</span>
                    <span className="text-[10px] text-slate-500">Readiness Escalation Buffer</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-sans">
                    Capacity to absorb unexpected troop surges or artillery expenditure spikes without triggering immediate stockouts.
                  </p>
                </div>
              </div>

              <div className="bg-slate-900/70 p-2.5 rounded border border-slate-800 flex items-start gap-3">
                <span className="w-6 h-6 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 flex items-center justify-center font-bold text-xs shrink-0 mt-0.5">
                  5
                </span>
                <div>
                  <div className="text-slate-100 font-bold flex items-center gap-2">
                    <span>ROUTE RESILIENCE (WEIGHT: 15%)</span>
                    <span className="text-[10px] text-slate-500">Alternative Bypass Corridors</span>
                  </div>
                  <p className="text-[11px] text-slate-400 mt-0.5 font-sans">
                    Existence of dual-axis bypass options (e.g. Manali-Shinku La axis versus Srinagar-Zojila single road dependency).
                  </p>
                </div>
              </div>
            </div>
          </TacticalCard>
        </div>

      </div>

      {/* Comprehensive Formation Resilience Matrix Table */}
      <TacticalCard
        title="ALL-FORMATION RESILIENCE MATRIX & VULNERABILITY RANKING"
        subtitle="Rank formations to identify where preventive pre-positioning produces the highest operational return"
        icon={ShieldCheck}
      >
        {/* Table Filters & Sorting */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-4 font-mono-military text-xs">
          <div className="flex items-center gap-2">
            <span className="text-slate-400">FILTER STATUS:</span>
            <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded border border-slate-800">
              {['ALL', 'Critical', 'Vulnerable', 'Stable', 'Strong'].map(s => (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`px-2 py-0.5 rounded text-[10px] font-bold cursor-pointer ${
                    filterStatus === s ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60' : 'text-slate-400 hover:text-slate-200'
                  }`}
                >
                  {s.toUpperCase()}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-slate-400">SORT BY PILLAR:</span>
            <select
              value={sortField}
              onChange={(e) => setSortField(e.target.value)}
              className="bg-[#080E1A] border border-slate-700 rounded px-2 py-1 text-slate-200 text-xs focus:outline-none"
            >
              <option value="overallResilience">Overall Composite Resilience</option>
              <option value="inventory">Inventory Resilience</option>
              <option value="transport">Transport Resilience</option>
              <option value="weather">Weather Resilience</option>
              <option value="demand">Demand Resilience</option>
              <option value="route">Route Resilience</option>
            </select>

            <button
              onClick={() => setSortAsc(!sortAsc)}
              className="px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded flex items-center gap-1 text-xs cursor-pointer"
            >
              <ArrowUpDown className="w-3.5 h-3.5" />
              <span>{sortAsc ? 'Asc (Most Vulnerable)' : 'Desc (Strongest)'}</span>
            </button>
          </div>
        </div>

        {/* Dense Military Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono-military text-xs">
            <thead className="bg-[#09101F] text-slate-400 border-b border-slate-800 text-[10px] uppercase">
              <tr>
                <th className="py-2.5 px-3">Formation / Node</th>
                <th className="py-2.5 px-2">Tier &amp; Type</th>
                <th className="py-2.5 px-2 text-center">Status</th>
                <th className="py-2.5 px-2 text-center">Overall</th>
                <th className="py-2.5 px-2">Inventory (25%)</th>
                <th className="py-2.5 px-2">Transport (20%)</th>
                <th className="py-2.5 px-2">Weather (25%)</th>
                <th className="py-2.5 px-2">Demand (15%)</th>
                <th className="py-2.5 px-2">Route (15%)</th>
                <th className="py-2.5 px-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredNodes.map(node => (
                <tr 
                  key={node.id}
                  className="hover:bg-slate-900/60 transition-colors group"
                >
                  <td className="py-3 px-3">
                    <div className="font-bold text-slate-100 flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                      <span>{node.name}</span>
                    </div>
                    <div className="text-[10px] text-slate-400">{node.code} • Elev: {node.elevation}</div>
                  </td>

                  <td className="py-3 px-2">
                    <span className="text-[10px] text-slate-300 font-bold block">{node.type}</span>
                    <span className="text-[9px] text-slate-500">Tier {node.tier}</span>
                  </td>

                  <td className="py-3 px-2 text-center">
                    <Badge status={node.resilienceStatus} text={node.resilienceStatus} size="sm" />
                  </td>

                  <td className="py-3 px-2 text-center">
                    <span className={`text-sm font-black ${
                      node.overallResilience < 40 ? 'text-rose-400' :
                      node.overallResilience < 60 ? 'text-amber-400' :
                      node.overallResilience < 80 ? 'text-cyan-400' : 'text-emerald-400'
                    }`}>
                      {node.overallResilience}
                    </span>
                    <span className="text-[9px] text-slate-500 block">/100</span>
                  </td>

                  {/* Individual 5 Pillars with Mini Bars */}
                  <td className="py-3 px-2">
                    <div className="flex justify-between text-[11px] mb-0.5">
                      <span className="font-bold text-slate-300">{node.resilienceDimensions.inventory}%</span>
                    </div>
                    <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${node.resilienceDimensions.inventory < 50 ? 'bg-rose-500' : 'bg-cyan-500'}`} style={{ width: `${node.resilienceDimensions.inventory}%` }}></div>
                    </div>
                  </td>

                  <td className="py-3 px-2">
                    <div className="flex justify-between text-[11px] mb-0.5">
                      <span className="font-bold text-slate-300">{node.resilienceDimensions.transport}%</span>
                    </div>
                    <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${node.resilienceDimensions.transport < 50 ? 'bg-rose-500' : 'bg-cyan-500'}`} style={{ width: `${node.resilienceDimensions.transport}%` }}></div>
                    </div>
                  </td>

                  <td className="py-3 px-2">
                    <div className="flex justify-between text-[11px] mb-0.5">
                      <span className="font-bold text-slate-300">{node.resilienceDimensions.weather}%</span>
                    </div>
                    <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${node.resilienceDimensions.weather < 50 ? 'bg-rose-500' : 'bg-cyan-500'}`} style={{ width: `${node.resilienceDimensions.weather}%` }}></div>
                    </div>
                  </td>

                  <td className="py-3 px-2">
                    <div className="flex justify-between text-[11px] mb-0.5">
                      <span className="font-bold text-slate-300">{node.resilienceDimensions.demand}%</span>
                    </div>
                    <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${node.resilienceDimensions.demand < 50 ? 'bg-amber-500' : 'bg-emerald-500'}`} style={{ width: `${node.resilienceDimensions.demand}%` }}></div>
                    </div>
                  </td>

                  <td className="py-3 px-2">
                    <div className="flex justify-between text-[11px] mb-0.5">
                      <span className="font-bold text-slate-300">{node.resilienceDimensions.route}%</span>
                    </div>
                    <div className="w-16 h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full ${node.resilienceDimensions.route < 50 ? 'bg-rose-500' : 'bg-emerald-500'}`} style={{ width: `${node.resilienceDimensions.route}%` }}></div>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => handleInspectNode(node.id)}
                      className="text-cyan-400 hover:text-cyan-300 hover:underline flex items-center gap-1 ml-auto text-[11px] cursor-pointer"
                    >
                      <span>Digital Twin</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TacticalCard>

    </div>
  );
};
