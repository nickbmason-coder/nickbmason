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
      resolve: `gatsby-transformer-remote-filesystem`,
      options: {
        fingerprintDirectory: true,
        mediaTypes: [
          "application/pdf",
          "video/mp4",
          "video/quicktime",
          "video/x-msvideo",
          "audio/mpeg",
          "audio/mp4"
        ]
      }
    },
    `gatsby-transformer-sharp`,
    {
      resolve: `gatsby-plugin-canonical-urls`,
      options: {
        siteUrl: `https://nickbmason.com`
      }
    },
    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-postcss`,
    `gatsby-plugin-netlify`,
    "gatsby-plugin-brotli",
    `gatsby-plugin-sharp`,
    `gatsby-plugin-netlify`,
    `gatsby-plugin-remove-fingerprints`,
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
      resolve: `gatsby-plugin-google-fonts`,
      options: {
        fonts: [
          `roboto`,
        ],
        display: 'swap'
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
