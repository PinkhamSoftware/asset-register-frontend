import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "./style.css";

function formadivate(date) {
  return moment(date).format("DD/MM/YYYY @ HH:mm");
}

const AssetBlock = ({ title, body }) => (
  <div class="govuk-!-margin-4 govuk-!-padding-3 asset-detail-property">
    <h5 class="govuk-heading-s">{title}</h5>
    <p class="govuk-body">{body}</p>
  </div>
);

const Asset = ({ asset }) => (
  <div class="govuk-width-container" data-test="asset">
    <a href="#" class="govuk-back-link">
      Back
    </a>

    <main class="govuk-main-wrapper">
      <div>
        <div class="govuk-grid-row">
          <div class="govuk-grid-column-one-third">
            <h1 class="govuk-heading-l">
              Scheme ID:{" "}
              <span data-test="asset-scheme-id">{asset.schemeId}</span>
            </h1>
          </div>
          <div class="govuk-grid-column-two-thirds">
            <h2 class="govuk-heading-l">
              Asset Status:{" "}
              <span data-test="asset-scheme-id">
                {asset.isPaid === true ? "Redeemed" : "Live"}
              </span>
            </h2>
          </div>
        </div>
      </div>

      <div>
        <div class="govuk-grid-row">
          <div class="govuk-grid-column-one-third">
            <h2 class="govuk-heading-l">Contract details</h2>
          </div>
        </div>
        <hr class="govuk-section-break govuk-section-break--visible" />

        <div class="govuk-grid-row">
          <div class="govuk-grid-column-one-third">
            <AssetBlock title="Agency equity loan" body={asset.agencyEquityLoan}/>
          </div>
          <div class="govuk-grid-column-one-third">
            <AssetBlock title="Share of Restricted Equity" body={asset.shareOfRestrictedEquity} />
          </div>
          <div class="govuk-grid-column-one-third">
            <AssetBlock title="Share of Restricted Equity" body={asset.shareOfRestrictedEquity} />
          </div>
        </div>

        <div class="govuk-grid-row">
          <div class="govuk-grid-column-one-third">
            <AssetBlock title="Home owner deposit" body="PL £0"/>
          </div>
          <div class="govuk-grid-column-one-third">
            <AssetBlock title="Developer equity loan" body={asset.agencyEquityLoan} />
          </div>
          <div class="govuk-grid-column-one-third">
            <AssetBlock title="Developer discount" body="PL £0" />
          </div>
        </div>

        <div class="govuk-grid-row">
          <div class="govuk-grid-column-one-third">
            <AssetBlock title="Mortgage" body="PL £0"/>
          </div>
          <div class="govuk-grid-column-one-third">
            <AssetBlock title="Purchase price" body="PL £0" />
          </div>
          <div class="govuk-grid-column-one-third">
            <AssetBlock title="Developer" body={asset.developingRslName} />
          </div>
        </div>

        <div class="govuk-grid-row">
          <div class="govuk-grid-column-one-third">
            <AssetBlock title="Agent" body="Group Limited"/>
          </div>
        </div>
      </div>

    </main>
  </div>
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
    shareOfResdivictedEquity: PropTypes.number.isRequired,
    differenceFromImsExpectedCompletionToHopCompletionDate:
      PropTypes.number.isRequired
  })
};

export default Asset;
