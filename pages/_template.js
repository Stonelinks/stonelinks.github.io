import React from 'react';
import { Link } from 'react-router';
import { Container } from 'react-responsive-grid';
import { prefixLink } from 'gatsby-helpers';
import { rhythm, fontSizeToMS } from 'utils/typography';
import { config } from 'config';
import flatten from 'lodash/flatten';
import includes from 'lodash/includes';

const logoSize = 60;
const smallerLogoSize = 35;
const style = {
  header: {
    marginBottom: rhythm(1),
  },
  h1: {
    marginBottom: 0,
    fontSize: fontSizeToMS(1.5).fontSize,
    lineHeight: fontSizeToMS(1.5).lineHeight,
    marginTop: 0,
  },
  h2: {
    marginTop: '5px',
    marginBottom: 0,
    fontSize: fontSizeToMS(.1).fontSize,
    lineHeight: fontSizeToMS(.1).lineHeight,
    paddingLeft: `${logoSize + 12.5}px`,
    color: 'gray',
  },
  h3: {
    marginTop: 0,
    marginBottom: 0,
    fontSize: fontSizeToMS(.6).fontSize,
    lineHeight: fontSizeToMS(.6).lineHeight,
  },
  hr: {
    marginTop: rhythm(0.5),
    marginBottom: rhythm(0.5),
    backgroundColor: 'gray',
  },
  img: {
    margin: 0,
    border: 0,
    width: `${logoSize}px`,
    height: `${logoSize}px`,
    verticalAlign: 'middle',
  },
  smallerImg: {
    margin: 0,
    marginTop: '-4px',
    border: 0,
    width: `${smallerLogoSize}px`,
    height: `${smallerLogoSize}px`,
    verticalAlign: 'middle',
  },
  Link: {
    boxShadow: 'none',
    textDecoration: 'none',
    color: 'inherit',
  },
  Container: {
    maxWidth: rhythm(26),
    padding: rhythm(0.75),
  },
};
class Template extends React.Component {
  get navItems () {
    const navItems = [
      ['Home', '/'],
      ['Posts', '/posts/'],
      ['Projects', '/projects/'],
      ['About', '/about/'],
    ];

    navItems.forEach((navItem) => {
      navItem[1] = prefixLink(navItem[1]);
    });

    return navItems;
  }

  get nav () {
    return (
      <span>
        {this.navItems.map((navItem) => {
          return <Link to={prefixLink(navItem[1])}>{navItem[0]}</Link>;
        }).reduce((accu, elem) => {
          return accu === null ? [elem] : [...accu, ' | ', elem];
        }, null)}
      </span>
    );
  }

  get headerContents () {
    const { location } = this.props;
    if (includes(flatten(this.navItems), location.pathname)) {
      return (
      <div>
        <h1 style={style.h1}>
          <Link style={style.Link} to={prefixLink('/')} >
            <img src={prefixLink('/icon.png')} style={style.img} /> {config.blogTitle}
          </Link>
        </h1>
        <h2 style={style.h2}>
          {config.subTitle}
        </h2>
      </div>
    );
    } else {
      return (
      <div>
        <h3 style={style.h3}>
          <Link style={style.Link} to={prefixLink('/')} >
            <img src={prefixLink('/icon.png')} style={style.smallerImg} /> {config.blogTitle}
          </Link>
        </h3>
      </div>
    );
    }
  }

  render () {
    const { children } = this.props;
    return (
      <Container style={style.Container}>
        <header style={style.header}>
          {this.headerContents}
          <hr style={style.hr} />
          {this.nav}
        </header>
        {children}
      </Container>
    );
  }
}

Template.propTypes = {
  children: React.PropTypes.any,
  location: React.PropTypes.object,
  route: React.PropTypes.object,
};

export default Template;
