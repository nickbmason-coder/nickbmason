import * as PropTypes from "prop-types";
import React from "react";
import NavBar from "components/navbar";
import tw from "tailwind.macro";
import styled from "@emotion/styled";

const LayoutContainer = styled.div`
  ${tw`bg-gray-100`}
`;

const ContentContainer = styled.div`
  ${tw`bg-red-200`}
`;

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    const { children } = this.props;
    return (
      <LayoutContainer>
        <NavBar />

        <ContentContainer>{children}</ContentContainer>
      </LayoutContainer>
    );
  }
}

export default Layout;
