import "./src/style/global.css";

import React from "react";
import Modal from "react-modal";
import _ from "lodash";
import replaceComponentRenderer from "./replaceComponentRenderer";

import Layout from "./src/components/Layout";

export const wrapPageElement = ({ element, props }) => {
  console.log(props);
  return <Layout {...props}>{element}</Layout>;
};

const shouldUpdateScrollModal = ({
  prevRouterProps: { location: prevLocation },
  routerProps: { location }
}) => {
  const isModal = _.get(location, "state.modal");
  const preventUpdateScroll = _.get(location, "state.noScroll");

  return !isModal && !preventUpdateScroll;
};

export const shouldUpdateScroll = args => {
  // Scroll position only matters on mobile as on larger screens, we use a
  // modal.
  return shouldUpdateScrollModal(args);
};

export const onInitialClientRender = () => {
  Modal.setAppElement("#___gatsby");
  Modal.defaultStyles.content = {};
  Modal.defaultStyles.overlay = {};
  window.___GATSBYGRAM_INITIAL_RENDER_COMPLETE = true;
};

export { replaceComponentRenderer };
