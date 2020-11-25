import React, { useState } from "react";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import tw from "twin.macro";
import { Helmet } from "react-helmet";
import DesignSectionsSideNav from "../components/DesignSectionsSideNav";
import DesignSections from "../components/DesignSections";

const Container = styled.span`
  ${tw`flex`}
  height: auto;
`;

const remapByContentfulId = assetNodes => {
  const newMapping = {};
  assetNodes.forEach(asset => {
    const contentfulId = asset.contentful_id;
    newMapping[contentfulId] = asset;
  });
  return newMapping;
};

const DesignPostTemplate = props => {
  const [currentSection, setCurrentSection] = useState(
    props.data.post.sections[0].slug
  );

  const { post, pdfAssets } = props.data;
  const { nextPath } = props.pageContext;
  const responsiveAssetsByCid = remapByContentfulId(pdfAssets.nodes);

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
        <DesignSectionsSideNav
          currentSection={currentSection}
          sections={post.sections}
        />
        <DesignSections
          nextPath={nextPath}
          sections={post.sections}
          setCurrentSection={setCurrentSection}
          responsiveAssetsByCid={responsiveAssetsByCid}
        />
      </Container>
    </>
  );
};

export default DesignPostTemplate;

export const pageQuery = graphql`
  query($id: String!) {
    ...PdfResponsiveAssetsFragment
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
        hasPadding
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
