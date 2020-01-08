import * as PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import styled from "@emotion/styled";
import tw from "tailwind.macro";
import SideSectionsNav from "../components/SideSectionsNav";

const Container = styled.span`
  ${tw`flex`}
  height: auto;
`;
// just position nav like normal (fixed with vh and with writing mode vert text). have the added padding component be a flex item
const ContainerText = styled.div`
  ${tw`flex-1`}
  height: 100%;
`;

const NavContainer = styled.nav`
  ${tw`z-40 flex items-center justify-center flex-none w-16 mr-0 text-black`}
  height: 90vh;
  top: 0;
  left: 0;
  writing-mode: vertical-lr;
`;

const NavContent = styled.div`
  ${tw`inline my-1`}
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
        <SideSectionsNav sections={post.sections} />
        <ContainerText>fuck fuck fuck</ContainerText>
      </Container>
    );

    // return <DesignSectionsNav sections={post.sections} />;
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
