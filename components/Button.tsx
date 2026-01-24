import React from 'react';
import { ArrowRight, Loader2 } from 'lucide-react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent';
  isLoading?: boolean;
  icon?: boolean;
}

export const Button: React.FC<ButtonProps> = ({ 
  children, 
  variant = 'primary', 
  isLoading = false, 
  icon = false,
  className = '',
  ...props 
}) => {
  const baseStyles = "relative inline-flex items-center justify-center px-6 py-3 text-sm font-semibold tracking-wide transition-all duration-300 border rounded-sm disabled:opacity-70 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "border-cyan-500 bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500 hover:text-white shadow-[0_0_15px_rgba(6,182,212,0.1)] hover:shadow-[0_0_25px_rgba(6,182,212,0.4)]",
    secondary: "border-slate-700 bg-slate-900/50 text-slate-300 hover:border-slate-500 hover:text-white backdrop-blur-sm",
    accent: "border-transparent bg-gradient-to-r from-cyan-600 to-blue-600 text-white hover:brightness-110 shadow-lg"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${className}`}
      disabled={isLoading}
      {...props}
    >
      {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
      {children}
      {!isLoading && icon && <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />}
    </button>
  );
};