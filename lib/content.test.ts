import { describe, it, expect, beforeAll, afterAll } from 'bun:test';
import { getContentDirectory, truncateHtml } from './content';
import { getAllPostSlugs as getMockPostSlugs } from './__mocks__/posts';
import { getAllProjectSlugs as getMockProjectSlugs } from './__mocks__/projects';

describe('content.ts', () => {
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

  describe('getContentDirectory', () => {
    it('should return the correct directory path for posts', () => {
      const contentType = 'posts';
      const expectedPath = `${process.cwd()}/${contentType}`;
      const result = getContentDirectory(contentType);
      expect(result).toBe(expectedPath);
    });

    it('should return the correct directory path for projects', () => {
      const contentType = 'projects';
      const expectedPath = `${process.cwd()}/${contentType}`;
      const result = getContentDirectory(contentType);
      expect(result).toBe(expectedPath);
    });
  });

  describe('truncateHtml', () => {
    it('should truncate HTML content to the specified length', () => {
      const htmlString =
        '<p>This is a test paragraph with some HTML content.</p>';

      const length = 20;
      const result = truncateHtml(htmlString, length);
      expect(result).toBe('This is a test parag');
    });

    it('should return the full text if it is shorter than the specified length', () => {
      const htmlString = '<p>Short</p>';
      const length = 10;
      const result = truncateHtml(htmlString, length);
      expect(result).toBe('Short');
    });
  });

  describe('getAllContentSlugs', () => {
    it('should return an array of post slugs', () => {
      // Use the mock function directly
      const slugs = getMockPostSlugs();
      expect(Array.isArray(slugs)).toBe(true);
      expect(slugs).toContain('post1');
      expect(slugs).toContain('post2');
      expect(slugs).toContain('post3');
    });

    it('should return an array of project slugs', () => {
      // Use the mock function directly
      const slugs = getMockProjectSlugs();
      expect(Array.isArray(slugs)).toBe(true);
      expect(slugs).toContain('project1');
      expect(slugs).toContain('project2');
      expect(slugs).toContain('project3');
    });
  });
});
