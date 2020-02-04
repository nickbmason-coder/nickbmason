import { graphql } from "gatsby";

export const SiteMetadata = graphql`
  fragment SiteMetadata on Query {
    siteMetadata: contentfulSiteMetadataDontCreateOnlyEdit(
      contentful_id: { eq: "38qWXfk5FYzybKoA6pilSd" }
    ) {
      designPostsToShow
      artPostsToShow
      contactAboutMe {
        json
      }
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

export const PortfolioFragment = graphql`
  fragment PortfolioFragment on Query {
    portfolio: contentfulAsset(
      id: { eq: "bf307660-d0dc-5234-abe2-e258e8638917" }
    ) {
      localFile {
        url
      }
    }
  }
`;

export const ResumeFragment = graphql`
  fragment ResumeFragment on Query {
    resume: contentfulAsset(
      id: { eq: "db85e8cc-fabe-528b-9fb5-5aba912039ab" }
    ) {
      localFile {
        url
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
