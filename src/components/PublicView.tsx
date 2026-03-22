import { Post as PostType } from '../types';
import PostFeed from './PostFeed';
import WelcomeHero from './WelcomeHero';
import { motion } from 'motion/react';
import { Sparkles } from 'lucide-react';

interface PublicViewProps {
  posts: PostType[];
}

export default function PublicView({ posts }: PublicViewProps) {
  return (
    <div className="space-y-12">
      <WelcomeHero />
      
      <div className="space-y-6">
        <div className="flex items-center justify-between border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/20">
              <Sparkles size={18} />
            </div>
            <h2 className="text-lg font-bold text-white">Últimas Publicaciones</h2>
          </div>
          <div className="text-xs font-medium text-zinc-500">
            {posts.length} {posts.length === 1 ? 'publicación' : 'publicaciones'}
          </div>
        </div>
        
        <PostFeed posts={posts} isAdmin={false} />
      </div>
    </div>
  );
}
