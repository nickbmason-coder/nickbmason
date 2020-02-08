import "./src/style/global.css";

import React from "react";
import Modal from "react-modal";
import _ from "lodash";
import replaceComponentRenderer from "./replaceComponentRenderer";

import Layout from "./src/components/Layout";

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};

const shouldUpdateScrollModal = ({
  prevRouterProps: { location: prevLocation },
  routerProps: { location },
  getSavedScrollPosition
}) => {
  const prevIsModal = _.get(prevLocation, "state.modal");
  const isModal = _.get(location, "state.modal");
  const preventUpdateScroll = _.get(location, "state.noScroll");
  const modalToModal = isModal && prevIsModal;
  if (modalToModal) {
    window.scrollTo(window.scrollX, window.scrollY);
  }

  return !isModal && !preventUpdateScroll;
};

export const shouldUpdateScroll = args => {
  // Scroll position only matters on mobile as on larger screens, we use a
  // modal.
  const updateScroll = shouldUpdateScrollModal(args);
  return updateScroll;
};

export const onInitialClientRender = () => {
  Modal.setAppElement("#___gatsby");
  Modal.defaultStyles.content = {};
  Modal.defaultStyles.overlay = {};
  window.___GATSBYGRAM_INITIAL_RENDER_COMPLETE = true;
};

export { replaceComponentRenderer };
