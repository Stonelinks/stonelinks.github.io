import React from 'react';
import { Link } from 'react-router';
import sortBy from 'lodash/sortBy';
import DocumentTitle from 'react-document-title';
import { prefixLink } from 'gatsby-helpers';
import { rhythm } from 'utils/typography';
import access from 'safe-access';
import { config } from 'config';
import include from 'underscore.string/include';
import Bio from 'components/Bio';
import Summary from 'components/Summary';
import moment from 'moment';

const style = {
  post: {
    marginBottom: rhythm(1),
    listStyle: 'none',
  },
  postList: {
    marginLeft: 0,
  },
  date: {
    fontSize: rhythm(1 / 2),
    color: 'gray',
  },
  h3: {
    marginBottom: rhythm(.5),
  },
};

class PostsIndex extends React.Component {
  get posts () {
    const pageLinks = [];

    const sortedPages = sortBy(this.props.route.pages, (page) => access(page, 'data.date')
    ).reverse();

    sortedPages.forEach((page) => {
      if (access(page, 'file.ext') === 'md' && !include(page.path, '/404')) {
        const title = access(page, 'data.title') || page.path;
        pageLinks.push(
          <li key={page.path} style={style.post}>
            <Link to={prefixLink(page.path)}>
            {title}
            </Link>
            <div style={style.date}>
              {moment(page.data.date).calendar()}
            </div>
            <Summary body={page.data.body} />
          </li>
        );
      }
    });
    return pageLinks
  }

  render () {
    return (
      <ul style={style.postList}>
        <h3 style={style.h3}>Posts</h3>
        {this.posts}
      </ul>
    );
  }
}

PostsIndex.propTypes = {
  route: React.PropTypes.object,
};

export default PostsIndex;