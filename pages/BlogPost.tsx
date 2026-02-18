
import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { BlogPost as BlogPostType } from '../types';

export const BlogPost: React.FC = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState<BlogPostType | null>(null);
  const [loading, setLoading] = useState(true);
  const [imgError, setImgError] = useState(false);

  useEffect(() => {
    fetch('./data/blog.json')
      .then(res => res.json())
      .then(data => {
        const found = data.find((p: BlogPostType) => p.slug === slug);
        if (found) {
          setPost(found);
        } else {
          navigate('/blog');
        }
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [slug, navigate]);

  if (loading) return <div className="p-24 text-center text-primary font-bold animate-pulse text-lg tracking-widest uppercase">Cargando artículo...</div>;
  if (!post) return null;

  // Fallback simple para el hero basado en el primer tag
  const primaryTag = post.tags[0]?.toLowerCase() || 'general';
  const fallbackHero = `assets/blog/fallback-${primaryTag}.svg`;

  return (
    <article className="max-w-3xl mx-auto px-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <Link to="/blog" className="inline-flex items-center gap-2 text-slate-500 hover:text-primary transition-colors mb-12 font-semibold group">
        <svg className="w-4 h-4 group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"></path></svg>
        Volver a la bitácora
      </Link>

      <header className="mb-12">
        <div className="flex items-center gap-4 mb-6 text-sm font-bold uppercase tracking-widest text-primary">
          <span>{post.date}</span>
          <span className="w-1.5 h-1.5 rounded-full bg-primary/30"></span>
          <span>{post.readTime} de lectura técnica</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black mb-8 tracking-tight leading-[1.1]">{post.title}</h1>
      </header>

      <div className="aspect-[21/9] rounded-3xl overflow-hidden mb-16 border border-slate-200 dark:border-slate-800 shadow-2xl shadow-primary/5 bg-slate-900 flex items-center justify-center">
        {!imgError && post.coverImage ? (
          <img 
            src={post.coverImage} 
            alt={post.title} 
            className="w-full h-full object-cover"
            onError={() => setImgError(true)}
          />
        ) : (
          <img 
            src={fallbackHero} 
            alt="Categoria" 
            className="w-1/4 opacity-30 invert dark:invert-0"
            onError={(e) => {
               const t = e.target as HTMLImageElement;
               t.src = 'assets/blog/fallback-general.svg';
            }}
          />
        )}
      </div>

      <div className="space-y-10 mb-20">
        {post.content.map((item, index) => {
          switch (item.type) {
            case 'text':
              return <p key={index} className="text-xl text-slate-700 dark:text-slate-300 leading-relaxed font-light">{item.value}</p>;
            case 'code':
              return (
                <div key={index} className="group relative">
                  <div className="absolute top-4 right-4 text-[10px] font-bold uppercase tracking-widest text-slate-500 opacity-50 px-2 py-1 bg-slate-800 rounded border border-slate-700">{item.language}</div>
                  <pre className="p-8 bg-slate-950 rounded-2xl overflow-x-auto border border-slate-800 shadow-xl scrollbar-thin scrollbar-thumb-primary/20">
                    <code className="font-mono text-primary-light/90 text-sm md:text-base leading-relaxed">
                      {item.value}
                    </code>
                  </pre>
                </div>
              );
            case 'image':
              return (
                <figure key={index} className="space-y-4">
                  <img src={item.value} alt={item.caption} className="w-full rounded-2xl border border-slate-200 dark:border-slate-800" />
                  {item.caption && <figcaption className="text-center text-sm italic text-slate-500 font-medium">↳ {item.caption}</figcaption>}
                </figure>
              );
            default:
              return null;
          }
        })}
      </div>

      <footer className="pt-12 border-t border-slate-200 dark:border-slate-800 flex flex-col md:flex-row items-center justify-between gap-8 mb-20">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white font-black text-xl shadow-lg shadow-primary/20">IR</div>
          <div>
            <p className="font-black text-lg">Ignacio Rubio</p>
            <p className="text-sm text-slate-500">Junior Full-Stack Developer</p>
          </div>
        </div>
        <button 
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="px-6 py-2 border border-slate-200 dark:border-slate-800 rounded-full text-sm font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
        >
          Volver arriba ↑
        </button>
      </footer>
    </article>
  );
};
