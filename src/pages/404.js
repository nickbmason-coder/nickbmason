import React from "react";
import styled from "@emotion/styled";
import tw from "twin.macro";
import { Helmet } from "react-helmet";

const NotFoundPage = styled.div`
  ${tw`flex items-center justify-center w-full p-side`}
  height: 70vh;
`;

const Header = styled.h1`
  ${tw`text-xl font-medium`}
`;

class NotFound extends React.Component {
  render() {
    return (
      <NotFoundPage>
        <Helmet>
          <title>Not Found</title>
          <meta property="og:title" content="Nick Mason | Not Found" />
        </Helmet>
        <Header>Page Not Found</Header>
      </NotFoundPage>
    );
  }
}

export default NotFound;
