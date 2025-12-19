import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  fullWidth?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  fullWidth = false, 
  className = '', 
  disabled,
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center px-8 py-4 sm:py-4 h-14 sm:h-auto rounded-2xl font-bold text-sm tracking-wide transition-all duration-300 focus:outline-none focus:ring-4 disabled:opacity-40 disabled:cursor-not-allowed transform active:scale-95 overflow-hidden shadow-lg";
  
  const variants = {
    primary: "bg-gradient-to-r from-blue-600 to-blue-500 text-white hover:shadow-[0_0_20px_rgba(37,99,235,0.3)] focus:ring-blue-500/20",
    secondary: "bg-gradient-to-r from-emerald-600 to-emerald-500 text-white hover:shadow-[0_0_20px_rgba(34,197,94,0.3)] focus:ring-emerald-500/20",
    outline: "bg-brand-surface/40 border border-slate-700 text-slate-300 hover:border-slate-500 hover:text-white focus:ring-slate-500/10",
    ghost: "bg-transparent text-slate-400 hover:text-slate-200 hover:bg-white/5",
  };

  const width = fullWidth ? "w-full" : "";

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${width} ${className}`}
      disabled={disabled}
      {...props}
    >
      <span className="relative z-10">{children}</span>
      {!disabled && (
        <div className="absolute inset-0 bg-white/0 hover:bg-white/5 transition-colors pointer-events-none" />
      )}
    </button>
  );
};