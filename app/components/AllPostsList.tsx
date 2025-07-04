import Link from 'next/link';
import { truncateHtml } from '../../lib/content';
import { getAllPostSlugs, getPostBySlug, sortPosts } from '../../lib/posts';
import PostPreview from './PostPreview';

interface AllPostsListProps {
  limit?: number;
}

export const AllPostsList = async ({ limit = Infinity }: AllPostsListProps) => {
  const slugs = getAllPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getPostBySlug(slug);
      return {
        slug: slug,
        metadata: post.metadata,
        content: post.content,
      };
    }),
  );

  return (
    <div className="pb-8 mb-8">
      <h1>{limit === Infinity ? 'All posts' : 'Recent posts'}</h1>
      <hr />

      {sortPosts(posts)
        .slice(0, limit)
        .map((post) => (
          <PostPreview
            key={post.slug}
            slug={post.slug}
            title={post.metadata.title}
            date={post.metadata.date}
            excerpt={truncateHtml(post.content, 150) + '...'}
          />
        ))}
      {limit !== Infinity && <Link href="/posts">View all posts</Link>}
    </div>
  );
};
