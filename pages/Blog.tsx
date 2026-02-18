
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { BlogPost } from '../types';

// Componente para la miniatura con lógica de fallback inteligente
const BlogThumbnail: React.FC<{ post: BlogPost }> = ({ post }) => {
  const [imgError, setImgError] = useState(false);
  
  // Determinar icono por tag si la imagen falla
  const getCategoryIcon = (tags: string[]) => {
    const t = tags.map(tag => tag.toLowerCase());
    if (t.includes('java')) return 'java';
    if (t.includes('sql') || t.includes('db') || t.includes('data')) return 'sql';
    if (t.includes('linux') || t.includes('sistemas') || t.includes('redes')) return 'linux';
    if (t.includes('windows')) return 'windows';
    if (t.includes('xml')) return 'xml';
    if (t.includes('uml') || t.includes('diseño')) return 'uml';
    if (t.includes('angular')) return 'angular';
    if (t.includes('web') || t.includes('html') || t.includes('js') || t.includes('css')) return 'web';
    return 'general';
  };

  const category = getCategoryIcon(post.tags);
  const fallbackPath = `assets/blog/fallback-${category}.svg`;

  // Intentar extraer primer bloque de código para el "Code Preview"
  const firstCodeBlock = post.content.find(c => c.type === 'code')?.value;

  return (
    <div className="aspect-[16/9] relative overflow-hidden bg-slate-100 dark:bg-slate-900 border-b border-slate-100 dark:border-slate-800 flex items-center justify-center">
      {!imgError && post.coverImage && !post.coverImage.includes('fallback') ? (
        <img 
          src={post.coverImage} 
          alt={`Portada: ${post.title}`} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
          onError={() => setImgError(true)}
        />
      ) : firstCodeBlock ? (
        /* Fallback: Code Preview (Simula un editor de código) */
        <div className="w-full h-full p-4 bg-slate-950 flex flex-col font-mono text-[10px] leading-tight overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity">
          <div className="flex gap-1.5 mb-3">
             <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
             <div className="w-2 h-2 rounded-full bg-amber-500/50"></div>
             <div className="w-2 h-2 rounded-full bg-emerald-500/50"></div>
          </div>
          <pre className="text-primary-light/60 truncate">
            {firstCodeBlock.split('\n').slice(0, 8).join('\n')}
          </pre>
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent"></div>
          <div className="absolute bottom-3 right-3 px-2 py-1 bg-primary/20 rounded border border-primary/30 text-[8px] font-bold text-primary uppercase">
            {category}
          </div>
        </div>
      ) : (
        /* Fallback: SVG por Categoría */
        <img 
          src={fallbackPath} 
          alt="Icono de categoría" 
          className="w-1/2 opacity-20 dark:opacity-40"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.src = 'assets/blog/fallback-general.svg';
          }}
        />
      )}
    </div>
  );
};

export const Blog: React.FC = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    fetch('./data/blog.json')
      .then(res => res.json())
      .then(data => setPosts(data))
      .catch(err => console.error("Error loading blog posts", err));
  }, []);

  const allTags = Array.from(new Set(posts.flatMap(p => p.tags)));

  const filteredPosts = posts.filter(post => {
    const matchesSearch = post.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         post.excerpt.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
    return matchesSearch && matchesTag;
  });

  return (
    <div className="max-w-6xl mx-auto px-6">
      <header className="py-12 text-center max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">Bitácora Técnica</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed">
          Documentación estructurada de soluciones, notas de clase y retos de ingeniería en mi formación DAW/DAM.
        </p>
      </header>

      <div className="flex flex-col md:flex-row gap-6 mb-12 items-center justify-between">
        <div className="relative w-full md:w-96">
          <input 
            type="text" 
            placeholder="Buscar por tecnología o tema..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-5 py-3 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all"
          />
        </div>
        <div className="flex flex-wrap gap-2 justify-center">
          <button 
            onClick={() => setSelectedTag(null)}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${!selectedTag ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800'}`}
          >
            Todos
          </button>
          {allTags.map(tag => (
            <button 
              key={tag}
              onClick={() => setSelectedTag(tag)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all ${selectedTag === tag ? 'bg-primary text-white shadow-lg shadow-primary/20' : 'bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-600 dark:text-slate-400'}`}
            >
              {tag}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
        {filteredPosts.map(post => (
          <Link 
            key={post.slug} 
            to={`/blog/${post.slug}`}
            className="group bg-white dark:bg-slate-950 rounded-3xl border border-slate-200 dark:border-slate-800 overflow-hidden hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 transition-all duration-300 flex flex-col"
          >
            <BlogThumbnail post={post} />
            
            <div className="p-6 flex-grow flex flex-col">
              <div className="flex items-center gap-3 mb-4 text-[10px] font-bold uppercase tracking-widest text-slate-400">
                <span>{post.date}</span>
                <span className="w-1 h-1 rounded-full bg-primary/40"></span>
                <span>{post.readTime}</span>
              </div>
              <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors line-clamp-2 leading-tight">
                {post.title}
              </h3>
              <p className="text-slate-600 dark:text-slate-400 text-sm line-clamp-3 leading-relaxed mb-6 flex-grow">
                {post.excerpt}
              </p>
              <div className="flex flex-wrap gap-2">
                {post.tags.map(tag => (
                  <span key={tag} className="px-2 py-0.5 bg-slate-50 dark:bg-slate-900 text-slate-500 text-[9px] font-bold rounded-md border border-slate-100 dark:border-slate-800">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </div>

      {filteredPosts.length === 0 && (
        <div className="py-24 text-center">
          <p className="text-slate-500 italic">No se encontraron artículos con esos criterios.</p>
        </div>
      )}
    </div>
  );
};
