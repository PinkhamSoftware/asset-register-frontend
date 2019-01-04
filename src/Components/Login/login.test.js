import React from "react";
import { mount } from "enzyme";
import Login from ".";

describe("<Login>", () => {

  let login, onLoginSpy;
  beforeEach( ()=> {
    onLoginSpy = jest.fn();
    login = mount(<Login onLogin={onLoginSpy} />);
  });

  it("Renders the login email input", () => {
    var input = login.find({ "data-test": "login-email-input" });
    expect(input.length).toEqual(1);
  });

  it("Renders the login submit button", () => {

    var button = login.find({ "data-test": "login-email-submit" });
    expect(button.length).toEqual(1);
  });

  it("Calls the onLogin prop on submission", () => {
    var button = login.find({ "data-test": "login-email-submit" });
    button.simulate("submit");
    expect(onLoginSpy).toHaveBeenCalled();
  });

  it("Calls the onLogin prop on submission with the value inside of the login input", () => {
    
    var button = login.find({ "data-test": "login-email-submit" });
    var input = login.find({"data-test": "login-email-input"});
    input.simulate("change", {target:{value:"test@example.com"}});
    button.simulate("submit");

    expect(onLoginSpy).toHaveBeenCalledWith({
      email: "test@example.com"
    });
  });

});
