import React from "react";
import "govuk-frontend/all.scss";
import "./style.css";

export default class Aggregates extends React.Component {
  render() {
    let {
      uniqueRecords,
      moneyPaidOut,
      assetValue,
      movementInAssetValue
    } = this.props.aggregateValues;
    return (
      <div data-test="asset-aggregates">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-half">
            <div className="asset-aggregate-value">
              <p className="govuk-body govuk-!-font-size-19">
                Number of Assets
              </p>
              <p
                className="govuk-body govuk-!-font-size-27 govuk-!-font-weight-bold"
                data-test="aggregates-unique-records"
              >
                {uniqueRecords}
              </p>
            </div>
          </div>
          <div className="govuk-grid-column-one-half">
            <div className="asset-aggregate-value">
              <p className="govuk-body govuk-!-font-size-19">Fair value</p>
              <p
                className="govuk-body govuk-!-font-size-27 govuk-!-font-weight-bold"
                data-test="aggregates-money-paid-out"
              >
                &#163;{moneyPaidOut}
              </p>
            </div>
          </div>
        </div>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-half">
            <div className="asset-aggregate-value">
              <p className="govuk-body govuk-!-font-size-19">
                Fair value on initial recognition
              </p>
              <p
                className="govuk-body govuk-!-font-size-27 govuk-!-font-weight-bold"
                data-test="aggregates-asset-value"
              >
                &#163;{assetValue}
              </p>
            </div>
          </div>
          <div className="govuk-grid-column-one-half">
            <div className="asset-aggregate-value background-color-dark">
              <p className="govuk-body govuk-!-font-size-19 text-color-white">
                Movement in fair value
              </p>
              <p
                className="govuk-body govuk-!-font-size-27 govuk-!-font-weight-bold text-color-white"
                data-test="aggregates-movement-in-asset-value"
              >
                &#163;{movementInAssetValue}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
