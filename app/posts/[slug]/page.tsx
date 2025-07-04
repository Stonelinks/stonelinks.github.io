import { PageWrapper } from '@/components/PageWrapper';
import { getAllPostSlugs, getPostBySlug } from '../../../lib/posts';
import TagList from '@/components/TagList';
import { DateDisplay } from '@/components/Date';
import Lightbox from '@/components/Lightbox';
import type { Metadata } from 'next';
import { DEFAULT_TITLE } from '../../../lib/const';

interface PostProps {
  params: { slug: string };
}

export interface PostMetadata {
  slug: string;
  title: string;
  date: string;
  featuredImage?: string;
  tags?: string[];
  gallery?: string[];
  excerpt?: string;
}

interface Post {
  metadata: PostMetadata;
  content: string;
  slug: string;
}

interface PostContentProps {
  post: Post;
}

const Post = async ({ params }: PostProps) => {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  return (
    <PageWrapper>
      <PostContent post={post} />
    </PageWrapper>
  );
};

const PostContent = ({ post }: PostContentProps) => {
  return (
    <article className="p-5">
      <h1>{post.metadata.title}</h1>
      <DateDisplay date={post.metadata.date} />
      {post.metadata.tags && <TagList tags={post.metadata.tags} />}
      {post.metadata.featuredImage && (
        <img
          className="mb-6"
          src={post.metadata.featuredImage}
          alt={post.metadata.title}
        />
      )}

      {post.metadata.gallery && <Lightbox images={post.metadata.gallery!} />}
      <div
        className="prose max-w-none mt-4"
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
};

export default Post;

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
    // For some reason we need to keep both encoded and unencoded versions of the slug, otherwise we break either the local dev experience or the static site generator when we publish.
    .flatMap((slug) => [encodeURIComponent(slug), slug]);
  return Array.from(new Set(slugs)).map((slug) => ({ slug }));
}

/**
 * Generate metadata for the post page
 */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = await getPostBySlug(params.slug);

  return {
    title: `${post.metadata.title} - ${DEFAULT_TITLE}`,
    description: post.metadata.excerpt || 'Read this post by Lucas Doyle',
    openGraph: {
      title: post.metadata.title,
      description: post.metadata.excerpt,
      images: [post.metadata.featuredImage || ''],
    },
  };
}
