import React, { useState } from "react";
import { useStaticQuery, Link, graphql } from "gatsby";
import tw from "tailwind.macro";
import DesignDropdown from "components/DesignDropdown";
import { slideInFromLeft } from "style/Keyframes";
import { SIDE_NAV_WIDTH_REM, NAV_HEIGHT_REM } from "style/Constants";
import styled from "@emotion/styled";

const SideNavContainer = styled.nav`
  ${tw`fixed z-40 flex items-center justify-center text-black pl-side`}
  width: ${SIDE_NAV_WIDTH_REM};
  height: calc(100vh - ${NAV_HEIGHT_REM});
  padding-top: ${NAV_HEIGHT_REM};
  top: 0;
  left: 0;
  writing-mode: vertical-lr;
`;

const SideNavContent = styled.div`
  ${tw`inline my-1`}
`;

const SideNavPadding = styled.div`
  ${tw`flex-none h-full`}
  padding-left: ${SIDE_NAV_WIDTH_REM};
`;

// const NavContainer = styled.nav`
//   ${tw`fixed top-0 z-40 flex flex-wrap items-center w-auto text-white`}
//   height: ${NavHeight};
//   transform: rotate(-90deg) translateX(-100%);
// `;

// const NavContent = styled.div`
//   ${tw`flex-none inline-block`}
// `;

const SideSectionsNav = props => {
  return (
    <>
      <SideNavContainer>
        {props.sections.map((section, i) => (
          <>
            {i ? <SideNavContent>/</SideNavContent> : null}
            <SideNavContent key={section.id}>{section.name}</SideNavContent>
          </>
        ))}
      </SideNavContainer>
      <SideNavPadding />
    </>
  );
};

export default SideSectionsNav;
