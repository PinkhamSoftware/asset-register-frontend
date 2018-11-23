import React from "react";
import { mount } from "enzyme";
import App from "./App";
import { exampleAssetOne } from "../test/Fixtures/assets";
import SearchAssetSimulator from "../test/Simulators/SearchAsset";

const waitForRequestToResolve = async () => {
  await new Promise(resolve => setTimeout(resolve, 100));
};

describe("When rendering the app", () => {
  it("Searches the API for an asset and displays it in the list", async () => {
    process.env.REACT_APP_ASSET_REGISTER_API_URL = "https://meow.cat/";
    let searchAssetSimulator = new SearchAssetSimulator("https://meow.cat");

    searchAssetSimulator
      .searchAssetWithFilters({ schemeId: "1" })
      .respondWithAssets([exampleAssetOne])
      .successfully();

    let app = mount(<App />);
    app
      .find('[data-test="search-input"]')
      .simulate("change", { target: { value: "1" } });

    app
      .find('[data-test="search-form"]')
      .simulate("submit", { preventDefault: jest.fn() });

    await waitForRequestToResolve();
    app.update();

    let renderedAsset = app.find({ "data-test": "asset" });

    expect(
      renderedAsset.find({ "data-test": "asset-scheme-id" }).text()
    ).toEqual("12345");
    expect(
      renderedAsset.find({ "data-test": "asset-address" }).text()
    ).toEqual("123 Fake Street");
  });
});
