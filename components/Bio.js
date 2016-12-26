import React from 'react'
import { Link } from 'react-router'
import { config } from 'config'
import { rhythm } from 'utils/typography'
import { prefixLink } from 'gatsby-helpers'

const style = {
  img: {
    float: 'left',
    marginTop: 0,
    marginBottom: 0,
    marginRight: rhythm(0.25),
    width: rhythm(2),
    height: rhythm(2),
    borderRadius: '50%',
    border: '1px gray solid'
  },
  p: {
    marginBottom: rhythm(1)
  }
}

const Bio = () => {
  const bioParts = config.authorBio.split(config.authorName)

  return (
    <p style={style.p}>
      <Link to={prefixLink('/about/')}>
        <img src={prefixLink('/author.png')} alt={config.authorName} style={style.img} />
      </Link>
      <span>
        {bioParts[0]}
        <Link to={prefixLink('/about/')}>
          {config.authorName}
        </Link>
        {bioParts[1]}
      </span>
    </p>
  )
}

export default Bio
