
import React from 'react';

export const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 border-t border-slate-200 dark:border-slate-800 bg-white/30 dark:bg-slate-950/30">
      <div className="max-w-6xl mx-auto px-6 flex flex-col md:grid md:grid-cols-3 items-center gap-12">
        {/* Lado Izquierdo */}
        <div className="text-center md:text-left">
          <p className="font-black text-slate-900 dark:text-white mb-1 tracking-tight">Ignacio Rubio Pancorbo</p>
          <p className="text-sm font-medium text-slate-500">Junior Full-Stack Developer</p>
        </div>
        
        {/* Centro - Animación de Circuito */}
        <div className="flex justify-center w-full max-w-[120px] mx-auto opacity-40 dark:opacity-20 motion-safe:block hidden">
          <svg width="100" height="40" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 20H30L40 10H60L70 30H100" stroke="currentColor" strokeWidth="2" className="text-primary" strokeDasharray="200" strokeDashoffset="200">
              <animate attributeName="stroke-dashoffset" from="200" to="0" dur="4s" repeatCount="indefinite" />
            </path>
            <circle cx="0" cy="20" r="3" fill="currentColor" className="text-primary" />
            <circle cx="100" cy="30" r="3" fill="currentColor" className="text-primary" />
          </svg>
        </div>

        {/* Lado Derecho */}
        <div className="flex flex-col items-center md:items-end gap-3">
          <div className="flex gap-6 text-sm font-bold text-slate-500">
            <a href="https://github.com/INARP98" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">GitHub</a>
            <a href="https://linkedin.com/in/ignacio-rubio-pancorbo" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors">LinkedIn</a>
          </div>
          
          <div className="text-xs font-mono text-primary flex items-center gap-2 bg-primary/5 px-3 py-1.5 rounded-full border border-primary/10">
            <span className="opacity-50">⌁</span>
            <span>&gt; status: building</span>
            <span className="cursor-blink">_</span>
            <span className="ml-2 text-slate-400/50">{currentYear}</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
