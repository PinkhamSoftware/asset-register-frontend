import React from "react";
import { mount } from "enzyme";
import AssetProvider from ".";

describe("<AssetProvider>", () => {
  let getAssetSpy, childrenSpy, foundAsset;

  describe("Example one", () => {
    beforeEach(() => {
      foundAsset = { cat: "meow" };
      getAssetSpy = { execute: jest.fn(() => ({ asset: foundAsset })) };
      childrenSpy = jest.fn();

      mount(
        <AssetProvider assetId={1} getAsset={getAssetSpy}>
          {childrenSpy}
        </AssetProvider>
      );
    });

    it("Calls the get asset usecase", () => {
      expect(getAssetSpy.execute).toHaveBeenCalled();
    });

    it("Calls the get asset usecase with the ID passed in", () => {
      expect(getAssetSpy.execute).toHaveBeenCalledWith({ id: 1 });
    });

    it("Passes the asset data into the children", () => {
      expect(childrenSpy).toHaveBeenCalledWith({ asset: foundAsset });
    });
  });

  describe("Example two", () => {
    beforeEach(() => {
      foundAsset = { dog: "woof" };
      getAssetSpy = { execute: jest.fn(() => ({ asset: foundAsset })) };
      childrenSpy = jest.fn();

      mount(
        <AssetProvider assetId={2} getAsset={getAssetSpy}>
          {childrenSpy}
        </AssetProvider>
      );
    });

    it("Calls the get asset usecase", () => {
      expect(getAssetSpy.execute).toHaveBeenCalled();
    });

    it("Calls the get asset usecase with the ID passed in", () => {
      expect(getAssetSpy.execute).toHaveBeenCalledWith({ id: 2 });
    });

    it("Passes the asset data into the children", () => {
      expect(childrenSpy).toHaveBeenCalledWith({ asset: foundAsset });
    });
  });
});
