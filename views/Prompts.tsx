import React, { useState, useEffect } from 'react';
import { Button } from '../components/Button';
import { WordCounter } from '../components/WordCounter';
import { countWords } from '../utils';
import { AppStep, AchievementData } from '../types';
import { Lightbulb, ArrowLeft, ArrowRight, CheckCheck, Info } from 'lucide-react';

interface PromptViewProps {
  step: AppStep;
  initialValue: string | AchievementData;
  onNext: (value: string | AchievementData) => void;
  onBack: () => void;
}

export const PromptView: React.FC<PromptViewProps> = ({ step, initialValue, onNext, onBack }) => {
  
  const getConfig = () => {
    switch (step) {
      case AppStep.ALIGNMENT:
        return {
          stepNum: 2,
          title: "Strategic Alignment",
          subtitle: "Connect your studies to the scholarship's impact goals.",
          limit: 40,
          prompt: "In one clear sentence, how do your studies directly align with the mission?",
          hint: "Bad: 'I love technology.' Good: 'This scholarship aims to digitize public health records, aligning with my training in medical informatics.'",
          type: "text"
        };
      case AppStep.ACHIEVEMENT:
        return {
          stepNum: 3,
          title: "Evidence of Impact",
          subtitle: "Move from vague claims to measurable proof.",
          limit: 0,
          prompt: "",
          hint: "Instead of 'I worked hard', use 'Coordinated a team of 10 to implement a study program, increasing department pass rates by 15%.'",
          type: "structured"
        };
      case AppStep.INTENT:
        return {
          stepNum: 4,
          title: "Directional Intent",
          subtitle: "What is your immediate next goal after graduation?",
          limit: 70,
          prompt: "What are you preparing for after this study, and how does this scholarship enable that?",
          hint: "Bad: 'I want to be a leader.' Good: 'I am preparing for a role as a policy analyst; this degree provides the advanced quantitative tools required.'",
          type: "text"
        };
      case AppStep.CONTEXT:
        return {
          stepNum: 5,
          title: "Supporting Context",
          subtitle: "Factual barriers that have impacted your journey.",
          limit: 60,
          prompt: "State any financial or access constraints affecting your studies (if applicable).",
          hint: "Objective: 'I am the first in my family to attend university and support two dependents, which limits my capacity for private tuition fees.'",
          type: "text",
          optional: true
        };
      default:
        return { stepNum: 0, title: "", subtitle: "", limit: 0, prompt: "", hint: "", type: "text" };
    }
  };

  const config = getConfig();

  const [textValue, setTextValue] = useState<string>(typeof initialValue === 'string' ? initialValue : '');
  const [achieveValue, setAchieveValue] = useState<AchievementData>(
    typeof initialValue === 'object' ? initialValue : { role: '', action: '', outcome: '' }
  );

  useEffect(() => {
    if (typeof initialValue === 'string') {
      setTextValue(initialValue);
      setAchieveValue({ role: '', action: '', outcome: '' }); 
    } else {
      setAchieveValue(initialValue);
      setTextValue(''); 
    }
  }, [step, initialValue]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(e.target.value);
  };

  const handleAchieveChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAchieveValue(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const words = countWords(textValue);
  const isTextValid = config.optional ? (words <= config.limit) : (words > 0 && words <= config.limit);
  const isAchieveValid = achieveValue.role && achieveValue.action && achieveValue.outcome;
  
  const isValid = config.type === 'structured' ? isAchieveValid : isTextValid;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col min-h-full sm:min-h-0 page-transition">
      <div className="glass-card p-6 sm:p-12 rounded-none sm:rounded-[2.5rem] flex-grow relative overflow-hidden flex flex-col">
        
        <div className="mb-8 sm:mb-10 border-b border-white/10 pb-6 sm:pb-8">
          <div className="flex items-center gap-2 text-emerald-400 font-extrabold uppercase tracking-[0.3em] text-[10px] mb-3">
            <CheckCheck className="w-3.5 h-3.5" strokeWidth={3} /> Guided Priority {config.stepNum}
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">{config.title}</h2>
          <p className="text-slate-200 text-xs sm:text-sm leading-relaxed font-semibold opacity-90">{config.subtitle}</p>
        </div>

        <div className="space-y-6 sm:space-y-10 flex-grow">
          {config.type === 'text' && (
            <div className="space-y-4">
              <label htmlFor={`input-${step}`} className="block text-xs sm:text-sm font-bold text-slate-100">
                {config.prompt}
                {config.optional && <span className="text-slate-400 font-medium ml-2 italic text-[10px] uppercase tracking-widest">(Optional)</span>}
              </label>
              <textarea
                id={`input-${step}`}
                autoComplete="off"
                className="w-full p-5 sm:p-7 rounded-xl sm:rounded-[1.5rem] border-2 border-slate-800 bg-brand-black/40 text-white placeholder-slate-600 focus:border-blue-500/50 outline-none h-44 sm:h-52 resize-none transition-all leading-relaxed font-medium text-sm selection-green"
                placeholder="Draft your response..."
                value={textValue}
                onChange={handleTextChange}
              />
              <WordCounter text={textValue} limit={config.limit} />
            </div>
          )}

          {config.type === 'structured' && (
            <div className="space-y-5 sm:space-y-7">
               {[
                 { id: 'role', label: 'Specific Role', placeholder: 'e.g. Lead Volunteer' },
                 { id: 'action', label: 'Concrete Action', placeholder: 'e.g. Managed a team of 5' },
                 { id: 'outcome', label: 'Direct Outcome', placeholder: 'e.g. Reached 300 families' }
               ].map((field) => (
                 <div key={field.id} className="space-y-2">
                    <label htmlFor={field.id} className="block text-[9px] sm:text-[10px] font-extrabold text-slate-300 uppercase tracking-[0.2em]">{field.label}</label>
                    <input
                      id={field.id}
                      name={field.id}
                      autoComplete="off"
                      value={(achieveValue as any)[field.id]}
                      onChange={handleAchieveChange}
                      placeholder={field.placeholder}
                      className="w-full px-5 py-4 sm:px-7 sm:py-5 rounded-xl sm:rounded-[1.25rem] border-2 border-slate-800 bg-brand-black/40 text-white placeholder-slate-600 focus:border-blue-500/50 outline-none transition-all font-medium text-sm selection-green"
                    />
                 </div>
               ))}
            </div>
          )}

          <div className="bg-emerald-500/5 p-5 sm:p-7 rounded-2xl border border-emerald-500/10 flex gap-4 relative">
            <div className="p-2.5 bg-emerald-500/10 rounded-xl h-fit border border-emerald-500/20">
               <Lightbulb className="w-5 h-5 text-emerald-400" />
            </div>
            <div className="text-xs sm:text-sm text-slate-100 leading-relaxed font-bold">
              <span className="font-extrabold block mb-1 text-emerald-300 flex items-center gap-2 text-[10px] uppercase tracking-widest">
                <Info className="w-3 h-3" /> Selection Signal
              </span>
              {config.hint}
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-10 sm:pt-14 mt-auto">
          <Button variant="ghost" onClick={onBack} className="order-2 sm:order-1 sm:w-1/3 text-xs sm:text-sm">
             <ArrowLeft className="w-3 h-3 mr-2" /> Back
          </Button>
          <Button 
            onClick={() => onNext(config.type === 'structured' ? achieveValue : textValue)} 
            disabled={!isValid} 
            className="order-1 sm:order-2 sm:w-2/3 shadow-xl"
            variant="primary"
          >
            {step === AppStep.CONTEXT ? "Review Signals" : "Continue"} <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};