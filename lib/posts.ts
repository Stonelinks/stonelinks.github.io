import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkRehype from 'remark-rehype';
import rehypeHighlight from 'rehype-highlight';
import rehypeStringify from 'rehype-stringify';
import { PostPreviewProps } from '@/components/PostPreview';

const getPostsDirectory = () => path.join(process.cwd(), 'posts');

export async function getPostBySlug(
  slug: string,
): Promise<{ metadata: PostPreviewProps; content: string }> {
  const postDirectory = path.join(getPostsDirectory(), slug);
  const fullPath = path.join(postDirectory, 'index.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);

  // convert date to something JSON serializable
  data.date = data.date.toString();

  const processedContent = await remark()
    .use(remarkRehype) // Convert Markdown to HTML AST
    .use(rehypeHighlight) // Apply syntax highlighting
    .use(rehypeStringify) // Stringify HTML AST to HTML
    .process(content);

  const contentHtml = processedContent.toString();

  return {
    metadata: data as PostPreviewProps,
    content: contentHtml,
  };
}

export function getAllPostSlugs(): string[] {
  const postsDirectory = getPostsDirectory();
  const directories = fs.readdirSync(postsDirectory);

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
