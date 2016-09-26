import React from 'react';
import DocumentTitle from 'react-document-title';
import { config } from 'config';
import Bio from 'components/Bio';
import PostsList from 'components/PostsList';

class PostsIndex extends React.Component {
  render () {
    return (
      <DocumentTitle title={`Posts - ${config.blogTitle}`}>
        <div>
          <Bio />
          <PostsList {...this.props} />
        </div>
      </DocumentTitle>
    );
  }
}

PostsIndex.propTypes = {
  route: React.PropTypes.object,
};

export default PostsIndex;
