import React from 'react';
import { useApp } from '../../context/AppContext';
import { WifiOff, RefreshCw, Database, ShieldAlert, Cpu } from 'lucide-react';

export const OfflineBanner = () => {
  const { isOffline, offlineSyncQueue, lastSyncTime, ledgerRootHash, triggerMeshSync } = useApp();

  if (!isOffline) return null;

  return (
    <div className="bg-amber-950/90 border-b border-amber-600 text-amber-200 px-4 py-2 flex flex-wrap items-center justify-between gap-3 text-xs font-mono-military">
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 font-bold text-amber-300">
          <WifiOff className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>TACTICAL FIELD MESH ACTIVE (OFFLINE CONTINUITY MODE)</span>
        </div>
        <span className="text-amber-700 hidden sm:inline">|</span>
        <div className="text-amber-200/90 hidden md:flex items-center gap-2">
          <span>PENDING TRANSACTIONS:</span>
          <span className="bg-amber-900 px-2 py-0.5 rounded text-amber-300 font-bold border border-amber-700">
            {offlineSyncQueue.length} QUEUED
          </span>
        </div>
        <span className="text-amber-700 hidden sm:inline">|</span>
        <div className="text-amber-300/80 hidden lg:inline">
          LOCAL LEDGER HASH: <span className="text-cyan-300">{ledgerRootHash.slice(0, 16)}...</span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <span className="text-amber-300/70 text-[11px]">
          LAST VALIDATED SYNC: {lastSyncTime}
        </span>
        <button
          onClick={triggerMeshSync}
          className="bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold px-3 py-1 rounded text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          <span>FORCE MESH RESYNC</span>
        </button>
      </div>
    </div>
  );
};
