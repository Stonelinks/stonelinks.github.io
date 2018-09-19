import React from "react";
import DocumentTitle from "react-document-title";
import { config } from "config";

import { Link } from "react-router";
import { rhythm } from "utils/typography";
import { prefixLink } from "gatsby-helpers";

import "font-awesome/css/font-awesome.css";

const style = {
  img: {
    float: "left",
    marginTop: rhythm(0.25),
    marginRight: rhythm(0.5),
    marginBottom: rhythm(0.5),
    width: rhythm(5),
    height: rhythm(5),
    borderRadius: "50%"
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
};

class PostsIndex extends React.Component {
  get socialIcons() {
    const socialIcons = [];
    Object.keys(config.socialNetworks).forEach(network => {
      const URL = config.socialNetworks[network];
      socialIcons.push(
        <a key={URL} href={URL} target="blank_">
          <span className={`fa fa-${network}`} style={style.socialIcon} />
        </a>
      );
    });

    return (
      <div>
        {socialIcons.reduce(
          (accu, elem) => (accu === null ? [elem] : [...accu, " | ", elem]),
          null
        )}
      </div>
    );
  }

  render() {
    return (
      <DocumentTitle title={`About - ${config.blogTitle}`}>
        <div>
          <img
            src={prefixLink("/author.png")}
            alt={config.authorName}
            style={style.img}
          />
          <h3 style={style.h3}>{config.authorName}</h3>
          <div>
            <a
              key={"resume"}
              href={"http://stonelinks.github.io/resume/"}
              target="blank_"
            >
              Resume
            </a>
            {" | "}
            <a
              key={"contact"}
              href={"mailto:lucas.p.doyle@gmail.com?Subject=Hello"}
              target="blank_"
            >
              Contact
            </a>
          </div>
          {this.socialIcons}
          <p style={style.p}>
            I'm an engineer who likes building interfaces to robots, autonomous
            vehicles and automated machinery.
          </p>
          <p style={style.p}>
            {"I spent a couple years in Japan working in industrial / manufacturing robotics at "}
            <a target="blank_" href="http://mujin.co.jp/en/">
              MUJIN
            </a>
            {", and have been in San Francisco working on drones at "}
            <a target="blank_" href="https://www.airware.com/">
              Airware
            </a>
            {" since 2014. Prior to that, I worked at the Harvard-Smithsonian Center for Astrophysics on an experimental X-ray optic production facility on an internship / part time basis. Check out my "}
            <a
              key={"resume"}
              href={"http://stonelinks.github.io/resume/"}
              target="blank_"
            >
              Resume
            </a>
            {" or this website if you want to learn more."}
          </p>
          <p style={style.p}>
            {"I constantly have side projects going on and I'm most excited when I'm learning new things and making technology useful for other people. I'm also serious about spending as much time possible outdoors away from cities and screens."}
          </p>
          <p style={style.p}>
            {"Here is my "}
            <a
              target="blank_"
              href="https://gist.github.com/Stonelinks/1df867c1bb830a8c0c67"
            >
              cryptographic proof of identity
            </a>
            {" for all the nerds out there."}
          </p>
        </div>
      </DocumentTitle>
    );
  }
}

PostsIndex.propTypes = {
  route: React.PropTypes.object
};

export default PostsIndex;
