import React from "react";
import { graphql } from "gatsby";
import { Helmet } from "react-helmet";

import DesignPost from "../components/DesignPost";
import PostsContainer from "../components/PostsContainer";

class DesignCategoryGalleryTemplate extends React.Component {
  render() {
    const { allContentfulDesignPost, siteMetadata, category } = this.props.data;
    const posts = allContentfulDesignPost.edges.map(e => e.node);

    return (
      <>
        <Helmet>
          {category.description && (
            <meta name="description" content={category.description} />
          )}
          {category.description && (
            <meta property="og:description" content={category.description} />
          )}
          <title>{category.name}</title>
          <meta property="og:title" content={`Nick Mason | ${category.name}`} />
          <meta
            property="og:url"
            content={`https://www.nickbmason.com/${category.slug}`}
          />
          <meta property="og:type" content="website" />
        </Helmet>
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
      </>
    );
  }
}

export default DesignCategoryGalleryTemplate;

export const pageQuery = graphql`
  query($id: String!) {
    ...SiteMetadata
    category: contentfulDesignPostCategory(id: { eq: $id }) {
      name
      description
      slug
    }
    allContentfulDesignPost(filter: { category: { id: { eq: $id } } }) {
      ...DesignGalleryFragment
    }
  }
`;
