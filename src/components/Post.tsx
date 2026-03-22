import { MessageCircle, Share2, MoreHorizontal, Heart } from 'lucide-react';
import { motion } from 'motion/react';
import Markdown from 'react-markdown';
import { Post as PostType } from '../types';

interface PostProps {
  post: PostType;
  isAdmin: boolean;
  onDelete?: (id: string) => void;
}

export default function Post({ post, isAdmin, onDelete }: PostProps) {
  const formattedDate = new Intl.DateTimeFormat('es-ES', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(post.createdAt));

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mb-4 overflow-hidden rounded-xl border border-white/10 bg-zinc-900/50 shadow-sm transition-all hover:border-white/20"
    >
      <div className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 font-bold text-white">
              M
            </div>
            <div>
              <h3 className="text-sm font-semibold text-white">{post.authorName}</h3>
              <p className="text-xs text-zinc-500">{formattedDate}</p>
            </div>
          </div>
          {isAdmin && (
            <button
              onClick={() => onDelete?.(post.id)}
              className="rounded-full p-2 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-white"
            >
              <MoreHorizontal size={20} />
            </button>
          )}
        </div>

        <div className="mt-4 prose prose-invert prose-sm max-w-none">
          <Markdown>{post.content}</Markdown>
        </div>

        {post.mediaUrl && (
          <div className="mt-4 overflow-hidden rounded-lg border border-white/5 bg-black">
            {post.mediaType === 'image' ? (
              <img
                src={post.mediaUrl}
                alt="Post media"
                className="w-full object-cover"
                referrerPolicy="no-referrer"
              />
            ) : (
              <video
                src={post.mediaUrl}
                controls
                className="w-full"
              />
            )}
          </div>
        )}

        <div className="mt-4 flex items-center justify-between border-t border-white/5 pt-4">
          <div className="flex items-center gap-6">
            <button className="flex items-center gap-1.5 text-sm font-medium text-zinc-400 transition-colors hover:text-emerald-400">
              <Heart size={18} />
              <span>Me gusta</span>
            </button>
            <button className="flex items-center gap-1.5 text-sm font-medium text-zinc-400 transition-colors hover:text-emerald-400">
              <MessageCircle size={18} />
              <span>{post.comments.length}</span>
            </button>
          </div>
          <button className="flex items-center gap-1.5 text-sm font-medium text-zinc-400 transition-colors hover:text-emerald-400">
            <Share2 size={18} />
            <span>Compartir</span>
          </button>
        </div>

        {post.comments.length > 0 && (
          <div className="mt-4 space-y-3 border-t border-white/5 pt-4">
            {post.comments.map((comment) => (
              <div key={comment.id} className="flex gap-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-emerald-500/20 text-xs font-bold text-emerald-400">
                  M
                </div>
                <div className="rounded-2xl bg-zinc-800/50 px-3 py-2">
                  <p className="text-xs font-semibold text-white">{comment.authorName}</p>
                  <p className="text-sm text-zinc-300">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.article>
  );
}
