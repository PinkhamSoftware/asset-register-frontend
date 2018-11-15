import React, { Component } from "react";
import "./App.css";

import AssetGateway from "./Gateway/AssetGateway";
import GetAsset from "./UseCase/GetAsset";

import AssetProvider from "./Components/AssetProvider";
import Asset from "./Components/Asset";

const assetGateway = new AssetGateway();
const getAssetUsecase = new GetAsset({ assetGateway });

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
      </div>
    );
  }
}

export default App;
