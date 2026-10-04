import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  THEATRES,
  SUPPLY_CLASSES,
  INITIAL_NODES,
  INITIAL_ROUTES,
  SIMULATION_SCENARIOS,
  INITIAL_RECOMMENDATIONS,
  INITIAL_AUDIT_LOGS,
  MOCK_OFFLINE_SYNC_QUEUE
} from '../data/mockData';

const AppContext = createContext(null);

export const AppProvider = ({ children }) => {
  // Authentication & Role State
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentUser, setCurrentUser] = useState({
    name: 'Col. Vikram Rathore, SM',
    serviceNo: 'IC-54892M',
    role: 'Logistics Officer', // 'Logistics Officer' | 'Command Reviewer' | 'Supply Manager' | 'Admin'
    clearance: 'SECRET // TACTICAL LEVEL 4',
    formation: 'HQ 14 Corps (Fire & Fury)',
    avatar: 'VR'
  });

  // Theatre & Operational State
  const [activeTheatre, setActiveTheatre] = useState('14-CORPS');
  const [isOffline, setIsOffline] = useState(false);
  const [offlineSyncQueue, setOfflineSyncQueue] = useState(MOCK_OFFLINE_SYNC_QUEUE);
  const [lastSyncTime, setLastSyncTime] = useState('04 OCT 2026 20:00 IST');
  const [ledgerRootHash, setLedgerRootHash] = useState('0x9a8f4c2e11dd55aa7e8a9f31c28b4c2e');

  // Core Logistics Data State
  const [nodes, setNodes] = useState(INITIAL_NODES);
  const [routes, setRoutes] = useState(INITIAL_ROUTES);
  const [recommendations, setRecommendations] = useState(INITIAL_RECOMMENDATIONS);
  const [auditLogs, setAuditLogs] = useState(INITIAL_AUDIT_LOGS);

  // UI Interactive States
  const [selectedNodeId, setSelectedNodeId] = useState('NODE-FW-01'); // default to Siachen Base
  const [digitalTwinViewMode, setDigitalTwinViewMode] = useState('graph'); // 'graph' | 'map'
  const [activeSupplyFilter, setActiveSupplyFilter] = useState('all');

  // Simulator State
  const [activeScenarioId, setActiveScenarioId] = useState('SCENARIO-ZOJILA');
  const [simulationHorizonDays, setSimulationHorizonDays] = useState(10);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simulationResult, setSimulationResult] = useState(null);
  const [customParams, setCustomParams] = useState({
    snowfallIntensity: 85,
    routeClosurePct: 95,
    demandMultiplier: 1.4,
    avalancheRisk: 'HIGH'
  });

  // Sound FX (Tactical Subtle Audio)
  const [soundEnabled, setSoundEnabled] = useState(false);

  // Play subtle tactical audio synth using Web Audio API
  const playTacticalSound = (type = 'click') => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);

      if (type === 'click') {
        osc.frequency.setValueAtTime(800, ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + 0.05);
        gain.gain.setValueAtTime(0.04, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.05);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } else if (type === 'approve') {
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        osc.frequency.setValueAtTime(780, ctx.currentTime + 0.08);
        osc.frequency.setValueAtTime(1040, ctx.currentTime + 0.16);
        gain.gain.setValueAtTime(0.06, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.3);
        osc.start();
        osc.stop(ctx.currentTime + 0.3);
      } else if (type === 'alarm') {
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(350, ctx.currentTime);
        osc.frequency.linearRampToValueAtTime(320, ctx.currentTime + 0.2);
        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.linearRampToValueAtTime(0, ctx.currentTime + 0.25);
        osc.start();
        osc.stop(ctx.currentTime + 0.25);
      }
    } catch (e) {
      console.warn('Audio synthesis not supported', e);
    }
  };

  // Helper to generate a realistic SHA256 hex string
  const generateHash = () => {
    const chars = '0123456789abcdef';
    let hash = '0x';
    for (let i = 0; i < 32; i++) {
      hash += chars[Math.floor(Math.random() * chars.length)];
    }
    return hash;
  };

  // Login handler
  const loginUser = (username, password, role) => {
    setIsAuthenticated(true);
    const roleMapping = {
      'Logistics Officer': { name: 'Col. Vikram Rathore, SM', serviceNo: 'IC-54892M', clearance: 'SECRET // TACTICAL LEVEL 4', formation: 'HQ 14 Corps (Fire & Fury)', avatar: 'VR' },
      'Command Reviewer': { name: 'Brig. S. K. Rawat, VSM', serviceNo: 'IC-48201K', clearance: 'TOP SECRET // THEATRE LEVEL 3', formation: 'Northern Command HQ, Udhampur', avatar: 'SR' },
      'Supply Manager': { name: 'Maj. Ananya Sen, ASC', serviceNo: 'SS-42981P', clearance: 'CONFIDENTIAL // INVENTORY LEVEL 2', formation: 'Leh Forward Depot (14 Corps)', avatar: 'AS' },
      'Admin': { name: 'Maj. Gen. Rajiv Sharma, AVSM', serviceNo: 'IC-39820A', clearance: 'DEFENCE STRATEGIC // CHIEF LOGISTICS', formation: 'Army Logistics Directorate, New Delhi', avatar: 'RS' }
    };
    setCurrentUser(roleMapping[role] || { name: username || 'Officer On Duty', serviceNo: 'IC-99214X', role, clearance: 'LEVEL 3 MIL-NET', formation: '14 Corps HQ', avatar: 'OD' });
    playTacticalSound('click');
  };

  const logoutUser = () => {
    setIsAuthenticated(false);
  };

  // Toggle Offline/Online mode
  const toggleOfflineMode = () => {
    const newOffline = !isOffline;
    setIsOffline(newOffline);
    playTacticalSound(newOffline ? 'alarm' : 'click');
  };

  // Trigger Mesh Sync
  const triggerMeshSync = () => {
    playTacticalSound('click');
    const newHash = generateHash();
    setLedgerRootHash(newHash);
    setLastSyncTime(new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit', second: '2-digit' }) + ' IST');
    setOfflineSyncQueue([]);
  };

  // Approve AI Recommendation
  const approveRecommendation = (recId, customNote = '') => {
    playTacticalSound('approve');
    const rec = recommendations.find(r => r.id === recId);
    if (!rec) return;

    // Update recommendation status
    setRecommendations(prev =>
      prev.map(r => r.id === recId ? { ...r, status: 'APPROVED', approvedAt: new Date().toISOString(), approvedBy: currentUser.name } : r)
    );

    // Apply positive resilience impact to affected node
    if (rec.where.includes('NODE-FW-01')) {
      boostNodeResilience('NODE-FW-01', 25, 20); // boost resilience +25, decrease risk -20
    } else if (rec.where.includes('NODE-FW-02')) {
      boostNodeResilience('NODE-FW-02', 28, 24);
    } else if (rec.where.includes('NODE-FW-04')) {
      boostNodeResilience('NODE-FW-04', 22, 18);
    } else if (rec.where.includes('NODE-FW-03')) {
      boostNodeResilience('NODE-FW-03', 20, 16);
    }

    // Add tamper-evident Audit Log entry
    const newHash = generateHash();
    const newLog = {
      id: `LOG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      istTimestamp: new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' IST',
      officer: currentUser.name,
      role: currentUser.role,
      action: 'APPROVED_AND_DISPATCHED',
      directiveId: `DIR-AUTH-${rec.id.slice(-4)}`,
      itemSummary: `Approved: ${rec.what} -> ${rec.headline}`,
      origin: rec.where.split('➔')[0]?.replace('Origin:', '').trim() || 'HQ Staging',
      destination: rec.where.split('➔')[1]?.replace('Destination:', '').trim() || 'Forward Post',
      blockHash: newHash,
      previousHash: ledgerRootHash,
      verificationStatus: 'VERIFIED_TAMPER_EVIDENT',
      syncStatus: isOffline ? 'QUEUED_FOR_MESH_SYNC' : 'COMMITTED_TO_SECURE_LEDGER'
    };

    setAuditLogs(prev => [newLog, ...prev]);
    setLedgerRootHash(newHash);

    if (isOffline) {
      setOfflineSyncQueue(prev => [
        {
          id: `SYNC-${Math.floor(10 + Math.random() * 90)}`,
          type: 'DIRECTIVE_APPROVAL',
          target: rec.id,
          payload: `Officer approved directive ${rec.id} offline`,
          queuedAt: new Date().toLocaleTimeString('en-IN') + ' IST',
          status: 'PENDING_MESH_SYNC'
        },
        ...prev
      ]);
    }
  };

  // Reject Recommendation
  const rejectRecommendation = (recId, reason = 'Operational override') => {
    playTacticalSound('alarm');
    setRecommendations(prev =>
      prev.map(r => r.id === recId ? { ...r, status: 'REJECTED', rejectionReason: reason, rejectedAt: new Date().toISOString(), rejectedBy: currentUser.name } : r)
    );

    const newHash = generateHash();
    const newLog = {
      id: `LOG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      istTimestamp: new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' IST',
      officer: currentUser.name,
      role: currentUser.role,
      action: 'DIRECTIVE_REJECTED_OVERRIDE',
      directiveId: `DIR-REJ-${recId.slice(-4)}`,
      itemSummary: `Overridden/Rejected: ${recId} - Reason: ${reason}`,
      origin: 'Field Command',
      destination: 'Logistics Decision Engine',
      blockHash: newHash,
      previousHash: ledgerRootHash,
      verificationStatus: 'VERIFIED_TAMPER_EVIDENT',
      syncStatus: isOffline ? 'QUEUED_FOR_MESH_SYNC' : 'COMMITTED_TO_SECURE_LEDGER'
    };

    setAuditLogs(prev => [newLog, ...prev]);
    setLedgerRootHash(newHash);
  };

  // Modify Recommendation Directive
  const modifyRecommendation = (recId, updatedPayload) => {
    playTacticalSound('approve');
    setRecommendations(prev =>
      prev.map(r => {
        if (r.id === recId) {
          return {
            ...r,
            status: 'APPROVED_MODIFIED',
            what: updatedPayload.what || r.what,
            howMuch: updatedPayload.howMuch || r.howMuch,
            when: updatedPayload.when || r.when,
            modifiedBy: currentUser.name,
            modifiedAt: new Date().toISOString()
          };
        }
        return r;
      })
    );

    const newHash = generateHash();
    const newLog = {
      id: `LOG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      timestamp: new Date().toISOString(),
      istTimestamp: new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' IST',
      officer: currentUser.name,
      role: currentUser.role,
      action: 'DIRECTIVE_MODIFIED_AND_DISPATCHED',
      directiveId: `DIR-MOD-${recId.slice(-4)}`,
      itemSummary: `Modified Directive: ${updatedPayload.what || recId} [Officer adjusted payload/units]`,
      origin: 'HQ Logistics Cell',
      destination: 'Forward Asset Command',
      blockHash: newHash,
      previousHash: ledgerRootHash,
      verificationStatus: 'VERIFIED_TAMPER_EVIDENT',
      syncStatus: isOffline ? 'QUEUED_FOR_MESH_SYNC' : 'COMMITTED_TO_SECURE_LEDGER'
    };

    setAuditLogs(prev => [newLog, ...prev]);
    setLedgerRootHash(newHash);
  };

  // Helper to boost a node's resilience score & reduce stockout risk
  const boostNodeResilience = (nodeId, resilienceDelta, riskReduction) => {
    setNodes(prev =>
      prev.map(node => {
        if (node.id === nodeId) {
          const newRes = Math.min(98, node.overallResilience + resilienceDelta);
          const newRisk = Math.max(8, node.stockoutRisk - riskReduction);
          const newStatus = newRes >= 80 ? 'Strong' : newRes >= 60 ? 'Stable' : newRes >= 40 ? 'Vulnerable' : 'Critical';
          return {
            ...node,
            overallResilience: newRes,
            resilienceStatus: newStatus,
            stockoutRisk: parseFloat(newRisk.toFixed(1)),
            criticalDaysRemaining: parseFloat((node.criticalDaysRemaining + 8.5).toFixed(1)),
            resilienceDimensions: {
              ...node.resilienceDimensions,
              inventory: Math.min(95, node.resilienceDimensions.inventory + 20),
              transport: Math.min(95, node.resilienceDimensions.transport + 15)
            }
          };
        }
        return node;
      })
    );
  };

  // Execute What-If Simulation
  const runSimulation = (scenarioId = activeScenarioId, durationDays = simulationHorizonDays, customOverrides = null) => {
    setIsSimulating(true);
    playTacticalSound('alarm');

    setTimeout(() => {
      const scenario = SIMULATION_SCENARIOS.find(s => s.id === scenarioId) || SIMULATION_SCENARIOS[0];
      const durationFactor = durationDays / 10;

      // Calculate dynamic impact based on duration & factors
      const calculatedImpact = scenario.projectedNodeImpact.map(impact => {
        const targetNode = nodes.find(n => n.id === impact.nodeId);
        const baselineRisk = targetNode ? targetNode.stockoutRisk : impact.initialRisk;
        const simRisk = Math.min(99.9, parseFloat((baselineRisk + (impact.simulatedRisk - impact.initialRisk) * durationFactor).toFixed(1)));
        const simDays = Math.max(0.3, parseFloat((impact.daysToStockout / durationFactor).toFixed(1)));
        return {
          ...impact,
          nodeName: targetNode ? targetNode.name : impact.nodeId,
          initialRisk: baselineRisk,
          simulatedRisk: simRisk,
          daysToStockout: simDays,
          delta: `+${(simRisk - baselineRisk).toFixed(1)}%`
        };
      });

      const result = {
        scenarioId: scenario.id,
        scenarioName: scenario.name,
        durationDays,
        runTimestamp: new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', hour: '2-digit', minute: '2-digit' }) + ' IST',
        affectedNodesCount: calculatedImpact.length,
        avgRiskEscalation: parseFloat((calculatedImpact.reduce((acc, curr) => acc + (curr.simulatedRisk - curr.initialRisk), 0) / calculatedImpact.length).toFixed(1)),
        projectedDelaysDays: Math.round(scenario.impactFactor.transportDelayDays * durationFactor),
        nodeImpacts: calculatedImpact,
        recommendedPlan: scenario.recommendedPlan,
        timeSeriesData: [
          { day: 'Day 0 (Now)', baseline: 45, withoutPrePositioning: 45, withSentinelLogix: 45 },
          { day: `Day ${Math.round(durationDays * 0.25)}`, baseline: 47, withoutPrePositioning: 64, withSentinelLogix: 42 },
          { day: `Day ${Math.round(durationDays * 0.5)}`, baseline: 50, withoutPrePositioning: 82, withSentinelLogix: 38 },
          { day: `Day ${Math.round(durationDays * 0.75)}`, baseline: 52, withoutPrePositioning: 93, withSentinelLogix: 31 },
          { day: `Day ${durationDays}`, baseline: 55, withoutPrePositioning: 98, withSentinelLogix: 25 }
        ]
      };

      setSimulationResult(result);
      setIsSimulating(false);
      playTacticalSound('click');

      // Add to audit log
      const newHash = generateHash();
      const newLog = {
        id: `LOG-2026-${Math.floor(1000 + Math.random() * 9000)}`,
        timestamp: new Date().toISOString(),
        istTimestamp: new Date().toLocaleString('en-IN', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' }) + ' IST',
        officer: currentUser.name,
        role: currentUser.role,
        action: 'SIMULATION_EXECUTED',
        directiveId: `SIM-${scenario.id.slice(-6)}-${durationDays}D`,
        itemSummary: `Executed What-If Simulation: ${scenario.name} (${durationDays} Days Horizon)`,
        origin: 'Tactical Simulator Core',
        destination: 'Northern Command Model Sandbox',
        blockHash: newHash,
        previousHash: ledgerRootHash,
        verificationStatus: 'VERIFIED_TAMPER_EVIDENT',
        syncStatus: isOffline ? 'QUEUED_FOR_MESH_SYNC' : 'COMMITTED_TO_SECURE_LEDGER'
      };

      setAuditLogs(prev => [newLog, ...prev]);
      setLedgerRootHash(newHash);
    }, 1200); // 1.2s realistic neural computation telemetry
  };

  // Convert Simulation Plan into a live Action Center Recommendation
  const commitSimulationPlanToActionCenter = (simulationPlan, scenarioName) => {
    playTacticalSound('approve');
    const newRecId = `REC-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const newRecommendation = {
      id: newRecId,
      urgency: 'IMMEDIATE',
      status: 'PENDING_APPROVAL',
      confidence: 95.8,
      headline: `Simulated Contingency Plan: ${simulationPlan.title}`,
      what: simulationPlan.actions[0] || 'Execute adaptive multi-axis pre-positioning',
      where: 'Origin: Pathankot/Leh Staging Hubs ➔ Destination: Forward Garrisons (Siachen, DBO, Kargil)',
      howMuch: simulationPlan.actions[1] || 'Heavy Tatra 8x8 convoys + Tactical Airlift',
      when: 'Immediate pre-emptive dispatch before disruption escalation',
      why: `${scenarioName} projected to cause severe stockout across 3 forward nodes. Pre-positioning averts critical operational failure.`,
      explainableFactors: [
        { name: 'Predicted Axis Cutoff Duration', value: 92, weightPercentage: 45, trend: 'Critical' },
        { name: 'Alternative Corridor Capacity (Shinku La)', value: 85, weightPercentage: 30, trend: 'Optimal' },
        { name: 'Mitigated Stockout Risk Margin', value: 78, weightPercentage: 25, trend: 'Strong' }
      ],
      impactSummary: {
        initialStockoutRisk: 88.5,
        postApprovalStockoutRisk: simulationPlan.mitigatedRiskScore || 28.0,
        daysSaved: 16.0,
        readinessGain: simulationPlan.riskReduction || '+72% Risk Reduction'
      },
      suggestedBy: 'What-If Neural Resilience Simulator',
      auditRef: generateHash()
    };

    setRecommendations(prev => [newRecommendation, ...prev]);
    return newRecId;
  };

  // Computed summary metrics for Command Center
  const criticalCount = nodes.filter(n => n.resilienceStatus === 'Critical').length;
  const highRiskCount = nodes.filter(n => n.resilienceStatus === 'Vulnerable' || (n.stockoutRisk > 60 && n.resilienceStatus !== 'Critical')).length;
  const stableCount = nodes.filter(n => n.resilienceStatus === 'Stable').length;
  const strongCount = nodes.filter(n => n.resilienceStatus === 'Strong').length;
  const averageNetworkHealth = Math.round(nodes.reduce((acc, curr) => acc + curr.overallResilience, 0) / nodes.length);

  return (
    <AppContext.Provider
      value={{
        isAuthenticated,
        currentUser,
        loginUser,
        logoutUser,
        activeTheatre,
        setActiveTheatre,
        isOffline,
        toggleOfflineMode,
        offlineSyncQueue,
        lastSyncTime,
        ledgerRootHash,
        triggerMeshSync,
        nodes,
        routes,
        selectedNodeId,
        setSelectedNodeId,
        digitalTwinViewMode,
        setDigitalTwinViewMode,
        activeSupplyFilter,
        setActiveSupplyFilter,
        recommendations,
        approveRecommendation,
        rejectRecommendation,
        modifyRecommendation,
        auditLogs,
        activeScenarioId,
        setActiveScenarioId,
        simulationHorizonDays,
        setSimulationHorizonDays,
        isSimulating,
        simulationResult,
        customParams,
        setCustomParams,
        runSimulation,
        commitSimulationPlanToActionCenter,
        soundEnabled,
        setSoundEnabled,
        playTacticalSound,
        criticalCount,
        highRiskCount,
        stableCount,
        strongCount,
        averageNetworkHealth
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
