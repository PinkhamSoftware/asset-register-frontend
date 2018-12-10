import React from "react";
import AssetList from ".";

import { storiesOf } from "@storybook/react";

const LinkComponent = props => (
  <div>
    <div>Link to: {props.to}</div>
    <div>{props.children}</div>
  </div>
);

storiesOf("AssetList", module)
  .add("A single asset", () => {
    return (
      <AssetList
        totalCount={1}
        linkComponent={LinkComponent}
        assets={[
          {
            id: 1,
            schemeId: 1,
            address: "1 Cat Street"
          }
        ]}
      />
    );
  })
  .add("Many assets", () => {
    return (
      <AssetList
        totalCount={3}
        linkComponent={LinkComponent}
        assets={[
          {
            id: 2,
            schemeId: 1,
            address: "1 Cat Street"
          },
          {
            id: 3,
            schemeId: 2,
            address: "2 Woofer Road"
          },
          {
            id: 4,
            schemeId: 3,
            address: "Pond Street"
          }
        ]}
      />
    );
  });
