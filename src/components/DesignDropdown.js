import React from "react";
import { useStaticQuery, Link, graphql } from "gatsby";
import tw from "tailwind.macro";
import styled from "@emotion/styled";

const Dropdown = styled.div`
  ${tw`absolute z-10 hidden w-32 bg-black`}
  transition: inherit;
  max-height: 0;
`;

const DropdownLink = styled(Link)`
  ${tw`block px-3 py-1 text-left text-gray-200 bg-inherit hover:bg-gray-600`}
`;

const DesignDropdown = ({ className }) => {
  const { categories } = useStaticQuery(graphql`
    query {
      categories: allContentfulDesignPostCategory(sort: { fields: name }) {
        edges {
          node {
            id
            name
          }
        }
      }
    }
  `);
  return (
    <Dropdown className={className}>
      {categories.edges.map(e => (
        <DropdownLink key={e.node.id}>{e.node.name}</DropdownLink>
      ))}
    </Dropdown>
  );
};

export default DesignDropdown;
