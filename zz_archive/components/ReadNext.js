import React from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import { include as includes } from 'underscore.string'
import find from 'lodash/find'
import intersect from 'just-intersect'
import { rhythm, scale } from 'utils/typography'
import { getTags } from 'utils'
import Summary from 'components/Summary'

const style = {
  h6: {
    margin: 0,
    fontSize: scale(-0.5).fontSize,
    lineHeight: scale(-0.5).lineHeight,
    color: 'gray'
  },
  h3: {
    marginTop: 0,
    marginBottom: rhythm(0.25)
  },
  hr: {
    marginTop: rhythm(1),
    backgroundColor: 'gray'
  }
}

class ReadNext extends React.Component {
  render () {
    const { pages, page } = this.props
    let { readNext } = page
    let nextPost

    if (readNext) {
      nextPost = find(pages, page => includes(page.path, readNext))
    } else {
      readNext = pages
        .filter(p => p.data.tags && p.data.body !== page.body)
        .map((p) => {
          if (page.tags) {
            const t = getTags(p)
            p.diff = intersect(page.tags, t).length
          }
          return p
        })
        .sort((a, b) => a.diff - b.diff)
        .slice(-5)
        .sort(() => Math.random() * -0.5)
        .pop()
      if (readNext) {
        readNext = readNext.path
        nextPost = find(pages, page => includes(page.path, readNext))
      }
    }

    if (!nextPost) {
      return React.createElement('noscript', null)
    } else {
      nextPost = find(pages, page => includes(page.path, readNext.slice(1, -1)),
      )

      return (
        <div>
          <h6 style={style.h6}>Read this next:</h6>
          <h3 style={style.h3}><Link to={{ pathname: prefixLink(nextPost.path) }} > {nextPost.data.title} </Link></h3>
          <Summary body={nextPost.data.body} />
          <hr style={style.hr} />
        </div>
      )
    }
  }
}

ReadNext.propTypes = {
  page: React.PropTypes.object.isRequired,
  pages: React.PropTypes.array
}

export default ReadNext
