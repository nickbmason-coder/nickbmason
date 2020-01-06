import * as PropTypes from "prop-types";
import React from "react";
import NavBar from "components/Navbar";
import tw from "tailwind.macro";
import styled from "@emotion/styled";

const ContentContainer = styled.div`
  ${tw`h-full bg-salmon`}
`;

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    const { children } = this.props;
    return (
      <ContentContainer>
        <NavBar />
        {children}
      </ContentContainer>
    );
  }
}

export default Layout;
