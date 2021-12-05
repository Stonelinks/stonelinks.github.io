import * as React from "react"
import { Link } from "gatsby"
import { StaticImage } from "gatsby-plugin-image"

declare var __PATH_PREFIX__: string

const Layout = ({ location, title, children }) => {
  const rootPath = `${__PATH_PREFIX__}/`
  const isRootPath = location.pathname === rootPath
  let header

  if (isRootPath) {
    header = (
      <h1 className="main-heading">
        <Link to="/">{title}</Link>
      </h1>
    )
  } else {
    header = (
      <h1 className="header-link-home">
        <Link to="/">{title}</Link>
      </h1>
    )
  }

  return (
    <div className="global-wrapper" data-is-root-path={isRootPath}>
      <header className="global-header">
        <StaticImage
          className="header-img"
          layout="fixed"
          formats={["auto", "webp", "avif"]}
          src="../images/icon.png"
          width={80}
          height={80}
          quality={95}
          alt="Logo"
        />

        {header}
        <span>
          <Link className="header-link-nav" to="/">
            Home
          </Link>
          {" | "}
          <Link className="header-link-nav" to="/todo">
            Posts
          </Link>
          {" | "}
          <Link className="header-link-nav" to="/todo">
            Projects
          </Link>
          {" | "}
          <Link className="header-link-nav" to="/todo">
            About
          </Link>
        </span>
      </header>
      <main>{children}</main>
      <footer>© {new Date().getFullYear()}</footer>
    </div>
  )
}

export default Layout
