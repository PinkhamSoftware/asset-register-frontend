import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import "govuk-frontend/all.scss";

import AssetMap from "./Components/AssetMap";
import ClusteredMap from "./Components/ClusteredMap";

import FileDownloadPresenter from "./Presenters/FileDownload";

import DownloadSearchResults from "./UseCase/DownloadSearchResults";
import DownloadAsset from "./UseCase/DownloadAsset";

import SearchGateway from "./Gateway/SearchGateway";
import SearchAssets from "./UseCase/SearchAssets";

import AssetGateway from "./Gateway/AssetGateway";
import GetAsset from "./UseCase/GetAsset";

import AssetList from "./Components/AssetList";
import AssetsProvider from "./Components/AssetsProvider";
import AssetProvider from "./Components/AssetProvider";

import AggregateGateway from "./Gateway/AggregateGatewayy";
import GetAggregateValues from "./UseCase/GetAggregateValues";
import AggregatesProvider from "./Components/AggregatesProvider";
import Aggregates from "./Components/Aggregates";

import Asset from "./Components/Asset";

import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Pagination from "./Components/Pagination";
import SearchBox from "./Components/SearchBox";
import AssetDownloadButton from "./Components/AssetDownloadButton";
import CSVDownloadButton from "./Components/CSVDownloadButton";
import CoordinateProvider from "./Components/CoordinateProvider";

const searchGateway = new SearchGateway();
const searchAssetUsecase = new SearchAssets({ searchGateway });
const downloadSearchResultsUsecase = new DownloadSearchResults({
  searchGateway
});

const assetGateway = new AssetGateway();
const getAssetUsecase = new GetAsset({ assetGateway });
const downloadAssetUsecase = new DownloadAsset({ assetGateway });

const aggregateGateway = new AggregateGateway();
const getAggregateValuesUseCase = new GetAggregateValues({ aggregateGateway });

const fileDownloadPresenter = new FileDownloadPresenter();

const displayMapsPage = () => {
  return process.env.REACT_APP_DISPLAY_MAPS === "yes";
};

const LandingPage = () => {
  return (
    <div>
      <AggregatesProvider
        getAggregates={getAggregateValuesUseCase}
        searchParameters={{}}
      >
        {({ aggregates }) => <Aggregates aggregateValues={aggregates} />}
      </AggregatesProvider>
      <Link to="/search">Search the register</Link>
    </div>
  );
};

const renderSearchPageAggregates = searchParameters => {
  return (
    <AggregatesProvider
      key={JSON.stringify(searchParameters)}
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
  currentPage
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
        {renderSearchPageAggregates(searchParameters)}
      </div>
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

const SearchPage = () => {
  const historyGateway = { storeSearch: () => {} };

  return (
    <React.Fragment>
      <div className="govuk-grid-row">
        <h1 className="govuk-heading-l">Homes England Asset Register</h1>
      </div>
      <AssetsProvider
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
              <h2 className="govuk-heading-m">Individual Asset Search</h2>
              <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
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
      <AssetsProvider
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
              <h2 className="govuk-heading-m">Asset Register Reporting</h2>
              <hr className="govuk-section-break govuk-section-break--m govuk-section-break--visible" />
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
                currentPage
              )}
            </div>
          </React.Fragment>
        )}
      </AssetsProvider>
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
              postcode={postcode}
              getCoordinatesForPostcode={{
                execute: presenter =>
                  presenter.present({ coordinates: { lat: 51.5, lng: 0.0 } })
              }}
            >
              {({ coordinates }) => <AssetMap position={coordinates} />}
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

class App extends Component {
  render() {
    return (
      <Router>
        <div>
          <Header linkComponent={Link} />
          <div className="govuk-width-container">
            <main className="govuk-main-wrapper">
              <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/search" component={SearchPage} />
                <Route path="/asset/:assetId" component={AssetPage} />
                {displayMapsPage() && (
                  <Route
                    path="/maps/:positions"
                    component={props => (
                      <ClusteredMap positions={props.match.params.positions} />
                    )}
                  />
                )}
              </Switch>
            </main>
          </div>
          <Footer />
        </div>
      </Router>
    );
  }
}

export default App;
