import React from "react";
import { graphql } from "gatsby";

export default function Template({
  data // this prop will be injected by the GraphQL query below.
}) {
  const { markdownRemark } = data; // data.markdownRemark holds your post data
  const { frontmatter, html } = markdownRemark;
  return (
    <div className="blog-post-container">
      <div className="blog-post">
      <img src={frontmatter.featured_image} style={{
        display: 'block',
        maxWidth: '50%',
        margin: 'auto'
      }}></img>
        <h1>{frontmatter.title}</h1>
        <h2>{frontmatter.date}</h2>
        <div
          className="blog-post-content"
          dangerouslySetInnerHTML={{ __html: html }}
        />
      </div>
    </div>
  );
}
export const pageQuery = graphql`
  query($path: String!) {
    markdownRemark(fields: { slug: { eq: $path } }) {
      html
      frontmatter {
        date(formatString: "D/M/YYYY HH:mm")
        title
        featured_image
      }
    }
  }
`;