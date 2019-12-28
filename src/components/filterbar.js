import tw from "tailwind.macro";
import React from "react";
import styled from "@emotion/styled";

const FilterContainer = styled.div`
  ${tw`hidden w-full py-6 md:block`}
`;

class FilterBar extends React.Component {
  render() {
    return <FilterContainer>Filter: Year / Type / All</FilterContainer>;
  }
}

export default FilterBar;
