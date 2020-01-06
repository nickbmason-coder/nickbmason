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
