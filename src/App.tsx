import { useState, useEffect } from 'react';
import Layout from './components/Layout';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import PublicView from './components/PublicView';
import Loading from './components/Loading';
import ErrorBoundary from './components/ErrorBoundary';
import { Post as PostType } from './types';
import { ADMIN_USERNAME, ADMIN_PASSWORD } from './constants';

export default function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [posts, setPosts] = useState<PostType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch posts from API
  const fetchPosts = async () => {
    try {
      const response = await fetch('/api/posts');
      if (!response.ok) throw new Error('Error al cargar las publicaciones');
      const data = await response.json();
      setPosts(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error desconocido');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleLogin = (username: string, password: string) => {
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      setIsLoginOpen(false);
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
  };

  const handlePost = async (content: string, mediaUrl?: string, mediaType?: 'image' | 'video') => {
    try {
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content,
          mediaUrl,
          mediaType,
          username: ADMIN_USERNAME,
          password: ADMIN_PASSWORD
        })
      });

      if (!response.ok) throw new Error('Error al publicar');
      
      const newPost = await response.json();
      setPosts([newPost, ...posts]);
    } catch (err) {
      alert('Error al publicar: ' + (err instanceof Error ? err.message : 'Error desconocido'));
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('¿Estás seguro de que quieres eliminar esta publicación?')) return;

    try {
      const response = await fetch(`/api/posts/${id}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: ADMIN_USERNAME,
          password: ADMIN_PASSWORD
        })
      });

      if (!response.ok) throw new Error('Error al eliminar');
      
      setPosts(posts.filter(p => p.id !== id));
    } catch (err) {
      alert('Error al eliminar: ' + (err instanceof Error ? err.message : 'Error desconocido'));
    }
  };

  if (loading) return <Loading />;

  return (
    <ErrorBoundary>
      <Layout
        isAdmin={isAdmin}
        onLoginClick={() => setIsLoginOpen(true)}
        onLogout={handleLogout}
      >
        {isAdmin ? (
          <AdminDashboard posts={posts} onPost={handlePost} onDelete={handleDelete} />
        ) : (
          <PublicView posts={posts} />
        )}

        <AdminLogin
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onLogin={handleLogin}
        />
      </Layout>
    </ErrorBoundary>
  );
}
