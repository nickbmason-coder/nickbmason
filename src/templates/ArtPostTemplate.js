import * as PropTypes from "prop-types";
import React from "react";
import { graphql, Link } from "gatsby";
import styled from "@emotion/styled";
import tw from "tailwind.macro";
import ModalRoutingContext from "components/ModalRoutingContext";

// Render artwork page with props/state to indicate which modal is showing
// then show this same page as a modal

// this wouldn't work because you can't render modal on server. content woulndn't be ssr
// wait maybe it would cause there is content below too. that wouldn't help
const ArtPostTemplate = () => (
  <ModalRoutingContext.Consumer>
    {({ modal, closeTo }) => (
      <div>
        {modal ? (
          <Link to={closeTo}>Close</Link>
        ) : (
          <header>
            <h1>Website Title</h1>
          </header>
        )}

        <h2>Modal Page</h2>

        <Link to="/">Go back to the homepage</Link>
      </div>
    )}
  </ModalRoutingContext.Consumer>
);

export default ArtPostTemplate;
