
import React from 'react';
import { ProjectStatus } from '../types';

export const StatusBadge: React.FC<{ status: ProjectStatus }> = ({ status }) => {
  const configs = {
    idea: { label: 'Idea', color: 'bg-slate-200 text-slate-700 dark:bg-slate-800 dark:text-slate-400' },
    en_desarrollo: { label: 'En Desarrollo', color: 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400' },
    mvp: { label: 'MVP Listo', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-400' },
    v2: { label: 'Versión 2.0', color: 'bg-primary/10 text-primary dark:bg-primary/20 dark:text-primary' }
  };

  const config = configs[status];

  return (
    <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${config.color}`}>
      {config.label}
    </span>
  );
};
