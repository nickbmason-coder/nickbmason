import * as PropTypes from "prop-types";
import React from "react";
import NavBar from "components/Navbar";
import tw from "tailwind.macro";
import styled from "@emotion/styled";

const BodyContainer = styled.div`
  ${tw`h-auto`}
`;

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    path: PropTypes.string.isRequired
  };

  render() {
    const { children, path } = this.props;
    return (
      <BodyContainer>
        <NavBar path={path} />
        <div id="content">{children}</div>
      </BodyContainer>
    );
  }
}

export default Layout;
