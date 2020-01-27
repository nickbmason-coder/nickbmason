import * as PropTypes from "prop-types";
import React from "react";
import mousetrap from "mousetrap";
import { graphql, Link, navigate } from "gatsby";
import { AiOutlineRight, AiOutlineLeft } from "react-icons/ai";
import Img from "gatsby-image/withIEPolyfill";

import styled from "@emotion/styled";
import { NAV_HEIGHT_REM } from "style/Constants";
import tw from "tailwind.macro";
import ModalRoutingContext from "components/ModalRoutingContext";

const PostContainer = styled.div`
  ${tw`flex justify-between w-full pl-side pr-side`}
  height: calc(100vh - ${NAV_HEIGHT_REM});
`;

const Content = styled(Link)`
  ${tw`w-1/2 h-full mx-auto bg-white`}
`;

const PostImg = styled(Img)`
  ${tw`w-full h-full`}
  max-width: 50%;
`;

const PostLink = styled(Link)`
  ${tw`flex-none w-full h-auto mx-4 bg-white mb-side md:w-auto`}
  &:hover ${PostImg} {
    opacity: 0.5;
  }
`;

const CaretLeft = styled.a`
  ${tw`py-3 pr-3 my-auto cursor-pointer`}
`;

const CaretRight = styled.a`
  ${tw`py-3 pl-3 my-auto cursor-pointer`}
`;

// Render artwork page with props/state to indicate which modal is showing
// then show this same page as a modal

// this wouldn't work because you can't render modal on server. content woulndn't be ssr
// wait maybe it would cause there is content below too. that wouldn't help
class ArtPostTemplate extends React.Component {
  componentDidMount() {
    mousetrap.bind(`left`, () => this.previous());
    mousetrap.bind(`right`, () => this.next());
    mousetrap.bind(`spacebar`, () => this.next());
  }

  componentWillUnmount() {
    mousetrap.unbind(`left`);
    mousetrap.unbind(`right`);
    mousetrap.unbind(`spacebar`);
  }

  next(e) {
    if (e) {
      e.stopPropagation();
    }
    navigate(`/${this.props.pageContext.nextPath}/`, {
      state: { modal: true }
    });
  }

  previous(e) {
    if (e) {
      e.stopPropagation();
    }
    navigate(`/${this.props.pageContext.previousPath}/`, {
      state: { modal: true }
    });
  }

  close(e, closeTo) {
    if (e) {
      e.stopPropagation();
    }
    navigate(closeTo, { state: { noScroll: true } });
  }

  render() {
    const { post } = this.props.data;
    return (
      <ModalRoutingContext.Consumer>
        {({ modal, closeTo }) => (
          <>
            <PostContainer onClick={e => this.close(e, closeTo)}>
              {/* <PostContainer> */}
              <CaretLeft onClick={e => this.previous(e)}>
                <AiOutlineLeft />
              </CaretLeft>
              <PostImg
                onClick={e => e.stopPropagation()}
                objectFit="contain"
                fluid={{ ...post.image.localFile.childImageSharp.fluid }}
              />
              <CaretRight onClick={e => this.next(e)}>
                <AiOutlineRight />
              </CaretRight>
            </PostContainer>
          </>
        )}
      </ModalRoutingContext.Consumer>
    );
  }
}

export default ArtPostTemplate;

export const pageQuery = graphql`
  query($id: String!) {
    post: contentfulArtPost(id: { eq: $id }) {
      id
      slug
      name
      image {
        localFile {
          childImageSharp {
            fluid(maxWidth: 1500, quality: 100, sizes: "50vw") {
              aspectRatio
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;
