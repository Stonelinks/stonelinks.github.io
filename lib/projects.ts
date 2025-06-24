import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';
import Project, { ProjectMetadata } from '@/projects/[slug]/page';

const getProjectsDirectory = () => path.join(process.cwd(), 'projects');

export async function getProjectBySlug(slug: string): Promise<Project> {
  const projectDirectory = path.join(getProjectsDirectory(), slug);
  const fullPath = path.join(projectDirectory, 'index.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);

  // convert date to something JSON serializable
  // Add one day to the date
  if (data.date) {
    if (data.date instanceof Date) {
      data.date.setDate(data.date.getDate() + 1);
    }
    data.date = data.date.toString();
  }

  const processedContent = await remark()
    .use(remarkRehype, { allowDangerousHtml: true }) // Convert Markdown to HTML AST
    .use(rehypeRaw) // Preserve raw HTML
    .use(rehypeHighlight) // Apply syntax highlighting
    .use(rehypeStringify) // Stringify HTML AST to HTML
    .process(content);

  const contentHtml = processedContent.toString();

  return {
    metadata: data as ProjectMetadata,
    slug,
    content: contentHtml,
  };
}

export function getAllProjectSlugs(): string[] {
  const projectsDirectory = getProjectsDirectory();
  const directories = fs.readdirSync(projectsDirectory);

  return directories;
}

/**
 * Safely truncates HTML content to a specified length without breaking tags
 * @param {string} htmlString - The HTML content to truncate
 * @param {number} length - The maximum length of the truncated content
 * @returns {string} - The truncated HTML content with all tags stripped
 */
export function truncateHtml(htmlString: string, length: number): string {
  // Extract text content from HTML, ignoring all tags
  const textContent = htmlString.replace(/<\/?[^>]+(>|$)/g, '');

  // Truncate the text content to the specified length
  if (textContent.length > length) {
    return textContent.slice(0, length);
  }

  return textContent;
}

export const sortProjects = (projects: Project[]): Project[] => {
  projects.sort((a, b) => {
    const dateA = a.metadata.date ? new Date(a.metadata.date).getTime() : 0;
    const dateB = b.metadata.date ? new Date(b.metadata.date).getTime() : 0;
    return dateB - dateA;
  });
  return projects;
};
