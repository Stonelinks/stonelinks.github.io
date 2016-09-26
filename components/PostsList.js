import React from 'react';
import { Link } from 'react-router';
import sortBy from 'lodash/sortBy';
import { prefixLink } from 'gatsby-helpers';
import { rhythm } from 'utils/typography';
import access from 'safe-access';
import include from 'underscore.string/include';
import Summary from './Summary';
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
    fontSize: rhythm(0.5),
    color: 'gray',
  },
  h3: {
    marginBottom: rhythm(0.5),
  },
};

class PostsList extends React.Component {
  get posts () {
    let pageLinks = [];
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

    if (this.props.limit > 0) {
      pageLinks = pageLinks.slice(0, this.props.limit);
      pageLinks.push(
        <li key={'more'} style={style.post}>
          Showing last {this.props.limit} posts | <Link to={prefixLink('/posts/')}>View all</Link>
        </li>
      );
    }

    return pageLinks;
  }

  get title () {
    const titleText = `${this.props.limit > 0 ? 'Latest ' : ''}Posts`;
    return (
      <h3 style={style.h3}>{titleText}</h3>
    );
  }

  render () {
    return (
      <div>
        {this.title}
        <ul style={style.postList}>
          {this.posts}
        </ul>
      </div>
    );
  }
}

PostsList.defaultProps = {
  limit: -1,
};

PostsList.propTypes = {
  route: React.PropTypes.object,
  limit: React.PropTypes.number,
};

export default PostsList;
