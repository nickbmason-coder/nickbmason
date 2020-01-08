import React, { useState } from "react";
import { useStaticQuery, Link, graphql } from "gatsby";
import tw from "tailwind.macro";
import DesignDropdown from "components/DesignDropdown";
import { slideInFromLeft } from "style/Keyframes";
import styled from "@emotion/styled";

const NavHeight = "1.5rem";
const NavColor = "black";

const NavPadding = styled.div`
  padding-top: ${NavHeight};
`;

const NavContainer = styled.nav`
  ${tw`fixed top-0 z-40 flex flex-wrap items-center w-auto text-white`}
  height: ${NavHeight};
  transform: rotate(-90deg) translateX(-100%);
`;

const NavContent = styled.div`
  ${tw`flex-none inline-block`}
`;

const DesignSectionsNav = props => {
  return (
    <>
      <NavContainer>
        {props.sections
          .slice(0)
          .reverse()
          .map((section, i) => (
            <>
              {i ? <NavContent>/</NavContent> : null}
              <NavContent key={section.id}>{section.name}</NavContent>
            </>
          ))}
      </NavContainer>
      <NavPadding />
    </>
  );
};

export default DesignSectionsNav;
