import {
  getAllPostSlugs,
  getPostBySlug,
  sortPosts,
  truncateHtml,
} from '../../lib/posts';
import PostPreview from './PostPreview';

export const AllPostsList = async () => {
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
    <div>
      {sortPosts(posts).map((post) => (
        <PostPreview
          key={post.slug}
          slug={post.slug}
          title={post.metadata.title}
          date={post.metadata.date}
          excerpt={truncateHtml(post.content, 150) + '...'}
        />
      ))}
    </div>
  );
};
