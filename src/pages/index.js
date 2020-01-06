import * as PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import tw from "tailwind.macro";
import styled from "@emotion/styled";

import DesignPost from "../components/DesignPost";

const PostsContainer = styled.div`
  ${tw`flex flex-wrap items-stretch justify-between w-full pl-side pr-side pt-side`}
`;

// This would normally be in a Redux store or some other global data store.
if (typeof window !== `undefined`) {
  window.postsToShow = 9;
}

class Index extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    data: PropTypes.shape({
      allContentfulDesignPost: PropTypes.object,
      resume: PropTypes.object,
      portfolio: PropTypes.object
    })
  };

  constructor() {
    super();
    let postsToShow = 9;
    if (typeof window !== `undefined`) {
      postsToShow = window.postsToShow;
    }

    this.state = {
      showingMore: postsToShow > 9,
      postsToShow
    };
  }

  componentDidMount() {
    window.addEventListener(`scroll`, this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener(`scroll`, this.handleScroll);
    window.postsToShow = this.state.postsToShow;
  }

  handleScroll = () => {
    if (!this.ticking) {
      this.ticking = true;
      requestAnimationFrame(() => this.update());
    }
  };

  update() {
    const distanceToBottom =
      document.documentElement.offsetHeight -
      (window.scrollY + window.innerHeight);
    if (distanceToBottom < 100) {
      this.setState({ postsToShow: this.state.postsToShow + 9 });
    }
    this.ticking = false;
  }

  render() {
    const { allContentfulDesignPost } = this.props.data;

    const posts = allContentfulDesignPost.edges.map(e => e.node);

    return (
      <PostsContainer>
        {/* posts */}
        {posts.slice(0, this.state.postsToShow).map(node => (
          <DesignPost
            key={node.id}
            post={node}
            location={this.props.location}
          />
        ))}
      </PostsContainer>
    );
  }
}

export default Index;

export const pageQuery = graphql`
  query {
    allContentfulDesignPost {
      edges {
        node {
          id
          ...Post_Details
        }
      }
    }
  }
`;
