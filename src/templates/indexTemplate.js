import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

import BackgroundImage from 'gatsby-background-image'

export default function indexTemplate({data}) {

    const { title, subtitle } = data.post.edges[0].node.childMarkdownRemark.frontmatter
  return (
    <div>
      <BackgroundImage
        tag="div"
        fluid={data.image.childImageSharp.fluid}
        backgroundColor="#333333"
        style={{
            backgroundSize: "cover",
            minHeight: "100vh"
        }}
      >
          <h1>{title}</h1>
          <p>{subtitle}</p>
      </BackgroundImage>
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
        fluid(maxWidth: 2500) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
