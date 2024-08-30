import * as React from "react"
import { Link } from "gatsby"
import Img from "gatsby-image"

const PostPreview = ({ post }) => {
  const title = post.frontmatter.title || post.fields.slug
  let featuredImgFluid = post.frontmatter.featuredImage?.childImageSharp?.fluid
  return (
    <li key={post.fields.slug}>
      <article
        className="post-list-item"
        itemScope
        itemType="http://schema.org/Article"
      >
        <header>
          <Img className="blog-post-img" fluid={featuredImgFluid} />
          <h2>
            <Link to={post.fields.slug} itemProp="url">
              <span itemProp="headline">{title}</span>
            </Link>
          </h2>
          <small>{post.frontmatter.date}</small>
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
        <section>
          <p
            dangerouslySetInnerHTML={{
              __html: post.excerpt,
            }}
            itemProp="description"
          />
        </section>
      </article>
    </li>
  )
}

export default PostPreview
