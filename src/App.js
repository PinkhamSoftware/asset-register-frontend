import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import "govuk-frontend/all.scss";

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
import Pagination from "./Components/Pagination";
import SearchBox from "./Components/SearchBox";

import AggregateGateway from "./Gateway/AggregateGatewayy";
import AssetGateway from "./Gateway/AssetGateway";
import SearchGateway from "./Gateway/SearchGateway";
import PostcodeLookupGateway from "./Gateway/PostcodeLookupGateway";

import DownloadAsset from "./UseCase/DownloadAsset";
import DownloadSearchResults from "./UseCase/DownloadSearchResults";
import GetAggregateValues from "./UseCase/GetAggregateValues";
import GetAsset from "./UseCase/GetAsset";
import GetCoordinatesForPostcode from "./UseCase/GetCoordinatesForPostcodes";
import SearchAssets from "./UseCase/SearchAssets";

import FileDownloadPresenter from "./Presenters/FileDownload";

const aggregateGateway = new AggregateGateway();
const assetGateway = new AssetGateway();
const postcodeLookupGateway = new PostcodeLookupGateway();
const searchGateway = new SearchGateway();
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
      {renderAssetsMap(assets, searchParameters)}
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

const generateRandomLong = () => {
  var num = (Math.random() * 3).toFixed(3);
  var posorneg = Math.floor(Math.random());
  if (posorneg === 0) {
    num = num * -1;
  }
  return num;
};

const generateRandomLat = () => {
  var num = (Math.random() * 3.5).toFixed(3);
  var posorneg = Math.floor(Math.random());
  if (posorneg === 0) {
    num = num * -1;
  }
  return num + 54.5;
};

const generatePositions = num => {
  let positions = [];
  for (let i = 0; i < num; i++) {
    positions.push({ lat: generateRandomLat(), lng: generateRandomLong() });
  }
  return positions;
};

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
                      <ClusteredMap
                        positions={generatePositions(
                          props.match.params.positions
                        )}
                      />
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
