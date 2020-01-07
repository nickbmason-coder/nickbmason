import * as PropTypes from "prop-types";
import React from "react";
import NavBar from "components/Navbar";
import tw from "tailwind.macro";
import styled from "@emotion/styled";

const ContentContainer = styled.div`
  ${tw`h-full overflow-auto bg-salmon`}
`;

class Layout extends React.Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    path: PropTypes.string.isRequired
  };

  render() {
    const { children, path } = this.props;
    return (
      <ContentContainer>
        <NavBar path={path} />
        {children}
      </ContentContainer>
    );
  }
}

export default Layout;
