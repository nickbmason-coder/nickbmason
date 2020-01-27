import * as PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";

import DesignPost from "../components/DesignPost";
import PostsContainer from "../components/PostsContainer";

class DesignCategoryGalleryTemplate extends React.Component {
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
    const { allContentfulDesignPost, siteMetadata, category } = this.props.data;
    const posts = allContentfulDesignPost.edges.map(e => e.node);

    return (
      <PostsContainer
        initialPosts={siteMetadata.designPostsToShow}
        maxPosts={allContentfulDesignPost.totalCount}
        name={category.name}
        renderPost={(post, i) => (
          <DesignPost crit={i < 2} key={post.id} post={post} />
        )}
      >
        {posts}
      </PostsContainer>
    );
  }
}

export default DesignCategoryGalleryTemplate;

export const pageQuery = graphql`
  query($id: String!) {
    ...SiteMetadata
    category: contentfulDesignPostCategory(id: { eq: $id }) {
      name
    }
    allContentfulDesignPost(filter: { category: { id: { eq: $id } } }) {
      ...DesignGalleryFragment
    }
  }
`;
