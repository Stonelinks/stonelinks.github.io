import { PageWrapper } from '@/components/PageWrapper';
import TagList from '@/components/TagList';
import styles from './project.module.css';
import { DateDisplay } from '@/components/Date';
import Lightbox from '@/components/Lightbox';
import { getAllProjectSlugs, getProjectBySlug } from '../../../lib/projects';

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
    <article className={styles.project}>
      <h1 className={styles.title}>{project.metadata.title}</h1>
      <DateDisplay
        date={project.metadata.date}
        dateFormat={project.metadata.dateFormat}
      />
      {project.metadata.featuredImage && (
        <img
          className={styles.featuredImage}
          src={project.metadata.featuredImage}
          alt={project.metadata.title}
        />
      )}
      {project.metadata.tags && <TagList tags={project.metadata.tags} />}
      {project.metadata.gallery && (
        <Lightbox images={project.metadata.gallery!} />
      )}
      <div
        className={styles.content}
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
