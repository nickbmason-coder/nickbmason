import * as PropTypes from "prop-types";
import React from "react";
import NavBar from "components/Navbar";
import tw from "tailwind.macro";
import styled from "@emotion/styled";
import { Helmet } from "react-helmet";

const BodyContainer = styled.div`
  ${tw`h-auto`}
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
        <Helmet titleTemplate="%s | Nick Mason" defaultTitle="Nick Mason">
          <meta charSet="utf-8" />
          {/* <link rel="canonical" href="http://nickbmason.com" /> */}
        </Helmet>
        <NavBar path={path} />
        {children}
      </BodyContainer>
    );
  }
}

export default Layout;
