import * as PropTypes from "prop-types";
import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image/withIEPolyfill";
import tw from "tailwind.macro";
import { FRAME_HEIGHT_PX } from "style/Constants";
import styled from "@emotion/styled";

// ${tw`opacity-100`}
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

const ScaledImageContainer = props => {
  let normalizedProps = props;
  const { aspectRatio } = props.fluid;
  if (aspectRatio) {
    normalizedProps = {
      ...props,
      style: {
        ...(props.style || {}),
        height: FRAME_HEIGHT_PX,
        width: "auto",
        position: "relative"
      }
    };
  }

  const imgStyle = {
    maxWidth: "100%",
    width: "initial",
    position: "static",
    height: FRAME_HEIGHT_PX
  };

  const pStyle = {
    position: "absolute"
  };

  return (
    <PostImg
      imgStyle={imgStyle}
      placeholderStyle={pStyle}
      {...normalizedProps}
      fluid={{ ...props.fluid }}
    />
  );

  // return (
  //   <div style={divStyle}>
  //     <img style={imgStyle} src={props.fluid.src} />
  //   </div>
  // );
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
            presentationHeight
            presentationWidth
          }
        }
      }
    }
  }
`;
