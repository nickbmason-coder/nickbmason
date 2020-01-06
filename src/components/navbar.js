import React from "react";
import { useStaticQuery, Link, graphql } from "gatsby";
import tw from "tailwind.macro";
import DesignDropdown from "components/DesignDropdown";
import styled from "@emotion/styled";

// Should be same as height in NavContainer.
const UnderNavPadding = styled.div`
  ${tw`pt-10`}
`;

const NavContainer = styled.nav`
  ${tw`fixed top-0 z-50 flex flex-wrap w-full h-10 text-white bg-black pr-side pl-side`}
`;

const Content = styled.div`
  ${tw`flex items-center order-1 w-1/2`}
`;

const NavContent = styled.div`
  ${tw`flex-initial inline-block`}
  transition: 0.3s;
`;

const StyledDesignDropdown = styled(DesignDropdown)`
  ${NavContent}:hover & {
    display: block;
    transition: max-height 500ms ease;
    max-height: 20rem;
  }
`;

const LinkRotate = styled.span`
  ${tw`inline-block`}
  transition: inherit;
  ${NavContent}:hover & {
    transform: rotate(90deg);
  }
`;

const LeftContent = styled(Content)`
  ${tw`justify-start`}
  ${NavContent} {
    margin-right: 2rem;
  }
`;

const RightContent = styled(Content)`
  ${tw`justify-end text-xs text-right`}
  ${NavContent} {
    margin-left: 4rem;
    &:hover {
      transform: scale(1.2);
    }
  }
`;

const NavBar = () => {
  const { resume } = useStaticQuery(graphql`
    query {
      resume: contentfulAsset(title: { eq: "Resume" }) {
        localFile {
          publicURL
        }
      }
    }
  `);
  return (
    <>
      <NavContainer>
        <LeftContent>
          <NavContent>
            <Link to="/">Nick Mason</Link>
          </NavContent>
        </LeftContent>
        <RightContent>
          <NavContent>
            <div>
              <LinkRotate>&#9656;</LinkRotate>
              Design Work
            </div>
            <StyledDesignDropdown />
          </NavContent>
          <NavContent>
            <Link to="/artwork">Artwork</Link>
          </NavContent>
          <NavContent>
            <Link to={resume.localFile.publicURL}>Résumé</Link>
          </NavContent>
        </RightContent>
      </NavContainer>
      <UnderNavPadding />
    </>
  );
};

export default NavBar;
