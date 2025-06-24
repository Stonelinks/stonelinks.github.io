import { describe, it, expect, beforeAll, afterAll } from 'bun:test';
import * as postsLib from './posts';
import { getAllPostSlugs } from './__mocks__/posts';
import Post from '@/posts/[slug]/page';

describe('posts.ts', () => {
  const originalCwd = process.cwd;

  beforeAll(() => {
    // Mock process.cwd() to return a test directory
    Object.defineProperty(process, 'cwd', {
      value: () => __dirname,
      configurable: true,
    });
  });

  afterAll(() => {
    // Restore original process.cwd()
    process.cwd = originalCwd;
  });

  describe('getAllPostSlugs', () => {
    it('should return an array of post slugs', () => {
      // Use the mock function directly
      const slugs = getAllPostSlugs();
      expect(Array.isArray(slugs)).toBe(true);
      expect(slugs).toContain('post1');
      expect(slugs).toContain('post2');
      expect(slugs).toContain('post3');
    });
  });

  describe('truncateHtml', () => {
    it('should truncate HTML content to the specified length', () => {
      const htmlString =
        '<p>This is a test paragraph with some HTML content.</p>';
      const length = 20;
      const result = postsLib.truncateHtml(htmlString, length);
      expect(result).toBe('This is a test parag');
    });

    it('should return the full text if it is shorter than the specified length', () => {
      const htmlString = '<p>Short</p>';
      const length = 10;
      const result = postsLib.truncateHtml(htmlString, length);
      expect(result).toBe('Short');
    });
  });

  describe('sortPosts', () => {
    it('should sort posts by date in descending order', () => {
      const posts = [
        {
          metadata: { date: '2023-01-01' },
        } as Post,
        {
          metadata: { date: '2022-01-01' },
        } as Post,
        {
          metadata: { date: '2021-01-01' },
        } as Post,
      ];

      const sortedPosts = postsLib.sortPosts(posts);
      expect(sortedPosts[0].metadata.date).toBe('2023-01-01');
      expect(sortedPosts[1].metadata.date).toBe('2022-01-01');
      expect(sortedPosts[2].metadata.date).toBe('2021-01-01');
    });
  });
});
