import { ReactNode } from 'react';
import Header from './Header';
import Footer from './Footer';
import { motion } from 'motion/react';

interface LayoutProps {
  children: ReactNode;
  isAdmin: boolean;
  onLoginClick: () => void;
  onLogout: () => void;
}

export default function Layout({ children, isAdmin, onLoginClick, onLogout }: LayoutProps) {
  return (
    <div className="min-h-screen bg-black text-zinc-300 selection:bg-emerald-500/30 selection:text-emerald-400">
      <Header isAdmin={isAdmin} onLoginClick={onLoginClick} onLogout={onLogout} />
      
      <main className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          {children}
        </motion.div>
      </main>
      
      <Footer />
    </div>
  );
}
