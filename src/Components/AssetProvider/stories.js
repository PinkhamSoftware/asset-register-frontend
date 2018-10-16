import React from "react";
import AssetProvider from ".";

import { storiesOf } from "@storybook/react";

storiesOf("AssetProvider", module).add("Default", () => {
  let searchAssetsStub = { execute: () => [{ cat: "meow" }] };

  return (
    <AssetProvider searchAssets={searchAssetsStub}>
      {({ onSearch, assets }) => (
        <div>
          <button type="button" onClick={onSearch}>
            Click me to search the assets
          </button>
          <p>Asset count = {assets.length}</p>
        </div>
      )}
    </AssetProvider>
  );
});
