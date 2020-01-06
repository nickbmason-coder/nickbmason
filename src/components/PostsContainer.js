import * as PropTypes from "prop-types";
import React from "react";
import tw from "tailwind.macro";
import styled from "@emotion/styled";

const Container = styled.div`
  ${tw`flex flex-wrap items-stretch justify-between w-full pl-side pr-side pt-side`}
`;

class PostsContainer extends React.Component {
  static propTypes = {
    children: PropTypes.array.isRequired,
    initialPosts: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    maxPosts: PropTypes.number.isRequired
  };

  constructor(props) {
    super(props);
    let currentPosts = props.initialPosts;
    if (
      typeof window !== `undefined` &&
      typeof window[this.windowProp("postsToShow")] !== `undefined`
    ) {
      currentPosts = window[this.windowProp("postsToShow")];
    }

    this.state = {
      postsToShow: currentPosts
    };
  }

  componentDidMount() {
    window.addEventListener(`scroll`, this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener(`scroll`, this.handleScroll);
    window[this.windowProp("postsToShow")] = this.state.postsToShow;
  }

  handleScroll = () => {
    if (!this.ticking) {
      this.ticking = true;
      requestAnimationFrame(() => this.update());
    }
  };

  windowProp = propName => {
    return `${propName}${this.props.name}`;
  };

  update() {
    const distanceToBottom =
      document.documentElement.offsetHeight -
      (window.scrollY + window.innerHeight);
    if (
      distanceToBottom < 100 &&
      this.props.maxPosts > this.state.postsToShow
    ) {
      this.setState(prevState => ({
        postsToShow: prevState.postsToShow + this.props.initialPosts
      }));
    }
    this.ticking = false;
  }

  render() {
    return (
      <Container>
        {this.props.children
          .slice(0, this.state.postsToShow)
          .map(post => this.props.renderPost(post))}
      </Container>
    );
  }
}

export default PostsContainer;
