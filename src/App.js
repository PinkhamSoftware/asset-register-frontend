import React, { Component } from "react";
import AssetList from "./Components/AssetList";
import SearchBox from "./Components/SearchBox";
import "./App.css";
import AssetProvider from "./Components/AssetProvider";

class SearchAssets {
  execute() {
    return [
      {
        id: "1",
        name: "The Big Cat House",
        address: "1 Cat Street",
        value: "£ 1,000,000.00"
      },
      {
        id: "2",
        name: "The Big Dog House",
        address: "2 Woofer Road",
        value: "£ 5,500,000.00"
      },
      {
        id: "3",
        name: "The Big Duck Pond",
        address: "Pond Street",
        value: "£ 10,000,000.00"
      }
    ];
  }
}

const searchAssetsUseCase = new SearchAssets();

class App extends Component {
  constructor() {
    super();
    this.state = { assets: [] };
  }

  render() {
    return (
      <div>
        <AssetProvider searchAssets={searchAssetsUseCase}>
          {({ onSearch, assets }) => (
            <div>
              <SearchBox onSearch={onSearch} />
              <AssetList assets={assets} />
            </div>
          )}
        </AssetProvider>
      </div>
    );
  }
}

export default App;
