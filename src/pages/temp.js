import React from "react"
import { Link, graphql } from "gatsby"

import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = ({data}) => {

  const { frontmatter } = data.allFile.edges[0].node.childMarkdownRemark
  const relImgPath = frontmatter.featured_image.match(/(?<=\/).*/g)[0];
  
  return (
  <Layout>
    <SEO title="Home" />
    <h1>{frontmatter.title}</h1>
    <p>Welcome to your new Gatsby site.</p>
    <p>Now go build something great.</p>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <Link to="/page-2/">Go to page 2</Link>
  </Layout>
  )
}

export default IndexPage

export const query = graphql`
query {
  allFile (filter: {sourceInstanceName: {eq: "content"} name: {eq: "homepage"}}){
    edges {
      node {
        childMarkdownRemark {
          frontmatter {
            title
            featured_image
            subtitle
          }
        }
      }
    }
  }
}
`