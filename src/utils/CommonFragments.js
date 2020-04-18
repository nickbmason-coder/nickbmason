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
    image: contentfulAsset(id: { eq: "cd41d3f2-3ebc-5581-8a74-9cb21e3574af" }) {
      localFile {
        ...OpenGraphImage
      }
    }
  }
`;

export const ArtworkOpenGraphImage = graphql`
  fragment ArtworkOpenGraphImage on Query {
    image: contentfulAsset(id: { eq: "64da0b8c-88b6-56ae-bb34-e7a83314c779" }) {
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

export const ResponsivePortfolioFragment = graphql`
  fragment PortfolioFragment on Query {
    portfolio: contentfulResponsiveAsset(
      id: { eq: "d42ea673-aa4f-5003-aebf-46b2a74fb739" }
    ) {
      desktopAsset: desktopImage {
        localFile {
          localURL
        }
      }
      mobileAsset: mobileImage {
        localFile {
          localURL
        }
      }
    }
  }
`;

export const ResponsiveResumeFragment = graphql`
  fragment ResumeFragment on Query {
    resume: contentfulResponsiveAsset(
      id: { eq: "4cb0dd65-3530-5585-a993-6479e5a5ca4d" }
    ) {
      desktopAsset: desktopImage {
        localFile {
          localURL
        }
      }
      mobileAsset: mobileImage {
        localFile {
          localURL
        }
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
