import React from "react";
import { mount } from "enzyme";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import { exampleAssetOne } from "../test/Fixtures/assets";
import SearchAssetSimulator from "../test/Simulators/SearchAsset";
import GetAssetSimulator from "../test/Simulators/GetAsset";
import AggregateSimulator from "../test/Simulators/Aggregate";
import nock from "nock";

const waitForRequestToResolve = async () => {
  await new Promise(resolve => setTimeout(resolve, 100));
};

class AppPage {
  constructor(path) {
    this.page = mount(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    );
  }

  async load() {
    await this.waitForRequestToResolve();
    this.update();
  }

  async waitForRequestToResolve() {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  find(params) {
    return this.page.find({ "data-test": params });
  }

  update() {
    this.page.update();
  }

  searchForSchemeId(schemeId) {
    this.find("search-scheme-id")
      .first()
      .simulate("change", {
        target: { value: schemeId }
      });
  }

  searchForAddress(address) {
    this.find("search-address")
      .first()
      .simulate("change", {
        target: { value: address }
      });
  }

  async executeSearch() {
    this.find("search-form")
      .first()
      .simulate("submit", {
        preventDefault: jest.fn()
      });

    await this.waitForRequestToResolve();
    this.update();
  }

  loginFormDisplayed() {
    return this.find("login-form").length === 1;
  }

  loginWithEmail(email) {
    this.find("login-email-input").simulate("change", {
      target: { value: email }
    });

    this.find("login-email-submit").simulate("submit");
  }
}

class VersionSimulator {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  assetRegisterVersions(versions) {
    nock(this.baseUrl)
      .get("/api/v1/assetRegisterVersion")
      .reply(200, { data: { assetRegisterVersions: versions } });
  }
}

class AuthenticationSimulator {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  userIsNotLoggedIn() {
    nock(this.baseUrl)
      .get("/api/v1/authentication/verification")
      .reply(401, {});
  }

  userIsLoggedIn() {
    nock(this.baseUrl)
      .get("/api/v1/authentication/verification")
      .reply(200, {});
  }

  getAccessTokenFor(token) {
    return nock(this.baseUrl)
      .post("/api/v1/authentication/access_token", { token })
      .reply(200, { data: { accessToken: "meow" } });
  }

  rejectToken(token) {
    nock(this.baseUrl)
      .post("/api/v1/authentication/access_token", { token })
      .reply(401);
  }

  authoriseUserWithEmailAndUrl(email, url) {
    return nock("https://meow.cat/")
      .post("/api/v1/authentication/authorise", {
        email,
        url
      })
      .reply(200, {});
  }
}

describe("When using the asset register", () => {
  let authenticationSimulator, versionSimulator;

  const baseUrl = "https://meow.cat/";

  const stubPostcodeResponse = () => {
    nock(process.env.REACT_APP_POSTCODE_API_URL)
      .post("/api/v1/geolocation")
      .reply(200, []);
  };

  beforeEach(() => {
    process.env.REACT_APP_ASSET_REGISTER_API_URL = baseUrl;
    authenticationSimulator = new AuthenticationSimulator(baseUrl);
    versionSimulator = new VersionSimulator(baseUrl);

    versionSimulator.assetRegisterVersions([
      { id: 1, createdAt: "2019-01-28T10:59:39.363434" }
    ]);
  });

  afterEach(() => {
    nock.cleanAll();
  });

  describe("When the user is logged in", () => {
    describe("When the user is not logged in", () => {
      it("Displays the login form", async () => {
        authenticationSimulator.userIsNotLoggedIn();

        let app = new AppPage("/");

        await app.load();

        expect(app.loginFormDisplayed()).toBeTruthy();
      });

      describe("And the user attempts to login", () => {
        it("Sends the login information to the authentication server", async () => {
          authenticationSimulator.userIsNotLoggedIn();
          let loginRequest = authenticationSimulator.authoriseUserWithEmailAndUrl(
            "test@test.com",
            "http://localhost"
          );

          let app = new AppPage("/");

          await app.load();

          app.loginWithEmail("test@test.com");

          expect(loginRequest.isDone()).toBeTruthy();
        });
      });

      describe("And the user provides a valid token", () => {
        it("Gets an access token and displays the search form", async () => {
          authenticationSimulator.userIsNotLoggedIn();
          let aggregateSimualtor = new AggregateSimulator("https://meow.cat");

          aggregateSimualtor
            .getAggregatesWithFilters({ assetRegisterVersionId: 1 })
            .respondWithValues({})
            .successfully();

          let tokenRequest = authenticationSimulator.getAccessTokenFor(
            "oneTimeToken"
          );

          let app = new AppPage("/search?token=oneTimeToken");

          await app.load();

          expect(tokenRequest.isDone()).toBeTruthy();

          expect(app.find("search-form").length).toEqual(2);
        });
      });

      describe("And the user provides an invalid token", () => {
        it("Gets an access token and displays the search form", async () => {
          authenticationSimulator.userIsNotLoggedIn();
          let aggregateSimualtor = new AggregateSimulator("https://meow.cat");

          aggregateSimualtor
            .getAggregatesWithFilters({ assetRegisterVersionId: 1 })
            .respondWithValues({})
            .successfully();

          authenticationSimulator.rejectToken("oneTimeToken");

          let app = new AppPage("/search?token=oneTimeToken");

          await app.load();

          expect(app.loginFormDisplayed()).toBeTruthy();
        });
      });
    });

    describe("When searching for an asset", () => {
      it("Searches the API for an asset and displays it in the list", async () => {
        let searchAssetSimulator = new SearchAssetSimulator("https://meow.cat");
        let aggregateSimualtor = new AggregateSimulator("https://meow.cat");

        authenticationSimulator.userIsLoggedIn();

        searchAssetSimulator
          .searchAssetWithFilters({
            schemeId: "1",
            address: "Fake Street",
            assetRegisterVersionId: 1
          })
          .searchAssetWithPage(1)
          .respondWithAssets([exampleAssetOne])
          .respondWithTotal(10)
          .successfully();

        aggregateSimualtor
          .getAggregatesWithFilters({ assetRegisterVersionId: 1 })
          .respondWithValues({})
          .successfully();

        aggregateSimualtor
          .getAggregatesWithFilters({ assetRegisterVersionId: 1 })
          .respondWithValues({})
          .successfully();

        let app = new AppPage("/search");

        await app.load();

        expect(app.find("search-form").length).toEqual(2);

        app.searchForSchemeId("1");

        app.searchForAddress("Fake Street");

        await app.executeSearch();

        let renderedAsset = app.find("asset");

        expect(
          app
            .find("asset-list-total-count")
            .first()
            .text()
        ).toEqual("10");

        expect(
          renderedAsset.find({ "data-test": "asset-scheme-id" }).text()
        ).toEqual("12345");

        expect(
          renderedAsset.find({ "data-test": "asset-address" }).text()
        ).toEqual("123 Fake Street");
      });

      it("Allows us to navigate to a found asset from the search", async () => {
        process.env.REACT_APP_POSTCODE_API_URL = "https://dog.woof/";
        stubPostcodeResponse();

        let searchAssetSimulator = new SearchAssetSimulator("https://meow.cat");
        let aggregateSimualtor = new AggregateSimulator("https://meow.cat");
        let getAssetSimulator = new GetAssetSimulator("https://meow.cat/");

        authenticationSimulator.userIsLoggedIn();

        searchAssetSimulator
          .searchAssetWithFilters({
            schemeId: "1",
            address: "Fake Street",
            assetRegisterVersionId: 1
          })
          .searchAssetWithPage(1)
          .respondWithAssets([exampleAssetOne])
          .respondWithTotal(1)
          .successfully();

        getAssetSimulator
          .getAssetWithId(1)
          .respondWithData({ asset: exampleAssetOne })
          .successfully();

        aggregateSimualtor
          .getAggregatesWithFilters({ assetRegisterVersionId: 1 })
          .respondWithValues({})
          .successfully();

        aggregateSimualtor
          .getAggregatesWithFilters({ assetRegisterVersionId: 1 })
          .respondWithValues({})
          .successfully();

        aggregateSimualtor
          .getAggregatesWithFilters({ schemeId: "1", address: "Fake Street", assetRegisterVersionId: 1 })
          .respondWithValues({})
          .successfully();

        let app = new AppPage("/search");

        await app.load();

        app.searchForSchemeId("1");

        app.searchForAddress("Fake Street");

        await app.executeSearch();

        app.page
          .find("Link[data-test='asset-link']")
          .simulate("click", { button: 0 });

        await waitForRequestToResolve();
        app.update();

        expect(app.find("asset-scheme-id").text()).toEqual("12345");

        expect(app.find("asset-address").text()).toEqual("123 Fake Street");
      });
    });

    describe("When viewing an asset", () => {
      it("Get an asset from API and display it on the page", async () => {
        process.env.REACT_APP_POSTCODE_API_URL = "https://dog.woof/";
        stubPostcodeResponse();
        authenticationSimulator.userIsLoggedIn();

        let getAssetSimulator = new GetAssetSimulator("https://meow.cat/");

        getAssetSimulator
          .getAssetWithId(1)
          .respondWithData({ asset: exampleAssetOne })
          .successfully();

        let app = new AppPage("/asset/1");

        await waitForRequestToResolve();
        app.update();

        expect(app.find("asset-scheme-id").text()).toEqual("12345");

        expect(app.find("asset-address").text()).toEqual("123 Fake Street");
      });
    });
  });
});
