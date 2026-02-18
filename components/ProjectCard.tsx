
import React from 'react';
import { Link } from 'react-router-dom';
import { Project } from '../types';
import { StatusBadge } from './StatusBadge';

export const ProjectCard: React.FC<{ project: Project }> = ({ project }) => {
  return (
    <Link 
      to={`/project/${project.slug}`}
      className="group bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="aspect-video relative overflow-hidden bg-slate-100 dark:bg-slate-800">
        <img 
          src={project.screenshots[0]} 
          alt={project.title}
          className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
        <div className="absolute top-4 left-4">
          <StatusBadge status={project.status} />
        </div>
      </div>
      <div className="p-6">
        <div className="flex flex-wrap gap-2 mb-3">
          {project.stackPlanned.slice(0, 3).map(tech => (
            <span key={tech} className="text-[10px] px-2 py-0.5 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 rounded-md font-medium">
              {tech}
            </span>
          ))}
        </div>
        <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors">{project.title}</h3>
        <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-2 leading-relaxed">
          {project.shortDescription}
        </p>
      </div>
    </Link>
  );
};
