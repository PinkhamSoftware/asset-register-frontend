import React from "react";
import { mount } from "enzyme";
import Login from ".";

class LoginComponent {
  constructor({ onLogin }) {
    this.login = mount(<Login onLogin={onLogin} />);
  }

  find(params) {
    return this.login.find(params);
  }

  displaysEmailInput() {
    return this.find({ "data-test": "login-email-input" }).length === 1;
  }

  displaysSubmitButton() {
    return this.find({ "data-test": "login-email-submit" }).length === 1;
  }

  submitForm() {
    var button = this.find({ "data-test": "login-email-submit" });
    button.simulate("submit");
  }

  inputEmail(email) {
    var input = this.find({ "data-test": "login-email-input" });

    input.simulate("change", { target: { value: email } });
  }
}

describe("<Login>", () => {
  let login, onLoginSpy;
  beforeEach(() => {
    onLoginSpy = jest.fn();
    login = new LoginComponent({ onLogin: onLoginSpy });
  });

  it("Renders the login email input", () => {
    expect(login.displaysEmailInput()).toEqual(true);
  });

  it("Renders the login submit button", () => {
    expect(login.displaysSubmitButton()).toEqual(true);
  });

  it("Calls the onLogin prop on submission", () => {
    login.submitForm();
    expect(onLoginSpy).toHaveBeenCalled();
  });

  describe("Calls the onLogin prop on submission with the value inside of the login input", () => {
    it("Example 1", () => {
      login.inputEmail("test@example.com");
      login.submitForm();

      expect(onLoginSpy).toHaveBeenCalledWith({
        email: "test@example.com"
      });
    });
    
    it("Example 2", () => {
      login.inputEmail("jest@example.com");
      login.submitForm();

      expect(onLoginSpy).toHaveBeenCalledWith({
        email: "jest@example.com"
      });
    });
  });
});
