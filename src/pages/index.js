import * as PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";

import DesignPost from "../components/DesignPost";
import PostsContainer from "../components/PostsContainer";

class Index extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      allContentfulDesignPost: PropTypes.object.isRequired,
      siteMetadata: PropTypes.shape({
        designPostsToShow: PropTypes.number.isRequired
      }).isRequired,
      artpic: PropTypes.shape({
        id: PropTypes.string.isRequired
      }).isRequired
    }).isRequired
  };

  render() {
    const { allContentfulDesignPost, siteMetadata, artpic } = this.props.data;
    const posts = allContentfulDesignPost.edges.map(e => e.node);
    const artPost = {
      id: artpic.id,
      title: "Artwork",
      slug: "artwork",
      noCategory: true,
      thumbnail: artpic
    };
    posts.splice(2, 0, artPost);

    return (
      <PostsContainer
        initialPosts={siteMetadata.designPostsToShow}
        maxPosts={allContentfulDesignPost.totalCount}
        name="Designwork"
        renderPost={post => <DesignPost key={post.id} post={post} />}
      >
        {posts}
      </PostsContainer>
    );
  }
}

export default Index;

export const pageQuery = graphql`
  query {
    ...SiteMetadata
    allContentfulDesignPost {
      ...DesignGalleryFragment
    }
    artpic: contentfulAsset(
      id: { eq: "66a47e22-b91d-51f5-bf9f-4235061d2350" }
    ) {
      id
      localFile {
        childImageSharp {
          fluid(webpQuality: 100, maxWidth: 2000) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
`;
