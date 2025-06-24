import * as projectsLib from '../projects';

export function getAllProjectSlugs() {
  return ['project1', 'project2', 'project3'];
}

export const truncateHtml = projectsLib.truncateHtml;
export const sortProjects = projectsLib.sortProjects;