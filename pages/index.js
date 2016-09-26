import React from 'react';
import DocumentTitle from 'react-document-title';
import { rhythm } from 'utils/typography';
import { config } from 'config';
import Bio from 'components/Bio';

import PostsList from 'components/PostsList';

class BlogIndex extends React.Component {
  render () {
    return (
      <DocumentTitle title={config.blogTitle}>
        <div>
          <Bio />
          <PostsList route={this.props.route} limit={5} />
        </div>
      </DocumentTitle>
    );
  }
}

BlogIndex.propTypes = {
  route: React.PropTypes.object,
};

export default BlogIndex;
