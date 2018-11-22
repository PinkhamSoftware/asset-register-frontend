import React, { Component } from "react";
import PropTypes from "prop-types";
import "./style.css";

export default class AssetList extends Component {
  render() {
    return (
      <div className="asset-list">
        {this.props.assets.map(asset => (
          <div key={asset.id} data-test="asset" className="asset">
            <div className="col">
              <h3 className="asset-label">Scheme ID</h3>
              <div data-test="asset-scheme-id">{asset.schemeId}</div>
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

AssetList.propTypes = {
  assets: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      schemeId: PropTypes.number.isRequired,
      address: PropTypes.string.isRequired,
    })
  ).isRequired
};
