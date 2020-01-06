import React from "react";
import { useStaticQuery, Link, graphql } from "gatsby";
import tw from "tailwind.macro";
import styled from "@emotion/styled";

const Dropdown = styled.div`
  ${tw`absolute z-10 hidden w-32 bg-black`}
  transition: inherit;
  max-height: 0;
  ${NavContent}:hover & {
    display: block;
    transition: max-height 500ms ease;
    max-height: 20rem;
  }
`;

const DropdownLink = styled(Link)`
  ${tw`block px-3 py-1 text-left text-gray-200 bg-inherit hover:bg-gray-600`}
`;

const DesignDropdown = () => {
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
    <Dropdown>
      <DropdownLink>Branding</DropdownLink>
      <DropdownLink>Product Design</DropdownLink>
      <DropdownLink>Events</DropdownLink>
    </Dropdown>
  );
};

export default DesignDropdown;
