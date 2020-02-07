import React, { useState } from "react";
import { useStaticQuery, Link, graphql } from "gatsby";
import tw from "tailwind.macro";
import DesignDropdown from "components/DesignDropdown";
import { slideInFromLeft } from "style/Keyframes";
import { SIDE_NAV_WIDTH_REM, NAV_HEIGHT_REM } from "style/Constants";
import styled from "@emotion/styled";

const SideNavContainer = styled.nav`
  ${tw`fixed z-40 flex items-start justify-center hidden text-black md:inline-flex ml-side`}
  width: ${SIDE_NAV_WIDTH_REM};
  height: calc(100vh);
  padding-top: ${NAV_HEIGHT_REM};
  top: 0;
  left: 0;
  writing-mode: vertical-lr;
`;

const SideNavContent = styled.div`
  ${tw`inline my-1`}
`;

// TODO do with css :after
const SideNavPadding = styled.div`
  ${tw`flex-none hidden h-full md:block`}
  width: ${SIDE_NAV_WIDTH_REM};
`;

const DesignSectionsSideNav = props => {
  return (
    <>
      <SideNavContainer>
        {props.sections.map((section, i) => (
          <React.Fragment key={section.id}>
            {i ? <SideNavContent>/</SideNavContent> : null}
            <SideNavContent>
              <a href={`#${section.slug}`}>{section.name}</a>
            </SideNavContent>
          </React.Fragment>
        ))}
      </SideNavContainer>
      <SideNavPadding />
    </>
  );
};

export default DesignSectionsSideNav;
