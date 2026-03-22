import { useState, useRef } from 'react';
import { Image, Video, Send, X, PlusCircle, Upload, Link as LinkIcon } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AdminPanelProps {
  onPost: (content: string, mediaUrl?: string, mediaType?: 'image' | 'video') => void;
}

export default function AdminPanel({ onPost }: AdminPanelProps) {
  const [content, setContent] = useState('');
  const [mediaUrl, setMediaUrl] = useState('');
  const [mediaType, setMediaType] = useState<'image' | 'video'>('image');
  const [showMediaInput, setShowMediaInput] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [mediaSource, setMediaSource] = useState<'url' | 'file'>('file');
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Error al subir el archivo');

      const data = await response.json();
      setMediaUrl(data.url);
      setMediaType(data.type);
    } catch (err) {
      alert('Error al subir el archivo: ' + (err instanceof Error ? err.message : 'Error desconocido'));
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim()) return;
    onPost(content, mediaUrl || undefined, mediaUrl ? mediaType : undefined);
    setContent('');
    setMediaUrl('');
    setShowMediaInput(false);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      className="mb-6 rounded-xl border border-emerald-500/20 bg-emerald-500/5 p-4 shadow-lg shadow-emerald-500/5"
    >
      <div className="mb-4 flex items-center gap-2 text-emerald-400">
        <PlusCircle size={20} />
        <h2 className="text-sm font-bold uppercase tracking-wider">Nueva Publicación</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="¿Qué estás pensando, Manuel?"
          className="min-h-[100px] w-full resize-none rounded-lg border border-white/10 bg-zinc-900/50 p-3 text-sm text-white placeholder-zinc-500 focus:border-emerald-500/50 focus:outline-none focus:ring-1 focus:ring-emerald-500/50"
        />

        <AnimatePresence>
          {showMediaInput && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              className="space-y-3 overflow-hidden"
            >
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setMediaSource('file')}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg border py-2 text-xs font-medium transition-all ${
                    mediaSource === 'file'
                      ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                      : 'border-white/10 bg-zinc-900/50 text-zinc-400 hover:border-white/20'
                  }`}
                >
                  <Upload size={14} />
                  Subir Archivo
                </button>
                <button
                  type="button"
                  onClick={() => setMediaSource('url')}
                  className={`flex flex-1 items-center justify-center gap-2 rounded-lg border py-2 text-xs font-medium transition-all ${
                    mediaSource === 'url'
                      ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                      : 'border-white/10 bg-zinc-900/50 text-zinc-400 hover:border-white/20'
                  }`}
                >
                  <LinkIcon size={14} />
                  Enlace URL
                </button>
              </div>

              {mediaSource === 'file' ? (
                <div className="space-y-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileUpload}
                    accept="image/*,video/*"
                    className="hidden"
                  />
                  {!mediaUrl ? (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      disabled={uploading}
                      className="flex w-full flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-white/20 bg-zinc-900/50 py-8 text-zinc-500 transition-all hover:border-emerald-500/50 hover:text-emerald-400"
                    >
                      {uploading ? (
                        <div className="h-6 w-6 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent" />
                      ) : (
                        <>
                          <Upload size={24} />
                          <span className="text-xs">Selecciona una imagen o video</span>
                        </>
                      )}
                    </button>
                  ) : (
                    <div className="relative overflow-hidden rounded-lg border border-white/10 bg-zinc-900/50">
                      {mediaType === 'image' ? (
                        <img src={mediaUrl} alt="Preview" className="h-32 w-full object-cover opacity-50" />
                      ) : (
                        <div className="flex h-32 items-center justify-center bg-zinc-800 text-zinc-500">
                          <Video size={32} />
                        </div>
                      )}
                      <div className="absolute inset-0 flex items-center justify-center">
                        <span className="rounded bg-black/50 px-2 py-1 text-[10px] font-bold text-white uppercase tracking-wider">
                          Archivo Listo
                        </span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setMediaUrl('')}
                        className="absolute right-2 top-2 rounded-full bg-black/50 p-1 text-white hover:bg-black"
                      >
                        <X size={14} />
                      </button>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => setMediaType('image')}
                      className={`flex flex-1 items-center justify-center gap-2 rounded-lg border py-2 text-xs font-medium transition-all ${
                        mediaType === 'image'
                          ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                          : 'border-white/10 bg-zinc-900/50 text-zinc-400 hover:border-white/20'
                      }`}
                    >
                      <Image size={14} />
                      Imagen
                    </button>
                    <button
                      type="button"
                      onClick={() => setMediaType('video')}
                      className={`flex flex-1 items-center justify-center gap-2 rounded-lg border py-2 text-xs font-medium transition-all ${
                        mediaType === 'video'
                          ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                          : 'border-white/10 bg-zinc-900/50 text-zinc-400 hover:border-white/20'
                      }`}
                    >
                      <Video size={14} />
                      Video
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type="url"
                      value={mediaUrl}
                      onChange={(e) => setMediaUrl(e.target.value)}
                      placeholder="URL del contenido multimedia..."
                      className="w-full rounded-lg border border-white/10 bg-zinc-900/50 p-2 text-xs text-white placeholder-zinc-500 focus:border-emerald-500/50 focus:outline-none"
                    />
                    {mediaUrl && (
                      <button
                        type="button"
                        onClick={() => setMediaUrl('')}
                        className="absolute right-2 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-white"
                      >
                        <X size={14} />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center justify-between border-t border-white/5 pt-3">
          <button
            type="button"
            onClick={() => setShowMediaInput(!showMediaInput)}
            className={`flex items-center gap-2 rounded-lg px-3 py-2 text-xs font-medium transition-colors ${
              showMediaInput ? 'bg-emerald-500/10 text-emerald-400' : 'text-zinc-400 hover:bg-zinc-800 hover:text-white'
            }`}
          >
            <Image size={16} />
            Multimedia
          </button>

          <button
            type="submit"
            disabled={!content.trim() || uploading}
            className="flex items-center gap-2 rounded-lg bg-emerald-500 px-4 py-2 text-xs font-bold text-white shadow-lg shadow-emerald-500/20 transition-all hover:bg-emerald-600 disabled:opacity-50 disabled:shadow-none"
          >
            <Send size={14} />
            {uploading ? 'Subiendo...' : 'Publicar'}
          </button>
        </div>
      </form>
    </motion.div>
  );
}
