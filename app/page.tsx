import { AllPostsList } from './components/AllPostsList';
import { AllProjectsList } from './components/AllProjectsList';
import { PageWrapper } from './components/PageWrapper';
import type { Metadata } from 'next';

const Home = () => {
  return (
    <PageWrapper>
      <AllProjectsList limit={5} />
      <AllPostsList limit={5} />
    </PageWrapper>
  );
};

export default Home;

/**
 * Generate metadata for the homepage
 */
export function generateMetadata(): Metadata {
  return {
    title: 'Lucas Doyle - Personal Website | Stonelinks',
    description:
      'Welcome to the personal website of Lucas Doyle. Explore projects, posts, and more.',
  };
}
