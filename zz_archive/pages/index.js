import React from 'react'
import DocumentTitle from 'react-document-title'
import { config } from 'config'
import Bio from 'components/Bio'

import PostsList from 'components/PostsList'
import ProjectList from 'components/ProjectList'

class SiteIndex extends React.Component {
  render () {
    return (
      <DocumentTitle title={config.blogTitle}>
        <div>
          <Bio />
          <PostsList route={this.props.route} limit={5} />
          <ProjectList route={this.props.route} limit={5} />
        </div>
      </DocumentTitle>
    )
  }
}

SiteIndex.propTypes = {
  route: React.PropTypes.object
}

export default SiteIndex
