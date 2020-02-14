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
  const isModal = _.get(location, "state.modal");
  const preventUpdateScroll = _.get(location, "state.noScroll");
  return !isModal && !preventUpdateScroll;
};

const hasHash = ({ routerProps: { location } }) => {
  return _.get(location, "hash");
};

export const shouldUpdateScroll = args => {
  if (hasHash(args)) {
    // Need default browser behavior for hashes
    return false;
  }

  const shouldUpdate = shouldUpdateScrollModal(args);
  return shouldUpdate;
};

export const onInitialClientRender = () => {
  Modal.setAppElement("#___gatsby");
  Modal.defaultStyles.content = {};
  Modal.defaultStyles.overlay = {};
  window.___GATSBYGRAM_INITIAL_RENDER_COMPLETE = true;
};

export { replaceComponentRenderer };
