import React from "react"
import { graphql } from "gatsby"
import Img from "gatsby-image"

export default function Template({
  data, // this prop will be injected by the GraphQL query below.
}) {
  // const { markdownRemark } = data // data.markdownRemark holds your post data
  // const { frontmatter, html } = markdownRemark
  return (
    <div className="blog-post-container">
      <div className="blog-post">
        <div style={{
          width: '75%',
          margin: 'auto'
        }}>
          <Img fluid={data.featured_image.childImageSharp.fluid} />
        </div>
        
        <h1>{data.post.frontmatter.title}</h1>
        <h2>{data.post.frontmatter.date}</h2>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: data.post.html }}
        /> 
      </div>
    </div>
  )
}
export const pageQuery = graphql`
  query($path: String!, $featured_image: String!) {
    post: markdownRemark(fields: { slug: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "D/M/YYYY HH:mm")
        title
      }
    }

    featured_image: file(relativePath: { eq: $featured_image }) {
      childImageSharp {
        fluid(maxWidth: 2000) {
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`
