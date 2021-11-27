import React from 'react'
import DocumentTitle from 'react-document-title'
import { config } from 'config'

import { rhythm } from 'utils/typography'
import { prefixLink } from 'gatsby-helpers'

import 'font-awesome/css/font-awesome.css'

const style = {
  img: {
    float: 'left',
    marginTop: rhythm(0.25),
    marginRight: rhythm(0.5),
    marginBottom: rhythm(0.5),
    width: rhythm(5),
    height: rhythm(5),
    borderRadius: '50%'
  },
  p: {
    marginBottom: rhythm(0.5)
  },
  h3: {
    marginBottom: rhythm(0.25)
  },
  socialIcon: {
    marginBottom: rhythm(0.5)
  }
}

class PostsIndex extends React.Component {
  get socialIcons () {
    const socialIcons = []
    Object.keys(config.socialNetworks).forEach(network => {
      const URL = config.socialNetworks[network]
      socialIcons.push(
        <a key={URL} href={URL} target='blank_'>
          <span className={`fa fa-${network}`} style={style.socialIcon} />
        </a>
      )
    })

    return (
      <div>
        {socialIcons.reduce(
          (accu, elem) => (accu === null ? [elem] : [...accu, ' | ', elem]),
          null
        )}
      </div>
    )
  }

  render () {
    return (
      <DocumentTitle title={`About - ${config.blogTitle}`}>
        <div>
          <img
            src={prefixLink('/author.png')}
            alt={config.authorName}
            style={style.img}
          />
          <h3 style={style.h3}>{config.authorName}</h3>
          <div>
            <a
              key={'resume'}
              href={'http://stonelinks.github.io/resume/'}
              target='blank_'
            >
              Resume
            </a>
            {' | '}
            <a
              key={'contact'}
              href={'mailto:lucas.p.doyle@gmail.com?Subject=Hello'}
              target='blank_'
            >
              Contact
            </a>
          </div>
          {this.socialIcons}
          <p style={style.p}>
            I'm an engineer who likes building interfaces for robots, autonomous
            vehicles and industrial machinery. Sounds cliche, but making code do
            something in the real world is what excites me.
          </p>
          <p style={style.p}>
            {
              'I have been in San Francisco working on drones the last four-ish years at '
            }
            <a target='blank_' href='https://www.airware.com/'>
              Airware
            </a>
            {
              '. Previously, I spent a couple years in Japan working on optimizing industrial / manufacturing robotics at '
            }
            <a target='blank_' href='http://mujin.co.jp/en/'>
              MUJIN
            </a>
            {
              '. Prior to that, I worked at the Harvard-Smithsonian Center for Astrophysics on an '
            }

            <a
              key={'amf'}
              href={'http://stonelinks.github.io/projects/amf/'}
              target='blank_'
            >
              experimental X-ray optic production facility
            </a>
            {' on an internship / part time basis. Check out my '}
            <a
              key={'resume'}
              href={'http://stonelinks.github.io/resume/'}
              target='blank_'
            >
              Resume
            </a>
            {' or this website if you want to learn more.'}
          </p>
          <p style={style.p}>
            {
              "I'm serious about spending time outdoors away from cities and screens, and continue to enjoy all Northern CA has to offer (which is a lot). Also constantly have random, sometimes useless, usually entertaining side projects going on probably in various states of disarray. "
            }
          </p>
          <p style={style.p}>
            {
              'Hope you enjoy my (probably horribly outdated by now) website! Oh and here is my '
            }
            <a
              target='blank_'
              href='https://gist.github.com/Stonelinks/1df867c1bb830a8c0c67'
            >
              cryptographic proof of identity
            </a>
            {' for all the nerds out there.'}
          </p>
        </div>
      </DocumentTitle>
    )
  }
}

PostsIndex.propTypes = {
  route: React.PropTypes.object
}

export default PostsIndex
