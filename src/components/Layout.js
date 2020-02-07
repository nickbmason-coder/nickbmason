import * as PropTypes from "prop-types";
import React from "react";
import NavBar from "components/Navbar";
import tw from "tailwind.macro";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet";

const BodyContainer = styled.div`
  ${tw`h-auto`}
`;

const MainContainer = styled.main`
  ${tw`h-auto`}
`;

const SkipLink = styled.a`
  position: absolute;
  top: -40px;
  left: 0;
  background: #000000;
  color: white;
  padding: 8px;
  z-index: 100;
  &:focus {
    top: 0;
  }
`;

const ScrollToTop = styled.button`
  ${tw`absolute h-auto bottom-6 right-6 md:hidden`}
`;

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    path: PropTypes.string.isRequired
  };

  scrollToTop() {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  }

  // TODO
  render() {
    const { children, path } = this.props;
    return (
      <BodyContainer>
        <SkipLink className="skip-link" href="#main">
          Skip to content
        </SkipLink>
        <Helmet titleTemplate="%s | Nick Mason" defaultTitle="Nick Mason">
          <html lang="en" />
          <meta charSet="utf-8" />
          <script async defer src="https://buttons.github.io/buttons.js" />
          {/* <link rel="canonical" href="http://nickbmason.com" /> */}
        </Helmet>
        <NavBar path={path} />
        <MainContainer id="main">{children}</MainContainer>
        <ScrollToTop onClick={e => this.scrollToTop()} />
      </BodyContainer>
    );
  }
}

export default Layout;
