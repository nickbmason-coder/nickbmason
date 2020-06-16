import React from "react";
import styled from "@emotion/styled";
import tw from "twin.macro";
import { navigate } from "gatsby";
import Button from "./Button";

const EndNavContainer = styled.div`
  ${tw`flex items-center justify-between w-full px-12 mx-auto my-16 md:px-0 md:w-2/5 md:justify-around`}
`;

const scrollUp = e => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: "smooth"
  });
};

const nextPage = (e, nextPath) => {
  if (e) {
    e.stopPropagation();
  }
  navigate(nextPath);
};

class DesignSectionEndNav extends React.Component {
  render() {
    const { nextPath } = this.props;

    return (
      <EndNavContainer>
        <Button onClick={scrollUp}>Back to Top</Button>
        {nextPath && (
          <Button onClick={e => nextPage(e, nextPath)}>Next Project</Button>
        )}
      </EndNavContainer>
    );
  }
}

export default DesignSectionEndNav;
