import * as React from "react"
import { Link, graphql } from "gatsby"
import Gallery from "@browniebroke/gatsby-image-gallery"

import Bio from "../components/bio"
import Layout from "../components/layout"
import Seo from "../components/seo"

const BlogPostTemplate = ({ data, location }) => {
  const post = data.markdownRemark
  const siteTitle = data.site.siteMetadata?.title || `Title`
  const { previous, next } = data

  const images = data.allFile.edges.map(({ node }) => node.childImageSharp)

  return (
    <Layout location={location} title={siteTitle}>
      <Seo title={post.frontmatter.title} description={post.excerpt} />
      <hr />
      <br />
      <article
        className="blog-post"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <h1 itemProp="headline">{post.frontmatter.title}</h1>
          <p>{post.frontmatter.date}</p>
        </header>
        {post.frontmatter.iframeFeature ? (
          <iframe
            style={{
              width: "100%",
              height: post.frontmatter.iframeFeature.height,
            }}
            src={post.frontmatter.iframeFeature.src}
          />
        ) : null}
        {images.length ? (
          <>
            <Gallery images={images} />
            <br />
          </>
        ) : null}
        <section
          dangerouslySetInnerHTML={{ __html: post.html }}
          itemProp="articleBody"
        />
        <hr />
        <span>
          {"Tags: "}
          {post.frontmatter.tags
            .map((tag, i) => (
              <Link key={i} to={`/tags#${tag}`}>
                {tag}
              </Link>
            ))
            .reduce(
              (accu, elem) => (accu === null ? [elem] : [...accu, " | ", elem]),
              null
            )}
        </span>
        <hr />
        <footer>
          <Bio />
        </footer>
      </article>
      <nav className="blog-post-nav">
        <ul
          style={{
            display: `flex`,
            flexWrap: `wrap`,
            justifyContent: `space-between`,
            listStyle: `none`,
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </nav>
    </Layout>
  )
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug(
    $id: String!
    $galleryDirectory: String!
    $previousPostId: String
    $nextPostId: String
  ) {
    allFile(
      filter: {
        extension: { regex: "/(jpg)|(png)|(jpeg)/" }
        relativeDirectory: { eq: $galleryDirectory }
      }
    ) {
      edges {
        node {
          base
          childImageSharp {
            thumb: gatsbyImageData(
              width: 270
              height: 270
              placeholder: BLURRED
            )
            full: gatsbyImageData(layout: FULL_WIDTH)
          }
        }
      }
    }
    site {
      siteMetadata {
        title
      }
    }
    markdownRemark(id: { eq: $id }) {
      id
      excerpt(pruneLength: 200)
      html
      frontmatter {
        title
        iframeFeature {
          src
          height
        }
        date(formatString: "MMMM DD, YYYY")
        tags
        gallery
      }
    }
    previous: markdownRemark(id: { eq: $previousPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
    next: markdownRemark(id: { eq: $nextPostId }) {
      fields {
        slug
      }
      frontmatter {
        title
      }
    }
  }
`
