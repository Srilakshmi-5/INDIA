import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, 
  ShieldCheck, 
  Lock, 
  Search, 
  Filter, 
  Download, 
  Printer, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle,
  ExternalLink,
  WifiOff,
  Cpu,
  Share2
} from 'lucide-react';
import { ManifestModal } from '../components/auditLog/ManifestModal';
import { TacticalCard } from '../components/common/TacticalCard';
import { Badge } from '../components/common/Badge';

export const AuditLogPage = () => {
  const { 
    auditLogs, 
    offlineSyncQueue, 
    isOffline, 
    lastSyncTime, 
    ledgerRootHash, 
    triggerMeshSync,
    playTacticalSound
  } = useApp();

  const [searchTerm, setSearchTerm] = useState('');
  const [filterAction, setFilterAction] = useState('ALL');
  const [selectedLogForManifest, setSelectedLogForManifest] = useState(null);

  const filteredLogs = auditLogs.filter(log => {
    if (filterAction !== 'ALL' && log.action !== filterAction) return false;
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      const matchOfficer = log.officer.toLowerCase().includes(term);
      const matchDirective = log.directiveId.toLowerCase().includes(term);
      const matchSummary = log.itemSummary.toLowerCase().includes(term);
      return matchOfficer || matchDirective || matchSummary;
    }
    return true;
  });

  const getActionBadge = (action) => {
    switch (action) {
      case 'APPROVED_AND_DISPATCHED':
        return <span className="bg-emerald-950 text-emerald-300 border border-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold">DISPATCHED</span>;
      case 'DIRECTIVE_MODIFIED_AND_DISPATCHED':
        return <span className="bg-cyan-950 text-cyan-300 border border-cyan-700 px-2 py-0.5 rounded text-[10px] font-bold">MODIFIED &amp; DISPATCHED</span>;
      case 'SIMULATION_EXECUTED':
        return <span className="bg-amber-950 text-amber-300 border border-amber-700 px-2 py-0.5 rounded text-[10px] font-bold">SIMULATION RUN</span>;
      case 'DIRECTIVE_REJECTED_OVERRIDE':
        return <span className="bg-rose-950 text-rose-300 border border-rose-800 px-2 py-0.5 rounded text-[10px] font-bold">OVERRIDDEN / REJECTED</span>;
      default:
        return <span className="bg-slate-900 text-slate-300 border border-slate-700 px-2 py-0.5 rounded text-[10px] font-bold">{action}</span>;
    }
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Banner */}
      <div className="bg-[#0C1527] border-l-4 border-cyan-400 border-y border-r border-slate-800 p-4 rounded flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono-military uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
              TAMPER-EVIDENT DEFENCE AUDIT LEDGER
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400 font-mono-military text-xs flex items-center gap-1 font-semibold">
              <Lock className="w-3.5 h-3.5" />
              CRYPTOGRAPHIC CHAIN INTEGRITY (SHA-256)
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-black text-slate-100 tracking-wide">
            FORWARD LOGISTICS PROVENANCE &amp; OFFLINE MESH SYNCHRONIZATION
          </h2>
          <p className="text-xs text-slate-300 max-w-3xl">
            Immutable chain-of-custody recording every officer approval, directive modification, what-if stress simulation, and field mesh synchronization event.
          </p>
        </div>

        <div className="text-right font-mono-military text-xs text-slate-400 hidden sm:block">
          <div>ROOT HASH: <span className="text-cyan-300 font-bold">{ledgerRootHash.slice(0, 16)}...</span></div>
          <div>STATUS: <span className="text-emerald-400 font-bold">100% VERIFIED</span></div>
        </div>
      </div>

      {/* Offline Mesh Status & Local Queue Summary (if any) */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 font-mono-military text-xs">
        
        {/* Ledger State Card (6 cols) */}
        <div className="md:col-span-6 bg-[#0B1324] border border-slate-800 p-3.5 rounded flex items-center justify-between hud-bracket">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded bg-emerald-950 border border-emerald-700 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">IMMUTABLE BLOCK CHAIN: ACTIVE</div>
              <div className="text-[10px] text-slate-400">Total Validated Directives: {auditLogs.length} Entries</div>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 block">LAST AUDITED TIMESTAMP:</span>
            <span className="text-slate-200 font-bold text-[11px]">{lastSyncTime}</span>
          </div>
        </div>

        {/* Tactical Mesh Queue Card (6 cols) */}
        <div className="md:col-span-6 bg-[#0B1324] border border-slate-800 p-3.5 rounded flex items-center justify-between hud-bracket">
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded flex items-center justify-center border ${
              isOffline ? 'bg-amber-950 border-amber-600 text-amber-400 animate-pulse' : 'bg-slate-900 border-slate-700 text-cyan-400'
            }`}>
              {isOffline ? <WifiOff className="w-5 h-5" /> : <RefreshCw className="w-5 h-5" />}
            </div>
            <div>
              <div className="text-xs font-bold text-slate-200">
                {isOffline ? 'TACTICAL EDGE MESH (OFFLINE)' : 'SATCOM MIL-NET SYNCED'}
              </div>
              <div className="text-[10px] text-slate-400">
                {offlineSyncQueue.length} Pending Local Ledger Transactions
              </div>
            </div>
          </div>

          <button
            onClick={() => {
              playTacticalSound('click');
              triggerMeshSync();
            }}
            className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold px-3 py-1.5 rounded text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>TRIGGER MESH RESYNC</span>
          </button>
        </div>

      </div>

      {/* Filter and Search Bar */}
      <div className="bg-[#0A101E] border border-slate-800 p-3 rounded flex flex-wrap items-center justify-between gap-3 text-xs font-mono-military">
        <div className="flex flex-wrap items-center gap-3">
          {/* Search Input */}
          <div className="relative">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search officer, directive ID, or commodity..."
              className="bg-[#080E1A] border border-slate-700 rounded pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-cyan-400 w-64"
            />
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-2.5" />
          </div>

          {/* Action Filter */}
          <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded border border-slate-800">
            {['ALL', 'APPROVED_AND_DISPATCHED', 'SIMULATION_EXECUTED', 'DIRECTIVE_REJECTED_OVERRIDE'].map(act => (
              <button
                key={act}
                onClick={() => setFilterAction(act)}
                className={`px-2 py-1 rounded text-[10px] font-bold cursor-pointer transition-colors ${
                  filterAction === act ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {act === 'ALL' ? 'ALL EVENTS' : act.replace(/_/g, ' ')}
              </button>
            ))}
          </div>
        </div>

        <div className="text-slate-400 text-[11px]">
          Showing {filteredLogs.length} Immutable Log Blocks
        </div>
      </div>

      {/* Tamper-Evident Ledger Table */}
      <TacticalCard
        title="IMMUTABLE DISPATCH LEDGER & CHAIN OF CUSTODY"
        subtitle="Cryptographically verified SHA-256 transactions with non-repudiation proof"
        icon={FileText}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-left font-mono-military text-xs">
            <thead className="bg-[#09101F] text-slate-400 border-b border-slate-800 text-[10px] uppercase">
              <tr>
                <th className="py-2.5 px-3">Log / Block ID</th>
                <th className="py-2.5 px-2">Timestamp (IST)</th>
                <th className="py-2.5 px-2">Authorizing Officer</th>
                <th className="py-2.5 px-2">Action Type</th>
                <th className="py-2.5 px-3">Directive Summary</th>
                <th className="py-2.5 px-2">Cryptographic Hash</th>
                <th className="py-2.5 px-3 text-right">Official Manifest</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredLogs.map(log => (
                <tr key={log.id} className="hover:bg-slate-900/60 transition-colors group">
                  <td className="py-3 px-3">
                    <div className="text-slate-200 font-bold">{log.id}</div>
                    <div className="text-[10px] text-cyan-400 font-bold">{log.directiveId}</div>
                  </td>

                  <td className="py-3 px-2 whitespace-nowrap text-slate-300">
                    <div>{log.istTimestamp}</div>
                    <div className="text-[10px] text-slate-500">{log.timestamp.slice(11, 19)}Z</div>
                  </td>

                  <td className="py-3 px-2">
                    <div className="text-slate-100 font-bold">{log.officer}</div>
                    <div className="text-[10px] text-slate-400">{log.role}</div>
                  </td>

                  <td className="py-3 px-2">
                    {getActionBadge(log.action)}
                  </td>

                  <td className="py-3 px-3 text-slate-300 max-w-xs font-sans text-xs">
                    <div className="truncate font-semibold text-slate-200">{log.itemSummary}</div>
                    <div className="text-[10px] font-mono-military text-slate-500">
                      {log.origin} &rarr; {log.destination}
                    </div>
                  </td>

                  <td className="py-3 px-2">
                    <div className="text-[10px] text-slate-400 max-w-[120px] truncate" title={log.blockHash}>
                      <span className="text-cyan-400">{log.blockHash.slice(0, 10)}...</span>
                    </div>
                    <div className="text-[9px] text-emerald-400 flex items-center gap-1 mt-0.5">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      <span>Tamper-Proof</span>
                    </div>
                  </td>

                  <td className="py-3 px-3 text-right">
                    <button
                      onClick={() => {
                        setSelectedLogForManifest(log);
                        playTacticalSound('click');
                      }}
                      className="bg-slate-800 hover:bg-slate-700 text-cyan-300 hover:text-cyan-200 px-2.5 py-1 rounded text-[11px] border border-slate-700 hover:border-cyan-500 flex items-center gap-1.5 ml-auto transition-colors cursor-pointer"
                    >
                      <Printer className="w-3 h-3" />
                      <span>Army Manifest</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </TacticalCard>

      {/* Official Manifest Modal */}
      {selectedLogForManifest && (
        <ManifestModal
          logEntry={selectedLogForManifest}
          onClose={() => setSelectedLogForManifest(null)}
        />
      )}

    </div>
  );
};
