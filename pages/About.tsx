import React, { useState } from 'react';

interface Skill {
  name: string;
  level: 'Intermedio' | 'Básico' | 'En aprendizaje';
}

export const About: React.FC = () => {
  const [cvError, setCvError] = useState(false);
  const cvPath = "/cv/ignacio-rubio-cv.pdf";

  const handleCvAction = async (e: React.MouseEvent<HTMLAnchorElement>, action: 'view' | 'download') => {
    // Comprobamos si el archivo existe antes de navegar/descargar
    try {
      const response = await fetch(cvPath, { method: 'HEAD' });
      if (!response.ok) {
        throw new Error('Archivo no encontrado');
      }
      // Si existe, permitimos que el enlace funcione normalmente
      setCvError(false);
    } catch (err) {
      e.preventDefault();
      setCvError(true);
      // Ocultamos el mensaje después de 3 segundos
      setTimeout(() => setCvError(false), 3000);
    }
  };

  const skillGroups = {
    frontend: [
      { name: 'HTML', level: 'Intermedio' },
      { name: 'CSS', level: 'Intermedio' },
      { name: 'XML', level: 'Intermedio' },
      { name: 'XSD', level: 'Intermedio' },
      { name: 'JavaScript', level: 'Básico' },
      { name: 'Angular', level: 'Básico' }
    ],
    backend: [
      { name: 'Java', level: 'Intermedio' }
    ],
    databases: [
      { name: 'SQL', level: 'Intermedio' }
    ],
    tools: [
      { name: 'StarUML', level: 'Intermedio' },
      { name: 'Netlify', level: 'Intermedio' },
      { name: 'Git', level: 'En aprendizaje' }
    ],
    systems: [
      { name: 'Linux/CMD', level: 'Básico' },
      { name: 'Redes', level: 'Básico' },
      { name: 'Seguridad', level: 'Básico' }
    ]
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Intermedio': return 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20';
      case 'Básico': return 'bg-primary/10 text-primary dark:text-primary-light border-primary/20';
      case 'En aprendizaje': return 'bg-amber-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20';
      default: return 'bg-slate-500/10 text-slate-600 border-slate-500/20';
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="grid md:grid-cols-2 gap-16 items-start">
        <div className="space-y-8">
          <h1 className="text-4xl md:text-5xl font-black tracking-tight">Sobre mí</h1>
          <div className="prose prose-slate dark:prose-invert text-lg leading-relaxed space-y-6">
            <p>
              Soy estudiante de Desarrollo de Aplicaciones (DAW/DAM) en Granada. Mi enfoque se centra en construir soluciones lógicas y bien estructuradas, priorizando la claridad del código y la eficiencia de los datos.
            </p>
            <p>
              Me apasiona el mundo del <strong>Backend con Java</strong> y el diseño de bases de datos, aunque disfruto maquetando interfaces limpias con estándares web.
            </p>
            <div className="p-6 bg-primary/5 rounded-2xl border-l-4 border-primary">
               <h3 className="text-sm font-bold uppercase tracking-widest text-primary mb-2">Mi filosofía</h3>
               <p className="text-slate-700 dark:text-slate-300 italic">
                "Enfocado en dominar los fundamentos y expandir mi stack con honestidad, paso a paso."
               </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
              <h4 className="font-bold mb-1 text-sm text-slate-400 uppercase tracking-wider">Ubicación</h4>
              <p className="font-bold text-slate-900 dark:text-slate-100">Granada, España</p>
            </div>
            <div className="p-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 shadow-sm">
              <h4 className="font-bold mb-1 text-sm text-slate-400 uppercase tracking-wider">Idiomas</h4>
              <p className="font-bold text-slate-900 dark:text-slate-100">ESP, ENG (C2)</p>
            </div>
          </div>
        </div>

        <div className="space-y-10">
          <div>
            <h2 className="text-2xl font-bold mb-2">Skills & Toolbox</h2>
            <p className="text-sm text-slate-500 mb-8 italic">Niveles basados en formación oficial actual.</p>
          </div>

          <div className="space-y-8">
            {Object.entries(skillGroups).map(([group, skills]) => (
              <div key={group}>
                <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">{group}</h3>
                <div className="flex flex-wrap gap-2.5">
                  {skills.map((skill) => (
                    <div 
                      key={skill.name} 
                      className={`px-3 py-1.5 rounded-xl border text-xs font-bold transition-all hover:scale-105 ${getLevelColor(skill.level)}`}
                    >
                      {skill.name}
                      <span className="ml-1.5 opacity-60 font-medium">· {skill.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-8 relative">
            {cvError && (
              <div className="absolute -top-12 left-0 right-0 animate-in fade-in slide-in-from-bottom-2 duration-300">
                <div className="bg-red-500 text-white text-xs font-bold py-2 px-4 rounded-lg text-center shadow-lg">
                  CV no disponible. Sube el PDF a /public/cv/ignacio-rubio-cv.pdf
                </div>
              </div>
            )}
            
            <div className="space-y-3">
              <a 
                href={cvPath}
                target="_blank"
                rel="noreferrer"
                onClick={(e) => handleCvAction(e, 'view')}
                className="flex items-center justify-center gap-2 w-full py-4 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary-dark transition-all"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
                Ver CV Online
              </a>
              <a 
                href={cvPath} 
                download="Ignacio_Rubio_CV.pdf"
                onClick={(e) => handleCvAction(e, 'download')}
                className="flex items-center justify-center gap-2 w-full py-4 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white font-bold rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-all"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
                Descargar PDF
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};