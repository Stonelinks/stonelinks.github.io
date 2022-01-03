import * as React from "react"
import { graphql } from "gatsby"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"
import PostPreview from "../components/post-preview"
import { windowGlobal } from "../util/windowGlobal"
import NotFoundPage from "./404"

const TagsIndex = ({ data, location }) => {
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const posts = data.allMarkdownRemark.nodes
  const tag = windowGlobal()?.decodeURIComponent(location.hash.slice(1))
  let body: React.ReactElement

  if (tag) {
    const p = posts
      .filter(p => p.frontmatter.tags.includes(tag))
      .map(p => {
        return <PostPreview post={p} />
      })

    if (p.length) {
      return (
        <Layout location={location} title={siteTitle}>
          <Seo title={`All posts tagged ${tag}`} />
          <hr />
          <h4>All posts tagged "{tag}"</h4>
          <ol style={{ listStyle: `none` }}>{p}</ol>
          <hr />
          <br />
          <Bio />
        </Layout>
      )
    }
  }
  return <NotFoundPage data={data} location={location} />
}

export default TagsIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      nodes {
        excerpt(pruneLength: 200)
        fields {
          slug
        }
        frontmatter {
          date(formatString: "MMMM DD, YYYY")
          title
          tags
          iframeFeature {
            src
            height
          }
          featuredImage {
            childImageSharp {
              fluid(maxWidth: 800) {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
`
