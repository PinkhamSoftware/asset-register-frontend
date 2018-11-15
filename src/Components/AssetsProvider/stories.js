import React from "react";
import AssetsProvider from ".";

import { storiesOf } from "@storybook/react";

storiesOf("AssetsProvider", module).add("Default", () => {
  let searchAssetsStub = { execute: () => [{ cat: "meow" }] };

  return (
    <AssetsProvider searchAssets={searchAssetsStub}>
      {({ onSearch, assets }) => (
        <div>
          <button type="button" onClick={onSearch}>
            Click me to search the assets
          </button>
          <p>Asset count = {assets.length}</p>
        </div>
      )}
    </AssetsProvider>
  );
});
