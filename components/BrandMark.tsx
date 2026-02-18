import React from 'react';

export const BrandMark: React.FC = () => {
  return (
    <div className="relative group w-10 h-10 flex items-center justify-center">
      {/* Anillo externo animado */}
      <div className="absolute inset-0 rounded-xl bg-primary/20 border border-primary/30 group-hover:scale-110 group-hover:rotate-45 transition-all duration-500"></div>
      
      {/* Glow effect */}
      <div className="absolute inset-0 rounded-xl bg-primary/40 blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
      
      {/* SVG Icon */}
      <svg 
        width="22" 
        height="22" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2.5" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className="relative text-primary dark:text-primary-light z-10"
      >
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
      
      {/* Punto de estado */}
      <div className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-emerald-500 rounded-full border-2 border-white dark:border-slate-950 z-20"></div>
    </div>
  );
};