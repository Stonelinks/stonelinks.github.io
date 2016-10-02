import React from 'react';
import sortBy from 'lodash/sortBy';
import access from 'safe-access';
import include from 'underscore.string/include';

import List from './List';
import { isProject } from 'utils';

class ProjectList extends List {
  get list () {
    let pageLinks = [];
    const sortedPages = sortBy(this.props.route.pages, (page) => access(page, 'data.date')
    ).reverse();

    sortedPages.forEach((page) => {
      if (access(page, 'file.ext') === 'md' && !include(page.path, '/404') && isProject(page)) {
        pageLinks.push(page);
      }
    });

    return pageLinks;
  }
}

ProjectList.defaultProps = {
  limit: -1,
  title: 'Projects',
  viewAllPath: '/projects/',
};

ProjectList.propTypes = {
  route: React.PropTypes.object,
  limit: React.PropTypes.number,
};

export default ProjectList;
