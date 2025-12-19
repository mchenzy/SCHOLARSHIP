import React from 'react';
import { Button } from '../components/Button';
import { RotateCcw, ArrowRight, ShieldCheck, Target, Award, Globe } from 'lucide-react';

interface LandingProps {
  onStart: () => void;
  onResume: () => void;
  hasSavedData: boolean;
}

export const Landing: React.FC<LandingProps> = ({ onStart, onResume, hasSavedData }) => {
  return (
    <div className="w-full max-w-2xl mx-auto flex flex-col justify-center px-6 sm:px-0 space-y-12 sm:space-y-14 page-transition relative">
      
      {/* atmospheric Green Glow */}
      <div className="ambient-glow -top-10 -right-10 opacity-30 animate-pulse-slow sm:block hidden" />

      {/* Hero Section */}
      <div className="text-center space-y-6 sm:space-y-8 pt-10 sm:pt-4">
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/5 border border-emerald-500/20 rounded-full text-emerald-400 font-bold text-[10px] uppercase tracking-widest mb-2 animate-float">
          <Globe className="w-3.5 h-3.5" /> Scholarship Protocol
        </div>
        
        <h1 className="text-4xl sm:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
          Clarify Your <br/>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Application Signal</span>
        </h1>
        
        <p className="text-base sm:text-lg text-slate-200 max-w-lg mx-auto leading-relaxed font-semibold">
          Reviewers screen applications in under 60 seconds. We help you structure the facts that actually matter for selection.
        </p>
      </div>

      {/* Feature Priority Cards */}
      <div className="grid gap-4 sm:gap-6 sm:grid-cols-3">
        {[
          { 
            icon: ShieldCheck, 
            label: "Verification", 
            desc: "Baseline facts prioritized", 
            color: "text-blue-400", 
            bg: "bg-blue-500/10" 
          },
          { 
            icon: Target, 
            label: "Alignment", 
            desc: "Link study to global mission", 
            color: "text-emerald-400", 
            bg: "bg-emerald-500/10" 
          },
          { 
            icon: Award, 
            label: "Evidence", 
            desc: "Measurable impact data", 
            color: "text-purple-400", 
            bg: "bg-purple-500/10" 
          },
        ].map((feature, i) => (
          <div key={i} className="glass-card p-6 sm:p-7 rounded-3xl sm:rounded-[2rem] space-y-3 sm:space-y-4 border border-white/5 hover:border-white/20 transition-colors group">
            <div className={`p-3 sm:p-3.5 w-fit rounded-2xl ${feature.bg} ${feature.color} group-hover:scale-110 transition-transform`}>
              <feature.icon className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div className="space-y-1">
              <h3 className="font-bold text-white text-sm sm:text-base">{feature.label}</h3>
              <p className="text-[10px] sm:text-[11px] text-slate-400 font-bold leading-normal tracking-wide">{feature.desc}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-4 pb-12 sm:pb-4 relative">
        <Button onClick={onStart} fullWidth variant="primary" className="group h-16 sm:h-20 text-lg relative z-10">
          Start Assistant <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
        </Button>
        
        {hasSavedData && (
          <Button onClick={onResume} fullWidth variant="ghost" className="h-12 sm:h-14 font-extrabold uppercase tracking-widest text-[10px]">
            <RotateCcw className="mr-2 w-4 h-4" /> Resume Progress
          </Button>
        )}
      </div>
    </div>
  );
};