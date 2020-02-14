import "./src/style/global.css";

import React from "react";
import Modal from "react-modal";
import _ from "lodash";
import replaceComponentRenderer from "./replaceComponentRenderer";

import Layout from "./src/components/Layout";

export const wrapPageElement = ({ element, props }) => {
  return <Layout {...props}>{element}</Layout>;
};

const hasHash = location => {
  return _.get(location, "hash");
};

export const shouldUpdateScroll = ({ routerProps: { location } }) => {
  if (hasHash(location)) {
    return false;
  }
  return true;
};

export const onInitialClientRender = () => {
  Modal.setAppElement("#___gatsby");
  Modal.defaultStyles.content = {};
  Modal.defaultStyles.overlay = {};
  window.___GATSBYGRAM_INITIAL_RENDER_COMPLETE = true;
};

export { replaceComponentRenderer };
