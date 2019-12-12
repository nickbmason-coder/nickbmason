import React from "react";
import { Link } from "gatsby";
import tw from "tailwind.macro";
import styled from "@emotion/styled";

const NavContainer = styled.nav`
  ${tw`flex flex-wrap items-center justify-between py-3 px-6`}
`;

const LeftContent = styled.div`
  ${tw`hidden md:order-1 md:block w-full md:w-2/5 md:pr-8`}
`;

const RightContent = styled.div`
  ${tw`hidden md:order-3 md:block w-full md:w-2/5 md:text-right md:pl-8`}
`;

const StyledGatsbyLink = styled(Link)`
  display: inline;
  padding: inherit;
`;

class NavBar extends React.Component {
  render() {
    return (
      <NavContainer>
        <LeftContent>
          <StyledGatsbyLink to="/">
            <span data-testid="brand-logo">Nick Mason</span>
          </StyledGatsbyLink>
        </LeftContent>
        <RightContent>
          <StyledGatsbyLink to="/Nick_Mason_Portfolio_Fall_2018.pdf">
            &#9656;Work
          </StyledGatsbyLink>
          <StyledGatsbyLink to="/Nick_Mason_Portfolio_Fall_2018.pdf">
            Portfolio
          </StyledGatsbyLink>
          <StyledGatsbyLink to="/Nick_Mason_Resume_Fall_2018.pdf">
            Résumé
          </StyledGatsbyLink>
        </RightContent>
      </NavContainer>
    );
  }
}

export default NavBar;
