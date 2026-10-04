import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckSquare, 
  CheckCircle2, 
  XCircle, 
  Edit3, 
  AlertTriangle, 
  TrendingDown, 
  Shield, 
  Clock, 
  ArrowRight, 
  Info,
  Filter,
  Flame,
  Crosshair,
  ExternalLink,
  ChevronDown
} from 'lucide-react';
import { ApprovalModal } from '../components/actionCenter/ApprovalModal';
import { ModifyDirectiveModal } from '../components/actionCenter/ModifyDirectiveModal';
import { TacticalCard } from '../components/common/TacticalCard';
import { Badge } from '../components/common/Badge';

export const ActionCenterPage = ({ onNavigateTab }) => {
  const {
    recommendations,
    approveRecommendation,
    rejectRecommendation,
    modifyRecommendation,
    playTacticalSound
  } = useApp();

  const [filterUrgency, setFilterUrgency] = useState('ALL'); // 'ALL' | 'IMMEDIATE' | 'NEXT_24H' | 'CONTINGENCY'
  const [filterStatus, setFilterStatus] = useState('ALL');   // 'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'
  
  const [activeModalRec, setActiveModalRec] = useState(null);
  const [modalType, setModalType] = useState(null); // 'APPROVE' | 'MODIFY' | 'REJECT'
  const [rejectReason, setRejectReason] = useState('');

  const filteredRecommendations = recommendations.filter(rec => {
    if (filterUrgency !== 'ALL' && rec.urgency !== filterUrgency) return false;
    if (filterStatus === 'PENDING' && rec.status !== 'PENDING_APPROVAL') return false;
    if (filterStatus === 'APPROVED' && rec.status !== 'APPROVED' && rec.status !== 'APPROVED_MODIFIED') return false;
    if (filterStatus === 'REJECTED' && rec.status !== 'REJECTED') return false;
    return true;
  });

  const pendingCount = recommendations.filter(r => r.status === 'PENDING_APPROVAL').length;
  const approvedCount = recommendations.filter(r => r.status === 'APPROVED' || r.status === 'APPROVED_MODIFIED').length;

  const handleOpenApproveModal = (rec) => {
    setActiveModalRec(rec);
    setModalType('APPROVE');
    playTacticalSound('click');
  };

  const handleOpenModifyModal = (rec) => {
    setActiveModalRec(rec);
    setModalType('MODIFY');
    playTacticalSound('click');
  };

  const handleOpenRejectModal = (rec) => {
    setActiveModalRec(rec);
    setModalType('REJECT');
    playTacticalSound('alarm');
  };

  const handleConfirmReject = (e) => {
    e.preventDefault();
    if (!activeModalRec) return;
    rejectRecommendation(activeModalRec.id, rejectReason || 'Officer Tactical Discretion');
    setActiveModalRec(null);
    setModalType(null);
    setRejectReason('');
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      
      {/* Top Header Banner */}
      <div className="bg-[#0C1527] border-l-4 border-cyan-400 border-y border-r border-slate-800 p-4 rounded flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[10px] font-mono-military uppercase px-2 py-0.5 rounded bg-cyan-950 text-cyan-300 border border-cyan-800 font-bold">
              HUMAN-IN-THE-LOOP AI DECISION ENGINE
            </span>
            <span className="text-slate-600">|</span>
            <span className="text-emerald-400 font-mono-military text-xs flex items-center gap-1 font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5" />
              AI RECOMMENDS &rarr; HUMAN APPROVES
            </span>
          </div>
          <h2 className="text-base sm:text-lg font-black text-slate-100 tracking-wide">
            ACTION CENTER: CONTINGENCY DIRECTIVES &amp; EXPLAINABLE DISPATCHES
          </h2>
          <p className="text-xs text-slate-300 max-w-3xl">
            Each recommendation delivers the defence-grade 5W breakdown (What, Where, How Much, When, Why) with model confidence, SHAP attribution, and instant cryptographic audit synchronization.
          </p>
        </div>

        {/* Quick Summary Counts */}
        <div className="flex items-center gap-3 font-mono-military text-xs">
          <div className="bg-rose-950/80 border border-rose-800 px-3 py-1.5 rounded text-rose-300 font-bold">
            {pendingCount} PENDING ACTIONS
          </div>
          <div className="bg-emerald-950/80 border border-emerald-800 px-3 py-1.5 rounded text-emerald-300 font-bold">
            {approvedCount} DISPATCHED
          </div>
        </div>
      </div>

      {/* Filter Ribbon */}
      <div className="bg-[#0A101E] border border-slate-800 p-3 rounded flex flex-wrap items-center justify-between gap-3 text-xs font-mono-military">
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-1.5 text-slate-400 font-bold">
            <Filter className="w-3.5 h-3.5 text-cyan-400" />
            <span>URGENCY:</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded border border-slate-800">
            {['ALL', 'IMMEDIATE', 'NEXT_24H', 'CONTINGENCY'].map(u => (
              <button
                key={u}
                onClick={() => setFilterUrgency(u)}
                className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                  filterUrgency === u ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {u}
              </button>
            ))}
          </div>

          <span className="text-slate-700 hidden sm:inline">|</span>

          <div className="flex items-center gap-1.5 text-slate-400 font-bold">
            <span>STATUS:</span>
          </div>
          <div className="flex items-center gap-1 bg-slate-900 p-0.5 rounded border border-slate-800">
            {['ALL', 'PENDING', 'APPROVED', 'REJECTED'].map(s => (
              <button
                key={s}
                onClick={() => setFilterStatus(s)}
                className={`px-2.5 py-1 rounded text-[11px] font-bold cursor-pointer transition-colors ${
                  filterStatus === s ? 'bg-cyan-950 text-cyan-300 border border-cyan-700/60' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        <div className="text-slate-400 text-[11px]">
          Showing {filteredRecommendations.length} Directives
        </div>
      </div>

      {/* Recommendations Cards Grid */}
      <div className="space-y-4">
        {filteredRecommendations.map(rec => {
          const isPending = rec.status === 'PENDING_APPROVAL';
          const isApproved = rec.status === 'APPROVED' || rec.status === 'APPROVED_MODIFIED';
          const isRejected = rec.status === 'REJECTED';

          return (
            <div
              key={rec.id}
              className={`bg-[#0C1424] border rounded-lg p-5 transition-all hud-bracket ${
                isApproved
                  ? 'border-emerald-700/70 bg-[#09151D]'
                  : isRejected
                  ? 'border-slate-800 opacity-60'
                  : 'border-slate-800 hover:border-cyan-500/50 shadow-xl'
              }`}
            >
              {/* Header Ribbon of the Recommendation */}
              <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-800/80">
                <div className="flex items-center gap-2.5">
                  <span className={`text-[10px] font-mono-military uppercase font-bold px-2 py-0.5 rounded border ${
                    rec.urgency === 'IMMEDIATE' ? 'bg-rose-950 text-rose-300 border-rose-800 animate-pulse' :
                    rec.urgency === 'NEXT_24H' ? 'bg-amber-950 text-amber-300 border-amber-800' :
                    'bg-slate-900 text-slate-300 border-slate-700'
                  }`}>
                    {rec.urgency} PRIORITY
                  </span>

                  <span className="text-xs font-mono-military text-slate-400">
                    ID: <strong className="text-slate-200">{rec.id}</strong>
                  </span>

                  <span className="text-slate-600 hidden sm:inline">•</span>

                  <span className="text-xs font-mono-military text-slate-400">
                    CONFIDENCE: <strong className="text-cyan-300">{rec.confidence}%</strong>
                  </span>
                </div>

                {/* Status Badge */}
                <div>
                  {isApproved && (
                    <span className="text-xs font-mono-military uppercase font-bold px-2.5 py-1 rounded bg-emerald-950 text-emerald-300 border border-emerald-700 flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>{rec.status === 'APPROVED_MODIFIED' ? 'APPROVED (MODIFIED)' : 'DISPATCH AUTHORIZED'}</span>
                    </span>
                  )}
                  {isRejected && (
                    <span className="text-xs font-mono-military uppercase font-bold px-2.5 py-1 rounded bg-rose-950 text-rose-300 border border-rose-800 flex items-center gap-1.5">
                      <XCircle className="w-3.5 h-3.5" />
                      <span>REJECTED / OVERRIDDEN</span>
                    </span>
                  )}
                  {isPending && (
                    <span className="text-xs font-mono-military uppercase font-bold px-2.5 py-1 rounded bg-amber-950 text-amber-300 border border-amber-700">
                      PENDING OFFICER SIGNATURE
                    </span>
                  )}
                </div>
              </div>

              {/* Title & Core Headline */}
              <div className="my-3">
                <h3 className="text-sm sm:text-base font-bold text-slate-100 flex items-center gap-2">
                  {rec.headline}
                </h3>
              </div>

              {/* 5W MILITARY BREAKDOWN GRID (WHAT | WHERE | HOW MUCH | WHEN) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 font-mono-military text-xs my-3 bg-[#080E1B] p-3.5 rounded border border-slate-800">
                {/* WHAT */}
                <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800/80">
                  <span className="text-cyan-400 font-bold text-[10px] block uppercase tracking-wider mb-0.5">
                    [WHAT] COMMODITY &amp; VOLUME:
                  </span>
                  <span className="text-slate-100 font-semibold">{rec.what}</span>
                </div>

                {/* WHERE */}
                <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800/80">
                  <span className="text-cyan-400 font-bold text-[10px] block uppercase tracking-wider mb-0.5">
                    [WHERE] LOGISTICS CORRIDOR:
                  </span>
                  <span className="text-slate-100 font-semibold">{rec.where}</span>
                </div>

                {/* HOW MUCH */}
                <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800/80">
                  <span className="text-amber-400 font-bold text-[10px] block uppercase tracking-wider mb-0.5">
                    [HOW MUCH] VEHICLE &amp; AIR ASSETS:
                  </span>
                  <span className="text-slate-200">{rec.howMuch}</span>
                </div>

                {/* WHEN */}
                <div className="bg-slate-900/60 p-2.5 rounded border border-slate-800/80">
                  <span className="text-amber-400 font-bold text-[10px] block uppercase tracking-wider mb-0.5">
                    [WHEN] OPERATIONAL EXECUTION SLOT:
                  </span>
                  <span className="text-slate-200">{rec.when}</span>
                </div>
              </div>

              {/* WHY: Explainable AI Rationale & SHAP Feature Percentages */}
              <div className="space-y-2 my-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-mono-military uppercase font-bold text-slate-300 flex items-center gap-1.5">
                    <Info className="w-3.5 h-3.5 text-cyan-400" />
                    <span>[WHY] EXPLAINABLE AI REASONING &amp; FEATURE CONTRIBUTIONS</span>
                  </span>
                  <span className="text-[10px] font-mono-military text-slate-500">
                    Source: {rec.suggestedBy}
                  </span>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed bg-[#0B1324] p-3 rounded border border-slate-800/80">
                  {rec.why}
                </p>

                {/* Explainable Factor Percentage Bars */}
                {rec.explainableFactors && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2 pt-1 font-mono-military text-[11px]">
                    {rec.explainableFactors.map(ef => (
                      <div key={ef.name} className="bg-slate-900/80 p-2 rounded border border-slate-800">
                        <div className="flex justify-between text-slate-400 text-[10px] mb-1">
                          <span className="truncate pr-1">{ef.name}</span>
                          <span className="text-rose-400 font-bold">{ef.weightPercentage}% weight</span>
                        </div>
                        <div className="w-full h-1 bg-slate-800 rounded-full overflow-hidden">
                          <div className="h-full bg-rose-500 rounded-full" style={{ width: `${ef.weightPercentage * 2}%` }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Bottom Impact Summary & Action Buttons */}
              <div className="pt-3 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs">
                {/* Risk Mitigation Delta */}
                <div className="flex items-center gap-2 font-mono-military text-emerald-400 text-xs">
                  <TrendingDown className="w-4 h-4 text-emerald-400" />
                  <span>
                    Mitigates Stockout Risk: <strong className="text-slate-200">{rec.impactSummary.initialStockoutRisk}%</strong> &rarr; <strong className="text-emerald-300 font-bold">{rec.impactSummary.postApprovalStockoutRisk}%</strong> ({rec.impactSummary.readinessGain})
                  </span>
                </div>

                {/* Interactive Action Controls */}
                {isPending && (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleOpenRejectModal(rec)}
                      className="px-3 py-1.5 rounded text-rose-400 hover:text-rose-300 hover:bg-rose-950/40 border border-rose-900 text-xs font-mono-military cursor-pointer transition-colors"
                    >
                      Reject / Override
                    </button>

                    <button
                      onClick={() => handleOpenModifyModal(rec)}
                      className="px-3 py-1.5 rounded text-cyan-300 hover:text-cyan-200 hover:bg-cyan-950/40 border border-cyan-800 text-xs font-mono-military flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Edit3 className="w-3 h-3" />
                      <span>Modify Directive</span>
                    </button>

                    <button
                      onClick={() => handleOpenApproveModal(rec)}
                      className="bg-emerald-600 hover:bg-emerald-500 text-slate-950 font-black px-4 py-2 rounded text-xs font-mono-military flex items-center gap-1.5 transition-colors cursor-pointer shadow-lg shadow-emerald-950"
                    >
                      <CheckCircle2 className="w-4 h-4" />
                      <span>APPROVE &amp; DISPATCH</span>
                    </button>
                  </div>
                )}

                {/* Metadata on approved items */}
                {isApproved && (
                  <div className="text-[11px] font-mono-military text-slate-400 flex items-center gap-3">
                    <span>Approved by: <strong className="text-slate-200">{rec.approvedBy || 'Logistics Officer'}</strong></span>
                    <span>•</span>
                    <button
                      onClick={() => onNavigateTab('audit-log')}
                      className="text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                    >
                      <span>Inspect Tamper-Evident Ledger</span>
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                )}
              </div>

            </div>
          );
        })}
      </div>

      {/* Approval Modal */}
      {modalType === 'APPROVE' && activeModalRec && (
        <ApprovalModal
          recommendation={activeModalRec}
          onClose={() => {
            setActiveModalRec(null);
            setModalType(null);
          }}
          onConfirm={(recId, note) => approveRecommendation(recId, note)}
        />
      )}

      {/* Modify Directive Modal */}
      {modalType === 'MODIFY' && activeModalRec && (
        <ModifyDirectiveModal
          recommendation={activeModalRec}
          onClose={() => {
            setActiveModalRec(null);
            setModalType(null);
          }}
          onConfirm={(recId, payload) => modifyRecommendation(recId, payload)}
        />
      )}

      {/* Reject Modal */}
      {modalType === 'REJECT' && activeModalRec && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-[#0C1527] border border-rose-500/60 rounded-lg max-w-md w-full p-6 text-slate-100 hud-bracket shadow-2xl space-y-4">
            <div className="flex items-center gap-2 text-rose-400 font-bold font-mono-military text-sm border-b border-slate-800 pb-2">
              <AlertTriangle className="w-4 h-4" />
              <span>COMMAND OVERRIDE / REJECTION JUSTIFICATION</span>
            </div>

            <p className="text-xs text-slate-300">
              In accordance with Defence Audit Guidelines, rejecting an AI Predictive Directive requires an operational justification to be stamped onto the immutable ledger.
            </p>

            <form onSubmit={handleConfirmReject} className="space-y-3 font-mono-military text-xs">
              <div>
                <label className="block text-slate-400 text-[10px] uppercase mb-1">
                  REJECTION REASON / REMARKS:
                </label>
                <textarea
                  rows={3}
                  value={rejectReason}
                  onChange={(e) => setRejectReason(e.target.value)}
                  className="w-full bg-[#080E1A] border border-slate-700 rounded p-2 text-xs text-slate-100 focus:outline-none focus:border-rose-400"
                  placeholder="e.g. Weather window already collapsed; delaying until 0600Z or diverting via alternate air detachment."
                  required
                />
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => {
                    setActiveModalRec(null);
                    setModalType(null);
                  }}
                  className="px-3 py-1.5 rounded text-slate-400 hover:text-slate-200 text-xs cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-rose-600 hover:bg-rose-500 text-white font-bold px-3 py-1.5 rounded text-xs cursor-pointer"
                >
                  Confirm Operational Override
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
