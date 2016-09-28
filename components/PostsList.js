import React from 'react';
import sortBy from 'lodash/sortBy';
import access from 'safe-access';
import include from 'underscore.string/include';

import List from './List';

class PostsList extends List {
  get list () {
    let pageLinks = [];
    const sortedPages = sortBy(this.props.route.pages, (page) => access(page, 'data.date')
    ).reverse();

    sortedPages.forEach((page) => {
      if (access(page, 'file.ext') === 'md' && !include(page.path, '/404') && include(page.path, '/posts')) {
        pageLinks.push(page);
      }
    });

    return pageLinks;
  }
}

PostsList.defaultProps = {
  limit: -1,
  title: 'Posts',
  viewAllPath: '/posts/',
};

PostsList.propTypes = {
  route: React.PropTypes.object,
  limit: React.PropTypes.number,
};

export default PostsList;
