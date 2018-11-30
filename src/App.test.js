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

describe("When rendering the app", () => {
  it("Searches the API for an asset and displays it in the list", async () => {
    process.env.REACT_APP_ASSET_REGISTER_API_URL = "https://meow.cat/";
    let searchAssetSimulator = new SearchAssetSimulator("https://meow.cat");

    searchAssetSimulator
      .searchAssetWithFilters({ schemeId: "1", address: "Fake Street" })
      .searchAssetWithPage(1)
      .respondWithAssets([exampleAssetOne])
      .successfully();

    let app = mount(<App />);
    app
      .find('[data-test="search-scheme-id"]')
      .simulate("change", { target: { value: "1" } });

    app
      .find('[data-test="search-address"]')
      .simulate("change", { target: { value: "Fake Street" } });

    app
      .find('[data-test="search-form"]')
      .simulate("submit", { preventDefault: jest.fn() });

    await waitForRequestToResolve();
    app.update();

    let renderedAsset = app.find({ "data-test": "asset" });

    expect(
      renderedAsset.find({ "data-test": "asset-scheme-id" }).text()
    ).toEqual("12345");
    expect(renderedAsset.find({ "data-test": "asset-address" }).text()).toEqual(
      "123 Fake Street"
    );
  });
  it("Get and asset from API and display it on the page", async () => {
    process.env.REACT_APP_ASSET_REGISTER_API_URL = "https://meow.cat/";
    
    let getAssetSimulator = new GetAssetSimulator("https://meow.cat/");

    getAssetSimulator.getAssetWithId(1).respondWithData(exampleAssetOne).successfully();

    let app = mount(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );
    });
});
