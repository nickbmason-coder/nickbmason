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
  height: inherit;
  transition: 0.5s ease;
`;

const PostLink = styled(Link)`
  ${tw`relative flex-none w-full h-64 mb-4 bg-white md:w-medium lg:w-large`}
  &:hover ${PostOverlay} {
    opacity: 1;
  }
  &:hover ${PostImg} {
    opacity: 0.3;
  }
`;

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
      <PostLink to={`/${id}/`}>
        <PostImg fluid={{ ...fluid }} />
        <PostOverlay>{title}</PostOverlay>
      </PostLink>
    );
  }
}

export default DesignPost;

export const PostFragment = graphql`
  fragment DesignPostDetails on ContentfulDesignPost {
    id
    title
    thumbnail {
      localFile {
        childImageSharp {
          fluid(maxWidth: 2000, quality: 100) {
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`;
