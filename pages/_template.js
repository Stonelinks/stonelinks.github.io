import React from 'react'
import { Link } from 'react-router'
import { Container } from 'react-responsive-grid'
import { prefixLink } from 'gatsby-helpers'
import { rhythm, fontSizeToMS } from 'utils/typography'
import { config } from 'config'

const logoSize = 60;
const smallerLogoSize = 35;
const style = {
  header: {
    marginBottom: rhythm(1)
  },
  h1: {
    marginBottom: 0,
    fontSize: fontSizeToMS(1.5).fontSize,
    lineHeight: fontSizeToMS(1.5).lineHeight,
    marginTop: 0
  },
  h2: {
    marginTop: '5px',
    marginBottom: 0,
    fontSize: fontSizeToMS(.1).fontSize,
    lineHeight: fontSizeToMS(.1).lineHeight,
    paddingLeft:  `${logoSize + 12.5}px`,
    color: 'gray'
  },
  h3: {
    marginTop: 0,
    marginBottom: 0,
    fontSize: fontSizeToMS(.6).fontSize,
    lineHeight: fontSizeToMS(.6).lineHeight,
  },
  hr: {
    marginTop: rhythm(.5),
    marginBottom: rhythm(.5),
    backgroundColor: 'gray'
  },
  img: {
    margin: 0,
    border: 0,
    width: `${logoSize}px`,
    height:  `${logoSize}px`,
    verticalAlign: 'middle'
  },
  smallerImg: {
    margin: 0,
    marginTop: '-4px',
    border: 0,
    width: `${smallerLogoSize}px`,
    height:  `${smallerLogoSize}px`,
    verticalAlign: 'middle'
  },
  Link: {
    boxShadow: 'none',
    textDecoration: 'none',
    color: 'inherit'
  },
  Container: {
    maxWidth: rhythm(26),
    padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`
  },
}

class Template extends React.Component {
  get nav() {
    const navItems = [
      ['Home', '/'],
      ['Posts', '/posts'],
      ['Projects', '/projects'],
      ['About', '/about'],
    ]
    return (
      <span>
        {navItems.map((navItem) => {
          return <Link to={prefixLink(navItem[1])}>{navItem[0]}</Link>
        }).reduce((accu, elem) => {
            return accu === null ? [elem] : [...accu, ' | ', elem]
        }, null)}
      </span>
    )
  }

  get headerContents() {
    const { location } = this.props
    if (location.pathname === prefixLink('/')) {
    return (
      <div>
      <h1 style={style.h1}>
        <Link style={style.Link} to={prefixLink('/')} >
          <img src={prefixLink('/icon.png')} style={style.img}/> {config.blogTitle}
        </Link>
      </h1>
      <h2 style={style.h2}>
        {config.subTitle}
      </h2>
      </div>
    )
  } else {
    return (
      <div>
      <h3 style={style.h3}>
        <Link style={style.Link} to={prefixLink('/')} >
          <img src={prefixLink('/icon.png')} style={style.smallerImg}/> {config.blogTitle}
        </Link>
      </h3>
      </div>
    )
  }
  }


  render () {
    const {children} = this.props
    return (
      <Container style={style.Container}>

      <header style={style.header}>
        {this.headerContents}

        <hr style={style.hr} />
        {this.nav}
      </header>

        {children}
      </Container>
    )
  }
}

Template.propTypes = {
  children: React.PropTypes.any,
  location: React.PropTypes.object,
  route: React.PropTypes.object
}

export default Template
