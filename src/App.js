import React, { Component } from "react";
import "./App.css";
import "govuk-frontend/all.scss";

import SearchGateway from "./Gateway/SearchGateway";
import SearchAssets from "./UseCase/SearchAssets";

import AssetList from "./Components/AssetList";
import AssetsProvider from "./Components/AssetsProvider";
import Footer from "./Components/Footer";
import Header from "./Components/Header";
import Pagination from "./Components/Pagination";
import SearchBox from "./Components/SearchBox";

const searchGateway = new SearchGateway();
const searchAssetUsecase = new SearchAssets({ searchGateway });

class App extends Component {
  render() {
    return (
      <div>
        <Header />
        <div className="govuk-width-container">
          <main className="govuk-main-wrapper">
            <AssetsProvider searchAssets={searchAssetUsecase}>
              {({
                assets,
                onSearch,
                onPageSelect,
                numberOfPages,
                currentPage
              }) => (
                <div className="govuk-grid-row">
                  <div class="govuk-grid-column-one-third">
                    <SearchBox onSearch={onSearch} />
                  </div>
                  <div class="govuk-grid-column-two-thirds">
                    <AssetList assets={assets} />
                    <Pagination
                      onPageSelect={onPageSelect}
                      max={numberOfPages}
                      current={currentPage}
                    />
                  </div>
                </div>
              )}
            </AssetsProvider>
          </main>
        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
