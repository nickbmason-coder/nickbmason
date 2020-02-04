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

const DetailsHeight = "90px";

const PostContainer = styled.div`
  ${tw`relative w-full md:flex md:items-center md:justify-between pl-side pr-side`}
  height: calc(100vh - ${NAV_HEIGHT_REM});
`;

const Content = styled.div`
  ${tw`w-full pt-side md:pt-0 md:flex md:flex-col md:items-center md:justify-around md:w-3/5`}
  max-height: 100%;
  max-width: calc(
    (100vh - ${NAV_HEIGHT_REM} - ${DetailsHeight}) *
      ${props => props.aspectratio}
  );
`;

const Details = styled.div`
  ${tw`w-full px-10 text-sm font-bold bg-white pt-side pb-side`}
  height: ${DetailsHeight};
`;

const PostImg = styled(Img)`
  ${tw`w-full`}
`;

const Pointer = styled.a`
  ${tw`hidden cursor-pointer md:block`}
  width: 40px;
`;

const Close = styled(CloseIcon)`
  ${tw`absolute top-0 right-0 cursor-pointer mt-side mr-side`}
  fill: white;
  width: 33px;
`;

const IconColor = isModal => {
  return {
    fill: isModal ? "white" : "rgba(20, 20, 20, .85)"
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

  next(e, isModal) {
    if (e) {
      e.stopPropagation();
    }
    if (this.props.pageContext.nextPath) {
      navigate(`/${this.props.pageContext.nextPath}/`, {
        state: { modal: isModal }
      });
    }
  }

  previous(e, isModal) {
    if (e) {
      e.stopPropagation();
    }
    if (this.props.pageContext.previousPath) {
      navigate(`/${this.props.pageContext.previousPath}/`, {
        state: { modal: isModal }
      });
    }
  }

  close(e, closeTo) {
    if (e) {
      e.stopPropagation();
    }
    navigate(closeTo, { state: { noScroll: true } });
  }

  render() {
    const { post } = this.props.data;
    const { fluid } = post.image.localFile.childImageSharp;
    return (
      <ModalRoutingContext.Consumer>
        {({ modal, closeTo }) => (
          <>
            <PostContainer onClick={e => this.close(e, closeTo)}>
              <Pointer onClick={e => this.previous(e, modal)}>
                {this.props.pageContext.previousPath && (
                  <LeftIcon style={IconColor(modal)} />
                )}
              </Pointer>
              <Content
                aspectratio={fluid.aspectRatio}
                onClick={e => e.stopPropagation()}
              >
                <PostImg objectFit="contain" fluid={{ ...fluid }} />
                <Details>
                  <p>{post.name}</p>
                  <p>{post.caption}</p>
                </Details>
              </Content>
              <Pointer onClick={e => this.next(e, modal)}>
                {this.props.pageContext.nextPath && (
                  <RightIcon style={IconColor(modal)} />
                )}
              </Pointer>
              {modal && <Close onClick={e => this.close(e, closeTo)} />}
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
            fluid(maxWidth: 1500, quality: 100, sizes: "60vw") {
              aspectRatio
              ...GatsbyImageSharpFluid_withWebp
            }
          }
        }
      }
    }
  }
`;
