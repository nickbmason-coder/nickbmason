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

  @media (min-width: ${breakpoints.medium}) {
    height: ${FRAME_HEIGHT_PX};
    width: ${props => props.aspectratio * FRAME_HEIGHT}px;
  }
`;

const PostLink = styled(Link)`
  ${tw`flex-none w-full h-auto mx-4 bg-white pointer-events-none md:pointer-events-auto mb-side md:w-auto`}
  &:hover ${PostImg} {
    opacity: 0.5;
  }
`;

class ArtPost extends React.Component {
  static propTypes = {
    post: PropTypes.shape({
      image: PropTypes.object,
      name: PropTypes.string,
      slug: PropTypes.string.isRequired,
      crit: PropTypes.bool.isRequired
    }).isRequired
  };

  render() {
    const { image, slug } = this.props.post;
    const { fluid } = image.localFile.childImageSharp;
    const loading = this.props.crit ? "eager" : "lazy";
    return (
      <PostLink
        state={{
          modal: true
        }}
        to={`/artwork/${slug}/`}
      >
        <PostImg
          loading={loading}
          aspectratio={fluid.aspectRatio}
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
          fluid(
            maxWidth: 1000
            quality: 60
            webpQuality: 60
            sizes: "(max-width: 640px) 100vw, 500px"
          ) {
            aspectRatio
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
`;
