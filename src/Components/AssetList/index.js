import React, { Component } from "react";
import PropTypes from "prop-types";
import "./style.css";

export default class AssetList extends Component {
  render() {
    if (this.props.loading) {
      return <div data-test="asset-list-loading">Loading...</div>;
    } else if (this.props.assets.length === 0) {
      return <div data-test="asset-list-no-assets-found">No assets found</div>;
    } else {
      return (
        <div className="asset-list">
          {this.props.assets.map(asset => (
            <div key={asset.id} data-test="asset" className="asset">
              <div className="col">
                <this.props.linkComponent
                  data-test="asset-link"
                  to={`/asset/${asset.id}`}
                >
                  <h3 className="asset-label">Scheme ID</h3>
                  <div data-test="asset-scheme-id">{asset.schemeId}</div>
                </this.props.linkComponent>
              </div>
              <div className="col">
                <h3 className="asset-label">Address</h3>
                <div data-test="asset-address">{asset.address}</div>
              </div>
            </div>
          ))}
        </div>
      );
    }
  }
}

AssetList.propTypes = {
  assets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      schemeId: PropTypes.number.isRequired,
      address: PropTypes.string.isRequired
    })
  ).isRequired,
  linkComponent: PropTypes.func.isRequired,
  loading: PropTypes.bool
};
