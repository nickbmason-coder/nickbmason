import * as PropTypes from "prop-types";
import React from "react";
import NavBar from "components/navbar";
import tw from "tailwind.macro";
import styled from "@emotion/styled";

const ContentContainer = styled.div`
  ${tw`bg-salmon pt-side pl-side pr-side`}
`;

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired
  };

  render() {
    const { children } = this.props;
    return (
      <div>
        <NavBar />

        <ContentContainer>{children}</ContentContainer>
      </div>
    );
  }
}

export default Layout;
