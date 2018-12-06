import React from "react";
import AssetsProvider from ".";

import { storiesOf } from "@storybook/react";

const historyStub = {
  storeSearch: route => {
    console.log(route);
  }
};

storiesOf("AssetsProvider", module).add("Default", () => {
  let searchAssetsStub = { execute: () => [{ cat: "meow" }] };

  return (
    <AssetsProvider history={historyStub} searchAssets={searchAssetsStub}>
      {({ onSearch, assets }) => (
        <div>
          <button
            type="button"
            onClick={() => onSearch({ params: "Searched" })}
          >
            Click me to search the assets
          </button>
          <p>Asset count = {assets.length}</p>
        </div>
      )}
    </AssetsProvider>
  );
});
