import GetLoggedInStatus from ".";

describe("GetLoggedInStatus", () => {
  const authenticationGatewaySpyThatReturns = response => ({
    verifyApiKey: jest.fn(() => response)
  });

  describe("Example one", () => {
    describe("Given the user is not logged in", () => {
      let authenticationGatewaySpy, apiKeyGatewaySpy, useCase;

      beforeEach(() => {
        authenticationGatewaySpy = authenticationGatewaySpyThatReturns({
          valid: false
        });
        apiKeyGatewaySpy = { get: jest.fn(() => "apiKey") };
        useCase = new GetLoggedInStatus({
          authenticationGateway: authenticationGatewaySpy,
          apiKeyGateway: apiKeyGatewaySpy
        });
      });

      it("Returns logged in false", async () => {
        let response = await useCase.execute();

        expect(response).toEqual({ loggedIn: false });
      });
    });

    describe("Given the user is logged in", () => {
      let authenticationGatewaySpy, apiKeyGatewaySpy, useCase;

      beforeEach(() => {
        authenticationGatewaySpy = authenticationGatewaySpyThatReturns({
          valid: true
        });
        apiKeyGatewaySpy = { get: jest.fn(() => "apiKey") };
        useCase = new GetLoggedInStatus({
          authenticationGateway: authenticationGatewaySpy,
          apiKeyGateway: apiKeyGatewaySpy
        });
      });

      it("Gets the api key from the gateway", async () => {
        await useCase.execute();

        expect(apiKeyGatewaySpy.get).toHaveBeenCalled();
      });

      it("Calls is logged in on the authentication gateway", async () => {
        await useCase.execute();

        expect(authenticationGatewaySpy.verifyApiKey).toHaveBeenCalledWith(
          "apiKey"
        );
      });

      it("Returns logged in true", async () => {
        let response = await useCase.execute();

        expect(response).toEqual({ loggedIn: true });
      });
    });
  });

  describe("Example two", () => {
    describe("Given the user is not logged in", () => {
      let authenticationGatewaySpy, apiKeyGatewaySpy, useCase;

      beforeEach(() => {
        authenticationGatewaySpy = authenticationGatewaySpyThatReturns({
          valid: false
        });
        apiKeyGatewaySpy = { get: jest.fn(() => "superSecret") };
        useCase = new GetLoggedInStatus({
          authenticationGateway: authenticationGatewaySpy,
          apiKeyGateway: apiKeyGatewaySpy
        });
      });

      it("Returns logged in false", async () => {
        let response = await useCase.execute();

        expect(response).toEqual({ loggedIn: false });
      });
    });

    describe("Given the user is logged in", () => {
      let authenticationGatewaySpy, apiKeyGatewaySpy, useCase;

      beforeEach(() => {
        authenticationGatewaySpy = authenticationGatewaySpyThatReturns({
          valid: true
        });
        apiKeyGatewaySpy = { get: jest.fn(() => "superSecret") };
        useCase = new GetLoggedInStatus({
          authenticationGateway: authenticationGatewaySpy,
          apiKeyGateway: apiKeyGatewaySpy
        });
      });

      it("Gets the api key from the gateway", async () => {
        await useCase.execute();

        expect(apiKeyGatewaySpy.get).toHaveBeenCalled();
      });

      it("Calls is logged in on the authentication gateway", async () => {
        await useCase.execute();

        expect(authenticationGatewaySpy.verifyApiKey).toHaveBeenCalledWith(
          "superSecret"
        );
      });

      it("Returns logged in true", async () => {
        let response = await useCase.execute();

        expect(response).toEqual({ loggedIn: true });
      });
    });
  });
});
