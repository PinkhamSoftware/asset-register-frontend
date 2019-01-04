import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import "govuk-frontend/all.scss";

import Login from "./Components/Login";

import FileDownloadPresenter from "./Presenters/FileDownload";

import GetInitialSearchParameters from "./UseCase/GetInitialSearchParameters";
import DownloadSearchResults from "./UseCase/DownloadSearchResults";
import DownloadAsset from "./UseCase/DownloadAsset";

import HistoryGateway from "./Gateway/HistoryGateway";

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

const getInitialSearchParameters = new GetInitialSearchParameters();
const fileDownloadPresenter = new FileDownloadPresenter();

const LandingPage = props => {
  const historyGateway = new HistoryGateway(props.history);
  let { searchParameters, page } = getInitialSearchParameters.execute(
    props.location.search
  );

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

const renderSearchPageAggregates = (searchQuery, searchParameters) => {
  if (Object.keys(searchParameters).length === 0) {
    return <span />;
  }

  return (
    <AggregatesProvider
      key={searchQuery}
      getAggregates={getAggregateValuesUseCase}
      searchParameters={searchParameters}
    >
      {({ aggregates }) => <Aggregates aggregateValues={aggregates} />}
    </AggregatesProvider>
  );
};

const SearchPage = props => {
  const historyGateway = new HistoryGateway(props.history);
  let { searchParameters, page } = getInitialSearchParameters.execute(
    props.location.search
  );

  return (
    <AssetsProvider
      history={historyGateway}
      searchAssets={searchAssetUsecase}
      initialSearchParameters={{ searchParameters, page }}
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
            {renderSearchPageAggregates(
              props.location.search,
              searchParameters
            )}
          </div>
          <div className="govuk-grid-row">
            <div className="govuk-grid-column-one-third">
              <SearchBox onSearch={onSearch} />
            </div>
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
          </div>
        </React.Fragment>
      )}
    </AssetsProvider>
  );
};

const AssetPage = props => (
  <AssetProvider
    assetId={parseInt(props.match.params.assetId)}
    getAsset={getAssetUsecase}
  >
    {({ asset }) => (
      <div>
        <Asset asset={asset} />
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
              <Login onLogin={({email})=> console.log(email)}></Login>
              <Switch>
                <Route exact path="/" component={LandingPage} />
                <Route exact path="/search" component={SearchPage} />
                <Route path="/asset/:assetId" component={AssetPage} />
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
