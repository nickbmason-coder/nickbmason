import React from "react";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import tw from "tailwind.macro";
import { Helmet } from "react-helmet";
import DesignSectionsSideNav from "../components/DesignSectionsSideNav";
import DesignSections from "../components/DesignSections";

const Container = styled.span`
  ${tw`flex pl-side pr-side pt-side`}
  height: auto;
`;

class DesignPostTemplate extends React.Component {
  render() {
    const { post } = this.props.data;

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
            content={`${post.title.replace(/["'$%@#]/g, "")} | Nick Mason`}
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
          <DesignSections sections={post.sections} />
        </Container>
      </>
    );
  }
}

export default DesignPostTemplate;

export const pageQuery = graphql`
  query($id: String!) {
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
      }
    }
  }
`;
