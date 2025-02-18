export interface User {
  avatar: string;
  username: string;
}

export interface Blog {
  id: number;
  title: string;
  content: string;
  image: string;
  feel: string;
  created_at: string;
  user: User;
  comments: any;
  reactions: any;
}

export interface BlogProps {
  data: Blog;
}
