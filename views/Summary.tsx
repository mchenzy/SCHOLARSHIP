import React, { useState } from 'react';
import { ApplicationData, CHECKLIST_ITEMS, AppStep } from '../types';
import { Button } from '../components/Button';
import { generateSummaryText, downloadPDF, countWords } from '../utils';
import { 
  Copy, Download, RefreshCw, Check, BadgeCheck, ClipboardCheck, Info, 
  Sparkles, ListChecks, CheckCircle2, AlertCircle, Edit3
} from 'lucide-react';

interface SummaryProps {
  data: ApplicationData;
  onRestart: () => void;
  onEditStep: (step: AppStep) => void;
}

export const Summary: React.FC<SummaryProps> = ({ data, onRestart, onEditStep }) => {
  const [copied, setCopied] = useState(false);
  const [checklist, setChecklist] = useState<boolean[]>(new Array(CHECKLIST_ITEMS.length).fill(false));

  const toggleCheck = (index: number) => {
    const newCheck = [...checklist];
    newCheck[index] = !newCheck[index];
    setChecklist(newCheck);
  };

  const summaryText = generateSummaryText(data);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summaryText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleDownloadPDF = () => {
    downloadPDF(data);
  };

  const getSignalStatus = (text: string, ideal: number) => {
    const words = countWords(text);
    if (words === 0) return { status: "Incomplete", color: "text-slate-400", icon: AlertCircle };
    if (words > ideal) return { status: "Expand Detail", color: "text-blue-300", icon: Info };
    if (words < ideal / 4) return { status: "Needs Clarity", color: "text-slate-300", icon: Info };
    return { status: "Clear", color: "text-emerald-400", icon: CheckCircle2 };
  };

  const SignalModule = ({ title, text, ideal, works, improve, step }: any) => {
    const sig = getSignalStatus(text, ideal);
    const SigIcon = sig.icon;
    
    return (
      <div className="space-y-4 mb-10 last:mb-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <h4 className="text-[10px] font-extrabold uppercase tracking-[0.2em] text-white">{title}</h4>
            <div className={`flex items-center gap-1 text-[9px] font-bold uppercase ${sig.color} bg-white/5 px-2 py-0.5 rounded-full border border-white/5`}>
              <SigIcon className="w-2.5 h-2.5" /> {sig.status}
            </div>
          </div>
          <button 
            onClick={() => onEditStep(step)}
            className="text-[9px] font-bold text-slate-400 hover:text-emerald-400 flex items-center gap-1 transition-colors uppercase tracking-[0.15em]"
          >
            <Edit3 className="w-3 h-3" /> Edit
          </button>
        </div>
        
        <div className="bg-brand-black/30 p-5 rounded-2xl border border-white/5">
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed italic font-bold">"{text || 'Not provided.'}"</p>
        </div>
        
        <div className="grid grid-cols-1 gap-3 pt-1">
          <div className="flex gap-3 text-emerald-400 bg-emerald-500/5 p-3 rounded-xl border border-emerald-500/10">
            <Check className="w-3.5 h-3.5 shrink-0 mt-0.5" /> 
            <div className="space-y-1">
              <span className="block text-emerald-200 font-extrabold uppercase text-[8px] tracking-widest">Strength</span>
              <p className="text-[10px] font-bold leading-relaxed">{works}</p>
            </div>
          </div>
          <div className="flex gap-3 text-slate-100 bg-blue-500/5 p-3 rounded-xl border border-blue-500/10">
            <Info className="w-3.5 h-3.5 shrink-0 mt-0.5 text-blue-300" /> 
            <div className="space-y-1">
              <span className="block text-blue-200 font-extrabold uppercase text-[8px] tracking-widest">Refine</span>
              <p className="text-[10px] font-bold leading-relaxed">{improve}</p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full max-w-3xl mx-auto flex flex-col space-y-10 sm:space-y-12 px-6 sm:px-0 pb-20 page-transition">
      
      <div className="text-center space-y-5 pt-8 sm:pt-6">
        <div className="inline-flex items-center justify-center p-4 bg-emerald-500/5 border border-emerald-500/10 rounded-3xl mb-1 shadow-lg relative">
            <BadgeCheck className="w-12 h-12 sm:w-16 sm:h-16 text-emerald-400 relative z-10" />
            <div className="absolute inset-0 bg-emerald-500/10 blur-xl rounded-full"></div>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">Draft Finalized</h2>
        <div className="bg-white/5 border border-white/10 px-5 py-4 rounded-2xl max-w-md mx-auto">
          <p className="text-xs sm:text-sm text-white font-bold leading-relaxed">
            This summary connects your responses to common reviewer priorities. Use the signals below to refine your narrative.
          </p>
        </div>
      </div>

      {/* Signal Analysis - Priority on Mobile */}
      <div className="glass-card rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 relative">
        <div className="flex items-center gap-3 mb-8 sm:mb-12">
          <div className="p-2.5 bg-blue-500/10 rounded-xl border border-blue-500/20">
             <ListChecks className="w-6 h-6 text-blue-400" />
          </div>
          <h3 className="font-extrabold text-xl sm:text-2xl text-white tracking-tight">Signal Analysis</h3>
        </div>

        <SignalModule 
          title="Alignment" 
          text={data.alignment} 
          ideal={40}
          works="Links your focus to the body's mission"
          improve="Identify a specific problem area for strength"
          step={AppStep.ALIGNMENT}
        />
        
        <div className="h-px bg-white/10 my-10" />
        
        <SignalModule 
          title="Achievement" 
          text={`${data.achievement.role}: ${data.achievement.action}. Result: ${data.achievement.outcome}`}
          ideal={50}
          works="Separates duty from measurable impact"
          improve="Add a concrete number to anchor the result"
          step={AppStep.ACHIEVEMENT}
        />

        <div className="h-px bg-white/10 my-10" />

        <SignalModule 
          title="Future Intent" 
          text={data.intent} 
          ideal={70}
          works="Direction post-graduation is identifiable"
          improve="Identifying a specific skill gap adds maturity"
          step={AppStep.INTENT}
        />
      </div>

      {/* Reflection Checklist */}
      <div className="glass-card rounded-3xl sm:rounded-[2.5rem] p-6 sm:p-10 relative overflow-hidden group">
        <div className="flex items-center gap-4 mb-8">
          <div className="p-2.5 bg-emerald-500/10 rounded-xl border border-emerald-500/20">
             <ClipboardCheck className="w-6 h-6 text-emerald-400" />
          </div>
          <h3 className="font-extrabold text-xl sm:text-2xl text-white tracking-tight">Self-Reflection</h3>
        </div>
        
        <div className="space-y-3">
          {CHECKLIST_ITEMS.map((item, idx) => (
            <label key={idx} className={`flex items-start gap-4 p-5 rounded-2xl border transition-all duration-300 cursor-pointer ${checklist[idx] ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-white/5 border-white/5'}`}>
              <div className={`mt-0.5 w-6 h-6 rounded-lg border-2 flex items-center justify-center shrink-0 ${checklist[idx] ? 'bg-emerald-500 border-emerald-500 text-white' : 'border-slate-700 bg-brand-black/40'}`}>
                {checklist[idx] && <Check className="w-3.5 h-3.5" strokeWidth={4} />}
              </div>
              <input 
                type="checkbox" 
                checked={checklist[idx]} 
                onChange={() => toggleCheck(idx)}
                className="hidden"
              />
              <span className={`text-xs leading-relaxed font-bold transition-colors ${checklist[idx] ? 'text-white' : 'text-slate-300'}`}>
                {item}
              </span>
            </label>
          ))}
        </div>
      </div>

      {/* Structured Summary Preview */}
      <div className="glass-card rounded-3xl sm:rounded-[2.5rem] overflow-hidden relative">
        <div className="bg-white/5 border-b border-white/10 p-6 sm:p-10 flex flex-col sm:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3 w-full sm:w-auto">
             <div className="p-2.5 bg-slate-800/60 rounded-xl">
                <Info className="w-4 h-4 text-slate-300" />
             </div>
             <span className="text-[10px] font-extrabold text-slate-200 uppercase tracking-widest">Final Draft</span>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
             <Button variant="outline" onClick={handleCopy} className="text-[10px] h-12 px-6 flex-1 sm:flex-none uppercase tracking-widest text-slate-200 border-white/20">
               {copied ? <Check className="w-3.5 h-3.5 mr-2 text-emerald-400"/> : <Copy className="w-3.5 h-3.5 mr-2 text-slate-400"/>}
               {copied ? "Copied" : "Copy Raw"}
             </Button>
             <Button variant="secondary" onClick={handleDownloadPDF} className="text-[10px] h-12 px-6 flex-1 sm:flex-none uppercase tracking-widest">
               <Download className="w-3.5 h-3.5 mr-2"/> Export PDF
             </Button>
          </div>
        </div>
        
        <div className="p-8 sm:p-12 font-mono text-[10px] sm:text-sm leading-loose text-slate-200 bg-brand-black/40 selection-green">
          <pre className="whitespace-pre-wrap opacity-90">{summaryText}</pre>
        </div>
      </div>

      {/* final guidance footer */}
      <div className="text-center space-y-10 pt-6">
        <div className="bg-brand-surface/60 border border-white/10 p-6 sm:p-8 rounded-3xl flex items-center justify-center gap-4 sm:gap-6 max-w-2xl mx-auto shadow-xl">
          <AlertCircle className="w-6 h-6 text-blue-300 shrink-0" />
          <p className="text-[10px] sm:text-xs text-slate-100 font-extrabold leading-relaxed text-left">
            Review spelling and clarity manually before submitting to any selection body.
          </p>
        </div>

        <div className="space-y-8">
           <p className="text-xs text-slate-500 italic font-bold tracking-wide">
             Draft &bull; Refine &bull; Succeed
           </p>
           <Button variant="ghost" onClick={onRestart} className="text-slate-400 hover:text-white font-extrabold uppercase tracking-[0.3em] text-[10px]">
             <RefreshCw className="w-4 h-4 mr-2" /> New Session
           </Button>
        </div>
      </div>
    </div>
  );
};