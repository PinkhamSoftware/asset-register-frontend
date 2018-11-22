import React from "react";
import AssetList from ".";

import { storiesOf } from "@storybook/react";

storiesOf("AssetList", module)
  .add("A single asset", () => {
    return (
      <AssetList
        assets={[
          {
            schemeId: "1",
            address: "1 Cat Street",
          }
        ]}
      />
    );
  })
  .add("Many assets", () => {
    return (
      <AssetList
        assets={[
          {
            schemeId: "1",
            address: "1 Cat Street",
          },
          {
            schemeId: "2",
            address: "2 Woofer Road",
          },
          {
            schemeId: "3",
            address: "Pond Street",
          }
        ]}
      />
    );
  });
