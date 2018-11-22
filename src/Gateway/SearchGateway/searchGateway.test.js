import SearchGateway from ".";
import nock from "nock";
import SeachAssetSimulator from "../../../test/Simulators/SearchAsset";
import {
  exampleAssetOne,
  exampleAssetTwo
} from "../../../test/Fixtures/assets";

describe("SearchGateway", () => {
  let filters, gateway, searchRequest;

  describe("Example one", () => {
    beforeEach(() => {
      process.env.REACT_APP_ASSET_REGISTER_API_URL = "http://meow.cat/";
      filters = { cat: "meow", dog: "woof" };
    });

    describe("Given it finds an asset", () => {
      beforeEach(() => {
        let simulator = new SeachAssetSimulator("http://meow.cat/");
        searchRequest = simulator
          .searchAssetWithFilters(filters)
          .respondWithAssets([exampleAssetOne])
          .successfully();
        gateway = new SearchGateway();
      });

      it("Searches the API for the given filters", async () => {
        await gateway.searchWithFilters(filters);
        expect(searchRequest.isDone()).toEqual(true);
      });

      it("Returns the found asset", async () => {
        let [foundAsset] = await gateway.searchWithFilters(filters);

        expect(foundAsset).toEqual(exampleAssetOne);
      });
    });

    describe("Given no asset is found", () => {
      it("Returns an empty array", async () => {
        let simulator = new SeachAssetSimulator("http://meow.cat/");
        simulator.searchAssetWithFilters(filters).unsuccessfully(404);
        let gateway = new SearchGateway();

        let foundAssets = await gateway.searchWithFilters(filters);
        expect(foundAssets).toEqual([]);
      });
    });
  });

  describe("Example two", () => {
    beforeEach(() => {
      process.env.REACT_APP_ASSET_REGISTER_API_URL = "http://dog.woof/";
      filters = {
        cow: "moo",
        chicken: "cluck",
        dog: "woof"
      };
    });

    describe("Given it finds an asset", () => {
      beforeEach(() => {
        let simulator = new SeachAssetSimulator("http://dog.woof/");
        searchRequest = simulator
          .searchAssetWithFilters(filters)
          .respondWithAssets([exampleAssetTwo, exampleAssetOne])
          .successfully();
        gateway = new SearchGateway();
      });

      it("Searches the API for the given filters", async () => {
        await gateway.searchWithFilters({
          cow: "moo",
          chicken: "cluck",
          dog: "woof"
        });
        expect(searchRequest.isDone()).toEqual(true);
      });

      it("Returns the found asset", async () => {
        let gateway = new SearchGateway();

        let [assetOne, assetTwo] = await gateway.searchWithFilters({
          cow: "moo",
          chicken: "cluck",
          dog: "woof"
        });

        expect(assetOne).toEqual(exampleAssetTwo);
        expect(assetTwo).toEqual(exampleAssetOne);
      });
    });

    describe("Given no asset is found", () => {
      it("Returns an empty array", async () => {
        let simulator = new SeachAssetSimulator("http://dog.woof/");
        simulator.searchAssetWithFilters(filters).unsuccessfully(404);
        let gateway = new SearchGateway();

        let foundAssets = await gateway.searchWithFilters(filters);
        expect(foundAssets).toEqual([]);
      });
    });
  });
});
