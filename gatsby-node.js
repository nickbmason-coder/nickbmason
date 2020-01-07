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

const createDesignCategories = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      ...CategoriesFragment
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const galleryTemplate = path.resolve(
    `src/templates/DesignCategoryGalleryTemplate.js`
  );
  result.data.categories.edges.forEach(edge => {
    createPage({
      path: `/${slug(edge.node.slug)}/`,
      component: slash(galleryTemplate),
      context: {
        id: edge.node.id
      }
    });
  });
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createDesignCategories({ graphql, actions, reporter });
};
