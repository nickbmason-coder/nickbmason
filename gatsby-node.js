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
      categories: allContentfulDesignPostCategory(sort: { fields: name }) {
        edges {
          node {
            id
            slug
          }
        }
      }
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

const createArtPosts = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      artPosts: allContentfulArtPost {
        edges {
          node {
            id
            slug
          }
          next {
            slug
          }
          previous {
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const artPostTemplate = path.resolve(`src/templates/ArtPostTemplate.js`);
  result.data.artPosts.edges.forEach(edge => {
    createPage({
      path: `/artwork/${slug(edge.node.slug)}/`,
      component: slash(artPostTemplate),
      context: {
        previousPath: edge.previous
          ? `/artwork/${slug(edge.previous.slug)}/`
          : null,
        nextPath: edge.next ? `/artwork/${slug(edge.next.slug)}/` : null,
        id: edge.node.id
      }
    });
  });
};

const createDesignPosts = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions;

  const result = await graphql(`
    query {
      designPosts: allContentfulDesignPost {
        edges {
          node {
            id
            slug
          }
        }
      }
    }
  `);

  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`);
    return;
  }

  const designPostTemplate = path.resolve(
    `src/templates/DesignPostTemplate.js`
  );
  result.data.designPosts.edges.forEach(edge => {
    createPage({
      path: `/${slug(edge.node.slug)}/`,
      component: slash(designPostTemplate),
      context: {
        id: edge.node.id
      }
    });
  });
};

exports.createPages = async ({ graphql, actions, reporter }) => {
  await createDesignCategories({ graphql, actions, reporter });
  await createDesignPosts({ graphql, actions, reporter });
  await createArtPosts({ graphql, actions, reporter });
};
