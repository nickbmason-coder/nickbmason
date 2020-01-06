import * as PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";

class PostTemplate extends React.Component {
  static propTypes = {
    data: PropTypes.shape({
      postsJson: PropTypes.object.isRequired
    }).isRequired,
    location: PropTypes.object.isRequired
  };

  render() {
    const { location, data } = this.props;
    // let isModal = false;
    // if (!windowWidth && typeof window !== `undefined`) {
    //   windowWidth = window.innerWidth;
    // }
    // if (this.props.isModal && windowWidth > 750) {
    //   isModal = true;
    // }

    // if (isModal && Modal) {
    //   return (
    //     <>
    //       <PageRenderer location={{ pathname: `/` }} />
    //       <Modal isOpen location={location}>
    //         {this.props.children}
    //       </Modal>
    //     </>
    //   );
    // }
    // We don't want to show the modal if a user navigates
    // directly to a post so if this code is running on Gatsby's
    // initial render then we don't show the modal, otherwise we
    // do.
    // if (
    //   typeof window !== `undefined` &&
    //   window.___GATSBYGRAM_INITIAL_RENDER_COMPLETE
    // ) {
    //   isModal = true;
    // }
    return (
      <Layout location={location}>
        {/* <PostDetail post={data.postsJson} /> */}
      </Layout>
    );
  }
}

export default PostTemplate;

// The post template's GraphQL query. Notice the “id”
// variable which is passed in. We set this on the page
// context in gatsby-node.js.
//
// All GraphQL queries in Gatsby are run at build-time and
// loaded as plain JSON files so have minimal client cost.
export const pageQuery = graphql`
  query($id: String!) {
    # Select the post which equals this id.
    postsJson(id: { eq: $id }) {
      id
     #  ...PostDetail_details
    }
  }
`;
