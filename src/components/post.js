import * as PropTypes from "prop-types";
import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image/withIEPolyfill";
import tw from "tailwind.macro";
import styled from "@emotion/styled";
import { jsx, css, keyframes } from "@emotion/core";

const fadeIn = keyframes`
  from {
    opacity: 0;
  }

  to {
    opacity: 1;
  }
`;

const PostOverlay = styled.div`
  ${tw`opacity-0 text-center absolute top-1/2 left-1/2 bg-orange-400 py-1 px-2`}
  transition: 0.5s ease;
  transform: translate(-50%, -50%);
`;

const PostImg = styled(Img)`
  ${tw`opacity-100`}
  transition: 0.5s ease;
`;

const PostLink = styled(Link)`
  ${tw`flex-none relative bg-white w-full md:w-medium lg:w-large h-64 my-3 mt-0`}
  animation: ${fadeIn} 1s;
  &:hover ${PostOverlay} {
    opacity: 1;
  }
  &:hover ${PostImg} {
    opacity: 0.3;
  }
`;

let touched = false;

const NonStretchedImage = props => {
  const normalizedProps = {
    ...props,
    style: {
      ...(props.style || {}),
      maxHeight: props.fluid.presentationHeight
    }
  };

  return <Img {...normalizedProps} />;
};

class Post extends React.Component {
  static propTypes = {
    post: PropTypes.shape({
      smallImage: PropTypes.object,
      likes: PropTypes.number,
      id: PropTypes.string.isRequired
    }).isRequired
  };

  constructor() {
    super();
    this.state = {
      hovering: false
    };
  }

  render() {
    const { smallImage, likes, id } = this.props.post;
    const { small } = smallImage.childImageSharp;
    return (
      <PostLink
        data-testid="post"
        to={`/${id}/`}
        onTouchStart={() => (touched = true)}
        onMouseEnter={() => {
          if (!touched) {
            this.setState({ hovering: true });
          }
        }}
        onMouseLeave={() => {
          if (!touched) {
            this.setState({ hovering: false });
          }
        }}
      >
        <PostImg
          fluid={{ ...small }}
          style={{ height: "inherit" }}
          imgStyle={{ objectFit: "cover" }}
          objectFit="cover"
        />
        <PostOverlay>{id}</PostOverlay>
      </PostLink>
    );
  }
}

export default Post;

export const postFragment = graphql`
  fragment Post_details on PostsJson {
    id
    likes
    smallImage: image {
      childImageSharp {
        small: fluid(maxWidth: 1000) {
          aspectRatio
          ...GatsbyImageSharpFluid
        }
      }
    }
  }
`;
