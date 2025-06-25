import { PageWrapper } from '@/components/PageWrapper';
import TagList from '@/components/TagList';
import { DateDisplay } from '@/components/Date';
import Lightbox from '@/components/Lightbox';
import { getAllProjectSlugs, getProjectBySlug } from '../../../lib/projects';
import type { Metadata } from 'next';
import { DEFAULT_TITLE } from '../../../lib/const';

interface ProjectProps {
  params: { slug: string };
}

export interface ProjectMetadata {
  slug: string;
  title: string;
  date?: string;
  featuredImage?: string;
  dateFormat?: string;
  tags?: string[];
  gallery?: string[];
  excerpt?: string;
}

interface Project {
  metadata: ProjectMetadata;
  content: string;
  slug: string;
}

interface ProjectContentProps {
  project: Project;
}

const Project = async ({ params }: ProjectProps) => {
  const { slug } = params;
  const project = await getProjectBySlug(slug);

  return (
    <PageWrapper>
      <ProjectContent project={project} />
    </PageWrapper>
  );
};

const ProjectContent = ({ project }: ProjectContentProps) => {
  return (
    <article className="p-5">
      <h1>{project.metadata.title}</h1>
      <DateDisplay
        date={project.metadata.date}
        dateFormat={project.metadata.dateFormat}
      />
      {project.metadata.featuredImage && (
        <img
          className="mb-6"
          src={project.metadata.featuredImage}
          alt={project.metadata.title}
        />
      )}
      {project.metadata.tags && <TagList tags={project.metadata.tags} />}
      {project.metadata.gallery && (
        <Lightbox images={project.metadata.gallery!} />
      )}
      <div
        className="prose max-w-none mt-4"
        dangerouslySetInnerHTML={{ __html: project.content }}
      />
    </article>
  );
};

export default Project;

export async function generateStaticParams() {
  const slugs = getAllProjectSlugs()
    // For some reason we need to keep both encoded and unencoded versions of the slug, otherwise we break either the local dev experience or the static site generator when we publish.
    .flatMap((slug) => [encodeURIComponent(slug), slug]);
  return Array.from(new Set(slugs)).map((slug) => ({ slug }));
}

/**
 * Generate metadata for the project page
 */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const project = await getProjectBySlug(params.slug);

  return {
    title: `${project.metadata.title} - ${DEFAULT_TITLE}`,
    description:
      project.metadata.excerpt || 'Read about this project by Lucas Doyle',
    openGraph: {
      title: project.metadata.title,
      description: project.metadata.excerpt,
      images: [project.metadata.featuredImage || ''],
    },
  };
}
