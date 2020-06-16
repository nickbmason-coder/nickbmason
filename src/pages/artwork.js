import React from "react";
import { graphql } from "gatsby";
import tw from "twin.macro";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet";

import ArtPost from "../components/ArtPost";
import PostsContainer from "../components/PostsContainer";

const ArtworkPostsContainer = styled(PostsContainer)`
  ${tw`justify-around pl-side pr-side`}
`;

class Artwork extends React.Component {
  render() {
    const { allContentfulArtPost, siteMetadata, image } = this.props.data;
    const posts = allContentfulArtPost.edges.map(e => e.node);

    return (
      <>
        <Helmet>
          <title>Artwork</title>
          <meta property="og:title" content="Nick Mason | Artwork" />
          <meta
            property="og:url"
            content="https://www.nickbmason.com/artwork"
          />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content={`https://www.nickbmason.com${image.localFile.image.fixed.src}`}
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </Helmet>
        <ArtworkPostsContainer
          initialPosts={siteMetadata.artPostsToShow}
          maxPosts={allContentfulArtPost.totalCount}
          name="Artwork"
          renderPost={(post, i) => (
            <ArtPost crit={i < 4} key={post.id} post={post} />
          )}
        >
          {posts}
        </ArtworkPostsContainer>
      </>
    );
  }
}

export default Artwork;

export const pageQuery = graphql`
  query {
    ...SiteMetadata
    ...ArtworkOpenGraphImage
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
