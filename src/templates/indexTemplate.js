import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

export default function indexTemplate({data}) {

    const { title, subtitle } = data.post.edges[0].node.childMarkdownRemark.frontmatter
  return (
    <div>
      <h1>{title}</h1>
      <Img fluid={data.image.childImageSharp.fluid} style={{
          position: 'fixed',
          width: '100vw',
          height: '100vh',
          zIndex: -5,
          top: 0,
          left: 0
      }}/>
      <p>{subtitle}</p>
    </div>
  )
}

export const query = graphql`
  query($hero_image: String!) {
    post: allFile(
      filter: {
        sourceInstanceName: { eq: "content" }
        name: { eq: "homepage" }
      }
    ) {
      edges {
        node {
          childMarkdownRemark {
            frontmatter {
              title
              subtitle
            }
          }
        }
      }
    }
    image: file(relativePath: { eq: $hero_image }) {
      childImageSharp {
        fluid(maxWidth: 2000, maxHeight: 700) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
