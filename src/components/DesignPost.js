import * as PropTypes from "prop-types";
import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image/withIEPolyfill";
import tw from "tailwind.macro";
import { FRAME_HEIGHT_PX } from "utils/Constants";
import styled from "@emotion/styled";

const PostOverlay = styled.div`
  ${tw`absolute px-2 py-1 text-center text-white bg-black opacity-0 top-1/2 left-1/2`}
  transition: 0.5s ease;
  transform: translate(-50%, -50%);
`;

const PostImg = styled(Img)`
  ${tw`opacity-100`}
  transition: 0.5s ease;
`;

const PostLink = styled(Link)`
  ${tw`relative flex-none mb-4 bg-white`}
  &:hover ${PostOverlay} {
    opacity: 1;
  }
  &:hover ${PostImg} {
    opacity: 0.3;
  }
`;

const ScaledImageContainer = props => {
  let normalizedProps = props;
  const { aspectRatio, children } = props;
  if (aspectRatio) {
    normalizedProps = {
      ...props,
      style: {
        ...(props.style || {}),
        height: FRAME_HEIGHT_PX,
        width: FRAME_HEIGHT_PX * aspectRatio
        // margin: "0 auto" // Used to center the image
      }
    };
  }

  return <PostLink {...normalizedProps}>{children}</PostLink>;
};

class DesignPost extends React.Component {
  static propTypes = {
    post: PropTypes.shape({
      thumbnail: PropTypes.object,
      title: PropTypes.string,
      id: PropTypes.string.isRequired
    }).isRequired
  };

  render() {
    const { thumbnail, title, id } = this.props.post;
    const { fluid } = thumbnail.localFile.childImageSharp;
    return (
      <ScaledImageContainer aspectRatio={fluid.aspectRatio} to={`/${id}/`}>
        <PostImg fluid={{ ...fluid }} />
        <PostOverlay>{title}</PostOverlay>
      </ScaledImageContainer>
    );
  }
}

export default DesignPost;

export const PostFragment = graphql`
  fragment Post_Details on ContentfulDesignPost {
    id
    title
    thumbnail {
      localFile {
        childImageSharp {
          fluid(maxWidth: 2000, quality: 100) {
            ...GatsbyImageSharpFluid
            aspectRatio
          }
        }
      }
    }
  }
`;
