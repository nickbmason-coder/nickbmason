import React from "react";
import { useStaticQuery, Link, graphql } from "gatsby";
import tw from "tailwind.macro";
import styled from "@emotion/styled";
import breakpoints from "style/Breakpoints";

const Dropdown = styled.div`
  ${tw`static z-10 overflow-hidden bg-black md:shadow-2xl md:w-40 md:absolute`}
  @media (min-width: ${breakpoints.medium}) {
    transition: max-height 400ms ease;
    box-shadow: 0px 5px 10px 0px rgba(0,0,0,0.5);
    max-height: 0;
  }
`;

const DropdownLink = styled(Link)`
  ${tw`inline-block px-3 py-2 text-xl text-center text-gray-200 md:block md:text-sm md:py-1 md:text-left bg-inherit md:hover:bg-gray-700`}
  @media (min-width: ${breakpoints.medium}) {
    &:active:hover {
      background-color: #a0aec0;
    }
  }
`;

const LinkWrapper = styled.div`
  ${tw`text-center`}
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
        <LinkWrapper key={e.node.id}>
          <DropdownLink to={`/${e.node.slug}`}>{e.node.name}</DropdownLink>
        </LinkWrapper>
      ))}
      <DropdownLink to="/">All</DropdownLink>
    </Dropdown>
  );
};

export default DesignDropdown;
