import React from "react";
import { Link, graphql } from "gatsby";
import Img from "gatsby-image/withIEPolyfill";
import tw from "tailwind.macro";
import styled from "@emotion/styled";

const PostOverlay = styled.div`
  ${tw`absolute px-2 py-1 text-center text-white bg-black opacity-0 top-1/2 left-1/2`}
  transition: 0.5s ease;
  transform: translate(-50%, -50%);
`;

const PostImg = styled(Img)`
  ${tw`text-transparent opacity-100`}
  height: inherit;
  transition: 0.5s ease;
`;

const PostLink = styled(Link)`
  ${tw`relative flex-none w-full h-64 mb-side bg-salmon pr-side-1/2 pl-side-1/2 md:w-1/2 lg:w-1/3`}
  &:hover ${PostOverlay} {
    opacity: 1;
  }
  &:hover ${PostImg} {
    opacity: 0.3;
  }
`;

class DesignPost extends React.Component {
  render() {
    const { thumbnail, title, slug, category, noCategory } = this.props.post;
    const { fluid } = thumbnail.localFile.childImageSharp;
    const actualSlug = noCategory ? `/${slug}/` : `/${category.slug}/${slug}/`;
    return (
      <PostLink to={actualSlug}>
        <PostImg
          fadeIn={false}
          alt={`${title} thumbnail`}
          fluid={{ ...fluid }}
        />
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
    slug
    category {
      slug
    }
    thumbnail {
      localFile {
        childImageSharp {
          fluid(
            maxWidth: 2000
            sizes: "(max-width: 640px) 95vw, (max-width: 768px) 45vw, 30vw"
            quality: 100
            webpQuality: 100
          ) {
            ...GatsbyImageSharpFluid_withWebp
          }
        }
      }
    }
  }
`;
