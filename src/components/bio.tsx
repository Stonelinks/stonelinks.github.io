/**
 * Bio component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.com/docs/use-static-query/
 */

import * as React from "react"
import { useStaticQuery, graphql, Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

const Bio = () => {
  const data = useStaticQuery(graphql`
    query BioQuery {
      site {
        siteMetadata {
          author {
            name
            description
          }
          social {
            twitter
            github
            linkedin
            youtube
          }
        }
      }
    }
  `)

  // Set these values by editing "siteMetadata" in gatsby-config.js
  const author = data.site.siteMetadata?.author
  const social = data.site.siteMetadata?.social

  return (
    <div className="bio">
      <StaticImage
        className="bio-avatar"
        layout="fixed"
        formats={["auto", "webp", "avif"]}
        src="../images/author.png"
        width={50}
        height={50}
        quality={95}
        alt="Profile picture"
      />
      {author?.name && (
        <React.Fragment>
          <div>
            Written by <strong>{author.name}</strong>, {author.description}
          </div>
          <div>
            <Link to="/todo">About</Link>
            {` | `}
            <Link to={`https://twitter.com/${social?.twitter || ``}`}>
              Twitter
            </Link>
            {` | `}
            <Link to={`https://github.com/${social?.github || ``}`}>
              Github
            </Link>
            {` | `}
            <Link to={`http://www.linkedin.com/pub/${social?.linkedin || ``}`}>
              Linkedin
            </Link>
            {` | `}
            <Link to={`https://www.youtube.com/c/${social?.youtube || ``}`}>
              Youtube
            </Link>
          </div>
        </React.Fragment>
      )}
    </div>
  )
}

export default Bio
