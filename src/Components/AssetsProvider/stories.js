import React from "react";
import AssetsProvider from ".";

import { storiesOf } from "@storybook/react";

const historyStub = {
  storeSearch: route => {
    console.log(route);
  }
};

storiesOf("AssetsProvider", module).add("Default", () => {
  let searchAssetsStub = {
    execute: presenter =>
      presenter.present({
        assets: [{ cat: "meow" }],
        pages: 10,
        totalCount: 100
      })
  };

  return (
    <AssetsProvider history={historyStub} searchAssets={searchAssetsStub}>
      {({ onSearch, assets, totalCount, numberOfPages }) => (
        <div>
          <button
            type="button"
            onClick={() => onSearch({ params: "Searched" })}
          >
            Click me to search the assets
          </button>
          <p>Asset count = {totalCount}</p>
          <p>Asset pages = {numberOfPages}</p>
        </div>
      )}
    </AssetsProvider>
  );
});
