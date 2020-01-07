import { graphql } from "gatsby";

export const SiteMetadata = graphql`
  fragment SiteMetadata on Query {
    siteMetadata: contentfulSiteMetadataDontCreateOnlyEdit(
      contentful_id: { eq: "38qWXfk5FYzybKoA6pilSd" }
    ) {
      designPostsToShow
      artPostsToShow
    }
  }
`;

export const DesignGalleryFragment = graphql`
  fragment DesignGalleryFragment on ContentfulDesignPostConnection {
    totalCount
    edges {
      node {
        id
        ...DesignPostDetails
      }
    }
  }
`;

export const CategoriesFragment = graphql`
  fragment CategoriesFragment on Query {
    categories: allContentfulDesignPostCategory(sort: { fields: name }) {
      edges {
        node {
          id
          name
          slug
        }
      }
    }
  }
`;
