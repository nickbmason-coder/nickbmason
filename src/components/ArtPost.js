import * as PropTypes from "prop-types";
import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image/withIEPolyfill";
import tw from "tailwind.macro";
import styled from "@emotion/styled";
import breakpoints from "style/Breakpoints";
import { FRAME_HEIGHT_PX, FRAME_HEIGHT } from "style/Constants";

  // transition: 0.5s ease;
const PostImg = styled(Img)`
  ${tw`w-full h-auto`}

  & > div {
    position: absolute;
  }

  @media (min-width: ${breakpoints.medium}) {
    height: ${FRAME_HEIGHT_PX};
    width: ${props => props.aspectratio * FRAME_HEIGHT}px;
  }
`;

const PostLink = styled(Link)`
  ${tw`flex-none w-auto h-auto mx-2 mb-4 bg-white`}
  &:hover ${PostImg} {
    opacity: 0.5;
  }
`;

const ImageStyle = {
  maxWidth: "100%",
  position: "static",
  width: "100%",
  height: "auto",
  margin: 0
};

const PlaceholderStyle = {
  position: "absolute"
};

class ArtPost extends React.Component {
  static propTypes = {
    post: PropTypes.shape({
      image: PropTypes.object,
      name: PropTypes.string,
      slug: PropTypes.string.isRequired
    }).isRequired
  };

  render() {
    const { image, slug } = this.props.post;
    const { fluid } = image.localFile.childImageSharp;
    return (
      <PostLink
        state={{
          modal: true
        }}
        to={`/artwork/${slug}/`}
      >
        <PostImg
          aspectratio={fluid.aspectRatio}
          imgStyle={ImageStyle}
          placeholderStyle={PlaceholderStyle}
          fluid={{ ...fluid }}
        />
      </PostLink>
    );
  }
}

export default ArtPost;

export const PostFragment = graphql`
  fragment ArtPostDetails on ContentfulArtPost {
    id
    slug
    name
    image {
      localFile {
        childImageSharp {
          fluid(maxWidth: 2000, quality: 100) {
            aspectRatio
            ...GatsbyImageSharpFluid
          }
        }
      }
    }
  }
`;
