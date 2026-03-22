import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

export default function WelcomeHero() {
  return (
    <motion.section
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative mb-12 overflow-hidden rounded-3xl border border-white/10 bg-zinc-900/50 p-8 text-center shadow-2xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-transparent" />
      
      <div className="relative z-10 flex flex-col items-center">
        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
          <Sparkles size={32} />
        </div>
        <h1 className="text-3xl font-black tracking-tight text-white sm:text-4xl">
          Bienvenido al Feed de <span className="text-emerald-400">ManuelMods</span>
        </h1>
        <p className="mt-4 max-w-lg text-lg text-zinc-400">
          Un espacio personal para compartir ideas, videos y momentos especiales. 
          Solo ManuelMods puede publicar, ¡pero todos son bienvenidos a ver!
        </p>
        
        <div className="mt-8 flex items-center gap-6 text-xs font-bold uppercase tracking-widest text-zinc-500">
          <div className="flex flex-col items-center gap-2">
            <span className="text-white">Único</span>
            <span>Autor</span>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex flex-col items-center gap-2">
            <span className="text-white">Público</span>
            <span>Acceso</span>
          </div>
          <div className="h-8 w-px bg-white/10" />
          <div className="flex flex-col items-center gap-2">
            <span className="text-white">Seguro</span>
            <span>Contenido</span>
          </div>
        </div>
      </div>
    </motion.section>
  );
}
