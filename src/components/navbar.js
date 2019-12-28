import React from "react";
import { Link } from "gatsby";
import tw from "tailwind.macro";
import styled from "@emotion/styled";

// Should be same as height in NavContainer.
const UnderNavPadding = styled.div`
  ${tw`pt-10`}
`;

const NavContainer = styled.nav`
  ${tw`bg-black text-white h-10 flex flex-wrap fixed top-0 z-50 w-full pr-side pl-side`}
`;

const Content = styled.div`
  ${tw`flex items-center order-1 w-1/2`}
`;

const StyledGatsbyLink = styled(Link)`
  ${tw`flex-initial`}
  transition: 0.3s;
`;

const LinkRotate = styled.span`
  ${tw`inline-block`}
  transition: inherit;
  ${StyledGatsbyLink}:hover & {
    transform: rotate(90deg);
  }
`;

const LeftContent = styled(Content)`
  ${tw`justify-start`}
  ${StyledGatsbyLink} {
    margin-right: 2rem;
  }
`;

const RightContent = styled(Content)`
  ${tw`justify-end text-xs text-right`}
  ${StyledGatsbyLink} {
    margin-left: 2rem;
    &:hover {
      transform: scale(1.7);
    }
  }
`;

const VerticallyCenteredText = styled.span`
  ${tw`my-auto h-10`}
`;
const VCenteredLink = props => (
  <StyledGatsbyLink>
    <VerticallyCenteredText>{props.children}</VerticallyCenteredText>
  </StyledGatsbyLink>
);

class NavBar extends React.Component {
  render() {
    return (
      <>
        <NavContainer>
          <LeftContent>
            <VCenteredLink to="/">
              <span>Nick Mason</span>
            </VCenteredLink>
          </LeftContent>
          <RightContent>
            <StyledGatsbyLink to="/Nick_Mason_Portfolio_Fall_2018.pdf">
              <LinkRotate>&#9656;</LinkRotate>
              Work
            </StyledGatsbyLink>
            <StyledGatsbyLink to="/Nick_Mason_Portfolio_Fall_2018.pdf">
              Portfolio
            </StyledGatsbyLink>
            <StyledGatsbyLink to="/Nick_Mason_Resume_Fall_2018.pdf">
              Résumé
            </StyledGatsbyLink>
          </RightContent>
        </NavContainer>
        <UnderNavPadding />
      </>
    );
  }
}

export default NavBar;
