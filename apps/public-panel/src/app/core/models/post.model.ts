export interface Post {
  id: number;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: Author;
  category: Category;
  featuredImage: string;
  createdAt: string;
  updatedAt: string;
  readTime: number;
  commentsCount: number;
  tags: Tag[];
  status: 'draft' | 'published' | 'archived';
}

export interface Author {
  id: number;
  name: string;
  email: string;
  avatar: string;
  bio: string;
  social: {
    twitter?: string;
    linkedin?: string;
    github?: string;
  };
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description: string;
  postCount: number;
}

export interface Tag {
  id: number;
  name: string;
  slug: string;
  postCount: number;
}

export interface Comment {
  id: number;
  content: string;
  author: {
    name: string;
    email: string;
    avatar?: string;
  };
  createdAt: string;
  parentId?: number;
  replies?: Comment[];
}
