
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { ProjectCard } from '../components/ProjectCard';

export const Home: React.FC = () => {
  const [featuredProjects, setFeaturedProjects] = useState<Project[]>([]);

  useEffect(() => {
    fetch('./data/projects.json')
      .then(res => res.json())
      .then(data => setFeaturedProjects(data.slice(0, 3)))
      .catch(err => console.error("Error loading projects", err));
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6">
      <section className="py-20 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="flex-1 space-y-8 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider border border-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Disponible para nuevas oportunidades
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight">
            Hola, soy <span className="text-primary italic">Ignacio</span>.<br />
            Construyo el <span className="underline decoration-primary/30 underline-offset-8">futuro</span> del software.
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Estudiante de DAW/DAM en Granada enfocado en el desarrollo Full-Stack. Transformo ideas en código eficiente con una estética tecnológica y profesional.
          </p>
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-4">
            <Link to="/projects" className="px-8 py-4 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all">
              Ver proyectos
            </Link>
            <Link to="/contact" className="px-8 py-4 bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 font-bold rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-all">
              Hablemos
            </Link>
          </div>
        </div>

        <div className="relative group flex-shrink-0">
          <div className="absolute -inset-1 bg-gradient-to-r from-primary to-cyan-500 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
          <div className="relative w-80 h-64 md:w-[450px] md:h-[350px] bg-slate-900 rounded-2xl shadow-2xl border border-slate-700 overflow-hidden flex flex-col group-hover:scale-[1.02] transition-transform duration-500">
            {/* Cabecera Terminal */}
            <div className="h-8 bg-slate-800 flex items-center px-4 gap-1.5 border-b border-slate-700">
              <div className="w-3 h-3 rounded-full bg-red-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-amber-500/80"></div>
              <div className="w-3 h-3 rounded-full bg-emerald-500/80"></div>
              <div className="ml-4 text-[10px] text-slate-500 font-mono tracking-widest uppercase">bash — dev — portfolio</div>
            </div>
            {/* Contenido Terminal */}
            <div className="p-6 font-mono text-sm md:text-base text-primary leading-relaxed">
              <div className="flex gap-2">
                <span className="text-emerald-500">$</span>
                <span className="text-slate-300">whoami</span>
              </div>
              <div className="text-slate-400 mb-4 tracking-tight">ignacio_rubio_dev</div>
              
              <div className="flex gap-2">
                <span className="text-emerald-500">$</span>
                <span className="text-slate-300">ls -la core_skills/</span>
              </div>
              <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-primary-light/80 mb-4 pl-4 overflow-hidden h-20 md:h-24">
                <div className="code-scroll">Java_Backend.bin</div>
                <div className="code-scroll text-slate-500">SQL_Database.db</div>
                <div className="code-scroll">Frontend_HTML_CSS.assets</div>
                <div className="code-scroll text-slate-500">XML_Schemas.xsd</div>
                <div className="code-scroll">Git_Logic.git</div>
                <div className="code-scroll text-slate-500">Netlify_Deployment.sh</div>
              </div>

              <div className="flex gap-2">
                <span className="text-emerald-500">$</span>
                <span className="text-slate-300">deploy_future --now</span>
              </div>
              <div className="mt-2 text-primary font-bold">
                Building status: <span className="cursor-blink">_</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-slate-200 dark:border-slate-800">
        <div className="flex items-end justify-between mb-12">
          <div>
            <h2 className="text-3xl font-bold mb-2">Proyectos Destacados</h2>
            <p className="text-slate-600 dark:text-slate-400 italic">Soluciones reales en desarrollo activo.</p>
          </div>
          <Link to="/projects" className="text-primary font-semibold flex items-center gap-1 group">
            Explorar todos 
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {featuredProjects.map(project => (
            <ProjectCard key={project.slug} project={project} />
          ))}
        </div>
      </section>
    </div>
  );
};
