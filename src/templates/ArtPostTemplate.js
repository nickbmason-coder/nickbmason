import * as PropTypes from "prop-types";
import React from "react";
import mousetrap from "mousetrap";
import { graphql, Link, navigate } from "gatsby";
import Img from "gatsby-image/withIEPolyfill";
import CloseIcon from "assets/artclose.svg";

import styled from "@emotion/styled";
import { NAV_HEIGHT_REM } from "style/Constants";
import tw from "tailwind.macro";
import ModalRoutingContext from "components/ModalRoutingContext";
import LeftIcon from "assets/artleft.svg";
import RightIcon from "assets/artright.svg";

const PostContainer = styled.div`
  ${tw`flex items-center justify-between w-full pl-side pr-side`}
  height: calc(100vh - ${NAV_HEIGHT_REM});
`;

const Content = styled.div`
  ${tw`flex flex-col items-center justify-around w-full`}
  max-height: 100%;
`;

const Details = styled.div`
  ${tw`w-full h-auto bg-white p-side`}
  max-width: 60%;
`;

const PostImg = styled(Img)`
  ${tw`w-full`}
  max-width: 60%;
`;

const CaretLeft = styled.a`
  ${tw`cursor-pointer`}
  width: 40px;
`;

const CaretRight = styled.div`
  ${tw`relative h-full`}
  width: 40px;
`;

const Close = styled(CloseIcon)`
  ${tw`absolute cursor-pointer mt-side`}
  fill: white;
`;

const RightCentered = styled(RightIcon)`
  ${tw`h-full my-auto cursor-pointer`}
`;

const IconColor = isModal => {
  return {
    fill: isModal ? "white" : "black"
  };
};

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
                {this.props.pageContext.previousPath && (
                  <LeftIcon style={IconColor(modal)} />
                )}
              </CaretLeft>
              <Content onClick={e => e.stopPropagation()}>
                <PostImg
                  objectFit="contain"
                  fluid={{ ...post.image.localFile.childImageSharp.fluid }}
                />
                <Details>{post.name}</Details>
              </Content>
              <CaretRight>
                {modal && <Close onClick={e => this.close(e, closeTo)} />}
                {this.props.pageContext.nextPath && (
                  <RightCentered
                    onClick={e => this.next(e)}
                    style={IconColor(modal)}
                  />
                )}
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
