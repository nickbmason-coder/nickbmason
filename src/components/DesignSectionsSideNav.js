import React from "react";
import tw from "twin.macro";
import { SIDE_NAV_WIDTH_REM, NAV_HEIGHT_REM } from "style/Constants";
import styled from "@emotion/styled";

const SideNavContainer = styled.nav`
  ${tw`fixed z-40 flex items-center justify-center hidden text-black md:inline-flex`}
  width: ${SIDE_NAV_WIDTH_REM};
  height: calc(100vh);
  padding-top: ${NAV_HEIGHT_REM};
  top: 0;
  left: 0;
  writing-mode: vertical-lr;
`;

const SideNavContent = styled.div`
  ${tw`inline my-1`}
  font-weight: ${props => (props.bold ? "bold" : "normal")};
`;

const SideNavLink = styled.span`
  ${tw`cursor-pointer`}
`;

// TODO do with css :after
const SideNavPadding = styled.div`
  ${tw`flex-none hidden h-full md:block`}
  width: ${SIDE_NAV_WIDTH_REM};
`;

const handleClick = slug => {
  return e => {
    e.preventDefault();
    const topLoc = document.getElementById(slug).offsetTop;
    window.scrollTo({
      top: topLoc,
      left: 0,
      behavior: "smooth"
    });
    history.replaceState({}, "", `#${slug}`);
  };
};

const DesignSectionsSideNav = props => {
  return (
    <>
      <SideNavContainer>
        {props.sections.map((section, i) => (
          <React.Fragment key={section.id}>
            {i ? <SideNavContent>/</SideNavContent> : null}
            <SideNavContent bold={section.slug === props.currentSection}>
              <SideNavLink onClick={handleClick(section.slug)}>
                {section.name}
              </SideNavLink>
            </SideNavContent>
          </React.Fragment>
        ))}
      </SideNavContainer>
      <SideNavPadding />
    </>
  );
};

export default DesignSectionsSideNav;
