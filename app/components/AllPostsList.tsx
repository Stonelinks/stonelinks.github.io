import { getAllPostSlugs, getPostBySlug } from '../../lib/posts';

export const AllPostsList = async () => {
  const slugs = getAllPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getPostBySlug(slug);
      return {
        slug: slug,
        metadata: post.metadata,
      };
    }),
  );

  return (
    <div>
      {posts.map((post) => (
        <div key={post.slug}>
          <h2>
            <a href={`/posts/${post.slug}`}>{post.metadata.title}</a>
          </h2>
        </div>
      ))}
    </div>
  );
};
