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
  ${tw`relative flex-none w-full h-64 mb-side bg-salmon pr-side-1/2 pl-side-1/2 md:w-1/2`}
  &:hover ${PostOverlay} {
    opacity: 1;
  }
  &:hover ${PostImg} {
    opacity: 0.3;
  }
`;

const DesignPost = props => {
  const { thumbnail, title, slug, category, noCategory } = props.post;
  const { fluid } = thumbnail.localFile.childImageSharp;
  const actualSlug = noCategory ? `/${slug}/` : `/${category.slug}/${slug}/`;
  return (
    <PostLink to={actualSlug}>
      <PostImg fadeIn={false} alt={`${title} thumbnail`} fluid={{ ...fluid }} />
      <PostOverlay>{title}</PostOverlay>
    </PostLink>
  );
};

export default DesignPost;

export const PostFragment = graphql`
  fragment DesignPostDetails on ContentfulDesignPost {
    id
    title
    hiddenOnAll
    slug
    category {
      slug
    }
    thumbnail {
      localFile {
        childImageSharp {
          fluid(
            maxWidth: 1000
            maxHeight: 500
            cropFocus: CENTER
            sizes: "(max-width: 640px) 95vw, 48vw"
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
