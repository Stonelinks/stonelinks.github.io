import * as postsLib from '../posts';

export function getAllPostSlugs() {
  return ['post1', 'post2', 'post3'];
}

export const truncateHtml = postsLib.truncateHtml;
export const sortPosts = postsLib.sortPosts;