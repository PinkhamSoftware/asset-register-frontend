import React from "react";
import SearchBox from ".";

import { storiesOf } from "@storybook/react";

storiesOf("SearchBox", module).add("Default", () => {
  return <SearchBox onSearch={({ value }) => console.log(value)} />;
});
