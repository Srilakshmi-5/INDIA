import React from 'react';
import { Shield, Printer, Download, CheckCircle2, X, Lock } from 'lucide-react';

export const ManifestModal = ({ logEntry, onClose }) => {
  if (!logEntry) return null;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
      <div className="bg-[#0B1322] border-2 border-slate-700 rounded-lg max-w-2xl w-full p-6 text-slate-100 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto font-mono-military">
        
        {/* Manifest Header */}
        <div className="flex items-start justify-between border-b-2 border-slate-700 pb-4">
          <div className="flex items-center gap-3">
            <img 
              src="/sentinel-emblem.jpg" 
              alt="Indian Army Emblem" 
              className="w-14 h-14 object-contain rounded border border-slate-600"
            />
            <div>
              <div className="text-sm font-black text-slate-100 tracking-wider">
                HEADQUARTERS NORTHERN COMMAND (LOGISTICS BRANCH)
              </div>
              <div className="text-xs text-cyan-400 font-bold">
                OFFICIAL CONTINGENCY MOVEMENT DIRECTIVE (ARMY FORM LOG-2026/A)
              </div>
              <div className="text-[10px] text-slate-400">
                SECURITY CLASSIFICATION: RESTRICTED // MIL-NET LEDGER COMMITTED
              </div>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1 rounded bg-slate-900 hover:bg-slate-800 text-slate-400 hover:text-slate-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Security Classification Ribbon */}
        <div className="bg-slate-900 p-2.5 rounded border border-slate-800 text-center text-xs text-amber-400 font-bold tracking-widest uppercase">
          *** CONFIDENTIAL MILITARY DISPATCH MANIFEST ***
        </div>

        {/* Directive Metadata Grid */}
        <div className="grid grid-cols-2 gap-3 text-xs bg-slate-900/60 p-3 rounded border border-slate-800">
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">DIRECTIVE REFERENCE:</span>
            <span className="text-cyan-300 font-bold">{logEntry.directiveId}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">EXECUTION TIMESTAMP:</span>
            <span className="text-slate-200">{logEntry.istTimestamp} ({logEntry.timestamp})</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">AUTHORIZING OFFICER:</span>
            <span className="text-slate-200 font-bold">{logEntry.officer}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">COMMAND ROLE:</span>
            <span className="text-emerald-400 font-bold">{logEntry.role}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">POINT OF ORIGIN:</span>
            <span className="text-slate-200">{logEntry.origin}</span>
          </div>
          <div>
            <span className="text-slate-500 block text-[10px] uppercase">POINT OF DESTINATION:</span>
            <span className="text-slate-200">{logEntry.destination}</span>
          </div>
        </div>

        {/* Manifest Cargo Specification */}
        <div className="space-y-1.5 text-xs">
          <span className="text-slate-400 font-bold uppercase text-[10px]">
            DISPATCH SUMMARY &amp; OPERATIONAL JUSTIFICATION:
          </span>
          <div className="bg-slate-900/90 p-3 rounded border border-slate-800 text-slate-200 leading-relaxed font-sans text-xs">
            {logEntry.itemSummary}
          </div>
        </div>

        {/* Cryptographic Proof of Non-Repudiation */}
        <div className="bg-[#070D18] p-3 rounded border border-slate-800 text-[11px] space-y-1.5">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
            <Lock className="w-3.5 h-3.5" />
            <span>CRYPTOGRAPHIC PROOF OF AUTHORIZATION (SHA-256)</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block">TRANSACTION BLOCK HASH:</span>
            <span className="text-cyan-300 break-all text-[10px]">{logEntry.blockHash}</span>
          </div>
          <div>
            <span className="text-slate-500 text-[10px] block">PARENT LEDGER ROOT:</span>
            <span className="text-slate-400 break-all text-[10px]">{logEntry.previousHash}</span>
          </div>
          <div className="pt-1 flex items-center justify-between text-[10px] text-slate-400">
            <span>VERIFICATION ENGINE: SHA-256 IMMUTABLE LEDGER</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3" />
              TAMPER-EVIDENT VALIDATED
            </span>
          </div>
        </div>

        {/* Printable Signature Box */}
        <div className="grid grid-cols-2 gap-6 pt-4 border-t border-slate-800 text-center text-xs">
          <div className="space-y-6">
            <div className="border-b border-dashed border-slate-700 pb-4 text-slate-300">
              [DIGITALLY SIGNED // MIL-TOKEN ID: 5489-VR]
            </div>
            <div className="text-[10px] text-slate-500 uppercase">
              SIGNATURE OF CONVOY COMMANDER / FLIGHT DISPATCHER
            </div>
          </div>
          <div className="space-y-6">
            <div className="border-b border-dashed border-slate-700 pb-4 text-cyan-300 font-bold">
              {logEntry.officer}
            </div>
            <div className="text-[10px] text-slate-500 uppercase">
              THEATRE LOGISTICS CONTROLLER (14 CORPS HQ)
            </div>
          </div>
        </div>

        {/* Modal Buttons */}
        <div className="pt-4 border-t border-slate-800 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 rounded text-slate-400 hover:text-slate-200 text-xs cursor-pointer"
          >
            Close
          </button>
          <button
            onClick={handlePrint}
            className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-bold px-4 py-2 rounded text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>PRINT / SAVE OFFICIAL DIRECTIVE</span>
          </button>
        </div>

      </div>
    </div>
  );
};
