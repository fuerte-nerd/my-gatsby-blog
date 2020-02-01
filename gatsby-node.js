const path = require(`path`)
const { createFilePath } = require("gatsby-source-filesystem")

// The slug is not exposed to GraphQL by default so we need to pass it through manually.
exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions

  if (node.internal.type === `MarkdownRemark`) {
    const value = createFilePath({ node, getNode })
    createNodeField({
      name: `slug`,
      node,
      value,
    })
  }
}

const getRelativePath = url => {
  return url.match(/(?<=\/).*/g)[0]
}

// Here is where we create pages for our blog
exports.createPages = async ({ actions, graphql, reporter }) => {
  const { createPage } = actions
  const blogPostTemplate = path.resolve(`src/templates/blogTemplate.js`)

  // First, we need to grab all the blogs, sorting them by date and get the featured images
  const blogResult = await graphql(`
    {
      allFile(
        filter: { sourceInstanceName: { eq: "blog" } }
        sort: { order: DESC, fields: childMarkdownRemark___frontmatter___date }
      ) {
        edges {
          node {
            childMarkdownRemark {
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
    }
  `)
  // Handle errors
  if (blogResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  // If no errors, then we can generate a page for each post, passing in the slug as a path.*
  blogResult.data.allFile.edges.forEach(({ node }) => {
    // const relImgPath = getRelativePath(node.frontmatter.featured_image);

    createPage({
      path: node.childMarkdownRemark.fields.slug,
      component: blogPostTemplate,
      context: {
        featured_image: getRelativePath(node.childMarkdownRemark.frontmatter.featured_image),
      }, // additional data can be passed via context
    })
  })

  const indexTemplate = path.resolve(`src/templates/indexTemplate.js`)

  const homepageResult = await graphql(`
    {
      allFile(
        filter: {
          sourceInstanceName: { eq: "content" }
          name: { eq: "homepage" }
        }
      ) {
        edges {
          node {
            childMarkdownRemark {
              frontmatter {
                hero_image
              }
            }
          }
        }
      }
    }
  `)
  if (homepageResult.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  createPage({
    path: "/",
    component: indexTemplate,
    context: {
      hero_image: getRelativePath(
        homepageResult.data.allFile.edges[0].node.childMarkdownRemark.frontmatter.hero_image
      ),
    },
  })
}
