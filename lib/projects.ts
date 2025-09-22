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
    const titleA = (a.metadata.title || '').toLowerCase();
    const titleB = (b.metadata.title || '').toLowerCase();

    // Place the GitHub article at the very top
    if (titleA === 'github' && titleB !== 'github') return -1;
    if (titleB === 'github' && titleA !== 'github') return 1;
    if (titleA === 'github' && titleB === 'github') return 0;

    const dateA = a.metadata.date ? new Date(a.metadata.date).getTime() : 0;
    const dateB = b.metadata.date ? new Date(b.metadata.date).getTime() : 0;

    // Sort by date descending
    if (dateA !== dateB) return dateB - dateA;

    // If dates are equal, sort by title alphabetically
    return a.metadata.title?.localeCompare(b.metadata.title ?? '') ?? 0;
  });
  return projects;
};
