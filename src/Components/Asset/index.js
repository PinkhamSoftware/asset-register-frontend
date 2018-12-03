import React from "react";
import PropTypes from "prop-types";
import moment from "moment";

function formatDate(date) {
  return moment(date).format("DD/MM/YYYY @ HH:mm");
}

const Asset = ({ asset }) => (
  <ul data-test="asset">
    <li data-test="asset-id">{asset.id}</li>
    <li data-test="asset-modified-date-time">
      {formatDate(asset.modifiedDateTime)}
    </li>
    <li data-test="asset-month-paid">{asset.monthPaid}</li>
    <li data-test="asset-accounting-year">{asset.accountingYear}</li>
    <li data-test="asset-scheme-id">{asset.schemeId}</li>
    <li data-test="asset-location-la-region-name">
      {asset.locationLaRegionName}
    </li>
    <li data-test="asset-no-of-beds">{asset.noOfBeds}</li>
    <li data-test="asset-ims-old-region">{asset.imsOldRegion}</li>
    <li data-test="asset-address">{asset.address}</li>
    <li data-test="asset-developing-rsl-name">{asset.developingRslName}</li>
    <li data-test="asset-completion-date-for-hpi-start">
      {formatDate(asset.completionDateForHpiStart)}
    </li>
    <li data-test="asset-ims-actual-completion-date">
      {formatDate(asset.imsActualCompletionDate)}
    </li>
    <li data-test="asset-ims-expected-completion-date">
      {formatDate(asset.imsExpectedCompletionDate)}
    </li>
    <li data-test="asset-ims-legal-completion-date">
      {formatDate(asset.imsLegalCompletionDate)}
    </li>
    <li data-test="asset-hop-completion-date">
      {formatDate(asset.hopCompletionDate)}
    </li>
    <li data-test="asset-deposit">{asset.deposit}</li>
    <li data-test="asset-agency-equity-loan">{asset.agencyEquityLoan}</li>
    <li data-test="asset-developer-equity-loan">{asset.developerEquityLoan}</li>
    <li data-test="asset-share-of-restricted-equity">
      {asset.shareOfRestrictedEquity}
    </li>
    <li data-test="asset-difference-from-ims-expected-completion-to-hop-completion-date">
      {asset.differenceFromImsExpectedCompletionToHopCompletionDate}
    </li>
  </ul>
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
