import * as PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import tw from "tailwind.macro";
import DesignSectionsSideNav from "../components/DesignSectionsSideNav";
import DesignSections from "../components/DesignSections";

const Container = styled.span`
  ${tw`flex pl-side pr-side pt-side`}
  height: auto;
`;

class DesignPostTemplate extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      allContentfulDesignPost: PropTypes.object.isRequired,
      siteMetadata: PropTypes.shape({
        designPostsToShow: PropTypes.number.isRequired
      }).isRequired,
      category: PropTypes.shape({
        name: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  };

  render() {
    const { post } = this.props.data;

    return (
      <Container>
        <DesignSectionsSideNav sections={post.sections} />
        <DesignSections sections={post.sections} />
      </Container>
    );
  }
}

export default DesignPostTemplate;

export const pageQuery = graphql`
  query($id: String!) {
    post: contentfulDesignPost(id: { eq: $id }) {
      title
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
