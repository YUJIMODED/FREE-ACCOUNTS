import { Heart } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="mt-20 border-t border-white/5 bg-black/50 py-12 text-center">
      <div className="mx-auto max-w-2xl px-4">
        <div className="flex items-center justify-center gap-2 text-sm font-medium text-zinc-500">
          <span>Hecho con</span>
          <Heart size={14} className="fill-red-500 text-red-500" />
          <span>por ManuelMods</span>
        </div>
        <p className="mt-2 text-xs text-zinc-600">
          Esta es una aplicación personal. Solo ManuelMods puede publicar contenido.
        </p>
        <p className="mt-6 text-[10px] uppercase tracking-[0.2em] text-zinc-700">
          &copy; {new Date().getFullYear()} ManuelMods Feed. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
}
