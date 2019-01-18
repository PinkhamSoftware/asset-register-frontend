import AuthenticationGateway from ".";
import nock from "nock";

describe("AuthenticationGateway", () => {
  const setApiUrl = url => (process.env.REACT_APP_ASSET_REGISTER_API_URL = url);
  describe("Authorize", () => {
    describe("Example one", () => {
      describe("Given the user is authorised", () => {
        it("Sends the email and the url to the API", async () => {
          setApiUrl("http://woof.dog/");
          let request = nock("http://woof.dog/")
            .post("/api/v1/authentication/authorise", {
              email: "cat@cat.cat",
              url: "http://meow.cat/"
            })
            .matchHeader("Content-Type", "application/json")
            .reply(200);
          let gateway = new AuthenticationGateway();

          await gateway.authorize("cat@cat.cat", "http://meow.cat/");

          expect(request.isDone()).toBeTruthy();
        });

        it("Returns authorized", async () => {
          setApiUrl("http://woof.dog/");
          let request = nock("http://woof.dog/")
            .post("/api/v1/authentication/authorise", {
              email: "cat@cat.cat",
              url: "http://meow.cat/"
            })
            .matchHeader("Content-Type", "application/json")
            .reply(200);
          let gateway = new AuthenticationGateway();

          let response = await gateway.authorize(
            "cat@cat.cat",
            "http://meow.cat/"
          );

          expect(response).toEqual({ authorized: true });
        });
      });

      describe("Given the user is not authorised", () => {
        it("Returns unauthorised", async () => {
          setApiUrl("http://woof.dog/");

          let request = nock("http://woof.dog/")
            .post("/api/v1/authentication/authorise")
            .matchHeader("Content-Type", "application/json")
            .reply(401);
          let gateway = new AuthenticationGateway();

          let response = await gateway.authorize(
            "cat@cat.cat",
            "http://meow.cat/"
          );

          expect(response).toEqual({ authorized: false });
        });
      });
    });

    describe("Example two", () => {
      describe("Given the user is authorised", () => {
        it("Sends the email and the url to the API", async () => {
          setApiUrl("http://meow.cat/");
          let request = nock("http://meow.cat/")
            .post("/api/v1/authentication/authorise", {
              email: "test@test.com",
              url: "http://woof.dog/"
            })
            .matchHeader("Content-Type", "application/json")
            .reply(200);
          let gateway = new AuthenticationGateway();

          await gateway.authorize("test@test.com", "http://woof.dog/");

          expect(request.isDone()).toBeTruthy();
        });

        it("Returns authorized", async () => {
          setApiUrl("http://meow.cat/");
          let request = nock("http://meow.cat/")
            .post("/api/v1/authentication/authorise", {
              email: "test@test.com",
              url: "http://woof.dog/"
            })
            .matchHeader("Content-Type", "application/json")
            .reply(200);
          let gateway = new AuthenticationGateway();

          let response = await gateway.authorize(
            "test@test.com",
            "http://woof.dog/"
          );

          expect(response).toEqual({ authorized: true });
        });
      });

      describe("Given the user is not authorised", () => {
        it("Returns unauthorised", async () => {
          setApiUrl("http://meow.cat/");
          let request = nock("http://meow.cat/")
            .post("/api/v1/authentication/authorise")
            .matchHeader("Content-Type", "application/json")
            .reply(401);
          let gateway = new AuthenticationGateway();

          let response = await gateway.authorize(
            "test@test.com",
            "http://woof.dog"
          );

          expect(response).toEqual({ authorized: false });
        });
      });
    });
  });

  describe("VerifyApiKey", () => {
    describe("Example one", () => {
      describe("Given api key is valid", () => {
        let gateway, request, response;

        beforeEach(async () => {
          setApiUrl("http://meow.cat/");
          request = nock("http://meow.cat/")
            .get("/api/v1/authentication/verification")
            .matchHeader("Content-Type", "application/json")
            .matchHeader("Authorization", "Bearer: SuperSecret")
            .reply(200);

          gateway = new AuthenticationGateway();

          response = await gateway.verifyApiKey("SuperSecret");
        });

        it("Calls the verify method on the API with the api key", async () => {
          expect(request.isDone()).toBeTruthy();
        });

        it("Returns valid", async () => {
          expect(response).toEqual({ valid: true });
        });
      });

      describe("Given API key is not valid", () => {
        it("Returns not valid", async () => {
          setApiUrl("http://meow.cat/");
          let request = nock("http://meow.cat/")
            .get("/api/v1/authentication/verification")
            .matchHeader("Content-Type", "application/json")
            .matchHeader("Authorization", "Bearer: SuperSecret")
            .reply(401);

          let gateway = new AuthenticationGateway();

          let response = await gateway.verifyApiKey("SuperSecret");

          expect(response.valid).toBeFalsy();
        });
      });
    });

    describe("Example two", () => {
      describe("Given api key is valid", () => {
        let gateway, request, response;

        beforeEach(async () => {
          setApiUrl("http://woof.dog/");
          request = nock("http://woof.dog/")
            .get("/api/v1/authentication/verification")
            .matchHeader("Content-Type", "application/json")
            .matchHeader("Authorization", "Bearer: MegaSecret")
            .reply(200);

          gateway = new AuthenticationGateway();

          response = await gateway.verifyApiKey("MegaSecret");
        });

        it("Calls the verify method on the API with the api key", async () => {
          expect(request.isDone()).toBeTruthy();
        });

        it("Returns valid", async () => {
          expect(response).toEqual({ valid: true });
        });
      });

      describe("Given API key is not valid", () => {
        it("Returns not valid", async () => {
          setApiUrl("http://woof.dog/");
          nock("http://woof.dog/")
            .get("/api/v1/authentication/verification")
            .matchHeader("Content-Type", "application/json")
            .matchHeader("Authorization", "Bearer: MegaSecret")
            .reply(401);

          let gateway = new AuthenticationGateway();

          let response = await gateway.verifyApiKey("MegaSecret");

          expect(response.valid).toBeFalsy();
        });
      });
    });
  });

  describe("GetApiKey", () => {
    describe("Example One", () => {
      describe("Given the token is valid", () => {
        let gateway, request, response;

        beforeEach(async () => {
          setApiUrl("http://meow.cat/");
          request = nock("http://meow.cat/")
            .post("/api/v1/authentication/access_token", {
              token: "oneTimeOnly"
            })
            .matchHeader("Content-Type", "application/json")
            .reply(200, { accessToken: "secretKey" });

          gateway = new AuthenticationGateway();

          response = await gateway.getApiKey("oneTimeOnly");
        });

        it("Gets the api key for the one time use token", async () => {
          expect(request.isDone).toBeTruthy();
        });

        it("Returns the api key", async () => {
          expect(response.apiKey).toEqual("secretKey");
        });

        it("Returns authorized", async () => {
          expect(response.authorized).toBeTruthy();
        });
      });

      describe("Given the token is not valid", () => {
        it("Returns unauthorized", async () => {
          setApiUrl("http://meow.cat/");
          nock("http://meow.cat/")
            .post("/api/v1/authentication/access_token", {
              token: "oneTimeOnly"
            })
            .matchHeader("Content-Type", "application/json")
            .reply(401);

          let gateway = new AuthenticationGateway();

          let response = await gateway.getApiKey("oneTimeOnly");

          expect(response.authorized).toBeFalsy();
        });
      });
    });

    describe("Example two", () => {
      describe("Given the token is valid", () => {
        let gateway, request, response;

        beforeEach(async () => {
          setApiUrl("http://woof.dog/");
          request = nock("http://woof.dog/")
            .post("/api/v1/authentication/access_token", {
              token: "authToken"
            })
            .matchHeader("Content-Type", "application/json")
            .reply(200, { accessToken: "superSecret" });

          gateway = new AuthenticationGateway();

          response = await gateway.getApiKey("authToken");
        });

        it("Gets the api key for the one time use token", async () => {
          expect(request.isDone).toBeTruthy();
        });

        it("Returns the api key", async () => {
          expect(response.apiKey).toEqual("superSecret");
        });

        it("Returns authorized", async () => {
          expect(response.authorized).toBeTruthy();
        });
      });

      describe("Given the token is not valid", () => {
        it("Returns unauthorized", async () => {
          setApiUrl("http://woof.dog/");
          nock("http://woof.dog/")
            .post("/api/v1/authentication/access_token", {
              token: "authToken"
            })
            .matchHeader("Content-Type", "application/json")
            .reply(401);

          let gateway = new AuthenticationGateway();

          let response = await gateway.getApiKey("authToken");

          expect(response.authorized).toBeFalsy();
        });
      });
    });
  });
});
