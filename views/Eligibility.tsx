import React, { useState } from 'react';
import { Button } from '../components/Button';
import { EligibilityData } from '../types';
import { ArrowLeft, ArrowRight, UserCheck } from 'lucide-react';

interface EligibilityProps {
  initialData: EligibilityData;
  onNext: (data: EligibilityData) => void;
  onBack: () => void;
}

export const Eligibility: React.FC<EligibilityProps> = ({ initialData, onNext, onBack }) => {
  const [data, setData] = useState<EligibilityData>(initialData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const isValid = data.institution && data.fieldOfStudy && data.academicLevel && data.country;

  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col min-h-full sm:min-h-0 page-transition">
      <div className="glass-card p-6 sm:p-10 rounded-none sm:rounded-[2.5rem] flex-grow relative overflow-hidden flex flex-col">
        
        <div className="mb-8 sm:mb-10 border-b border-white/10 pb-6 sm:pb-8">
          <div className="flex items-center gap-2 text-blue-400 font-extrabold uppercase tracking-[0.2em] text-[10px] mb-4">
            <UserCheck className="w-3.5 h-3.5" /> Requirement Verification
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white mb-2 tracking-tight">Basic Eligibility</h2>
          <p className="text-slate-300 text-xs sm:text-sm leading-relaxed font-semibold">Baseline facts that reviewers verify first.</p>
        </div>

        <div className="space-y-6 sm:space-y-8 flex-grow">
          <div className="space-y-3">
            <label htmlFor="institution" className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em]">Target Institution</label>
            <input
              type="text"
              id="institution"
              name="institution"
              autoComplete="off"
              value={data.institution}
              onChange={handleChange}
              placeholder="e.g. Imperial College London"
              className="w-full px-5 py-4 sm:px-6 sm:py-5 rounded-xl sm:rounded-2xl border-2 border-slate-800 bg-brand-black/40 text-white placeholder-slate-600 focus:border-blue-500/50 outline-none transition-all font-medium text-sm"
            />
          </div>

          <div className="space-y-3">
            <label htmlFor="fieldOfStudy" className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em]">Field of Study</label>
            <input
              type="text"
              id="fieldOfStudy"
              name="fieldOfStudy"
              autoComplete="off"
              value={data.fieldOfStudy}
              onChange={handleChange}
              placeholder="e.g. M.Sc. Renewable Energy"
              className="w-full px-5 py-4 sm:px-6 sm:py-5 rounded-xl sm:rounded-2xl border-2 border-slate-800 bg-brand-black/40 text-white placeholder-slate-600 focus:border-blue-500/50 outline-none transition-all font-medium text-sm"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            <div className="space-y-3">
              <label htmlFor="academicLevel" className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em]">Academic Level</label>
              <div className="relative">
                <select
                  id="academicLevel"
                  name="academicLevel"
                  value={data.academicLevel}
                  onChange={handleChange}
                  className="w-full px-5 py-4 sm:px-6 sm:py-5 rounded-xl sm:rounded-2xl border-2 border-slate-800 bg-brand-black/40 text-white appearance-none outline-none focus:border-blue-500/50 transition-all font-medium text-sm"
                >
                  <option value="">Select Level</option>
                  <option value="Undergraduate">Undergraduate</option>
                  <option value="Masters">Masters</option>
                  <option value="PhD">PhD</option>
                  <option value="Post-Doc">Post-Doc</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-5 pointer-events-none text-slate-500">
                  <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20"><path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" /></svg>
                </div>
              </div>
            </div>

            <div className="space-y-3">
              <label htmlFor="country" className="block text-[10px] font-extrabold text-slate-400 uppercase tracking-[0.2em]">Citizenship</label>
              <input
                type="text"
                id="country"
                name="country"
                autoComplete="off"
                value={data.country}
                onChange={handleChange}
                placeholder="e.g. Nigeria"
                className="w-full px-5 py-4 sm:px-6 sm:py-5 rounded-xl sm:rounded-2xl border-2 border-slate-800 bg-brand-black/40 text-white placeholder-slate-600 focus:border-blue-500/50 outline-none transition-all font-medium text-sm"
              />
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-10 sm:pt-12 mt-auto">
          <Button variant="ghost" onClick={onBack} className="order-2 sm:order-1 sm:w-1/3 text-xs sm:text-sm">
             <ArrowLeft className="w-4 h-4 mr-2" /> Back
          </Button>
          <Button 
            onClick={() => onNext(data)} 
            disabled={!isValid} 
            className="order-1 sm:order-2 sm:w-2/3 shadow-xl"
            variant="primary"
          >
            Confirm & Continue <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};