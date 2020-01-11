import React, { useState } from "react";
import { useStaticQuery, Link, graphql } from "gatsby";
import tw from "tailwind.macro";
import DesignDropdown from "components/DesignDropdown";
import { slideInFromLeft } from "style/Keyframes";
import { SIDE_NAV_WIDTH_REM, NAV_HEIGHT_REM } from "style/Constants";
import styled from "@emotion/styled";

const SideNavContainer = styled.nav`
  ${tw`fixed z-40 flex items-start justify-center text-black ml-side`}
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

// TODO do with css :after
const SideNavPadding = styled.div`
  ${tw`flex-none h-full`}
  width: ${SIDE_NAV_WIDTH_REM};
`;

const DesignSectionsSideNav = props => {
  return (
    <>
      <SideNavContainer>
        {props.sections.map((section, i) => (
          <>
            {i ? <SideNavContent>/</SideNavContent> : null}
            <SideNavContent key={section.id}>
              <a href={`#${section.slug}`}>{section.name}</a>
            </SideNavContent>
          </>
        ))}
      </SideNavContainer>
      <SideNavPadding />
    </>
  );
};

export default DesignSectionsSideNav;
