import { graphql } from "gatsby";

export const SiteMetadata = graphql`
  fragment SiteMetadata on Query {
    siteMetadata: contentfulSiteMetadataDontCreateOnlyEdit(
      contentful_id: { eq: "38qWXfk5FYzybKoA6pilSd" }
    ) {
      designPostsToShow
      artPostsToShow
      contactDescription
      contactAboutMe {
        json
      }
    }
  }
`;

export const OpenGraphImageMetadata = graphql`
  fragment OpenGraphImage on File {
    image: childImageSharp {
      fixed(cropFocus: CENTER, width: 1200, height: 630, quality: 100) {
        src
      }
    }
  }
`;

export const IndexOpenGraphImage = graphql`
  fragment IndexOpenGraphImage on Query {
    image: contentfulAsset(id: { eq: "5c26a977-df85-55cd-82b5-5738b15287b9" }) {
      localFile {
        ...OpenGraphImage
      }
    }
  }
`;

export const ArtworkOpenGraphImage = graphql`
  fragment ArtworkOpenGraphImage on Query {
    image: contentfulAsset(id: { eq: "ebe63b3a-6cf3-5b96-8ffe-175856f6b816" }) {
      localFile {
        ...OpenGraphImage
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
        publicURL
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
        publicURL
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
