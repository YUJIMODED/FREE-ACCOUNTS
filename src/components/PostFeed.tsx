import { Post as PostType } from '../types';
import Post from './Post';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquareOff } from 'lucide-react';

interface PostFeedProps {
  posts: PostType[];
  isAdmin: boolean;
  onDelete?: (id: string) => void;
}

export default function PostFeed({ posts, isAdmin, onDelete }: PostFeedProps) {
  if (posts.length === 0) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center py-20 text-center"
      >
        <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-zinc-900 text-zinc-700">
          <MessageSquareOff size={40} />
        </div>
        <h3 className="text-lg font-bold text-white">No hay publicaciones aún</h3>
        <p className="mt-1 text-sm text-zinc-500">
          {isAdmin ? '¡Empieza a compartir algo hoy!' : 'ManuelMods aún no ha publicado nada.'}
        </p>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4 pb-20">
      <AnimatePresence mode="popLayout">
        {posts.map((post) => (
          <Post key={post.id} post={post} isAdmin={isAdmin} onDelete={onDelete} />
        ))}
      </AnimatePresence>
    </div>
  );
}
