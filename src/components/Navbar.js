import React, { useState } from "react";
import { useStaticQuery, Link, graphql } from "gatsby";
import tw from "tailwind.macro";
import DesignDropdown from "components/DesignDropdown";
import { slideInFromLeft } from "style/Keyframes";
import { NAV_HEIGHT_REM } from "style/Constants";
import styled from "@emotion/styled";

const NavColor = "black";

const UnderNavPadding = styled.div`
  padding-top: ${NAV_HEIGHT_REM};
`;

const NavContainer = styled.nav`
  ${tw`fixed top-0 z-50 flex flex-wrap w-full text-white pr-side pl-side`}
  height: ${NAV_HEIGHT_REM};
  background-color: ${NavColor};
`;

const Content = styled.div`
  ${tw`flex items-center`}
`;

const NavContent = styled.div`
  ${tw`flex-none inline-block`}
  transition: 0.3s;
  background-color: ${NavColor};
`;

const StyledDesignDropdown = styled(DesignDropdown)`
  ${NavContent}:hover & {
    max-height: 10rem;
  }
`;

const LinkRotate = styled.span`
  ${tw`inline-block`}
  transition: inherit;
  ${NavContent}:hover & {
    transform: rotate(90deg);
  }
`;

const SlidingNavContent = styled(NavContent)`
  animation: 0.5s ease-out 0.2s 1 forwards ${slideInFromLeft};
  opacity: 0;
`;

const LeftContent = styled(Content)`
  ${tw`z-10 justify-start w-1/4`}
  ${SlidingNavContent} {
    z-index: inherit;
    margin-left: 0.6rem;
  }
  ${NavContent}:first-child {
    z-index: 15;
    &:hover {
      transform: scale(1.1);
    }
  }
`;

const RightContent = styled(Content)`
  ${tw`z-30 justify-end hidden w-3/4 text-xs text-right md:flex`}
  ${NavContent} {
    &:hover {
      transform: scale(1.2);
    }
    margin-left: 4rem;
  }
  ${NavContent}:first-child {
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
