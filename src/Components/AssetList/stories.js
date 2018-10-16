import React from "react";
import AssetList from ".";

import { storiesOf } from "@storybook/react";

storiesOf("AssetList", module)
  .add("A single asset", () => {
    return (
      <AssetList
        assets={[
          {
            id: "1",
            name: "The Big Cat House",
            address: "1 Cat Street",
            value: "£ 1,000,000.00"
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
        ]}
      />
    );
  });
