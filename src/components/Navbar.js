import React, { useState } from "react";
import { useStaticQuery, Link, graphql } from "gatsby";
import tw from "tailwind.macro";
import DesignDropdown from "components/DesignDropdown";
import { slideIn } from "style/Keyframes";
import breakpoints from "style/Breakpoints";
import { FiMenu, FiX } from "react-icons/fi";
import { NAV_HEIGHT_REM } from "style/Constants";
import styled from "@emotion/styled";
import { IconContext } from "react-icons";
import ResponsiveAssetLink from "./ResponsiveAssetLink";

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
  ${tw`flex flex-no-wrap items-center`}
`;

const NavContent = styled.div`
  ${tw`inline-block w-full py-2 md:w-auto md:flex-none md:py-0`}
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

const SlidingSection = styled(NavContent)`
  ${tw`inline-block`}
  animation: 0.5s ease-out 0.2s 1 forwards ${slideIn(-120)};
  opacity: 0;
`;

const SlidingPost = styled(NavContent)`
  ${tw`hidden lg:inline-block`}
  animation: 0.5s ease-out 0.2s 1 forwards ${slideIn(-210)};
  opacity: 0;
`;

const SectionDetail = props => {
  if (!props.path) {
    return null;
  }
  const current = props.path.includes(props.slug);
  if (current) {
    return props.isSection ? (
      <>
        <SlidingSection>&gt;</SlidingSection>
        <SlidingSection>
          <Link to={`/${props.slug}`}>{props.children}</Link>
        </SlidingSection>
      </>
    ) : (
      <>
        <SlidingPost>&gt;</SlidingPost>
        <SlidingPost>{props.children}</SlidingPost>
      </>
    );
  }
  return null;
};

const LeftContent = styled(Content)`
  ${tw`relative justify-start w-full md:static md:z-10 md:w-1/4`}
  ${SlidingSection} {
    z-index: inherit;
    margin-left: 0.6rem;
  }
  ${SlidingPost} {
    z-index: inherit;
    margin-left: 0.6rem;
  }
  & > div {
    width: auto;
  }
`;

const RightContent = styled(Content)`
  ${tw`z-30 flex-wrap w-full overflow-y-hidden text-lg text-center md:flex-no-wrap md:overflow-y-visible md:text-base md:w-3/4 md:text-right md:justify-end`}
  transition: max-height 400ms ease-out;
  max-height: ${props => (props.isOpen ? "65vh" : "0")};
  @media (min-width: ${breakpoints.medium}) {
    max-height: initial;
    & > div {
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

const MenuIconWrapper = styled.div`
  ${tw`absolute top-0 right-0 cursor-pointer md:hidden`}
  height: ${NAV_HEIGHT_REM};
  & > svg {
    margin: 0 auto;
    height: 100%;
    display: block;
  }
`;

const MobileMenuIcon = props => {
  return (
    <MenuIconWrapper>
      <IconContext.Provider value={{ size: "1.6rem" }}>
        {props.isOpen ? (
          <FiX onClick={e => props.setOpen(false)} />
        ) : (
          <FiMenu onClick={e => props.setOpen(true)} />
        )}
      </IconContext.Provider>
    </MenuIconWrapper>
  );
};

const NavBar = props => {
  const [isOpen, setOpen] = useState(false);
  const { resume, categories, posts } = useStaticQuery(graphql`
    query {
      ...CategoriesFragment
      ...ResumeFragment
      posts: allContentfulDesignPost {
        ...DesignGalleryFragment
      }
    }
  `);
  return (
    <>
      <NavContainer>
        <LeftContent>
          <MobileMenuIcon isOpen={isOpen} setOpen={setOpen} />
          <NavContent>
            <Link to="/">Nick Mason</Link>
          </NavContent>
          <SectionDetail isSection slug="artwork" path={props.path}>
            Artwork
          </SectionDetail>
          <SectionDetail isSection slug="contact" path={props.path}>
            Contact
          </SectionDetail>
          {categories.edges.map(e => (
            <SectionDetail
              isSection
              slug={e.node.slug}
              key={e.node.id}
              path={props.path}
            >
              {e.node.name}
            </SectionDetail>
          ))}
          {/* TODO: probably better as a map. Doens't scale well with more posts */}
          {posts.edges.map(e => (
            <SectionDetail slug={e.node.slug} key={e.node.id} path={props.path}>
              {e.node.title}
            </SectionDetail>
          ))}
        </LeftContent>
        <RightContent isOpen={isOpen}>
          <Dropdown>
            <DesignDroptext>
              <LinkRotate>&#9656;</LinkRotate>
              Design Work
            </DesignDroptext>
            <StyledDesignDropdown setOpen={setOpen} />
          </Dropdown>
          <NavContent>
            <Link to="/artwork" onClick={e => setOpen(false)}>
              Artwork
            </Link>
          </NavContent>
          <NavContent>
            <ResponsiveAssetLink asset={resume}>Resume</ResponsiveAssetLink>
          </NavContent>
          <NavContent>
            <Link to="/contact" onClick={e => setOpen(false)}>
              Contact
            </Link>
          </NavContent>
        </RightContent>
      </NavContainer>
      <UnderNavPadding />
    </>
  );
};

export default NavBar;
