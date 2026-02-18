import React, { useState } from 'react';

export const Contact: React.FC = () => {
  const [status, setStatus] = useState<'idle' | 'sending' | 'success' | 'error'>('idle');
  const [copyFeedback, setCopyFeedback] = useState(false);

  const email = "Ignaciorubiopancorbo@gmail.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopyFeedback(true);
    setTimeout(() => setCopyFeedback(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('sending');

    const formData = new FormData(e.currentTarget);
    
    fetch("/", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams(formData as any).toString(),
    })
      .then((res) => {
        if (res.ok) setStatus('success');
        else throw new Error();
      })
      .catch(() => setStatus('error'));
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <div className="text-center max-w-2xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-black mb-6 tracking-tight">¡Hablemos!</h1>
        <p className="text-lg text-slate-600 dark:text-slate-400">
          ¿Tienes una propuesta, quieres colaborar o simplemente saludar? Estoy a un mensaje de distancia.
        </p>
      </div>

      <div className="grid md:grid-cols-5 gap-12">
        <div className="md:col-span-2 space-y-8">
          <div className="p-8 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-8 shadow-sm">
            <div className="space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400">Email</h4>
              <div className="space-y-2">
                <a 
                  href={`mailto:${email}`}
                  className="block text-sm font-bold text-slate-900 dark:text-white hover:text-primary transition-colors whitespace-nowrap overflow-x-auto no-scrollbar"
                >
                  {email}
                </a>
                <button 
                  onClick={handleCopyEmail}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-primary bg-primary/5 px-3 py-1.5 rounded-lg border border-primary/10 hover:bg-primary/10 transition-all"
                >
                  {copyFeedback ? (
                    <span className="text-emerald-500 flex items-center gap-1">
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      Copiado
                    </span>
                  ) : (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>
                      Copiar Email
                    </>
                  )}
                </button>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold uppercase tracking-widest text-slate-400 mb-4">Redes</h4>
              <div className="flex flex-col gap-4">
                <a href="https://linkedin.com/in/ignacio-rubio-pancorbo" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors flex items-center gap-3 font-bold text-sm">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/></svg>
                  </div>
                  LinkedIn
                </a>
                <a href="https://github.com/INARP98" target="_blank" rel="noopener noreferrer" className="text-slate-600 dark:text-slate-400 hover:text-primary transition-colors flex items-center gap-3 font-bold text-sm">
                  <div className="w-8 h-8 rounded-lg bg-slate-50 dark:bg-slate-800 flex items-center justify-center">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/></svg>
                  </div>
                  GitHub
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          {status === 'success' ? (
            <div className="p-12 text-center bg-emerald-50 dark:bg-emerald-900/10 border border-emerald-100 dark:border-emerald-800/30 rounded-3xl animate-in zoom-in duration-300">
              <div className="w-20 h-20 bg-emerald-500 text-white rounded-full flex items-center justify-center mx-auto mb-8 text-3xl shadow-lg shadow-emerald-500/20 animate-bounce">✓</div>
              <h3 className="text-2xl font-black mb-3">¡Mensaje enviado!</h3>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
                Gracias por contactar, Ignacio. He recibido tu mensaje y te responderé lo antes posible.
              </p>
              <button onClick={() => setStatus('idle')} className="text-primary font-bold hover:underline underline-offset-4 uppercase tracking-widest text-xs">Enviar otro mensaje</button>
            </div>
          ) : (
            <form 
              name="contact" 
              method="POST" 
              data-netlify="true"
              netlify-honeypot="bot-field"
              onSubmit={handleSubmit}
              className="space-y-6"
            >
              {/* Netlify Hidden Fields */}
              <input type="hidden" name="form-name" value="contact" />
              <p className="hidden">
                <label>Don’t fill this out if you’re human: <input name="bot-field" /></label>
              </p>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-black uppercase tracking-widest ml-1 text-slate-500">Nombre</label>
                  <input required type="text" id="name" name="name" placeholder="Ej. Juan Pérez" className="w-full px-5 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white" />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-black uppercase tracking-widest ml-1 text-slate-500">Email</label>
                  <input required type="email" id="email" name="email" placeholder="hola@ejemplo.com" className="w-full px-5 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all dark:text-white" />
                </div>
              </div>
              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-black uppercase tracking-widest ml-1 text-slate-500">Mensaje</label>
                <textarea required id="message" name="message" rows={5} minLength={10} placeholder="¿En qué puedo ayudarte?" className="w-full px-5 py-4 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all resize-none dark:text-white"></textarea>
              </div>

              {status === 'error' && (
                <p className="text-red-500 text-sm font-bold bg-red-50 dark:bg-red-900/10 p-4 rounded-xl border border-red-100 dark:border-red-900/30">
                  ⚠️ Hubo un error al enviar el mensaje. Por favor, inténtalo de nuevo o escribe directamente al email.
                </p>
              )}

              <button 
                type="submit" 
                disabled={status === 'sending'}
                className={`w-full py-5 bg-primary text-white font-black rounded-2xl shadow-lg shadow-primary/20 hover:scale-[1.01] hover:bg-primary-dark transition-all flex items-center justify-center gap-3 ${status === 'sending' ? 'opacity-70 cursor-wait' : ''}`}
              >
                {status === 'sending' ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                    Enviando...
                  </>
                ) : 'Enviar Mensaje Técnico'}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};