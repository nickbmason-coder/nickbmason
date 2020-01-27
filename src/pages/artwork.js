import * as PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import tw from "tailwind.macro";
import styled from "@emotion/styled";

import ArtPost from "../components/ArtPost";
import PostsContainer from "../components/PostsContainer";

const ArtworkPostsContainer = styled(PostsContainer)`
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
    // return (
    //   <ModalRoutingContext.Consumer>
    //     {({ modal, closeTo }) => (
    //       <div>
    //         {modal ? (
    //           <Link to={closeTo}>Close</Link>
    //         ) : (
    //           <header>
    //             <h1>Website Title</h1>
    //           </header>
    //         )}

    //         <h2>Modal Page</h2>

    //         <Link to="/">Go back to the homepage</Link>
    //       </div>
    //     )}
    //   </ModalRoutingContext.Consumer>
    // );

    return (
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
