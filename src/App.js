import React, { Component } from "react";
import "./App.css";

import SearchGateway from "./Gateway/SearchGateway";
import SearchAssets from "./UseCase/SearchAssets";

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
          {({ assets, onSearch }) => (
            <div>
              <SearchBox onSearch={onSearch} />
              <AssetList assets={assets} />
            </div>
          )}
        </AssetsProvider>
      </div>
    );
  }
}

export default App;
