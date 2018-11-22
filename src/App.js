import React, { Component } from "react";
import "./App.css";

import AssetGateway from "./Gateway/AssetGateway";
import SearchGateway from "./Gateway/SearchGateway";
import GetAsset from "./UseCase/GetAsset";
import SearchAssets from "./UseCase/SearchAssets";

import AssetProvider from "./Components/AssetProvider";
import AssetsProvider from "./Components/AssetsProvider";
import Asset from "./Components/Asset";
import SearchBox from "./Components/SearchBox";
import AssetList from "./Components/AssetList";

const assetGateway = new AssetGateway();
const searchGateway = new SearchGateway();
const getAssetUsecase = new GetAsset({ assetGateway });
const searchAssetUsecase = new SearchAssets({ searchGateway });

class App extends Component {
  constructor() {
    super();
    this.state = { assets: [] };
  }

  render() {
    return (
      <div>
        <AssetProvider assetId={1} getAsset={getAssetUsecase}>
          {({ asset }) => <Asset asset={asset} />}
        </AssetProvider>

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
