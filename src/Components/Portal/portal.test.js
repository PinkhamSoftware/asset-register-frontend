import React from "react";
import { mount } from "enzyme";
import Portal from ".";

describe("<Portal>", () => {
  const waitForAsync = () => new Promise(resolve => setImmediate(resolve));

  describe("When mounting", () => {
    it("Checks whether or not the user is logged in", () => {
      let getLoggedInStatusSpy = {
        execute: jest.fn(() => ({ loggedIn: true }))
      };

      mount(
        <Portal getLoggedInStatus={getLoggedInStatusSpy}>
          {() => <div />}
        </Portal>
      );

      expect(getLoggedInStatusSpy.execute).toHaveBeenCalled();
    });
  });

  describe("Given the user is not logged in", () => {
    it("Passes loggedIn false to the children", async () => {
      let getLoggedInStatusSpy = {
        execute: jest.fn(() => ({ loggedIn: false }))
      };

      let childrenSpy = jest.fn(() => <div />);

      mount(
        <Portal getLoggedInStatus={getLoggedInStatusSpy}>{childrenSpy}</Portal>
      );

      await waitForAsync();

      expect(childrenSpy).toHaveBeenCalledWith({
        loggedIn: false
      });
    });

    describe("And a valid token is provided", () => {
      it("Gets the api key for the token", async () => {
        let getLoggedInStatusStub = {
          execute: () => ({ loggedIn: false })
        };

        let getApiKeyForTokenSpy = {
          execute: jest.fn(() => ({ authorized: true }))
        };

        let childrenSpy = jest.fn(() => <div />);

        mount(
          <Portal
            getLoggedInStatus={getLoggedInStatusStub}
            getApiKeyForToken={getApiKeyForTokenSpy}
            token={"meow"}
          >
            {childrenSpy}
          </Portal>
        );

        await waitForAsync();

        expect(getApiKeyForTokenSpy.execute).toHaveBeenCalledWith({
          token: "meow"
        });
      });

      it("Passes logged in to the children", async () => {
        let getLoggedInStatusStub = {
          execute: () => ({ loggedIn: false })
        };

        let getApiKeyForTokenSpy = {
          execute: jest.fn(() => ({ authorized: true }))
        };

        let childrenSpy = jest.fn(() => <div />);

        mount(
          <Portal
            getLoggedInStatus={getLoggedInStatusStub}
            getApiKeyForToken={getApiKeyForTokenSpy}
            token={"meow"}
          >
            {childrenSpy}
          </Portal>
        );

        await waitForAsync();

        expect(childrenSpy).toHaveBeenCalledWith({ loggedIn: true });
      });
    });

    describe("And an invalid token is provided", () => {
      it("Passes logged in false to the children", async () => {
        let getLoggedInStatusStub = {
          execute: () => ({ loggedIn: false })
        };

        let getApiKeyForTokenSpy = {
          execute: () => ({ authorized: false })
        };

        let childrenSpy = jest.fn(() => <div />);

        mount(
          <Portal
            getLoggedInStatus={getLoggedInStatusStub}
            getApiKeyForToken={getApiKeyForTokenSpy}
            token={"meow"}
          >
            {childrenSpy}
          </Portal>
        );

        await waitForAsync();

        expect(childrenSpy).toHaveBeenCalledWith({ loggedIn: false });
      });
    });
  });
});
