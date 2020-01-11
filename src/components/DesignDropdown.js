import React from "react";
import { useStaticQuery, Link, graphql } from "gatsby";
import tw from "tailwind.macro";
import styled from "@emotion/styled";

const Dropdown = styled.div`
  ${tw`absolute z-10 w-32 overflow-hidden bg-black shadow-2xl`}
  max-height: 0;
  transition: max-height 400ms ease;
  box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.5);
`;

//TODO: on hold down click ligheter gray
const DropdownLink = styled(Link)`
  ${tw`block px-3 py-1 text-left text-gray-200 bg-inherit hover:bg-gray-700`}
  &:active:hover {
    background-color: #a0aec0;
  }
`;

//TODO: drop shadow
const DesignDropdown = ({ className }) => {
  const { categories } = useStaticQuery(graphql`
    query {
      ...CategoriesFragment
    }
  `);
  return (
    <Dropdown className={className}>
      {categories.edges.map(e => (
        <DropdownLink to={e.node.slug} key={e.node.id}>
          {e.node.name}
        </DropdownLink>
      ))}
      <DropdownLink to="/">All</DropdownLink>
    </Dropdown>
  );
};

export default DesignDropdown;
