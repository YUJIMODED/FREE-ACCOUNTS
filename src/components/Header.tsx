import { LogIn, User, LogOut } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderProps {
  isAdmin: boolean;
  onLoginClick: () => void;
  onLogout: () => void;
}

export default function Header({ isAdmin, onLoginClick, onLogout }: HeaderProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-white/10 bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-2xl items-center justify-between px-4 py-3">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 font-bold text-white shadow-lg shadow-emerald-500/20">
            M
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white">ManuelMods</h1>
        </motion.div>

        <div className="flex items-center gap-4">
          {isAdmin ? (
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 border border-emerald-500/20">
                <User size={14} />
                Admin
              </div>
              <button
                onClick={onLogout}
                className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
                title="Logout"
              >
                <LogOut size={20} />
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="flex h-9 w-9 items-center justify-center rounded-full text-zinc-400 transition-colors hover:bg-zinc-800 hover:text-white"
              title="Admin Login"
            >
              <LogIn size={20} />
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
