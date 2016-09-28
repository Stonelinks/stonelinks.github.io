import React from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers';
import { rhythm } from 'utils/typography';
import Summary from './Summary';
import moment from 'moment';
import access from 'safe-access';

const style = {
  listItem: {
    marginBottom: rhythm(1),
    listStyle: 'none',
  },
  list: {
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

  makeListItem (page) {
    const title = access(page, 'data.title') || page.path;
    return (
      <li key={page.path} style={style.listItem}>
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

  // overrride this
  get list () {
    return this.props.route.pages;
  }

  get title () {
    const titleText = `${this.props.limit > 0 ? 'Latest ' : ''}${this.props.title}`;
    return (
      <h3 style={style.h3}>{titleText}</h3>
    );
  }

  render () {
    let list = this.list.map(this.makeListItem);

    if (this.props.limit > 0) {
      list = list.slice(0, this.props.limit);
      list.push(
        <li key={'more'} style={style.listItem}>
          Showing last {this.props.limit} | <Link to={prefixLink(this.props.viewAllPath)}>View all</Link>
        </li>
      );
    }

    return (
      <div>
        {this.title}
        <ul style={style.list}>
          {list}
        </ul>
      </div>
    );
  }
}

PostsList.defaultProps = {
  limit: -1,
  title: 'Pages',
};

PostsList.propTypes = {
  title: React.PropTypes.string,
  route: React.PropTypes.object,
  limit: React.PropTypes.number,
  viewAllPath: React.PropTypes.string,
};

export default PostsList;
