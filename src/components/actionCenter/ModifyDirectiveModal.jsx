import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Edit3, CheckCircle2, X } from 'lucide-react';

export const ModifyDirectiveModal = ({ recommendation, onClose, onConfirm }) => {
  const { playTacticalSound } = useApp();
  const [what, setWhat] = useState(recommendation?.what || '');
  const [howMuch, setHowMuch] = useState(recommendation?.howMuch || '');
  const [when, setWhen] = useState(recommendation?.when || '');

  if (!recommendation) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    playTacticalSound('approve');
    onConfirm(recommendation.id, { what, howMuch, when });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-[#0C1527] border border-cyan-500/60 rounded-lg max-w-lg w-full p-6 text-slate-100 hud-bracket shadow-2xl space-y-4">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2">
            <Edit3 className="w-4 h-4 text-cyan-400" />
            <h3 className="text-sm font-bold font-mono-military uppercase tracking-wider text-slate-100">
              MODIFY DIRECTIVE PAYLOAD &amp; ASSETS
            </h3>
          </div>
          <button onClick={onClose} className="text-slate-400 hover:text-slate-200 cursor-pointer">
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-3 font-mono-military text-xs">
          <div>
            <label className="block text-slate-300 text-[11px] uppercase mb-1">
              COMMODITY &amp; QUANTITY (WHAT):
            </label>
            <textarea
              rows={2}
              value={what}
              onChange={(e) => setWhat(e.target.value)}
              className="w-full bg-[#080E1A] border border-slate-700 rounded px-3 py-2 text-xs text-slate-100 font-mono-military focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-slate-300 text-[11px] uppercase mb-1">
              TRANSPORT VEHICLES &amp; AIR ASSETS (HOW MUCH):
            </label>
            <input
              type="text"
              value={howMuch}
              onChange={(e) => setHowMuch(e.target.value)}
              className="w-full bg-[#080E1A] border border-slate-700 rounded px-3 py-2 text-xs text-slate-100 font-mono-military focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div>
            <label className="block text-slate-300 text-[11px] uppercase mb-1">
              EXECUTION WINDOW (WHEN):
            </label>
            <input
              type="text"
              value={when}
              onChange={(e) => setWhen(e.target.value)}
              className="w-full bg-[#080E1A] border border-slate-700 rounded px-3 py-2 text-xs text-slate-100 font-mono-military focus:outline-none focus:border-cyan-400"
            />
          </div>

          <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3 py-2 rounded text-slate-400 hover:text-slate-200 hover:bg-slate-800 text-xs cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black px-4 py-2 rounded text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>SAVE MODIFICATIONS &amp; DISPATCH</span>
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
