
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Project } from '../types';
import { StatusBadge } from '../components/StatusBadge';

export const ProjectDetail: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('./data/projects.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find((p: Project) => p.slug === slug);
        if (found) {
          setProject(found);
        } else {
          navigate('/projects');
        }
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [slug, navigate]);

  if (loading) return <div className="p-20 text-center">Cargando proyecto...</div>;
  if (!project) return null;

  return (
    <div className="max-w-4xl mx-auto px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link to="/projects" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-8">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Volver a proyectos
      </Link>

      <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-sm">
        <div className="aspect-video bg-slate-100 dark:bg-slate-800 relative">
          <img src={project.screenshots[0]} alt={project.title} className="w-full h-full object-cover opacity-80" />
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white">
            <div className="text-center p-8 backdrop-blur-sm rounded-2xl border border-white/20">
              <h1 className="text-4xl font-black mb-2 tracking-tight">{project.title}</h1>
              <div className="flex justify-center gap-2">
                <StatusBadge status={project.status} />
              </div>
            </div>
          </div>
        </div>

        <div className="p-8 md:p-12 space-y-12">
          <section className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-2 space-y-6">
              <h2 className="text-2xl font-bold">El Problema</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">{project.problem}</p>
              
              <h2 className="text-2xl font-bold pt-4">Propuesta de Valor</h2>
              <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">{project.highlights}</p>
            </div>
            <div className="space-y-6">
              <div className="bg-slate-50 dark:bg-slate-800/50 p-6 rounded-2xl space-y-4">
                <h3 className="font-bold text-sm uppercase tracking-wider text-slate-400">Tech Stack</h3>
                <div className="flex flex-wrap gap-2">
                  {project.stackPlanned.map(tech => (
                    <span key={tech} className="px-3 py-1 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg text-xs font-semibold shadow-sm">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
              
              <div className="flex flex-col gap-3">
                <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 rounded-xl font-bold hover:scale-[1.02] transition-all">
                  Repositorio
                </a>
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center justify-center gap-2 py-3 border border-slate-200 dark:border-slate-800 rounded-xl font-bold hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
                  Demo en vivo
                </a>
              </div>
            </div>
          </section>

          <section className="border-t border-slate-100 dark:border-slate-800 pt-12">
            <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
              <span className="w-8 h-8 rounded-lg bg-primary/10 text-primary flex items-center justify-center text-sm font-bold">01</span>
              Roadmap de Desarrollo
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-4">
                <h3 className="font-bold text-emerald-500">Fase 1: MVP (Mínimo Producto Viable)</h3>
                <ul className="space-y-2">
                  {project.roadmap.mvp.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 italic">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-emerald-500 flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <h3 className="font-bold text-primary">Fase 2: Expansión y Pulido</h3>
                <ul className="space-y-2">
                  {project.roadmap.v2.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-slate-600 dark:text-slate-400 italic">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0"></div>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};
