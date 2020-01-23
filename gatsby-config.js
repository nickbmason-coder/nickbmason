const path = require(`path`);

module.exports = {
  siteMetadata: {
    title: `nickbmason.com`,
    description: `Website for the lovely Nick Mason`,
    author: `@mjmaurer`
  },
  plugins: [
    /*
     * TODO: remove
     */
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: `rsz04canjqrs`,
        accessToken: `mnESuzxlJHaYTUEHdDSBjiJA7nSLIzo_o0tD1W690-M`,
        downloadLocal: true
      }
    },
    {
      resolve: `gatsby-plugin-modal-routing`,
      options: {
        // A selector to set react-modal's app root to, default is `#___gatsby`
        // See http://reactcommunity.org/react-modal/accessibility/#app-element
        appElement: "#___gatsby",

        // Object of props that will be passed to the react-modal container
        // See http://reactcommunity.org/react-modal/#usage
        modalProps: {}
      }
    },
    `gatsby-transformer-json`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-sharp`,
    `gatsby-plugin-resolve-src`,
    `gatsby-plugin-glamor`,
    `gatsby-plugin-offline`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `gatsby-starter-default`,
        short_name: `starter`,
        start_url: `/`,
        background_color: `#663399`,
        theme_color: `#663399`,
        display: `minimal-ui`
      }
    },
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography`
      }
    }
  ]
};
