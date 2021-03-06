import _ from "lodash";
import { navigate } from "gatsby";
import React from "react";
import Modal from "react-modal";
import { NAV_HEIGHT_REM } from "style/Constants";
import ModalRoutingContext from "./src/components/ModalRoutingContext";

const withoutPrefix = path => {
  const prefix =
    typeof __BASE_PATH__ !== `undefined` ? __BASE_PATH__ : __PATH_PREFIX__;

  return path.slice(prefix ? prefix.length : 0);
};

class ReplaceComponentRenderer extends React.Component {
  state = {
    prevProps: null,
    lastModalProps: null,
    props: null,
    pathname: null
  };

  static getDerivedStateFromProps(props, state) {
    // TODO: handle history changes
    if (props.location.pathname !== state.pathname) {
      return {
        pathname: props.location.pathname,
        props,
        ...(_.get(state, "props.location.state.modal")
          ? {
              // old page was a modal, keep track so we can render the contents while closing
              lastModalProps: state.props
            }
          : {
              // old page was not a modal, keep track so we can render the contents under modals
              prevProps: state.props
            })
      };
    }

    return null;
  }

  handleRequestClose = () => {
    navigate(withoutPrefix(this.state.prevProps.location.pathname), {
      state: {
        noScroll: true
      }
    });
  };

  render() {
    // render modal if props location has modal
    const { pageResources, location, modalProps } = this.props;
    const { prevProps, lastModalProps } = this.state;
    const isModal = prevProps && _.get(location, "state.modal");

    // the page is the previous path if this is a modal, otherwise it's the current path
    const pageElement = isModal
      ? React.createElement(prevProps.pageResources.component, {
          ...prevProps,
          key: prevProps.pageResources.page.path
        })
      : React.createElement(pageResources.component, {
          ...this.props,
          key: pageResources.page.path
        });

    let modalElement = null;

    if (isModal) {
      // Rendering the current page as a modal, so create an element with the page contents
      modalElement = React.createElement(pageResources.component, {
        ...this.props,
        key: pageResources.page.path
      });
    } else if (lastModalProps) {
      // Not rendering the current page as a modal, but we may be in the process of animating
      // the old modal content to close, so render the last modal content we have cached

      modalElement = React.createElement(
        _.get(lastModalProps, "pageResources.component"),
        {
          ...lastModalProps,
          key: _.get(lastModalProps, "pageResources.page.path")
        }
      );
    }

    return (
      <>
        {pageElement}
        <Modal
          onRequestClose={this.handleRequestClose}
          {...modalProps}
          style={{
            overlay: {
              position: "fixed",
              top: `${NAV_HEIGHT_REM}`,
              width: "100%",
              backgroundColor: "rgba(100, 95, 91, 0.75)"
            },
            content: {
              height: "inherit",
              width: "inherit"
            }
          }}
          isOpen={!!isModal}
        >
          {modalElement ? (
            <React.Fragment key={this.props.location.key}>
              <ModalRoutingContext.Provider
                value={{
                  modal: true,
                  closeTo: prevProps
                    ? withoutPrefix(prevProps.location.pathname)
                    : "/"
                }}
              >
                {modalElement}
              </ModalRoutingContext.Provider>
            </React.Fragment>
          ) : null}
        </Modal>
      </>
    );
  }
}

const replaceComponentRenderer = ({ props }, opts) => {
  return React.createElement(ReplaceComponentRenderer, {
    ...props
  });
};

export default replaceComponentRenderer;
