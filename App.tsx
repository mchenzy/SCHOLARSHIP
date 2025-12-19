import React, { useState, useEffect } from 'react';
import { AppStep, ApplicationData, EligibilityData, AchievementData } from './types';
import { Stepper } from './components/ProgressBar';
import { Landing } from './views/Landing';
import { Eligibility } from './views/Eligibility';
import { PromptView } from './views/Prompts';
import { Summary } from './views/Summary';
import { saveProgress, loadProgress, clearProgress } from './utils';

const INITIAL_DATA: ApplicationData = {
  eligibility: {
    institution: '',
    fieldOfStudy: '',
    academicLevel: '',
    country: '',
  },
  alignment: '',
  achievement: { role: '', action: '', outcome: '' },
  intent: '',
  context: '',
};

export default function App() {
  const [step, setStep] = useState<AppStep>(AppStep.LANDING);
  const [data, setData] = useState<ApplicationData>(INITIAL_DATA);
  const [hasSavedData, setHasSavedData] = useState(false);

  useEffect(() => {
    const saved = loadProgress();
    if (saved && saved.step > AppStep.LANDING) {
      setHasSavedData(true);
    }
  }, []);

  useEffect(() => {
    if (step > AppStep.LANDING && step < AppStep.SUMMARY) {
      saveProgress(step, data);
    }
  }, [step, data]);

  const handleNext = () => setStep(prev => prev + 1);
  const handleBack = () => setStep(prev => Math.max(0, prev - 1));
  const goToStep = (targetStep: AppStep) => setStep(targetStep);
  
  const handleRestart = () => {
    clearProgress();
    setStep(AppStep.LANDING);
    setData(INITIAL_DATA);
    setHasSavedData(false);
  };

  const handleResume = () => {
    const saved = loadProgress();
    if (saved) {
      setData(saved.data);
      setStep(saved.step);
    }
  };

  const updateEligibility = (eligibilityData: EligibilityData) => {
    setData(prev => ({ ...prev, eligibility: eligibilityData }));
    handleNext();
  };

  const updatePrompt = (field: keyof ApplicationData) => (value: string | AchievementData) => {
    setData(prev => ({ ...prev, [field]: value }));
    handleNext();
  };

  const renderView = () => {
    switch (step) {
      case AppStep.LANDING:
        return (
          <Landing 
            key="landing"
            onStart={handleNext} 
            onResume={handleResume} 
            hasSavedData={hasSavedData} 
          />
        );
      case AppStep.ELIGIBILITY:
        return (
          <Eligibility 
            key="eligibility"
            initialData={data.eligibility} 
            onNext={updateEligibility} 
            onBack={handleBack} 
          />
        );
      case AppStep.ALIGNMENT:
        return (
          <PromptView 
            key="alignment"
            step={step}
            initialValue={data.alignment}
            onNext={updatePrompt('alignment')}
            onBack={handleBack}
          />
        );
      case AppStep.ACHIEVEMENT:
        return (
          <PromptView 
            key="achievement"
            step={step}
            initialValue={data.achievement}
            onNext={updatePrompt('achievement')}
            onBack={handleBack}
          />
        );
      case AppStep.INTENT:
        return (
          <PromptView 
            key="intent"
            step={step}
            initialValue={data.intent}
            onNext={updatePrompt('intent')}
            onBack={handleBack}
          />
        );
      case AppStep.CONTEXT:
        return (
          <PromptView 
            key="context"
            step={step}
            initialValue={data.context}
            onNext={updatePrompt('context')}
            onBack={handleBack}
          />
        );
      case AppStep.SUMMARY:
        return <Summary key="summary" data={data} onRestart={handleRestart} onEditStep={goToStep} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center sm:py-16">
      <div className="w-full max-w-5xl relative flex flex-col min-h-screen sm:min-h-0">
        {step !== AppStep.LANDING && (
          <div className="ambient-glow -top-10 -left-10 animate-pulse-slow hidden sm:block" />
        )}
        
        <header className={`${step > AppStep.LANDING && step < AppStep.SUMMARY ? 'py-6 px-4 sm:mb-20' : 'hidden'}`}>
           <Stepper currentStep={step} />
        </header>
        
        <main className="flex-grow flex justify-center w-full sm:px-4">
          {renderView()}
        </main>

        <footer className="py-10 text-center px-4 hidden sm:block">
          <p className="text-slate-500 font-bold text-[10px] uppercase tracking-[0.3em]">
            Scholarship Application Assistant &bull; Mobile-First Optimized
          </p>
        </footer>
      </div>
    </div>
  );
}