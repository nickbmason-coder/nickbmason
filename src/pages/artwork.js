import * as PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import tw from "tailwind.macro";
import styled from "@emotion/styled";

import ArtPost from "../components/ArtPost";
import PostsContainer from "../components/PostsContainer";

const ArtContainer = styled(PostsContainer)`
  ${tw`justify-around`}
`;

class Artwork extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      allContentfulArtPost: PropTypes.object,
      totalCount: PropTypes.number,
      siteMetadata: PropTypes.shape({
        artPostsToShow: PropTypes.number.isRequired
      }).isRequired
    }).isRequired
  };

  render() {
    const { allContentfulArtPost, siteMetadata } = this.props.data;
    const posts = allContentfulArtPost.edges.map(e => e.node);

    return (
      <ArtContainer
        initialPosts={siteMetadata.artPostsToShow}
        maxPosts={allContentfulArtPost.totalCount}
        name="Artwork"
        renderPost={post => <ArtPost key={post.id} post={post} />}
      >
        {posts}
      </ArtContainer>
    );
  }
}

export default Artwork;

export const pageQuery = graphql`
  query {
    ...SiteMetadata
    allContentfulArtPost {
      totalCount
      edges {
        node {
          id
          ...ArtPostDetails
        }
      }
    }
  }
`;
