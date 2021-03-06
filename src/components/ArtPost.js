import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image/withIEPolyfill";
import tw from "twin.macro";
import styled from "@emotion/styled";
import breakpoints from "style/Breakpoints";
import { FRAME_HEIGHT_PX, FRAME_HEIGHT } from "style/Constants";

const PostImg = styled(Img)`
  ${tw`w-full h-auto text-transparent`}

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
  render() {
    const { image, slug, name } = this.props.post;
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
          fadeIn={false}
          loading={loading}
          alt={`${name} image`}
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
        ...OpenGraphImage
        childImageSharp {
          fluid(
            maxWidth: 1000
            quality: 50
            webpQuality: 50
            sizes: "(max-width: 640px) 100vw, 20vw"
          ) {
            aspectRatio
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
`;
