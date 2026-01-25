// Type declarations for JavaScript components

// ArticleList component
declare module '*/components/ArticleList' {
  import { FC } from 'react';
  
  interface Post {
    title: string | null;
    maintainer: string;
    maintainer_email: string;
    creationTime: string;
    updateTime: string;
    information: string;
    tags?: string[];
    resources?: { [key: string]: string };
    in_comments?: { [key: string]: unknown };
  }
  
  interface ArticleListProps {
    posts: Post[];
    onArticleClick: (title: string) => void;
  }
  
  const ArticleList: FC<ArticleListProps>;
  export default ArticleList;
}

// Post component
declare module '*/components/Post' {
  import { FC } from 'react';
  
  interface PostProps {
    userID: string;
    userEmail: string;
    createTime: string;
    updateTime: string;
    information: string;
    title: string | null;
    tags?: string[];
    resources?: { [key: string]: string };
    in_comments?: { [key: string]: unknown };
  }
  
  const Post: FC<PostProps>;
  export default Post;
}

// CreatePostForm component
declare module '*/components/CreatePostForm' {
  import { FC } from 'react';
  
  const CreatePostForm: FC;
  export default CreatePostForm;
}
