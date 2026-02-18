
import React, { useState, useEffect } from 'react';
import { Project } from '../types';
import { ProjectCard } from '../components/ProjectCard';

export const Projects: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [filter, setFilter] = useState<string>('all');

  useEffect(() => {
    fetch('./data/projects.json')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error("Error loading projects", err));
  }, []);

  const filteredProjects = projects.filter(p => {
    if (filter === 'all') return true;
    return p.status === filter;
  });

  return (
    <div className="max-w-6xl mx-auto px-6">
      <header className="py-12 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-extrabold mb-6 tracking-tight">Laboratorio de Ideas</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          Esta es mi hoja de ruta personal. Proyectos que nacen de problemas reales y que estoy desarrollando paso a paso para perfeccionar mis habilidades en DAW/DAM.
        </p>
      </header>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {['all', 'idea', 'en_desarrollo', 'mvp'].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all ${
              filter === f 
                ? 'bg-primary text-white shadow-md' 
                : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400 hover:border-primary/50'
            }`}
          >
            {f === 'all' ? 'Todos' : f.replace('_', ' ').toUpperCase()}
          </button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map(project => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>

      {filteredProjects.length === 0 && (
        <div className="py-20 text-center text-slate-500">
          No hay proyectos que coincidan con este filtro.
        </div>
      )}
    </div>
  );
};
