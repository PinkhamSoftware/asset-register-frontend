import React from "react";
import SearchBox from ".";

import { storiesOf } from "@storybook/react";

storiesOf("SearchBox", module).add("Default", () => (
  <SearchBox onSearch={({ filters }) => console.log(filters)} />
));
