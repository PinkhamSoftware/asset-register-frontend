import React, { Component } from "react";
import PropTypes from "prop-types";
import "./style.css";

export default class AssetList extends Component {
  render() {
    return (
      <div className="asset-list">
        {this.props.assets.map(asset => (
          <div key={asset.schemeId} data-test="asset" className="asset">
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
      schemeId: PropTypes.number.isRequired,
      address: PropTypes.string.isRequired,
    })
  ).isRequired
};
