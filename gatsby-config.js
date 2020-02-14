const path = require(`path`);
require(`dotenv`).config({
  path: `.env.${process.env.NODE_ENV}`
});

module.exports = {
  siteMetadata: {
    title: `nickbmason.com`,
    description: `Website for the lovely Nick Mason`,
    author: `@mjmaurer`
  },
  plugins: [
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `rsz04canjqrs`,
        accessToken: process.env.CONTENTFUL_TOKEN,
        host: process.env.CONTENTFUL_HOST,
        downloadLocal: true
      }
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `pages`,
        path: `${__dirname}/src/pages/`
      }
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-postcss`,
    "gatsby-plugin-brotli",
    `gatsby-plugin-sharp`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-resolve-src`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Nick Mason`,
        start_url: `/`,
        icon: `src/assets/favicon.png`,
        background_color: `#fff1e9`,
        theme_color: `#000000`,
        display: `browser`
      }
    },
    {
      resolve: "gatsby-plugin-react-svg",
      options: {
        rule: {
          include: /assets/,
          options: {
            props: {
              width: "40",
              height: "40"
            }
          }
        }
      }
    }
  ]
};
