import DownloadAsset from ".";

describe("DownloadAsset", () => {
  let presenterSpy, assetGatewaySpy, useCase;

  describe("Example one", () => {
    beforeEach(() => {
      assetGatewaySpy = {
        download: jest.fn(() => ({
          file: "Meow"
        }))
      };
      presenterSpy = { present: jest.fn() };

      useCase = new DownloadAsset({
        assetGateway: assetGatewaySpy
      });

      useCase.execute(presenterSpy, { id: 101 });
    });

    it("Calls the download method on the asset gateway", () => {
      expect(assetGatewaySpy.download).toHaveBeenCalled();
    });

    it("Calls the download method with the filters", () => {
      expect(assetGatewaySpy.download).toHaveBeenCalledWith(101);
    });

    it("Calls the presenter with the response from the gateway", () => {
      expect(presenterSpy.present).toHaveBeenCalledWith("Meow");
    });
  });

  describe("Example two", () => {
    beforeEach(() => {
      assetGatewaySpy = {
        download: jest.fn(() => ({
          file: "woofers"
        }))
      };
      presenterSpy = { present: jest.fn() };

      useCase = new DownloadAsset({
        assetGateway: assetGatewaySpy
      });

      useCase.execute(presenterSpy, {id: 202});
    });

    it("Calls the download method on the asset gateway", () => {
      expect(assetGatewaySpy.download).toHaveBeenCalled();
    });

    it("Calls the download method with the filters", () => {
      expect(assetGatewaySpy.download).toHaveBeenCalledWith(202);
    });

    it("Calls the presenter with the response from the gateway", () => {
      expect(presenterSpy.present).toHaveBeenCalledWith("woofers");
    });
  });
});
