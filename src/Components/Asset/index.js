import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import './style.css'

function formatDate(date) {
  return moment(date).format("DD/MM/YYYY @ HH:mm");
}

const Asset = ({ asset }) => (
  <table data-test="asset">
    <thead>
      <tr>
        <th>Field</th>
        <th>Value</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>ID</td>
        <td data-test="asset-id">{asset.id}</td>
      </tr>
      <tr>
        <td>Modified date time</td>
        <td data-test="asset-modified-date-time">
          {formatDate(asset.modifiedDateTime)}
        </td>
      </tr>
      <tr>
        <td>Month Paid</td>
        <td data-test="asset-month-paid">{asset.monthPaid}</td>
      </tr>
      <tr>
        <td>Accounting year</td>
        <td data-test="asset-accounting-year">{asset.accountingYear}</td>
      </tr>
      <tr>
        <td>Scheme ID</td>
        <td data-test="asset-scheme-id">{asset.schemeId}</td>
      </tr>
      <tr>
        <td>Location LA Region Name</td>
        <td data-test="asset-location-la-region-name">
          {asset.locationLaRegionName}
        </td>
      </tr>
      <tr>
        <td>Number of beds</td>
        <td data-test="asset-no-of-beds">{asset.noOfBeds}</td>
      </tr>
      <tr>
        <td>IMS Old Region</td>
        <td data-test="asset-ims-old-region">{asset.imsOldRegion}</td>
      </tr>
      <tr>
        <td>Address</td>
        <td data-test="asset-address">{asset.address}</td>
      </tr>
      <tr>
        <td>Developing RSL Name</td>
        <td data-test="asset-developing-rsl-name">{asset.developingRslName}</td>
      </tr>
      <tr>
        <td>Asset completion date for HPI start</td>
        <td data-test="asset-completion-date-for-hpi-start">
          {formatDate(asset.completionDateForHpiStart)}
        </td>
      </tr>
      <tr>
        <td>IMS Actual completion date</td>
        <td data-test="asset-ims-actual-completion-date">
          {formatDate(asset.imsActualCompletionDate)}
        </td>
      </tr>
      <tr>
        <td>IMS Expected completion date</td>
        <td data-test="asset-ims-expected-completion-date">
          {formatDate(asset.imsExpectedCompletionDate)}
        </td>
      </tr>
      <tr>
        <td>IMS Legal completion date</td>
        <td data-test="asset-ims-legal-completion-date">
          {formatDate(asset.imsLegalCompletionDate)}
        </td>
      </tr>
      <tr>
        <td>HOP Completion date</td>
        <td data-test="asset-hop-completion-date">
          {formatDate(asset.hopCompletionDate)}
        </td>
      </tr>
      <tr>
        <td>Deposit</td>
        <td data-test="asset-deposit">{asset.deposit}</td>
      </tr>
      <tr>
        <td>Agency equity loan</td>
        <td data-test="asset-agency-equity-loan">{asset.agencyEquityLoan}</td>
      </tr>
      <tr>
        <td>Asset developer equity loan</td>
        <td data-test="asset-developer-equity-loan">
          {asset.developerEquityLoan}
        </td>
      </tr>
      <tr>
        <td>Share of restricted equity</td>
        <td data-test="asset-share-of-restricted-equity">
          {asset.shareOfRestrictedEquity}
        </td>
      </tr>
      <tr>
        <td>Difference from ims expected to hop completed</td>
        <td data-test="asset-difference-from-ims-expected-completion-to-hop-completion-date">
          {asset.differenceFromImsExpectedCompletionToHopCompletionDate}
        </td>
      </tr>
    </tbody>
  </table>
);

Asset.propTypes = {
  asset: PropTypes.shape({
    id: PropTypes.number.isRequired,
    modifiedDateTime: PropTypes.string.isRequired,
    monthPaid: PropTypes.string.isRequired,
    accountingYear: PropTypes.string.isRequired,
    schemeId: PropTypes.number.isRequired,
    locationLaRegionName: PropTypes.string.isRequired,
    imsOldRegion: PropTypes.string.isRequired,
    noOfBeds: PropTypes.string.isRequired,
    address: PropTypes.string.isRequired,
    developingRslName: PropTypes.string.isRequired,
    completionDateForHpiStart: PropTypes.string.isRequired,
    imsActualCompletionDate: PropTypes.string.isRequired,
    imsExpectedCompletionDate: PropTypes.string.isRequired,
    imsLegalCompletionDate: PropTypes.string.isRequired,
    hopCompletionDate: PropTypes.string.isRequired,
    deposit: PropTypes.number.isRequired,
    agencyEquityLoan: PropTypes.number.isRequired,
    developerEquityLoan: PropTypes.number.isRequired,
    shareOfRestrictedEquity: PropTypes.number.isRequired,
    differenceFromImsExpectedCompletionToHopCompletionDate:
      PropTypes.number.isRequired
  })
};

export default Asset;
