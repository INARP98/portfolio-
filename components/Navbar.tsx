import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { BrandMark } from './BrandMark';

interface NavbarProps {
  darkMode: boolean;
  setDarkMode: (val: boolean) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ darkMode, setDarkMode }) => {
  const location = useLocation();

  const navLinks = [
    { name: 'Inicio', path: '/' },
    { name: 'Proyectos', path: '/projects' },
    { name: 'Blog', path: '/blog' },
    { name: 'Sobre mí', path: '/about' },
    { name: 'Contacto', path: '/contact' },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800 transition-all">
      <div className="max-w-6xl mx-auto px-6 h-20 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 group" aria-label="Ir al inicio">
          <BrandMark />
          <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white hidden sm:inline">
            Ignacio <span className="text-primary">Rubio</span>
          </span>
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-semibold transition-colors ${
                (location.pathname === link.path) || (link.path !== '/' && location.pathname.startsWith(link.path))
                  ? 'text-primary' 
                  : 'text-slate-500 dark:text-slate-400 hover:text-primary'
              }`}
            >
              {link.name}
            </Link>
          ))}
          <button
            onClick={() => setDarkMode(!darkMode)}
            className="p-2.5 rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-primary transition-colors"
            aria-label="Alternar modo oscuro"
          >
            {darkMode ? (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>
            )}
          </button>
        </div>

        {/* Móvil */}
        <div className="md:hidden flex items-center gap-4">
          <button onClick={() => setDarkMode(!darkMode)} className="p-2 text-xl">
            {darkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </div>
    </nav>
  );
};