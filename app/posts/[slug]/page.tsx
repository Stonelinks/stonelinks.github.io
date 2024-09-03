import { getAllPostSlugs, getPostBySlug } from '../../../lib/posts';
import styles from './post.module.css';

const Post = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  return (
    <article className={styles.post}>
      <h1 className={styles.title}>{post.metadata.title}</h1>
      <p className={styles.date}>{post.metadata.date}</p>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: post.content }}
      />
    </article>
  );
};

export default Post;

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({ slug }));
}
