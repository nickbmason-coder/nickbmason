import React, { useState } from "react";
import { useStaticQuery, Link, graphql } from "gatsby";
import tw from "tailwind.macro";
import DesignDropdown from "components/DesignDropdown";
import { slideInFromLeft } from "style/Keyframes";
import breakpoints from "style/Breakpoints";
import { NAV_HEIGHT_REM } from "style/Constants";
import styled from "@emotion/styled";

const NavColor = "black";

const UnderNavPadding = styled.div`
  ${tw`hidden md:block`}
  padding-top: ${NAV_HEIGHT_REM};
`;

const NavContainer = styled.nav`
  ${tw`static top-0 z-50 block w-full text-white md:flex md:flex-wrap md:fixed pr-side pl-side`}
  background-color: ${NavColor};
  @media (min-width: ${breakpoints.medium}) {
    height: ${NAV_HEIGHT_REM};
  }
`;

const Content = styled.div`
  ${tw`md:flex md:items-center`}
`;

const NavContent = styled.div`
  ${tw`py-2 md:flex-none md:py-0 md:inline-block`}
  transition: 0.3s;
  background-color: ${NavColor};
`;

const Dropdown = styled(NavContent)`
  ${tw`py-0`}
`;

const DesignDroptext = styled.div`
  ${tw`hidden md:block`}
`;

const StyledDesignDropdown = styled(DesignDropdown)`
  @media (min-width: ${breakpoints.medium}) {
    ${Dropdown}:hover & {
      max-height: 10rem;
    }
  }
`;

const LinkRotate = styled.span`
  ${tw`inline-block`}
  transition: 0.3s;
  ${Dropdown}:hover & {
    transform: rotate(90deg);
  }
`;

const SlidingNavContent = styled(NavContent)`
  ${tw`hidden md:inline-block`}
  animation: 0.5s ease-out 0.2s 1 forwards ${slideInFromLeft};
  opacity: 0;
`;

const LeftContent = styled(Content)`
  ${tw`w-full md:z-10 md:justify-start md:w-1/4`}
  ${SlidingNavContent} {
    z-index: inherit;
    margin-left: 0.6rem;
  }
  ${NavContent}:first-child {
    @media (min-width: ${breakpoints.medium}) {
      z-index: 15;
      &:hover {
        transform: scale(1.1);
      }
    }
  }
`;

const RightContent = styled(Content)`
  ${tw`z-30 w-full text-xl text-center md:text-base md:w-3/4 md:text-right md:justify-end`}
  & > div {
    @media (min-width: ${breakpoints.medium}) {
      &:hover {
        transform: scale(1.2);
      }
      margin-left: 4rem;
    }
  }
  ${Dropdown} {
    margin-left: 0;
  }
`;

const SectionDetail = props => {
  const current = props.path.includes(props.slug);
  return current ? (
    <>
      <SlidingNavContent>&gt;</SlidingNavContent>
      <SlidingNavContent>{props.children}</SlidingNavContent>
    </>
  ) : null;
};

const NavBar = props => {
  const { resume, categories } = useStaticQuery(graphql`
    query {
      ...CategoriesFragment
      resume: contentfulAsset(
        id: { eq: "db85e8cc-fabe-528b-9fb5-5aba912039ab" }
      ) {
        localFile {
          url
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
          <SectionDetail slug="artwork" path={props.path}>
            Artwork
          </SectionDetail>
          <SectionDetail slug="contact" path={props.path}>
            Contact
          </SectionDetail>
          {categories.edges.map(e => (
            <SectionDetail slug={e.node.slug} key={e.node.id} path={props.path}>
              {e.node.name}
            </SectionDetail>
          ))}
        </LeftContent>
        <RightContent>
          <Dropdown>
            <DesignDroptext>
              <LinkRotate>&#9656;</LinkRotate>
              Design Work
            </DesignDroptext>
            <StyledDesignDropdown />
          </Dropdown>
          <NavContent>
            <Link to="/artwork">Artwork</Link>
          </NavContent>
          <NavContent>
            {/* TODO https://github.com/gatsbyjs/gatsby/issues/20999 */}
            <a href={resume.localFile.url}>Resume</a>
          </NavContent>
          <NavContent>
            <Link to="/contact">Contact</Link>
          </NavContent>
        </RightContent>
      </NavContainer>
      <UnderNavPadding />
    </>
  );
};

export default NavBar;
