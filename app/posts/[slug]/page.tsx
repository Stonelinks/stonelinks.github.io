import { PageWrapper } from '@/components/PageWrapper';
import { getAllPostSlugs, getPostBySlug } from '../../../lib/posts';
import { format } from 'date-fns';
import styles from './post.module.css';

const Post = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  return (
    <PageWrapper>
      <article className={styles.post}>
        <h1 className={styles.title}>{post.metadata.title}</h1>
        <p className={styles.date}>
          {post.metadata.date
            ? format(new Date(post.metadata.date), 'MMMM d, yyyy')
            : 'Date unknown'}
        </p>
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
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}
