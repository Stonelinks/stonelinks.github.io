import { dateToString } from '@/components/Date';
import { getContentByType, getAllSlugs } from './content';
import Project from '@/projects/[slug]/page';

export async function getProjectBySlug(slug: string): Promise<Project> {
  return getContentByType<Project>('projects', slug);
}

export function getAllProjectSlugs(): string[] {
  return getAllSlugs('projects');
}

export const sortProjects = (projects: Project[]): Project[] => {
  projects.sort((a, b) => {
    const title = a.metadata.title || '';
    if (title.toLowerCase() == 'github') {
      return -1;
    }

    const dateA = a.metadata.date
      ? Number(
          dateToString(new Date(a.metadata.date), a.metadata.dateFormat).split(
            ' ',
          )[0],
        )
      : 0;
    const dateB = b.metadata.date
      ? Number(
          dateToString(new Date(b.metadata.date), b.metadata.dateFormat).split(
            ' ',
          )[0],
        )
      : 0;
    return dateB - dateA;
  });
  return projects;
};
