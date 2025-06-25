import { AllPostsList } from '@/components/AllPostsList';
import { PageWrapper } from '@/components/PageWrapper';
import type { Metadata } from 'next';
import { DEFAULT_TITLE } from '../../lib/const';

const PostsIndex = () => {
  return (
    <PageWrapper>
      <AllPostsList />
    </PageWrapper>
  );
};

export default PostsIndex;

/**
 * Generate metadata for the posts index page
 */
export function generateMetadata(): Metadata {
  return {
    title: `All Posts - ${DEFAULT_TITLE}`,
    description: 'Read all posts by Lucas Doyle',
  };
}
