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

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    path: PropTypes.string.isRequired
  };

  // TODO
  render() {
    const { children, path } = this.props;
    return (
      <BodyContainer>
        <SkipLink className="skip-link" href="#main" />
        <Helmet titleTemplate="%s | Nick Mason" defaultTitle="Nick Mason">
          <meta charSet="utf-8" />
          {/* <link rel="canonical" href="http://nickbmason.com" /> */}
        </Helmet>
        <NavBar path={path} />
        <MainContainer id="main">{children}</MainContainer>
      </BodyContainer>
    );
  }
}

export default Layout;
