import { PageWrapper } from '@/components/PageWrapper';
import { getAllPostSlugs, getPostBySlug } from '../../../lib/posts';
import TagList from '@/components/TagList';
import { DateDisplay } from '@/components/Date';
import Lightbox from '@/components/Lightbox';

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
      <h1 className="text-2xl mb-2.5">{post.metadata.title}</h1>
      <DateDisplay date={post.metadata.date} />
      {post.metadata.featuredImage && (
        <img
          className="mb-5 max-w-[50vw] rounded-lg shadow-md"
          src={post.metadata.featuredImage}
          alt={post.metadata.title}
        />
      )}
      {post.metadata.tags && <TagList tags={post.metadata.tags} />}
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
