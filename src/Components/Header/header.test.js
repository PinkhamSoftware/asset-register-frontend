import React from "react";
import { mount } from "enzyme";
import Header from ".";

describe("<Header>", () => {
  it("Renders the link component correctly", () => {
    const LinkSpy = props => (
      <div data-test="link-spy" {...props}>
        {props.children}
      </div>
    );

    let header = mount(<Header linkComponent={LinkSpy} />);

    expect(header.find({ "data-test": "link-spy" }).length > 1).toBeTruthy();
  });
});
