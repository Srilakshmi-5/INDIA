import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Shield, CheckCircle2, Lock, X, Key, ArrowRight } from 'lucide-react';
import confetti from 'canvas-confetti';

export const ApprovalModal = ({ recommendation, onClose, onConfirm }) => {
  const { currentUser, playTacticalSound } = useApp();
  const [pin, setPin] = useState('5489');
  const [customNote, setCustomNote] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  if (!recommendation) return null;

  const handleApprove = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    playTacticalSound('approve');

    try {
      confetti({
        particleCount: 50,
        spread: 60,
        origin: { y: 0.7 }
      });
    } catch (err) {
      // ignore
    }

    setTimeout(() => {
      onConfirm(recommendation.id, customNote);
      setIsProcessing(false);
      onClose();
    }, 500);
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0C1527] border border-cyan-500/60 rounded-lg max-w-lg w-full p-6 text-slate-100 hud-bracket shadow-2xl space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            <h3 className="text-sm font-bold font-mono-military uppercase tracking-wider text-slate-100">
              OFFICIAL CONTINGENCY DISPATCH AUTHORIZATION
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 hover:text-slate-200 cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Directive Summary */}
        <div className="bg-slate-900/80 p-3.5 rounded border border-slate-800 space-y-2 text-xs font-mono-military">
          <div>
            <span className="text-slate-500 text-[10px] block uppercase">DIRECTIVE CODENAME:</span>
            <span className="text-slate-200 font-bold">{recommendation.headline}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 text-[11px] pt-1 border-t border-slate-800/80">
            <div>
              <span className="text-slate-500 block text-[10px]">AUTHORIZED ASSETS:</span>
              <span className="text-cyan-300">{recommendation.howMuch}</span>
            </div>
            <div>
              <span className="text-slate-500 block text-[10px]">TIME WINDOW:</span>
              <span className="text-amber-300">{recommendation.when.split('(')[0]}</span>
            </div>
          </div>
        </div>

        {/* Security Signature & Verification */}
        <form onSubmit={handleApprove} className="space-y-3 font-mono-military text-xs">
          <div>
            <label className="block text-slate-300 text-[11px] uppercase mb-1">
              COMMANDING OFFICER PIN (DIGITAL SIGNATURE):
            </label>
            <div className="relative">
              <input
                type="password"
                value={pin}
                onChange={(e) => setPin(e.target.value)}
                className="w-full bg-[#080E1A] border border-slate-700 rounded px-3 py-2 text-xs text-slate-100 font-mono-military focus:outline-none focus:border-cyan-400"
                placeholder="Enter 4-digit token PIN"
                required
              />
              <Lock className="w-4 h-4 text-slate-500 absolute right-3 top-2.5" />
            </div>
          </div>

          <div>
            <label className="block text-slate-300 text-[11px] uppercase mb-1">
              OPERATIONAL LOG / REMARKS (OPTIONAL):
            </label>
            <input
              type="text"
              value={customNote}
              onChange={(e) => setCustomNote(e.target.value)}
              className="w-full bg-[#080E1A] border border-slate-700 rounded px-3 py-2 text-xs text-slate-100 font-mono-military focus:outline-none focus:border-cyan-400"
              placeholder="e.g. Priority convoy clearance issued via BRO Beacon"
            />
          </div>

          <div className="text-[10px] text-slate-400 bg-slate-900/60 p-2 rounded border border-slate-800 flex items-center justify-between">
            <span>OFFICER ON RECORD:</span>
            <span className="text-slate-200 font-bold">{currentUser.name} ({currentUser.role})</span>
          </div>

          <div className="pt-2 flex items-center justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 text-xs cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isProcessing}
              className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black px-4 py-2 rounded text-xs flex items-center gap-1.5 transition-colors cursor-pointer shadow-lg shadow-emerald-950"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>{isProcessing ? 'COMMITTING TO DEFENCE LEDGER...' : 'SIGN & DISPATCH DIRECTIVE'}</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
