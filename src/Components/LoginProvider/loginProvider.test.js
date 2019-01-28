import LoginProvider from ".";
import React from "react";
import { mount } from "enzyme";

class ChildrenFake {
  executeLogin = async email => await this.onLoginReceived({ email });

  render = ({ onLogin, emailSent, failedAuthorize }) => {
    this.onLoginReceived = onLogin;
    this.isEmailSent = emailSent;
    this.failedAuthorize = failedAuthorize;
  };
}

describe("<LoginProvider>", () => {
  const waitForAsync = () => new Promise(resolve => setImmediate(resolve));

  describe("Given the user is not logged in", () => {
    let childrenFake, authorizeUserSpy, provider;
    describe("Given the user is authorised", () => {
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

        expect(authorizeUserSpy.execute).toHaveBeenCalledWith(
          expect.anything(),
          {
            email: "test@test.com",
            url: "http://meow.cat/"
          }
        );
      });

      it("Passes email not sent to the children", async () => {
        expect(childrenFake.isEmailSent).toBeFalsy();
      });

      it("Passes email sent to the children after logging in", async () => {
        childrenFake.executeLogin("test@test.com");
        await waitForAsync();

        expect(childrenFake.isEmailSent).toBeTruthy();
      });
    });

    describe("Given the user is not authorised", () => {
      it("Passes failed auth to the children if user was not authorised", async () => {
        let authorizeUserSpy = {
          execute: jest.fn(presenter => {
            presenter.present({ authorized: false });
          })
        };

        let locationGateway = {
          getRoot: () => "http://meow.cat/"
        };

        let childrenFake = new ChildrenFake();

        let provider = mount(
          <LoginProvider
            authorizeUser={authorizeUserSpy}
            locationGateway={locationGateway}
          >
            {childrenFake.render}
          </LoginProvider>
        );

        childrenFake.executeLogin("test@test.com");
        await waitForAsync();

        expect(childrenFake.isEmailSent).toBeFalsy();
        expect(childrenFake.failedAuthorize).toBeTruthy();
      });
    });
  });
});
