import { describe, it, expect, beforeAll, afterAll } from 'bun:test';
import * as projectsLib from './projects';
import { getAllProjectSlugs } from './__mocks__/projects';
import Project from '@/projects/[slug]/page';

describe('projects.ts', () => {
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

  describe('getAllProjectSlugs', () => {
    it('should return an array of project slugs', () => {
      // Use the mock function directly
      const slugs = getAllProjectSlugs();
      expect(Array.isArray(slugs)).toBe(true);
      expect(slugs).toContain('project1');
      expect(slugs).toContain('project2');
      expect(slugs).toContain('project3');
    });
  });

  describe('truncateHtml', () => {
    it('should truncate HTML content to the specified length', () => {
      const htmlString =
        '<p>This is a test paragraph with some HTML content.</p>';
      const length = 20;
      const result = projectsLib.truncateHtml(htmlString, length);
      expect(result).toBe('This is a test parag');
    });

    it('should return the full text if it is shorter than the specified length', () => {
      const htmlString = '<p>Short</p>';
      const length = 10;
      const result = projectsLib.truncateHtml(htmlString, length);
      expect(result).toBe('Short');
    });
  });

  describe('sortProjects', () => {
    it('should sort projects by date in descending order', () => {
      const projects = [
        {
          metadata: { date: '2023-01-01', title: 'Project 3' },
        } as Project,
        {
          metadata: { date: '2022-01-01', title: 'Project 2' },
        } as Project,
        {
          metadata: { date: '2021-01-01', title: 'Project 1' },
        } as Project,
      ];

      const sortedProjects = projectsLib.sortProjects(projects);
      expect(sortedProjects[0].metadata.date).toBe('2023-01-01');
      expect(sortedProjects[1].metadata.date).toBe('2022-01-01');
      expect(sortedProjects[2].metadata.date).toBe('2021-01-01');
    });

    it('should prioritize "GitHub" project', () => {
      const projects = [
        {
          metadata: { date: '2022-01-01', title: 'GitHub' },
        } as Project,
        {
          metadata: { date: '2023-01-01', title: 'Project 2' },
        } as Project,
      ];

      const sortedProjects = projectsLib.sortProjects(projects);
      expect(sortedProjects[0].metadata.title).toBe('GitHub');
      expect(sortedProjects[1].metadata.title).toBe('Project 2');
    });
  });
});
