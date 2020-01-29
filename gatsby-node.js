const path = require(`path`);
const { createFilePath } = require("gatsby-source-filesystem");
const { fmImagesToRelative } = require('gatsby-remark-relative-images');

// The slug (the url) is not exposed to GraphQL by default so we need to pass it through manually.
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  fmImagesToRelative(node)

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode });
    createNodeField({
      name: `slug`,
      node,
      value
    });
  }
};

// Here is where we create pages for our blog
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions;
  const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`);

  // First, we need to grab all the blogs, sorting them by date
  const result = await graphql(`
    {
      allMarkdownRemark(
        sort: { order: DESC, fields: [frontmatter___date] }
        limit: 1000
      ) {
        edges {
          node {
            fields {
              slug
            }
            frontmatter {
              featured_image
            }
          }
        }
      }
    }
  `);
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }
  // If no errors, then we can generate a page for each post, passing in the slug as a path.*
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {

    const relImgPath = node.frontmatter.featured_image.match(/(?<=\/).*/g);

    createPage({
      path: node.fields.slug,
      component: blogPostTemplate,
      context: {
        featured_image: relImgPath[0]
      } // additional data can be passed via context
    });
  });
};