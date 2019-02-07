import React from "react";
import houseIcon from "../../icons/house.png";
import dollarBagIcon from "../../icons/dollar_bag.png";
import chartIcon from "../../icons/chart.png";

const LandingPageLink = props => {
  let { title, linkLocation, icon } = props;
  return (
    <props.linkComponent
      data-test={props.name}
      to={linkLocation}
      style={{ textDecoration: "none" }}
    >
      <div
        style={{
          width: "100%",
          backgroundColor: "#0059a8",
          textAlign: "center",
          padding: "24px 0 20px 0"
        }}
      >
        <img src={icon} alt="Icon" />
        <p
          className="govuk-!-font-size-24"
          style={{ margin: 0, color: "#fff" }}
        >
          {title}
        </p>
      </div>
    </props.linkComponent>
  );
};

const renderUpload = ({ useCaseFactory, componentFactory }) => {
  const { uploadNewAssetRegisterVersion } = useCaseFactory;
  const { FileUpload } = componentFactory;

  if (process.env.REACT_APP_DISPLAY_UPLOAD === "yes") {
    return (
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <h4 className="govuk-heading-sm">
            Upload a new version of the asset register:
          </h4>
          <FileUpload handleUpload={uploadNewAssetRegisterVersion} />
        </div>
      </div>
    );
  }
};

export default ({ useCaseFactory, componentFactory }) => {
  const { Link } = componentFactory;
  return (
    <div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third">
          <LandingPageLink
            title="Individual Asset Search"
            name="individual-search-link"
            linkComponent={Link}
            linkLocation="/search"
            icon={houseIcon}
          />
        </div>
        <div className="govuk-grid-column-one-third">
          <LandingPageLink
            title="Reporting Services"
            name="reporting-link"
            linkComponent={Link}
            linkLocation="/reporting"
            icon={dollarBagIcon}
          />
        </div>
        <div className="govuk-grid-column-one-third">
          <LandingPageLink
            title="Data Mapping"
            name="data-mapping-link"
            linkComponent={Link}
            linkLocation="/mapping"
            icon={chartIcon}
          />
        </div>
      </div>
      {renderUpload({ useCaseFactory, componentFactory })}
    </div>
  );
};
