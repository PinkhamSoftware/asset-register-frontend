import DownloadSearchResults from ".";

describe("DownloadSearchResults", () => {
  let presenterSpy, searchGatewaySpy, useCase;

  describe("Example one", () => {
    beforeEach(() => {
      searchGatewaySpy = {
        download: jest.fn(() => ({
          file: "Meow"
        }))
      };
      presenterSpy = { present: jest.fn() };

      useCase = new DownloadSearchResults({
        searchGateway: searchGatewaySpy
      });

      useCase.execute(presenterSpy, { filters: { cat: "meow" } });
    });

    it("Calls the download method on the search result gateway", () => {
      expect(searchGatewaySpy.download).toHaveBeenCalled();
    });

    it("Calls the download method with the filters", () => {
      expect(searchGatewaySpy.download).toHaveBeenCalledWith({ cat: "meow" });
    });

    it("Calls the presenter with the response from the gateway", () => {
      expect(presenterSpy.present).toHaveBeenCalledWith("Meow");
    });
  });

  describe("Example two", () => {
    beforeEach(() => {
      searchGatewaySpy = {
        download: jest.fn(() => ({
          file: "woofers"
        }))
      };
      presenterSpy = { present: jest.fn() };

      useCase = new DownloadSearchResults({
        searchGateway: searchGatewaySpy
      });

      useCase.execute(presenterSpy, { filters: { dog: "woof" } });
    });

    it("Calls the download method on the search result gateway", () => {
      expect(searchGatewaySpy.download).toHaveBeenCalled();
    });

    it("Calls the download method with the filters", () => {
      expect(searchGatewaySpy.download).toHaveBeenCalledWith({ dog: "woof" });
    });

    it("Calls the presenter with the response from the gateway", () => {
      expect(presenterSpy.present).toHaveBeenCalledWith("woofers");
    });
  });
});
