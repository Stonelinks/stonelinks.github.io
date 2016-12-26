import React from 'react'
import DocumentTitle from 'react-document-title'
import { fixLinks, isPost, getPageDate } from 'utils'

import ReadNext from 'components/ReadNext'
import Bio from 'components/Bio'
import Tags from 'components/Tags'
import { rhythm } from 'utils/typography'
import { config } from 'config'

import Gallery from 'components/Gallery'

import 'css/zenburn.css'
import 'css/style.css'
import 'font-awesome/css/font-awesome.min.css'
import 'react-image-gallery/styles/css/image-gallery.css'

const style = {
  h1: {
    marginTop: 0,
    marginBottom: rhythm(0.25)
  },
  hr: {
    backgroundColor: 'gray'
  },
  Tags: {
    marginBottom: rhythm(0.5),
    fontSize: rhythm(0.5),
    color: 'gray'
  },
  date: {
    marginTop: rhythm(0.25),
    marginBottom: rhythm(0.5),
    fontSize: rhythm(0.5),
    color: 'gray'
  }
}

class MarkdownWrapper extends React.Component {
  componentDidMount () {
    fixLinks(this.refs.markdown, this.context.router)
  }

  render () {
    const { route } = this.props
    const page = route.page.data

    const header = (
      <div>
        <h1 style={style.h1}>{page.title}</h1>
        {!page.date ? null : <div style={style.date}>{getPageDate(route.page)}</div>}
      </div>
    )

    const footer = (
      <div>
        <Tags page={page} style={style.Tags} />
        <hr style={style.hr} />
        {isPost(page) ? <ReadNext page={page} pages={route.pages} /> : null}
        <Bio />
      </div>
    )

    return (
      <DocumentTitle title={page.title ? `${page.title} - ${config.blogTitle}` : config.blogTitle}>
        <div className='markdown'>
          {header}
          {page.gallery ? <Gallery images={page.gallery} /> : null}
          <div className='article' ref='markdown' dangerouslySetInnerHTML={{ __html: page.body }} />
          {footer}
        </div>
      </DocumentTitle>
    )
  }
}

MarkdownWrapper.propTypes = {
  route: React.PropTypes.object
}

MarkdownWrapper.contextTypes = {
  router: React.PropTypes.object.isRequired
}

export default MarkdownWrapper
