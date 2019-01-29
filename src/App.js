import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import qs from "qs";
import "./App.css";
import "govuk-frontend/all.scss";

import houseIcon from "./icons/house.png";
import dollarBagIcon from "./icons/dollar_bag.png";
import chartIcon from "./icons/chart.png";

import Aggregates from "./Components/Aggregates";
import AggregatesProvider from "./Components/AggregatesProvider";
import AssetDownloadButton from "./Components/AssetDownloadButton";
import Asset from "./Components/Asset";
import AssetList from "./Components/AssetList";
import AssetMap from "./Components/AssetMap";
import AssetProvider from "./Components/AssetProvider";
import AssetsProvider from "./Components/AssetsProvider";
import ClusteredMap from "./Components/ClusteredMap";
import CoordinateProvider from "./Components/CoordinateProvider";
import CSVDownloadButton from "./Components/CSVDownloadButton";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Login from "./Components/Login";
import LoginProvider from "./Components/LoginProvider";
import Pagination from "./Components/Pagination";
import Portal from "./Components/Portal";
import SearchBox from "./Components/SearchBox";

import AggregateGateway from "./Gateway/AggregateGatewayy";
import ApiKeyGateway from "./Gateway/ApiKeyGateway";
import AssetGateway from "./Gateway/AssetGateway";
import AuthenticationGateway from "./Gateway/AuthenticationGateway";
import LocationGateway from "./Gateway/LocationGateway";
import SearchGateway from "./Gateway/SearchGateway";
import PostcodeLookupGateway from "./Gateway/PostcodeLookupGateway";

import AuthorizeUser from "./UseCase/AuthorizeUser";
import DownloadAsset from "./UseCase/DownloadAsset";
import DownloadSearchResults from "./UseCase/DownloadSearchResults";
import GetAggregateValues from "./UseCase/GetAggregateValues";
import GetAsset from "./UseCase/GetAsset";
import GetApiKeyForToken from "./UseCase/GetApiKeyForToken";
import GetCoordinatesForPostcode from "./UseCase/GetCoordinatesForPostcodes";
import GetLoggedInStatus from "./UseCase/GetLoggedInStatus";
import SearchAssets from "./UseCase/SearchAssets";

import FileDownloadPresenter from "./Presenters/FileDownload";

import VersionProvider from "./Components/VersionProvider";
import VersionSelector from "./Components/VersionSelector";
import VersionGateway from "./Gateway/VersionGateway";

const authenticationGateway = new AuthenticationGateway();
const apiKeyGateway = new ApiKeyGateway();
const authorizeUserUseCase = new AuthorizeUser({
  authenticationGateway: authenticationGateway
});
const getApiKeyForTokenUseCase = new GetApiKeyForToken({
  authenticationGateway,
  apiKeyGateway
});

const getLoggedInStatus = new GetLoggedInStatus({
  authenticationGateway,
  apiKeyGateway
});
const locationGateway = new LocationGateway(window.location);

const aggregateGateway = new AggregateGateway({ apiKeyGateway });
const assetGateway = new AssetGateway({ apiKeyGateway });
const postcodeLookupGateway = new PostcodeLookupGateway();
const searchGateway = new SearchGateway({ apiKeyGateway });
const versionGateway = new VersionGateway({ apiKeyGateway });
const downloadSearchResultsUsecase = new DownloadSearchResults({
  searchGateway
});

const downloadAssetUsecase = new DownloadAsset({ assetGateway });
const getAssetUsecase = new GetAsset({ assetGateway });
const getAggregateValuesUseCase = new GetAggregateValues({ aggregateGateway });
const getCoordinatesForPostcode = new GetCoordinatesForPostcode({
  postcodeLookupGateway
});
const searchAssetUsecase = new SearchAssets({ searchGateway });

const fileDownloadPresenter = new FileDownloadPresenter();

const displayMapsPage = () => {
  return process.env.REACT_APP_DISPLAY_MAPS === "yes";
};

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

const LandingPage = () => {
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
    </div>
  );
};

const renderSearchPageAggregates = (searchParameters, versionSelected) => {
  return (
    <AggregatesProvider
      version={versionSelected}
      getAggregates={getAggregateValuesUseCase}
      searchParameters={searchParameters}
    >
      {({ aggregates }) => <Aggregates aggregateValues={aggregates} />}
    </AggregatesProvider>
  );
};

const renderIndividualAssetSearchBody = (
  assets,
  totalCount,
  loading,
  searchParameters,
  onPageSelect,
  numberOfPages,
  currentPage
) => {
  if (Object.keys(searchParameters).length === 0) {
    return (
      <div className="govuk-grid-column-two-thirds">
        <p className="govuk-body">To use this search:</p>
        <ul className="govuk-list govuk-list--bullet">
          <li>enter either a scheme id or address</li>
          <li>select the asset to reveal more details</li>
        </ul>
        <p className="govuk-body">
          At any point you can return to this page and refine your search
          request.
        </p>
      </div>
    );
  }
  return (
    <div className="govuk-grid-column-two-thirds">
      <AssetList
        linkComponent={Link}
        assets={assets}
        totalCount={totalCount}
        loading={loading}
      />
      <CSVDownloadButton
        searchParameters={searchParameters}
        downloadSearch={downloadSearchResultsUsecase}
        presenter={fileDownloadPresenter}
      />
      <Pagination
        onPageSelect={onPageSelect}
        max={numberOfPages}
        current={currentPage}
      />
    </div>
  );
};

const renderAssetRegisterReporting = (
  assets,
  totalCount,
  loading,
  searchParameters,
  onPageSelect,
  numberOfPages,
  currentPage,
  versionSelected
) => {
  return (
    <div className="govuk-grid-column-two-thirds">
      <p className="govuk-body">To use this reporting feature:</p>
      <ul className="govuk-list govuk-list--bullet">
        <li>take note of the asset register version</li>
        <li>filter the totals to view new criteria</li>
        <li>
          view any of the assets that have been used to generate the new totals
        </li>
      </ul>
      <p className="govuk-body">
        At any point you can clear the filters to view the full Asset Register
      </p>
      <div className="govuk-grid-row">
        {renderSearchPageAggregates(searchParameters, versionSelected)}
      </div>
      {renderAssetsMap(assets, searchParameters)}
      <CSVDownloadButton
        searchParameters={searchParameters}
        downloadSearch={downloadSearchResultsUsecase}
        presenter={fileDownloadPresenter}
      />
      <AssetList
        linkComponent={Link}
        assets={assets}
        totalCount={totalCount}
        loading={loading}
      />
      <Pagination
        onPageSelect={onPageSelect}
        max={numberOfPages}
        current={currentPage}
      />
    </div>
  );
};

const renderAssetsMap = (assets, searchParameters) => {
  if (assets.length === 0) {
    return <div />;
  }
  const postcodes = assets.map(({ propertyPostcode }) => propertyPostcode);
  return (
    <CoordinateProvider
      key={JSON.stringify(searchParameters)}
      postcodes={postcodes}
      getCoordinatesForPostcode={getCoordinatesForPostcode}
    >
      {({ coordinates }) => {
        return <ClusteredMap positions={coordinates} />;
      }}
    </CoordinateProvider>
  );
};

const ReportingPage = () => {
  const historyGateway = { storeSearch: () => {} };

  return (
    <React.Fragment>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third">
          <Link to="/">Back</Link>
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <h1 className="govuk-heading-l">Homes Equity Asset Register</h1>
        </div>
      </div>
      <VersionProvider versionGateway={versionGateway}>
        {({ versions, versionSelected, onVersionSelect }) => (
          <React.Fragment>
            <VersionSelector
              versions={versions}
              versionSelected={versionSelected}
              onVersionSelect={onVersionSelect}
            />
            <AssetsProvider
              version={versionSelected}
              history={historyGateway}
              searchAssets={searchAssetUsecase}
              initialSearchParameters={{}}
            >
              {({
                assets,
                onSearch,
                onPageSelect,
                numberOfPages,
                currentPage,
                loading,
                totalCount,
                searchParameters
              }) => (
                <React.Fragment>
                  <div className="govuk-grid-row" style={{ marginTop: "50px" }}>
                    <div className="govuk-grid-column-full">
                      <h2 className="govuk-heading-m">
                        Asset Register Reporting
                      </h2>
                      <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
                    </div>
                  </div>
                  <div className="govuk-grid-row">
                    <div className="govuk-grid-column-one-third">
                      <SearchBox onSearch={onSearch} />
                    </div>
                    {renderAssetRegisterReporting(
                      assets,
                      totalCount,
                      loading,
                      searchParameters,
                      onPageSelect,
                      numberOfPages,
                      currentPage,
                      versionSelected
                    )}
                  </div>
                </React.Fragment>
              )}
            </AssetsProvider>
          </React.Fragment>
        )}
      </VersionProvider>
    </React.Fragment>
  );
};

const SearchPage = () => {
  const historyGateway = { storeSearch: () => {} };

  return (
    <React.Fragment>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-one-third">
          <Link to="/">Back</Link>
        </div>
      </div>
      <div className="govuk-grid-row">
        <div className="govuk-grid-column-full">
          <h1 className="govuk-heading-l">Homes Equity Asset Register</h1>
        </div>
      </div>
      <VersionProvider versionGateway={versionGateway}>
        {({ versions, versionSelected, onVersionSelect }) => (
          <React.Fragment>
            <VersionSelector
              versions={versions}
              versionSelected={versionSelected}
              onVersionSelect={onVersionSelect}
            />
            <AssetsProvider
              version={versionSelected}
              history={historyGateway}
              searchAssets={searchAssetUsecase}
              initialSearchParameters={{}}
            >
              {({
                assets,
                onSearch,
                onPageSelect,
                numberOfPages,
                currentPage,
                loading,
                totalCount,
                searchParameters
              }) => (
                <React.Fragment>
                  <div className="govuk-grid-row">
                    <div className="govuk-grid-column-full">
                      <h2 className="govuk-heading-m">
                        Individual Asset Search
                      </h2>
                      <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
                    </div>
                  </div>
                  <div className="govuk-grid-row">
                    <div className="govuk-grid-column-one-third">
                      <SearchBox onSearch={onSearch} />
                    </div>
                    {renderIndividualAssetSearchBody(
                      assets,
                      totalCount,
                      loading,
                      searchParameters,
                      onPageSelect,
                      numberOfPages,
                      currentPage
                    )}
                  </div>
                </React.Fragment>
              )}
            </AssetsProvider>
          </React.Fragment>
        )}
      </VersionProvider>
    </React.Fragment>
  );
};

const AssetPage = props => (
  <AssetProvider
    assetId={parseInt(props.match.params.assetId)}
    getAsset={getAssetUsecase}
  >
    {({ asset }) => (
      <div>
        <Asset
          asset={asset}
          mapComponent={({ postcode }) => (
            <CoordinateProvider
              postcodes={[postcode]}
              getCoordinatesForPostcode={getCoordinatesForPostcode}
            >
              {({ coordinates }) => {
                return <AssetMap position={coordinates[0]} />;
              }}
            </CoordinateProvider>
          )}
        />
        <AssetDownloadButton
          assetId={asset.id}
          downloadAsset={downloadAssetUsecase}
          presenter={fileDownloadPresenter}
        />
      </div>
    )}
  </AssetProvider>
);

const MappingPage = () => (
  <div>
    Mapping page coming soon...
  </div>
)
const renderRoutes = () => (
  <Switch>
    <Route exact path="/" component={LandingPage} />
    <Route exact path="/search" component={SearchPage} />
    <Route exact path="/reporting" component={ReportingPage} />
    <Route exact path="/mapping" component={MappingPage} />
    <Route path="/asset/:assetId" component={AssetPage} />
  </Switch>
);

const renderLogin = () => (
  <LoginProvider
    authorizeUser={authorizeUserUseCase}
    locationGateway={locationGateway}
  >
    {({ onLogin, emailSent, failedAuthorize }) => {
      if (!emailSent && !failedAuthorize) {
        return <Login onLogin={onLogin} />;
      }
      if (!emailSent && failedAuthorize) {
        return (
          <p data-test="not-authorised">
            This email address has not been added as an authorized user. Please
            contact Homes England for access
          </p>
        );
      } else {
        return <p>Email sent! Please check your inbox for your login link</p>;
      }
    }}
  </LoginProvider>
);

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header linkComponent={Link} />
          <div className="govuk-width-container">
            <main className="govuk-main-wrapper">
              <Route path="/">
                {props => (
                  <Portal
                    getLoggedInStatus={getLoggedInStatus}
                    getApiKeyForToken={getApiKeyForTokenUseCase}
                    token={
                      qs.parse(props.location.search, {
                        ignoreQueryPrefix: true
                      }).token
                    }
                  >
                    {({ loggedIn }) => {
                      if (loggedIn) {
                        return renderRoutes();
                      } else {
                        return renderLogin();
                      }
                    }}
                  </Portal>
                )}
              </Route>
            </main>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
