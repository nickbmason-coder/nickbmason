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
      }).isRequired
    }).isRequired
  };

  render() {
    const { allContentfulDesignPost, siteMetadata } = this.props.data;
    const posts = allContentfulDesignPost.edges.map(e => e.node);

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
      totalCount
      edges {
        node {
          id
          ...DesignPostDetails
        }
      }
    }
  }
`;
