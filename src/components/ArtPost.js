import * as PropTypes from "prop-types";
import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image/withIEPolyfill";
import tw from "tailwind.macro";
import styled from "@emotion/styled";

const PostImg = styled(Img)`
  ${tw`w-auto h-auto md:h-artpost`}
  transition: 0.5s ease;
  & > div {
    position: absolute;
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
  width: "initial",
  position: "static",
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
      id: PropTypes.string.isRequired
    }).isRequired
  };

  render() {
    const { image, id } = this.props.post;
    const { fluid } = image.localFile.childImageSharp;
    return (
      <PostLink to={`/${id}/`}>
        <PostImg
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
    name
    image {
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
