import React from 'react';
import { AppStep } from '../types';
import { Check, User, Target, Trophy, ArrowRight, FileText } from 'lucide-react';

interface StepperProps {
  currentStep: AppStep;
}

export const Stepper: React.FC<StepperProps> = ({ currentStep }) => {
  const steps = [
    { id: AppStep.ELIGIBILITY, label: 'Eligibility', icon: User },
    { id: AppStep.ALIGNMENT, label: 'Alignment', icon: Target },
    { id: AppStep.ACHIEVEMENT, label: 'Achievement', icon: Trophy },
    { id: AppStep.INTENT, label: 'Intent', icon: ArrowRight },
    { id: AppStep.CONTEXT, label: 'Context', icon: FileText },
  ];

  const progressPercent = Math.max(0, ((currentStep - 1) / (steps.length - 1)) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Mobile-Only Progress Indicator */}
      <div className="sm:hidden space-y-3">
        <div className="flex justify-between items-end">
          <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400">
            Progress
          </span>
          <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-widest">
            Step {Math.min(currentStep, 5)} of 5
          </span>
        </div>
        <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
          <div 
            className="h-full bg-emerald-500 transition-all duration-700 ease-in-out shadow-[0_0_10px_rgba(34,197,94,0.3)]"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Desktop Stepper */}
      <div className="hidden sm:block relative">
        <div className="relative flex items-center justify-between">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-full h-0.5 bg-slate-800 -z-10 rounded-full" />
          <div 
            className="absolute left-0 top-1/2 -translate-y-1/2 h-0.5 bg-emerald-500 -z-10 rounded-full transition-all duration-700 ease-in-out shadow-[0_0_10px_rgba(34,197,94,0.3)]"
            style={{ width: `${progressPercent}%` }}
          />

          {steps.map((step) => {
            const isActive = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            const Icon = step.icon;

            return (
              <div key={step.id} className="relative flex flex-col items-center">
                <div 
                  className={`
                    w-12 h-12 rounded-2xl flex items-center justify-center border-2 transition-all duration-500
                    ${isActive 
                      ? 'bg-emerald-600 border-emerald-400 shadow-[0_0_20px_rgba(34,197,94,0.4)] scale-110 z-10' 
                      : isCompleted 
                        ? 'bg-emerald-600 border-emerald-600 text-white' 
                        : 'bg-brand-surface border-slate-800 text-slate-600 scale-90'}
                  `}
                >
                  {isCompleted ? (
                    <Check className="w-5 h-5 text-white" strokeWidth={3} />
                  ) : (
                    <Icon className={`w-5 h-5 ${isActive ? 'text-white' : ''}`} />
                  )}
                </div>
                <span 
                  className={`
                    absolute -bottom-8 text-[10px] font-bold uppercase tracking-widest transition-all duration-500 whitespace-nowrap
                    ${isActive ? 'text-emerald-400 opacity-100 translate-y-0' : 'text-slate-600 opacity-0 translate-y-2'}
                  `}
                >
                  {step.label}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};