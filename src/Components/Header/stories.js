import Header from ".";
import React from "react";
import { storiesOf } from "@storybook/react";

storiesOf("Header", module).add("Default", () => (
  <Header linkComponent={props => <span>{props.children}</span>} />
));
