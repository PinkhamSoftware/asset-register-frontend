import React from "react";

export default class AssetDownloadButton extends React.Component {
  render() {
    if (!this.props.assetId) {
      return <span />;
    }
    return (
      <a
        data-test="asset-download-link"
        onClick={() =>
          this.props.downloadAsset.execute(this.props.presenter, {
            id: this.props.assetId
          })
        }
      >
        Download CSV
      </a>
    );
  }
}
