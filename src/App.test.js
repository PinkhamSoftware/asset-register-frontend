import React from "react";
import { mount } from "enzyme";
import App from "./App";
import { MemoryRouter } from "react-router-dom";
import { exampleAssetOne } from "../test/Fixtures/assets";
import SearchAssetSimulator from "../test/Simulators/SearchAsset";
import GetAssetSimulator from "../test/Simulators/GetAsset";

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
    return this.page.find(params);
  }

  update() {
    this.page.update();
  }

  searchForSchemeId(schemeId) {
    this.find('[data-test="search-scheme-id"]').simulate("change", {
      target: { value: schemeId }
    });
  }

  searchForAddress(address) {
    this.find('[data-test="search-address"]').simulate("change", {
      target: { value: address }
    });
  }

  async executeSearch() {
    this.find('[data-test="search-form"]').simulate("submit", {
      preventDefault: jest.fn()
    });

    await this.waitForRequestToResolve();
    this.update();
  }
}

describe("When using the asset register", () => {
  describe("When searching for an asset", () => {
    it("Searches the API for an asset and displays it in the list", async () => {
      process.env.REACT_APP_ASSET_REGISTER_API_URL = "https://meow.cat/";
      let searchAssetSimulator = new SearchAssetSimulator("https://meow.cat");

      searchAssetSimulator
        .searchAssetWithFilters({ schemeId: "1", address: "Fake Street" })
        .searchAssetWithPage(1)
        .respondWithAssets([exampleAssetOne])
        .successfully();

      let app = new AppPage("/");

      app.searchForSchemeId("1");

      app.searchForAddress("Fake Street");

      await app.executeSearch();

      let renderedAsset = app.find({ "data-test": "asset" });

      expect(
        renderedAsset.find({ "data-test": "asset-scheme-id" }).text()
      ).toEqual("12345");
      expect(
        renderedAsset.find({ "data-test": "asset-address" }).text()
      ).toEqual("123 Fake Street");
    });

    it("Allows us to navigate to a found asset from the search", async () => {
      process.env.REACT_APP_ASSET_REGISTER_API_URL = "https://meow.cat/";
      let searchAssetSimulator = new SearchAssetSimulator("https://meow.cat");
      let getAssetSimulator = new GetAssetSimulator("https://meow.cat/");

      searchAssetSimulator
        .searchAssetWithFilters({ schemeId: "1", address: "Fake Street" })
        .searchAssetWithPage(1)
        .respondWithAssets([exampleAssetOne])
        .successfully();

      getAssetSimulator
        .getAssetWithId(1)
        .respondWithData({ asset: exampleAssetOne })
        .successfully();

      let app = new AppPage("/");

      app.searchForSchemeId("1");

      app.searchForAddress("Fake Street");

      await app.executeSearch();

      app.find("Link[data-test='asset-link']").simulate("click", { button: 0 });

      await waitForRequestToResolve();
      app.update();

      expect(app.find({ "data-test": "asset-scheme-id" }).text()).toEqual(
        "12345"
      );

      expect(app.find({ "data-test": "asset-accounting-year" }).text()).toEqual(
        "2018"
      );
    });
  });

  describe("When viewing search results", () => {
    it("Gets the search results from the API and displays them on the page", async () => {
      process.env.REACT_APP_ASSET_REGISTER_API_URL = "https://meow.cat/";
      let searchAssetSimulator = new SearchAssetSimulator("https://meow.cat");

      searchAssetSimulator
        .searchAssetWithFilters({ schemeId: "1", address: "Fake Street" })
        .searchAssetWithPage(1)
        .respondWithAssets([exampleAssetOne])
        .successfully();

      let app = new AppPage("/search?schemeId=1&address=Fake Street&page=1");
      await app.load();

      let renderedAsset = app.find({ "data-test": "asset" });

      expect(
        renderedAsset.find({ "data-test": "asset-scheme-id" }).text()
      ).toEqual("12345");
      expect(
        renderedAsset.find({ "data-test": "asset-address" }).text()
      ).toEqual("123 Fake Street");
    });
  });

  describe("When viewing an asset", () => {
    it("Get an asset from API and display it on the page", async () => {
      process.env.REACT_APP_ASSET_REGISTER_API_URL = "https://meow.cat/";

      let getAssetSimulator = new GetAssetSimulator("https://meow.cat/");

      getAssetSimulator
        .getAssetWithId(1)
        .respondWithData({ asset: exampleAssetOne })
        .successfully();

      let app = mount(
        <MemoryRouter initialEntries={["/asset/1"]}>
          <App />
        </MemoryRouter>
      );

      await waitForRequestToResolve();
      app.update();

      expect(app.find({ "data-test": "asset-scheme-id" }).text()).toEqual(
        "12345"
      );

      expect(app.find({ "data-test": "asset-accounting-year" }).text()).toEqual(
        "2018"
      );
    });
  });
});
