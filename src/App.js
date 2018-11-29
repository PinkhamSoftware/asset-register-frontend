import React, { Component } from "react";
import "./App.css";

import SearchGateway from "./Gateway/SearchGateway";
import SearchAssets from "./UseCase/SearchAssets";

import Pagination from './Components/Pagination'
import AssetsProvider from "./Components/AssetsProvider";
import SearchBox from "./Components/SearchBox";
import AssetList from "./Components/AssetList";

const searchGateway = new SearchGateway();
const searchAssetUsecase = new SearchAssets({ searchGateway });

class App extends Component {
  render() {
    return (
      <div>
        <AssetsProvider searchAssets={searchAssetUsecase}>
          {({ assets, onSearch, onPageSelect, numberOfPages, currentPage }) => (
            <div>
              <SearchBox onSearch={onSearch} />
              <AssetList assets={assets} />
              <Pagination
                onPageSelect={onPageSelect}
                max={numberOfPages}
                current={currentPage}
              />
            </div>
          )}
        </AssetsProvider>
      </div>
    );
  }
}

export default App;
