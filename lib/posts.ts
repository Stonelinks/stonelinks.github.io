import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';
import { PostMetadata } from '../types';

const getPostsDirectory = () => path.join(process.cwd(), 'posts');

export async function getPostBySlug(slug: string): Promise<{ metadata: PostMetadata; content: string }> {
  const postDirectory = path.join(getPostsDirectory(), slug);
  const fullPath = path.join(postDirectory, 'index.md');
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  const { data, content } = matter(fileContents);

  // convert date to something JSON serializable
  data.date = data.date.toString();

  const processedContent = await remark().use(html).process(content);
  const contentHtml = processedContent.toString();

  return {
    metadata: data as PostMetadata,
    content: contentHtml,
  };
}

export function getAllPostSlugs(): string[] {
  const postsDirectory = getPostsDirectory();
  const directories = fs.readdirSync(postsDirectory);

  return directories;
}
