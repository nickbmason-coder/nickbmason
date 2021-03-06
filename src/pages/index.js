import React from "react";
import { graphql } from "gatsby";

import { Helmet } from "react-helmet";
import DesignPost from "../components/DesignPost";
import PostsContainer from "../components/PostsContainer";

class Index extends React.Component {
  render() {
    const { allContentfulDesignPost, siteMetadata, image } = this.props.data;
    const posts = allContentfulDesignPost.edges
      .map(e => e.node)
      .filter(node => !node.hiddenOnAll);

    return (
      <>
        <Helmet>
          <meta name="description" content={siteMetadata.contactDescription} />
          <meta
            property="og:description"
            content={siteMetadata.contactDescription}
          />
          <meta property="og:title" content="Nick Mason" />
          <meta property="og:url" content="https://www.nickbmason.com" />
          <meta property="og:type" content="website" />
          <meta
            property="og:image"
            content={`https://www.nickbmason.com${image.localFile.image.fixed.src}`}
          />
          <meta property="og:image:width" content="1200" />
          <meta property="og:image:height" content="630" />
        </Helmet>
        <PostsContainer
          initialPosts={siteMetadata.designPostsToShow}
          maxPosts={allContentfulDesignPost.totalCount}
          name="Designwork"
          renderPost={post => <DesignPost key={post.id} post={post} />}
        >
          {posts}
        </PostsContainer>
      </>
    );
  }
}

export default Index;

export const pageQuery = graphql`
  query {
    ...SiteMetadata
    ...IndexOpenGraphImage
    allContentfulDesignPost {
      ...DesignGalleryFragment
    }
  }
`;
