import React from "react";
import tw from "tailwind.macro";
import styled from "@emotion/styled";

const StyledButton = styled.div`
  ${tw`block py-2 text-center text-white bg-black border hover:bg-gray-700`}
  transition: background-color .4s;
  width: 7rem;
`;

const ButtonWrap = styled.button`
  ${tw`block`}
`;

class Button extends React.Component {
  render() {
    const { href, onClick, children, className } = this.props;
    if (href) {
      return (
        <a className={className} href={href}>
          <StyledButton>{children}</StyledButton>
        </a>
      );
    }
    return (
      <ButtonWrap className={className} onClick={onClick} type="button">
        <StyledButton>{children}</StyledButton>
      </ButtonWrap>
    );
  }
}

export default Button;
