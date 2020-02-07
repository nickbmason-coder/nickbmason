import * as PropTypes from "prop-types";
import React from "react";
import mousetrap from "mousetrap";
import { graphql, Link, navigate } from "gatsby";
import Img from "gatsby-image/withIEPolyfill";
import { Helmet } from "react-helmet";
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
  ${tw`flex flex-col justify-around w-full px-10 text-xs bg-white pt-side pb-side`}
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
            <Helmet>
              {post.caption && (
                <meta name="description" content={post.caption} />
              )}
              {post.caption && (
                <meta property="og:description" content={post.caption} />
              )}
              <title>{post.name.replace(/["'$%@#]/g, "")}</title>
              <meta
                property="og:title"
                content={`${post.name.replace(/["'$%@#]/g, "")} | Nick Mason`}
              />
              <meta
                property="og:url"
                content={`https://www.nickbmason.com/artwork/${post.slug}`}
              />
              <meta property="og:type" content="article" />
              <meta
                property="og:image"
                content={`https://www.nickbmason.com${post.image.localFile.image.fixed.src}`}
              />
              <meta property="og:image:width" content="1200" />
              <meta property="og:image:height" content="630" />
            </Helmet>
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
                <PostImg
                  alt={`${post.name} image`}
                  objectFit="contain"
                  fluid={{ ...fluid }}
                />
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
      caption
      description
      image {
        localFile {
          ...OpenGraphImage
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
