import "./src/style/global.css";

import React from "react";
import Layout from "./src/components/Layout";

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};

export const shouldUpdateScroll = args => {
  const windowWidth = window.innerWidth;
  // Scroll position only matters on mobile as on larger screens, we use a
  // modal.
  return windowWidth < 750;
};

export const onInitialClientRender = () => {
  window.___GATSBYGRAM_INITIAL_RENDER_COMPLETE = true;
};
