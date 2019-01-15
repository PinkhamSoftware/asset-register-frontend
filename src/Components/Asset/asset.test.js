import React from "react";
import AssetComponent from "../../../test/Components/Asset";
import {
  exampleAssetOne,
  exampleAssetTwo
} from "../../../test/Fixtures/assets";

describe("<Asset>", () => {
  const mapStub = ({ postcode }) => (
    <div data-test="asset-map-stub">{postcode}</div>
  );

  describe("Example one", () => {
    it("Renders the asset details", () => {
      let asset = new AssetComponent(exampleAssetOne, mapStub);
      expect(asset.schemeId()).toEqual("12345");
      expect(asset.address()).toEqual("123 Fake Street");
      expect(asset.deposit()).toEqual("1234");
      expect(asset.agencyEquityLoan()).toEqual("5678");
      expect(asset.developerEquityLoan()).toEqual("9123");
      expect(asset.shareOfRestrictedEquity()).toEqual("4567");
    });

    it("Passes the postcode to the map prop", () => {
      let asset = new AssetComponent(exampleAssetOne, mapStub);

      let renderedMap = asset.find("asset-map-stub");

      expect(renderedMap.text()).toEqual("FA1 1KE");
    });
  });

  describe("Example two", () => {
    it("Renders the asset details", () => {
      let asset = new AssetComponent(exampleAssetTwo, mapStub);
      expect(asset.schemeId()).toEqual("54321");
      expect(asset.address()).toEqual("321 Fake Street");
      expect(asset.deposit()).toEqual("4321");
      expect(asset.agencyEquityLoan()).toEqual("8765");
      expect(asset.developerEquityLoan()).toEqual("3219");
      expect(asset.shareOfRestrictedEquity()).toEqual("7654");
    });

    it("Passes the postcode to the map prop", () => {
      let asset = new AssetComponent(exampleAssetTwo, mapStub);

      let renderedMap = asset.find("asset-map-stub");

      expect(renderedMap.text()).toEqual("FA2 2KE");
    });
  });
});
