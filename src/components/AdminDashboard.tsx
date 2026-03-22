import { useState, useEffect } from 'react';
import { Post as PostType } from '../types';
import AdminPanel from './AdminPanel';
import PostFeed from './PostFeed';
import { motion } from 'motion/react';
import { LayoutDashboard, FileText, Settings } from 'lucide-react';

interface AdminDashboardProps {
  posts: PostType[];
  onPost: (content: string, mediaUrl?: string, mediaType?: 'image' | 'video') => void;
  onDelete: (id: string) => void;
}

export default function AdminDashboard({ posts, onPost, onDelete }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'feed' | 'settings'>('feed');

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
            <LayoutDashboard size={24} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Panel de Control</h2>
            <p className="text-xs text-zinc-500">Gestiona tus publicaciones y contenido.</p>
          </div>
        </div>
        
        <div className="flex gap-2">
          <button
            onClick={() => setActiveTab('feed')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all ${
              activeTab === 'feed'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            <FileText size={16} />
            Publicaciones
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`flex items-center gap-2 rounded-lg px-4 py-2 text-xs font-bold transition-all ${
              activeTab === 'settings'
                ? 'bg-emerald-500 text-white shadow-lg shadow-emerald-500/20'
                : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            <Settings size={16} />
            Ajustes
          </button>
        </div>
      </div>

      {activeTab === 'feed' ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-8"
        >
          <AdminPanel onPost={onPost} />
          <div className="space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-widest text-zinc-500">Tus Publicaciones</h3>
            <PostFeed posts={posts} isAdmin={true} onDelete={onDelete} />
          </div>
        </motion.div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="rounded-xl border border-white/10 bg-zinc-900/50 p-6 text-center"
        >
          <Settings size={48} className="mx-auto mb-4 text-zinc-700" />
          <h3 className="text-lg font-bold text-white">Ajustes del Perfil</h3>
          <p className="mt-2 text-sm text-zinc-400">
            Próximamente: Cambia tu nombre de usuario, foto de perfil y más.
          </p>
        </motion.div>
      )}
    </div>
  );
}
