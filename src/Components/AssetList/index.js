import React, { Component } from "react";
import PropTypes from "prop-types";
import "./style.css";

export default class AssetList extends Component {
  renderResult = asset => (
    <div key={asset.id} data-test="asset" className="govuk-grid-row">
      <div className="govuk-grid-column-full">
        <div className="govuk-grid-row margin-bottom-30">
          <this.props.linkComponent
            data-test="asset-link"
            to={`/asset/${asset.id}`}
          >
            <div className="govuk-!-font-size-27">
              <span className="govuk-!-font-weight-bold">Scheme ID: </span>
              <span data-test="asset-scheme-id">{asset.schemeId}</span>
            </div>
          </this.props.linkComponent>
        </div>
        <div className="govuk-grid-row">
          <div className="govuk-!-font-size-19" data-test="asset-address">
            {asset.address}
          </div>
        </div>
        <div className="govuk-grid-row">
          <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
        </div>
      </div>
    </div>
  );

  render() {
    if (this.props.loading) {
      return <div data-test="asset-list-loading">Loading...</div>;
    } else if (this.props.assets.length === 0) {
      return <div data-test="asset-list-no-assets-found">No assets found</div>;
    } else {
      return (
        <div className="govuk-grid-column-full">
          <div className="govuk-grid-row">
            <h3 className="govuk-heading-m">
              <span data-test="asset-list-total-count">
                {this.props.totalCount}
              </span>{" "}
              results found
            </h3>
          </div>
          <div className="govuk-grid-row">
            <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
          </div>
          {this.props.assets.map(asset => this.renderResult(asset))}
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
  totalCount: PropTypes.number.isRequired,
  loading: PropTypes.bool
};
