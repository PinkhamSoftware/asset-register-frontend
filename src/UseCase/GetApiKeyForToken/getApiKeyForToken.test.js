import GetApiKeyForToken from ".";

describe("GetApiKeyForToken", () => {
  const authenticationGatewaySpyThatReturns = response => ({
    getApiKey: jest.fn(() => response)
  });

  describe("Example one", () => {
    describe("Given the user is unauthorized", () => {
      let authenticationGatewaySpy, apiKeyGatewaySpy, useCase;
      beforeEach(() => {
        authenticationGatewaySpy = authenticationGatewaySpyThatReturns({
          authorized: false
        });
        apiKeyGatewaySpy = { save: jest.fn() };
        useCase = new GetApiKeyForToken({
          authenticationGateway: authenticationGatewaySpy,
          apiKeyGateway: apiKeyGatewaySpy
        });
      });

      it("Does not call the api key gateway", async () => {
        await useCase.execute({ token: "token one" });

        expect(apiKeyGatewaySpy.save).not.toHaveBeenCalled();
      });

      it("Returns unauthorized", async () => {
        let response = await useCase.execute({ token: "token one" });

        expect(response).toEqual({ authorized: false });
      });
    });

    describe("Given the user is authorised", () => {
      let authenticationGatewaySpy, apiKeyGatewaySpy, useCase;
      beforeEach(() => {
        authenticationGatewaySpy = authenticationGatewaySpyThatReturns({
          authorized: true,
          apiKey: "SuperSecret"
        });
        apiKeyGatewaySpy = { save: jest.fn() };
        useCase = new GetApiKeyForToken({
          authenticationGateway: authenticationGatewaySpy,
          apiKeyGateway: apiKeyGatewaySpy
        });
      });

      it("Passes the token to the authentication gateway", async () => {
        await useCase.execute({ token: "token one" });

        expect(authenticationGatewaySpy.getApiKey).toHaveBeenCalledWith(
          "token one"
        );
      });

      it("Saves the generated token", async () => {
        await useCase.execute({ token: "token one" });

        expect(apiKeyGatewaySpy.save).toHaveBeenCalledWith("SuperSecret");
      });

      it("Returns authorized true", async () => {
        let response = await useCase.execute({ token: "token one" });

        expect(response).toEqual({ authorized: true });
      });
    });
  });

  describe("Example two", () => {
    describe("Given the user is unauthorized", () => {
      let authenticationGatewaySpy, apiKeyGatewaySpy, useCase;
      beforeEach(() => {
        authenticationGatewaySpy = authenticationGatewaySpyThatReturns({
          authorized: false
        });
        apiKeyGatewaySpy = { save: jest.fn() };
        useCase = new GetApiKeyForToken({
          authenticationGateway: authenticationGatewaySpy,
          apiKeyGateway: apiKeyGatewaySpy
        });
      });

      it("Does not call the api key gateway", async () => {
        await useCase.execute({ token: "token two" });

        expect(apiKeyGatewaySpy.save).not.toHaveBeenCalled();
      });

      it("Returns unauthorized", async () => {
        let response = await useCase.execute({ token: "token two" });

        expect(response).toEqual({ authorized: false });
      });
    });
    describe("Given the user is authorised", () => {
      let authenticationGatewaySpy, apiKeyGatewaySpy, useCase;
      beforeEach(() => {
        authenticationGatewaySpy = authenticationGatewaySpyThatReturns({
          authorized: true,
          apiKey: "megaSecret"
        });
        apiKeyGatewaySpy = { save: jest.fn() };
        useCase = new GetApiKeyForToken({
          authenticationGateway: authenticationGatewaySpy,
          apiKeyGateway: apiKeyGatewaySpy
        });
      });

      it("Passes the token to the authentication gateway", async () => {
        await useCase.execute({ token: "token token token" });

        expect(authenticationGatewaySpy.getApiKey).toHaveBeenCalledWith(
          "token token token"
        );
      });

      it("It saves the api key", async () => {
        await useCase.execute({ token: "token token token" });

        expect(apiKeyGatewaySpy.save).toHaveBeenCalledWith("megaSecret");
      });

      it("It returns authorized true", async () => {
        let response = await useCase.execute({ token: "token token token" });

        expect(response).toEqual({ authorized: true });
      });
    });
  });
});
