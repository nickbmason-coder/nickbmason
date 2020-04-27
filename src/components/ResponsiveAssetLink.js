import React from "react";
import breakpoints from "style/Breakpoints";

class ResponsiveAssetLink extends React.Component {
  render() {
    const { asset, children, target, className } = this.props;
    let url = asset.desktopAsset.localFile.localURL;
    const { mobileAsset } = asset;
    if (
      mobileAsset &&
      typeof window !== `undefined` &&
      window.matchMedia(`(max-width: ${breakpoints.medium})`).matches
    ) {
      url = mobileAsset.localFile.localURL;
    }
    return (
      <a href={url} target={target || "_self"} className={className}>
        {children}
      </a>
    );
  }
}

export default ResponsiveAssetLink;
