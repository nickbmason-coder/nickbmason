import * as PropTypes from "prop-types";
import React from "react";
import { graphql } from "gatsby";
import tw from "tailwind.macro";
import styled from "@emotion/styled";

import Layout from "layouts/main";
import Post from "../components/post";
import FilterBar from "../components/filterbar";

const PostsContainer = styled.div`
  ${tw`flex flex-wrap w-full items-stretch justify-between`}
`;

const NavContainer = styled.nav`
  ${tw`bg-black text-white h-10 flex flex-wrap fixed top-0 z-50 w-full pr-side pl-side`}
`;

const Content = styled.div`
  ${tw`flex items-center order-1 w-1/2`}
`;

// const LeftContent = styled(Content)`
//   ${tw`justify-start`}
//   ${StyledGatsbyLink} {
//     margin-right: 2rem;
//   }
// `;

// const RightContent = styled(Content)`
//   ${tw`justify-end text-xs text-right`}
//   ${StyledGatsbyLink} {
//     margin-left: 2rem;
//     &:hover {
//       transform: scale(1.7);
//     }
//   }
// `;
// This would normally be in a Redux store or some other global data store.
if (typeof window !== `undefined`) {
  window.postsToShow = 12;
}

class Index extends React.Component {
  static propTypes = {
    location: PropTypes.object.isRequired,
    data: PropTypes.shape({
      user: PropTypes.object,
      allPostsJson: PropTypes.object
    })
  };

  constructor() {
    super();
    let postsToShow = 12;
    if (typeof window !== `undefined`) {
      postsToShow = window.postsToShow;
    }

    this.state = {
      showingMore: postsToShow > 12,
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
      this.setState({ postsToShow: this.state.postsToShow + 12 });
    }
    this.ticking = false;
  }

  render() {
    let { allPostsJson, user } = this.props.data;

    const posts = allPostsJson.edges.map(e => e.node);

    user = user.edges[0].node;

    return (
      <Layout location={this.props.location}>
        <PostsContainer>
          {/* posts */}
          {posts.slice(0, this.state.postsToShow).map(node => (
            <Post
              key={node.id}
              post={node}
              location={this.props.location}
              onClick={post => this.setState({ activePost: post })}
            />
          ))}
        </PostsContainer>
      </Layout>
    );
  }
}

export default Index;

export const pageQuery = graphql`
  query {
    user: allPostsJson(limit: 1) {
      edges {
        node {
          username
          ...Avatar_user
        }
      }
    }
    allPostsJson {
      edges {
        node {
          id
          text
          weeksAgo: time(difference: "weeks")
          ...Post_details
          ...PostDetail_details
        }
      }
    }
  }
`;
