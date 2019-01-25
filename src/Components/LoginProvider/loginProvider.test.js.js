import { LoginProvider } from ".";
import React from "react";
import { mount } from "enzyme";

class ChildrenFake {
  executeLogin = async email => await this.onLoginReceived({ email });

  render = ({ onLogin, emailSent, failedAuthorize }) => {
    this.onLoginReceived = onLogin;
    this.isEmailSent = emailSent;
    this.failedAuthorize = failedAuthorize
  };
}

describe("<LoginProvider>", () => {
  describe("Given the user is not logged in", () => {
    let childrenFake, authorizeUserSpy, provider;
    beforeEach(() => {
      authorizeUserSpy = {
        execute: jest.fn(presenter => {
          presenter.present({ authorized: true });
        })
      };

      let locationGateway = {
        getRoot: () => "http://meow.cat/"
      };

      childrenFake = new ChildrenFake();

      provider = mount(
        <LoginProvider
          authorizeUser={authorizeUserSpy}
          locationGateway={locationGateway}
        >
          {childrenFake.render}
        </LoginProvider>
      );
    });

    it("Can call the login method from the children and passes in the url", async () => {
      await childrenFake.executeLogin("test@test.com");

      expect(authorizeUserSpy.execute).toHaveBeenCalledWith(expect.anything(), {
        email: "test@test.com",
        url: "http://meow.cat/"
      });
    });

    it("Passes email not sent to the children", async () => {

      expect(childrenFake.isEmailSent).toBeFalsy();
      
    });

    it("Passes email sent to the children after logging in", async () => {
      expect(childrenFake.isEmailSent).toBeTruthy();
    });

    it("Passes email sent to the children after logging in", async () => {
      await childrenFake.executeLogin("test@test.com");

      expect(childrenFake.isEmailSent).toBeTruthy();
    });

    it("Passes email sent to the children after logging in", async () => {

      authorizeUserSpy = {
        execute: jest.fn(presenter => {
          presenter.present({ authorized: false });
        })
      };
      
      await childrenFake.executeLogin("test@test.com");

      expect(childrenFake.isEmailSent).toBeFalsy();
      expect(childrenFake.failedAuthorize).toBeTruthy();
    });
  });
});
