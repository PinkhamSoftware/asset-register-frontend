import React from "react";

export default class Aggregates extends React.Component {
  render() {
    let {
      uniqueRecords,
      moneyPaidOut,
      assetValue,
      movementInAssetValue
    } = this.props.aggregateValues;
    return (
      <table>
        <tbody>
          <tr>
            <td>Number of Assets in the Register:</td>
            <td data-test="aggregates-unique-records">{uniqueRecords}</td>
          </tr>
          <tr>
            <td> Amount of money paid out:</td>
            <td data-test="aggregates-money-paid-out">{moneyPaidOut}</td>
          </tr>
          <tr>
            <td>Total value of assets</td>
            <td data-test="aggregates-asset-value">{assetValue}</td>
          </tr>
          <tr>
            <td>Movement in fair value</td>
            <td data-test="aggregates-movement-in-asset-value">
              {movementInAssetValue}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }
}
