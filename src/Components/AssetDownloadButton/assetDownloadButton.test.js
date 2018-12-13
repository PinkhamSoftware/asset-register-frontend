import React from "react";
import { mount } from "enzyme";
import AssetDownloadButton from ".";
describe("<AssetDownloadButton>", () => {
  describe("When there is no asset id", () => {
    it("Doesn't display the button", () => {
      let button = mount(
        <AssetDownloadButton presenter={() => {}} downloadAsset={() => {}} />
      );

      expect(
        button.find({ "data-test": "asset-download-link" }).length
      ).toEqual(0);
    });
  });
  describe("When clicking the button", () => {
    describe("Example one", () => {
      let button, downloadAssetSpy, presenterStub;

      beforeEach(() => {
        presenterStub = "PresenterStub";
        downloadAssetSpy = { execute: jest.fn() };
        button = mount(
          <AssetDownloadButton
            presenter={presenterStub}
            assetId={10}
            downloadAsset={downloadAssetSpy}
          />
        );

        button.find({ "data-test": "asset-download-link" }).simulate("click");
      });

      it("Calls the download usecase", () => {
        expect(downloadAssetSpy.execute).toHaveBeenCalled();
      });

      it("Passes the parameters into the download usecase", () => {
        expect(downloadAssetSpy.execute).toHaveBeenCalledWith(
          expect.anything(),
          { id: 10 }
        );
      });

      it("Passes the presenter into the download usecase", () => {
        expect(downloadAssetSpy.execute).toHaveBeenCalledWith(
          presenterStub,
          expect.anything()
        );
      });
    });

    describe("Example two", () => {
      let button, downloadAssetSpy, presenterStub;

      beforeEach(() => {
        presenterStub = "AnotherPresenterStub";
        downloadAssetSpy = { execute: jest.fn() };
        button = mount(
          <AssetDownloadButton
            presenter={presenterStub}
            assetId={20}
            downloadAsset={downloadAssetSpy}
          />
        );

        button.find({ "data-test": "asset-download-link" }).simulate("click");
      });

      it("Calls the download usecase", () => {
        expect(downloadAssetSpy.execute).toHaveBeenCalled();
      });

      it("Passes the parameters into the download usecase", () => {
        expect(downloadAssetSpy.execute).toHaveBeenCalledWith(
          expect.anything(),
          { id: 20 }
        );
      });

      it("Passes the presenter into the download usecase", () => {
        expect(downloadAssetSpy.execute).toHaveBeenCalledWith(
          presenterStub,
          expect.anything()
        );
      });
    });
  });
});
