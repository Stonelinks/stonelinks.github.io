import { truncateHtml } from '../../lib/content';
import {
  getAllProjectSlugs,
  getProjectBySlug,
  sortProjects,
} from '../../lib/projects';
import ProjectPreview from './ProjectPreview';

interface AllProjectsListProps {
  limit?: number;
}

export const AllProjectsList = async ({
  limit = Infinity,
}: AllProjectsListProps) => {
  const slugs = getAllProjectSlugs();
  const projects = await Promise.all(
    slugs.map(async (slug) => {
      const project = await getProjectBySlug(slug);
      return {
        slug: slug,
        metadata: project.metadata,
        content: project.content,
      };
    }),
  );

  return (
    <div>
      {sortProjects(projects)
        .slice(0, limit)
        .map((project) => (
          <ProjectPreview
            key={project.slug}
            slug={project.slug}
            title={project.metadata.title}
            date={project.metadata.date}
            dateFormat={project.metadata.dateFormat}
            excerpt={truncateHtml(project.content, 150) + '...'}
          />
        ))}
    </div>
  );
};
