import { PageWrapper } from '@/components/PageWrapper';
import { getAllPostSlugs, getPostBySlug } from '../../../lib/posts';
import TagList from '@/components/TagList';
import styles from './post.module.css';
import { DateDisplay } from '@/components/Date';

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
    <article className={styles.post}>
      <h1 className={styles.title}>{post.metadata.title}</h1>
      <DateDisplay date={post.metadata.date} />
      {post.metadata.featuredImage && (
        <div className={styles.featuredImage}>
          <img src={post.metadata.featuredImage} alt={post.metadata.title} />
        </div>
        {post.metadata.tags && <TagList tags={post.metadata.tags} />}
        <div
          className={styles.content}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>
    </PageWrapper>
  );
};

export default Post;

export async function generateStaticParams() {
  const slugs = getAllPostSlugs()
    // For some reason we need to keep both encoded and unencoded versions of the slug, otherwise we break either the local dev experience or the static site generator when we publish.
    .flatMap((slug) => [encodeURIComponent(slug), slug]);
  return Array.from(new Set(slugs)).map((slug) => ({ slug }));
}
