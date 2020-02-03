import React from "react";
import { useStaticQuery, Link, graphql } from "gatsby";
import tw from "tailwind.macro";
import styled from "@emotion/styled";
import breakpoints from "style/Breakpoints";

const Dropdown = styled.div`
  ${tw`static z-10 w-full overflow-hidden bg-black md:shadow-2xl md:w-40 md:absolute`}
  @media (min-width: ${breakpoints.medium}) {
    transition: max-height 400ms ease;
    box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.5);
    max-height: 0;
  }
`;

const DropdownLink = styled(Link)`
  ${tw`block px-3 py-2 text-center text-gray-200 md:py-1 md:text-left bg-inherit md:hover:bg-gray-700`}
  @media (min-width: ${breakpoints.medium}) {
    &:active:hover {
      background-color: #a0aec0;
    }
  }
`;

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
