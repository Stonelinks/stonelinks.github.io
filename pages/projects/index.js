import React from 'react'
import DocumentTitle from 'react-document-title'
import { config } from 'config'
import Bio from 'components/Bio'
import ProjectList from 'components/ProjectList'

class ProjectIndex extends React.Component {
  render () {
    return (
      <DocumentTitle title={`Projects - ${config.blogTitle}`}>
        <div>
          <Bio />
          <ProjectList {...this.props} />
        </div>
      </DocumentTitle>
    )
  }
}

ProjectIndex.propTypes = {
  route: React.PropTypes.object
}

export default ProjectIndex
