import React from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "./style.css";

function formatDate(date) {
  return moment(date).format("DD/MM/YYYY @ HH:mm");
}

const AssetBlock = ({ title, body, name }) => (
  <div className="asset-detail-property">
    <p className="govuk-body govuk-!-font-size-19 govuk-!-font-weight-bold">
      {title}
    </p>
    <p data-test={name} className="govuk-body govuk-!-font-size-19">
      {body}
    </p>
  </div>
);

const Asset = ({ asset }) => (
  <div className="govuk-width-container" data-test="asset">
    <a href="#" className="govuk-back-link">
      Back
    </a>

    <main className="govuk-main-wrapper">
      <div>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third">
            <h1 className="govuk-heading-l">
              Scheme ID:{" "}
              <span data-test="asset-scheme-id">{asset.schemeId}</span>
            </h1>
          </div>
          <div className="govuk-grid-column-two-thirds">
            <h2 className="govuk-heading-l">
              Asset Status:{" "}
              <span data-test="asset-is-paid">
                {asset.isPaid === true ? "Redeemed" : "Live"}
              </span>
            </h2>
          </div>
        </div>
      </div>
      <div className="govuk-grid-column-full">
        <div className="govuk-grid-row">
          <h2 className="govuk-heading-l">Property Details</h2>
          <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
        </div>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-two-thirds">
            <AssetBlock
              title="Address"
              name="asset-address"
              body={asset.address}
            />
          </div>
          <div className="govuk-grid-column-one-third">
            <AssetBlock
              title="Address"
              name="asset-equity-owner"
              body={"PL Equity Owner"}
            />
            <AssetBlock
              title="Program"
              name="asset-program"
              body={"PL Program"}
            />
          </div>
        </div>
      </div>

      <div className="govuk-grid-full">
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-full">
            <h2 className="govuk-heading-l">Contract details</h2>
            <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
          </div>
        </div>

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third">
            <AssetBlock
              title="Agency equity loan"
              name="asset-agency-equity-loan"
              body={asset.agencyEquityLoan}
            />
          </div>
          <div className="govuk-grid-column-one-third">
            <AssetBlock
              title="Initial Homes England Share"
              name="asset-share-of-restricted-equity"
              body={asset.shareOfRestrictedEquity}
            />
          </div>
          <div className="govuk-grid-column-one-third">
            <AssetBlock
              title="Contract Date"
              name="asset-contract-date"
              body={"PL 25 Nov 22"}
            />
          </div>
        </div>

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third">
            <AssetBlock
              title="Home owner deposit"
              body={asset.deposit}
              name="asset-deposit"
            />
          </div>
          <div className="govuk-grid-column-one-third">
            <AssetBlock
              title="Developer equity loan"
              body={asset.developerEquityLoan}
              name="asset-developer-equity-loan"
            />
          </div>
          <div className="govuk-grid-column-one-third">
            <AssetBlock title="Developer discount" body="PL £0" />
          </div>
        </div>

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third">
            <AssetBlock title="Mortgage" body="PL £0" />
          </div>
          <div className="govuk-grid-column-one-third">
            <AssetBlock title="Purchase price" body="PL £0" />
          </div>
          <div className="govuk-grid-column-one-third">
            <AssetBlock title="Developer" body={asset.developingRslName} />
          </div>
        </div>

        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third">
            <AssetBlock title="Agent" body="Group Limited" />
          </div>
        </div>
      </div>
      <div className="govuk-grid-column-full">
        <div className="govuk-grid-row">
          <h2 className="govuk-heading-l">Redeption activity</h2>
          <hr className="govuk-section-break govuk-section-break--l govuk-section-break--visible" />
        </div>
        <div className="govuk-grid-row">
          <div className="govuk-grid-column-one-third">
            <AssetBlock
              title="Method of Redeption"
              name="asset-method-of-redemption"
              body={"PL Method"}
            />
          </div>
          <div className="govuk-grid-column-one-third">
            <AssetBlock
              title="Date of Redeption"
              name="asset-date-of-redemption"
              body={"PL Date"}
            />
          </div>
          <div className="govuk-grid-column-one-third">
            <AssetBlock
              title="Current Homes England Share"
              name="asset-current-homes-england-share"
              body={"PL 0%"}
            />
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
    shareOfRestrictedEquity: PropTypes.number.isRequired,
    differenceFromImsExpectedCompletionToHopCompletionDate:
      PropTypes.number.isRequired
  })
};

export default Asset;
