import React from "react";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import tw from "tailwind.macro";
import { Helmet } from "react-helmet";
import DesignSectionsSideNav from "../components/DesignSectionsSideNav";
import DesignSections from "../components/DesignSections";

const Container = styled.span`
  ${tw`flex`}
  height: auto;
`;

const remapByContentfulId = assetMapping => {
  const newMapping = {};
  Object.keys(assetMapping).forEach(assetName => {
    const asset = assetMapping[assetName];
    const contentfulId = asset.contentful_id;
    newMapping[contentfulId] = asset;
  });
  return newMapping;
};

class DesignPostTemplate extends React.Component {
  render() {
    const { post, resume, portfolio } = this.props.data;
    const { nextPath } = this.props.pageContext;
    const responsiveAssetsByCid = remapByContentfulId({ resume, portfolio });

    return (
      <>
        <Helmet>
          {post.description && (
            <meta property="og:description" content={post.description} />
          )}
          {post.description && (
            <meta name="description" content={post.description} />
          )}
          <title>{post.title.replace(/["'$%@#]/g, "")}</title>
          <meta
            property="og:title"
            content={`Nick Mason | ${post.title.replace(/["'$%@#]/g, "")}`}
          />
          <meta
            property="og:url"
            content={`https://www.nickbmason.com/${post.category.slug}/${post.slug}`}
          />
          <meta property="og:type" content="article" />
          <meta
            property="og:image"
            content={`https://www.nickbmason.com${post.thumbnail.localFile.image.fixed.src}`}
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </Helmet>
        <Container>
          <DesignSectionsSideNav sections={post.sections} />
          <DesignSections
            nextPath={nextPath}
            sections={post.sections}
            responsiveAssetsByCid={responsiveAssetsByCid}
          />
        </Container>
      </>
    );
  }
}

export default DesignPostTemplate;

export const pageQuery = graphql`
  query($id: String!) {
    ...ResumeFragment
    ...PortfolioFragment
    post: contentfulDesignPost(id: { eq: $id }) {
      description
      title
      slug
      category {
        slug
      }
      thumbnail {
        localFile {
          ...OpenGraphImage
        }
      }
      sections {
        slug
        name
        id
        content: childContentfulDesignPostSectionContentRichTextNode {
          json
        }
        assets: images {
          ...ResponsiveAssetDetailsFragment
        }
      }
    }
  }
`;
