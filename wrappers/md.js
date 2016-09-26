import React from 'react';
import moment from 'moment';
import DocumentTitle from 'react-document-title';
import { fixLinks } from 'utils';

import ReadNext from 'components/ReadNext';
import Bio from 'components/Bio';
import Tags from 'components/Tags';
import { rhythm } from 'utils/typography';
import { config } from 'config';

import 'css/zenburn.css';

const style = {
  h1: {
    marginTop: 0,
    marginBottom: rhythm(0.25),
  },
  hr: {
    backgroundColor: 'gray',
  },
  Tags: {
    marginBottom: rhythm(0.5),
    fontSize: rhythm(0.5),
    color: 'gray',
  },
  date: {
    marginTop: rhythm(0.25),
    marginBottom: rhythm(0.5),
    fontSize: rhythm(0.5),
    color: 'gray',
  },
};

class MarkdownWrapper extends React.Component {
  componentDidMount () {
    fixLinks(this.refs.markdown, this.context.router);
  }

  render () {
    const { route } = this.props;
    const post = route.page.data;

    return (
    <DocumentTitle title={post.title ? `${post.title} | ${config.blogTitle}` : config.blogTitle}>
      <div className="markdown">
        <h1 style={style.h1}>{post.title}</h1>
        {!post.date ? null : <div style={style.date}>{moment(post.date).calendar().toLowerCase()}</div>}
        <div className="article" ref="markdown" dangerouslySetInnerHTML={{ __html: post.body }} />
        <Tags post={post} style={style.Tags} />
        <hr style={style.hr} />
        <ReadNext post={post} pages={route.pages} />
        <Bio />
      </div>
    </DocumentTitle>
    );
  }
}

MarkdownWrapper.propTypes = {
  route: React.PropTypes.object,
};

MarkdownWrapper.contextTypes = {
  router: React.PropTypes.object.isRequired,
};

export default MarkdownWrapper;
