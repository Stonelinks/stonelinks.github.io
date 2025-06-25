import { AllProjectsList } from '@/components/AllProjectsList';
import { PageWrapper } from '@/components/PageWrapper';
import type { Metadata } from 'next';
import { DEFAULT_TITLE } from '../../lib/const';

const ProjectsIndex = () => {
  return (
    <PageWrapper>
      <AllProjectsList />
    </PageWrapper>
  );
};

export default ProjectsIndex;

/**
 * Generate metadata for the projects index page
 */
export function generateMetadata(): Metadata {
  return {
    title: `All Projects - ${DEFAULT_TITLE}`,
    description: 'Explore all projects by Lucas Doyle',
  };
}
