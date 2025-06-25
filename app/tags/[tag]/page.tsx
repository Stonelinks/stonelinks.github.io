import { PageWrapper } from '@/components/PageWrapper';
import { getAllPostSlugs, getPostBySlug } from '../../../lib/posts';
import styles from './tag.module.css';

import PostPreview from '../../components/PostPreview';
import { truncateHtml } from '../../../lib/content';

interface TagPageProps {
  params: { tag: string };
}

const TagPage: React.FC<TagPageProps> = async ({ params }) => {
  const { tag: encodedTag } = params;
  const tag = decodeURIComponent(encodedTag);
  const slugs = getAllPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      return await getPostBySlug(slug);
    }),
  );

  const taggedPosts = posts.filter((post) => post.metadata.tags?.includes(tag));

  const title = `Posts tagged with "${tag}"`;

  return (
    <PageWrapper>
      <h1 className={styles.tagTitle}>{title}</h1>
      {taggedPosts.length > 0 ? (
        taggedPosts.map((post) => (
          <PostPreview
            key={post.metadata.title}
            slug={post.slug}
            title={post.metadata.title}
            date={post.metadata.date}
            excerpt={truncateHtml(post.content, 150) + '...'}
          />
        ))
      ) : (
        <p>No posts found with this tag.</p>
      )}
    </PageWrapper>
  );
};

export default TagPage;

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  const posts = await Promise.all(
    slugs.map(async (slug) => {
      const post = await getPostBySlug(slug);
      return post;
    }),
  );

  const allTags = posts
    .flatMap((post) => post.metadata.tags ?? [])
    // For some reason we need to keep both encoded and unencoded versions of the tag, otherwise we break either the local dev experience or the static site generator when we publish.
    .flatMap((tag) => [encodeURIComponent(tag), tag]);
  return Array.from(new Set(allTags)).map((tag) => ({ tag }));
}
