import React from "react";
import { Link, graphql } from "gatsby";
import tw from "tailwind.macro";
import styled from "@emotion/styled";
import breakpoints from "style/Breakpoints";

const StyledButton = styled.div`
  ${tw`block py-2 mb-3 text-center text-white bg-black border hover:bg-gray-700`}
  transition: background-color .4s;
  transform: translateY(4px);
  width: 7rem;
`;

class Button extends React.Component {
  render() {
    const { href, children } = this.props;
    if (href) {
      return (
        <a href={href}>
          <StyledButton>{children}</StyledButton>
        </a>
      );
    }
    return (
      <button style={{ display: "block" }} type="button">
        <StyledButton>{children}</StyledButton>
      </button>
    );
  }
}

export default Button;
