import AuthorizeUser from ".";

describe("AuthorizeUser", () => {
  const gatewaySpyWithAuthorised = authorized => ({
    authorize: jest.fn(() => ({ authorized }))
  });

  describe("Example one", () => {
    describe("Given the user is authorized", () => {
      let authenticationGatewaySpy, presenterSpy, useCase;
      beforeEach(async () => {
        authenticationGatewaySpy = gatewaySpyWithAuthorised(true);
        presenterSpy = { present: jest.fn() };
        useCase = new AuthorizeUser({
          authenticationGateway: authenticationGatewaySpy
        });

        await useCase.execute(presenterSpy, {
          email: "test@test.com",
          url: "https://meow.cat"
        });
      });

      it("Calls the authorize method on the authentication gateway with the email and url", async () => {
        expect(authenticationGatewaySpy.authorize).toHaveBeenCalledWith(
          "test@test.com",
          "https://meow.cat"
        );
      });

      it("Calls the presenter with authorized true", async () => {
        expect(presenterSpy.present).toHaveBeenCalledWith({ authorized: true });
      });
    });

    describe("Given the user is not authorised", () => {
      it("Calls the presenter with authorized false", async () => {
        let authenticationGatewaySpy = gatewaySpyWithAuthorised(false);
        let presenterSpy = { present: jest.fn() };
        let useCase = new AuthorizeUser({
          authenticationGateway: authenticationGatewaySpy
        });

        await useCase.execute(presenterSpy, {
          email: "test@test.com",
          url: "https://meow.cat"
        });

        expect(presenterSpy.present).toHaveBeenCalledWith({
          authorized: false
        });
      });
    });
  });

  describe("Example two", () => {
    describe("Given the user is authorized", () => {
      let authenticationGatewaySpy, presenterSpy, useCase;
      beforeEach(async () => {
        authenticationGatewaySpy = gatewaySpyWithAuthorised(true);
        presenterSpy = { present: jest.fn() };
        useCase = new AuthorizeUser({
          authenticationGateway: authenticationGatewaySpy
        });

        await useCase.execute(presenterSpy, {
          email: "cat@meow.cat",
          url: "https://dog.woof"
        });
      });

      it("Calls the authorize method on the authentication gateway with the email", async () => {
        expect(authenticationGatewaySpy.authorize).toHaveBeenCalledWith(
          "cat@meow.cat", "https://dog.woof"
        );
      });

      it("Calls the presenter with authorized true", async () => {
        expect(presenterSpy.present).toHaveBeenCalledWith({ authorized: true });
      });
    });

    describe("Given the user is not authorised", () => {
      it("Calls the presenter with authorized false", async () => {
        let authenticationGatewaySpy = gatewaySpyWithAuthorised(false);
        let presenterSpy = { present: jest.fn() };
        let useCase = new AuthorizeUser({
          authenticationGateway: authenticationGatewaySpy
        });
        await useCase.execute(presenterSpy, { email: "cat@meow.cat" });

        expect(presenterSpy.present).toHaveBeenCalledWith({
          authorized: false
        });
      });
    });
  });
});
