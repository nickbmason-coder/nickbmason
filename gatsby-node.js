const path = require(`path`);
const slug = require(`slug`);
const slash = require(`slash`);

exports.onCreateWebpackConfig = ({ actions, getConfig }) => {
  // Hack due to Tailwind ^1.1.0 using `reduce-css-calc` which assumes node
  // https://github.com/bradlc/babel-plugin-tailwind-components/issues/39#issuecomment-526892633
  const config = getConfig();
  config.node = {
    fs: "empty"
  };
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  // Post is a data node type derived from data/posts.json
  // “allPostsJson” is a "connection"
  const result = await graphql(
    `
      {
        allPostsJson(limit: 1000) {
          edges {
            node {
              id
            }
          }
        }
      }
    `
  );

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const postTemplate = path.resolve(`src/templates/post-page.js`);
  // already includes an ID field, we just use that for
  // each page's path.
  result.data.allPostsJson.edges.forEach(edge => {
    createPage({
      // Each page is required to have a `path` as well
      // as a template component. The `context` is
      // optional but is often necessary so the template
      // can query data specific to each page.
      path: `/${slug(edge.node.id)}/`,
      component: slash(postTemplate),
      context: {
        id: edge.node.id
      }
    });
  });
};
