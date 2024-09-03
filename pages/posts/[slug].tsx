import { GetStaticPaths, GetStaticProps } from 'next';
import { PostMetadata } from '../../types';
import { getAllPostSlugs, getPostBySlug } from '../../lib/posts';
import styles from './post.module.css';

interface PostProps {
  metadata: PostMetadata;
  content: string;
}

const Post: React.FC<PostProps> = ({ metadata, content }) => {
  return (
    <article className={styles.post}>
      <h1 className={styles.title}>{metadata.title}</h1>
      <p className={styles.date}>{metadata.date}</p>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </article>
  );
};

export default Post;

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllPostSlugs().map((slug: string) => ({
    params: { slug },
  }));

  return {
    paths,
    fallback: false, // fallback: false means other routes should 404
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const slug = params?.slug as string;
  const post = await getPostBySlug(slug);

  return {
    props: {
      metadata: post.metadata,
      content: post.content,
    },
  };
};
