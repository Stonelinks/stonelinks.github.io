import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeStringify from 'rehype-stringify';

/**
 * Gets the directory path for a given content type
 * @param {string} contentType - Either 'posts' or 'projects'
 * @returns {string} - The directory path
 */
export const getContentDirectory = (contentType: 'posts' | 'projects') =>
  path.join(process.cwd(), contentType);

/**
 * Gets a content item by its slug
 * @param {string} contentType - Either 'posts' or 'projects'
 * @param {string} slug - The slug of the content item
 * @param {string} contentTypeName - The name of the content type (Post/Project)
 * @param {React.ComponentType} ContentComponent - The React component for the content type
 * @returns {Promise<any>} - The content item
 */
export async function getContentBySlug<T>(
  contentType: 'posts' | 'projects',
  slug: string,
): Promise<T> {
  const contentDirectory = path.join(getContentDirectory(contentType), slug);
  const fullPath = path.join(contentDirectory, 'index.md');
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
    metadata: data,
    slug,
    content: contentHtml,
  } as T;
}

/**
 * Gets all slugs for a given content type
 * @param {string} contentType - Either 'posts' or 'projects'
 * @returns {string[]} - Array of slugs
 */
export function getAllContentSlugs(
  contentType: 'posts' | 'projects',
): string[] {
  const contentDirectory = getContentDirectory(contentType);
  const directories = fs.readdirSync(contentDirectory);

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

/**
 * Gets a content item by its slug
 * @param {string} contentType - Either 'posts' or 'projects'
 * @param {string} slug - The slug of the content item
 * @returns {Promise<any>} - The content item
 */
export async function getContentByType<T>(
  contentType: 'posts' | 'projects',
  slug: string,
): Promise<T> {
  return getContentBySlug<T>(contentType, slug);
}

/**
 * Gets all slugs for a given content type
 * @param {string} contentType - Either 'posts' or 'projects'
 * @returns {string[]} - Array of slugs
 */
export function getAllSlugs(contentType: 'posts' | 'projects'): string[] {
  return getAllContentSlugs(contentType);
}
