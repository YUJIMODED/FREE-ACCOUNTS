export interface Post {
  id: string;
  content: string;
  mediaUrl?: string;
  mediaType?: 'image' | 'video';
  createdAt: number;
  authorName: string;
  comments: Comment[];
}

export interface Comment {
  id: string;
  content: string;
  createdAt: number;
  authorName: string;
}
