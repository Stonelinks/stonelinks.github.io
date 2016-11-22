import catchLinks from 'catch-links';
import slugify from 'slugify';
import include from 'underscore.string/include';
import uniq from 'lodash/uniq';
import moment from 'moment';

// update internal links to use router
export function fixLinks (ref, router) {
  catchLinks(ref, (href) => {
    const ext = href.split('.').pop().toLowerCase();
    if (['zip', 'png', 'jpg', 'jpeg', 'txt', 'md', 'pdf'].indexOf(ext) === -1) {
      router.push(href);
    } else {
      const link = document.createElement('a');
      link.href = href;
      link.target = '_blank';
      document.body.appendChild(link);
      link.click();
    }
  });
}

// use in tags.map to get proper array of all tags
export function tagMap (tag) {
  return slugify(tag).toLowerCase();
}

// use in pages.map to get tags from a page
export function getTags (page) {
  return page.data.tags || [];
}

// get every tag from pages
export function getAllTags (pages) {
  return uniq([].concat(...pages.map(page => getTags(page).map(tagMap)))).sort();
}

export function capitalizeFirstLetter (string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// count the number of "/" in a page path
export function pageDepth (page) {
  return (page.path.match(/\//g) || []).length - 1;
}

export function isPost (page) {
  return include(page.path, '/posts') && pageDepth(page) === 2;
}

export function isProject (page) {
  return include(page.path, '/projects') && pageDepth(page) === 2 && include(page.file.name, 'index');
}

export function getPageDate (page) {
  return moment(page.data.date).add(0.5, 'days').format(page.data.dateFormat ? page.data.dateFormat : 'MM/DD/YYYY');
}
