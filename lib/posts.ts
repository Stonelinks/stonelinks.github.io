import { getContentByType, getAllSlugs } from './content';
import Post from '@/posts/[slug]/page';

export async function getPostBySlug(slug: string): Promise<Post> {
  return getContentByType<Post>('posts', slug);
}

export function getAllPostSlugs(): string[] {
  return getAllSlugs('posts');
}

export const sortPosts = (posts: Post[]): Post[] => {
  posts.sort(
    (a, b) =>
      new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime(),
  );
  return posts;
};
