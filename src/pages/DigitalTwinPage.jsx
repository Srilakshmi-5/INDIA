import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { NetworkGraphView } from '../components/digitalTwin/NetworkGraphView';
import { GeoSpatialMapView } from '../components/digitalTwin/GeoSpatialMapView';
import { NodeDetailDrawer } from '../components/digitalTwin/NodeDetailDrawer';
import { 
  Network, 
  Map, 
  AlertTriangle, 
  Flame, 
  Crosshair, 
  HeartPulse, 
  Shield, 
  Radio, 
  Info,
  ExternalLink
} from 'lucide-react';
import { Badge } from '../components/common/Badge';

export const DigitalTwinPage = ({ onNavigateTab }) => {
  const { 
    nodes, 
    selectedNodeId, 
    setSelectedNodeId, 
    digitalTwinViewMode, 
    setDigitalTwinViewMode, 
    approveRecommendation,
    setActiveScenarioId,
    criticalCount,
    highRiskCount,
    playTacticalSound
  } = useApp();

  const [isDrawerOpen, setIsDrawerOpen] = useState(true);

  const selectedNode = nodes.find(n => n.id === selectedNodeId) || nodes[0];

  const handleSelectNode = (nodeId) => {
    setSelectedNodeId(nodeId);
    setIsDrawerOpen(true);
  };

  const handleLaunchSimulation = (nodeId) => {
    // If Siachen or DBO, select relevant scenario
    if (nodeId === 'NODE-FW-01') {
      setActiveScenarioId('SCENARIO-BLIZZARD');
    } else if (nodeId === 'NODE-FW-02') {
      setActiveScenarioId('SCENARIO-BRIDGE-FAILURE');
    } else {
      setActiveScenarioId('SCENARIO-ZOJILA');
    }
    onNavigateTab('what-if');
  };

  const handleApproveAction = (recId) => {
    approveRecommendation(recId);
    onNavigateTab('action-center');
  };

  return (
    <div className="space-y-4 max-w-7xl mx-auto">
      
      {/* Top Banner & View Switcher */}
      <div className="bg-[#0C1424] border border-slate-800 p-4 rounded flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono-military uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
              STAR FEATURE: FORWARD LOGISTICS DIGITAL TWIN
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400 font-mono-military text-xs flex items-center gap-1 font-semibold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping"></span>
              LIVING PREDICTIVE MODEL (NOT A STATIC DASHBOARD)
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-black text-slate-100 tracking-wide">
            TACTICAL MULTI-TIER NETWORK DIGITAL TWIN &amp; REAL-TIME HEALTH MATRIX
          </h2>
          <p className="text-xs text-slate-400">
            Continuously ingesting forward consumption rates, mountain pass weather indices, and road conditions to simulate supply chain vulnerabilities.
          </p>
        </div>

        {/* View Toggle Buttons */}
        <div className="flex items-center gap-2 bg-slate-900/90 p-1 rounded border border-slate-800">
          <button
            onClick={() => {
              setDigitalTwinViewMode('graph');
              playTacticalSound('click');
            }}
            className={`px-3 py-1.5 rounded text-xs font-mono-military font-bold flex items-center gap-2 transition-all cursor-pointer ${
              digitalTwinViewMode === 'graph'
                ? 'bg-cyan-600 text-slate-950 shadow-md shadow-cyan-950'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>TACTICAL NETWORK GRAPH</span>
          </button>

          <button
            onClick={() => {
              setDigitalTwinViewMode('map');
              playTacticalSound('click');
            }}
            className={`px-3 py-1.5 rounded text-xs font-mono-military font-bold flex items-center gap-2 transition-all cursor-pointer ${
              digitalTwinViewMode === 'map'
                ? 'bg-cyan-600 text-slate-950 shadow-md shadow-cyan-950'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            <Map className="w-3.5 h-3.5" />
            <span>GEO-SPATIAL TERRAIN RADAR</span>
          </button>
        </div>
      </div>

      {/* Main View Area */}
      <div className="relative">
        {digitalTwinViewMode === 'graph' ? (
          <NetworkGraphView onSelectNode={handleSelectNode} />
        ) : (
          <GeoSpatialMapView onSelectNode={handleSelectNode} />
        )}

        {/* Sliding Node Detail Drawer */}
        {isDrawerOpen && (
          <NodeDetailDrawer
            node={selectedNode}
            onClose={() => setIsDrawerOpen(false)}
            onLaunchSimulation={handleLaunchSimulation}
            onApproveAction={handleApproveAction}
          />
        )}
      </div>

      {/* Re-open drawer button if closed */}
      {!isDrawerOpen && selectedNode && (
        <button
          onClick={() => {
            setIsDrawerOpen(true);
            playTacticalSound('click');
          }}
          className="fixed bottom-6 right-6 bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold px-4 py-2.5 rounded shadow-2xl flex items-center gap-2 text-xs font-mono-military z-40 cursor-pointer"
        >
          <span>INSPECT SELECTED NODE ({selectedNode.name})</span>
        </button>
      )}

    </div>
  );
};
