import express from 'express';
import { createServer as createViteServer } from 'vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const POSTS_FILE = path.join(__dirname, 'posts.json');
const UPLOADS_DIR = path.join(__dirname, 'uploads');

// Initialize directories and files
if (!fs.existsSync(POSTS_FILE)) {
  fs.writeFileSync(POSTS_FILE, JSON.stringify([]));
}
if (!fs.existsSync(UPLOADS_DIR)) {
  fs.mkdirSync(UPLOADS_DIR);
}

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, UPLOADS_DIR);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 50 * 1024 * 1024 } // 50MB limit
});

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());
  
  // Serve uploaded files
  app.use('/uploads', express.static(UPLOADS_DIR));

  // API Routes
  app.get('/api/posts', (req, res) => {
    try {
      const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'));
      res.json(posts);
    } catch (error) {
      res.status(500).json({ error: 'Failed to load posts' });
    }
  });

  // File upload endpoint
  app.post('/api/upload', upload.single('file'), (req, res) => {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }
    const fileUrl = `/uploads/${req.file.filename}`;
    const mediaType = req.file.mimetype.startsWith('video/') ? 'video' : 'image';
    res.json({ url: fileUrl, type: mediaType });
  });

  app.post('/api/posts', (req, res) => {
    const { content, mediaUrl, mediaType, username, password } = req.body;

    // Simple auth check
    if (username !== 'ManuelMods' || password !== 'j0$3 m@n~3l') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    if (!content) {
      return res.status(400).json({ error: 'Content is required' });
    }

    try {
      const posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'));
      const newPost = {
        id: Date.now().toString(),
        content,
        mediaUrl,
        mediaType,
        createdAt: Date.now(),
        authorName: 'ManuelMods',
        comments: []
      };
      posts.unshift(newPost);
      fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
      res.status(201).json(newPost);
    } catch (error) {
      res.status(500).json({ error: 'Failed to save post' });
    }
  });

  app.delete('/api/posts/:id', (req, res) => {
    const { username, password } = req.body;
    const { id } = req.params;

    if (username !== 'ManuelMods' || password !== 'j0$3 m@n~3l') {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    try {
      let posts = JSON.parse(fs.readFileSync(POSTS_FILE, 'utf-8'));
      posts = posts.filter((p: any) => p.id !== id);
      fs.writeFileSync(POSTS_FILE, JSON.stringify(posts, null, 2));
      res.json({ success: true });
    } catch (error) {
      res.status(500).json({ error: 'Failed to delete post' });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
