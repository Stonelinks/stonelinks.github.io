import {
  getAllProjectSlugs,
  getProjectBySlug,
  sortProjects,
  truncateHtml,
} from '../../lib/projects';
import ProjectPreview from './ProjectPreview';

export const AllProjectsList = async () => {
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
      {sortProjects(projects).map((project) => (
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
