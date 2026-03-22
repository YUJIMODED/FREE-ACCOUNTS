import { Loader2 } from 'lucide-react';
import { motion } from 'motion/react';

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black p-6 text-center">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
        className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
      >
        <Loader2 size={32} />
      </motion.div>
      <h2 className="text-xl font-bold text-white">Cargando Feed...</h2>
      <p className="mt-1 text-sm text-zinc-500">Preparando el contenido de ManuelMods.</p>
    </div>
  );
}
