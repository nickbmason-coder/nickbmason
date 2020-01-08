import * as PropTypes from "prop-types";
import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image/withIEPolyfill";
import tw from "tailwind.macro";
import { FRAME_HEIGHT_PX } from "style/Constants";
import styled from "@emotion/styled";

const PostImg = styled(Img)`
  ${tw`opacity-100`}
  transition: 0.5s ease;
`;

const PostLink = styled(Link)`
  ${tw`relative flex-none mb-4 bg-white`}
  &:hover ${PostImg} {
    opacity: 0.5;
  }
`;

const ScaledImageContainer = props => {
  let normalizedProps = props;
  const { aspectratio, children } = props;
  if (aspectratio) {
    normalizedProps = {
      ...props,
      style: {
        ...(props.style || {}),
        height: FRAME_HEIGHT_PX,
        width: FRAME_HEIGHT_PX * aspectratio
        // margin: "0 auto" // Used to center the image
      }
    };
  }

  return <PostLink {...normalizedProps}>{children}</PostLink>;
};

class DesignPost extends React.Component {
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
      <ScaledImageContainer aspectratio={fluid.aspectRatio} to={`/${id}/`}>
        <PostImg fluid={{ ...fluid }} />
      </ScaledImageContainer>
    );
  }
}

export default DesignPost;

export const PostFragment = graphql`
  fragment ArtPostDetails on ContentfulArtPost {
    id
    name
    image {
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
