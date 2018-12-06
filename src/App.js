import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import "./App.css";
import "govuk-frontend/all.scss";

import GetInitialSearchParameters from "./UseCase/GetInitialSearchParameters";

import HistoryGateway from "./Gateway/HistoryGateway";

import SearchGateway from "./Gateway/SearchGateway";
import SearchAssets from "./UseCase/SearchAssets";

import AssetGateway from "./Gateway/AssetGateway";
import GetAsset from "./UseCase/GetAsset";

import AssetList from "./Components/AssetList";
import AssetsProvider from "./Components/AssetsProvider";
import AssetProvider from "./Components/AssetProvider";

import Asset from "./Components/Asset";

import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Pagination from "./Components/Pagination";
import SearchBox from "./Components/SearchBox";

const searchGateway = new SearchGateway();
const searchAssetUsecase = new SearchAssets({ searchGateway });

const assetGateway = new AssetGateway();
const getAssetUsecase = new GetAsset({ assetGateway });

const getInitialSearchParameters = new GetInitialSearchParameters();

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
        totalCount
      }) => (
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
            <Pagination
              onPageSelect={onPageSelect}
              max={numberOfPages}
              current={currentPage}
            />
          </div>
        </div>
      )}
    </AssetsProvider>
  );
};

const AssetPage = props => (
  <AssetProvider
    assetId={parseInt(props.match.params.assetId)}
    getAsset={getAssetUsecase}
  >
    {({ asset }) => <Asset asset={asset} />}
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
                <Route exact path="/" component={SearchPage} />
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
