import React from "react"
import PropTypes from "prop-types"
import {
  useStaticQuery,
  graphql,
} from "gatsby"
import {
  FirebaseContext,
  useAuth,
} from "./Firebase"

import Header from "./header"
import "./layout.css"

const Layout = ({ children }) => {
  const { user, firebase, loading } = useAuth()
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <FirebaseContext.Provider value={ {
      user,
      firebase,
      loading,
    } }>
      <Header siteTitle={ data.site.siteMetadata.title }/>
      <div
        style={ {
          margin: `0 auto`,
          maxWidth: 960,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
        } }
      >
        <main>{ children }</main>
        <footer>
        </footer>
      </div>
    </FirebaseContext.Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout
