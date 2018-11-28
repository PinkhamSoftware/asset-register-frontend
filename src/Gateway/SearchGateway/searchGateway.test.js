import SearchGateway from ".";
import nock from "nock";
import SeachAssetSimulator from "../../../test/Simulators/SearchAsset";
import {
  exampleAssetOne,
  exampleAssetTwo
} from "../../../test/Fixtures/assets";

describe("SearchGateway", () => {
  let filters, page, gateway, searchRequest;

  describe("Example one", () => {
    beforeEach(() => {
      process.env.REACT_APP_ASSET_REGISTER_API_URL = "http://meow.cat/";
      filters = { cat: "meow", dog: "woof" };
      page = 5;
    });

    describe("Given it finds an asset", () => {
      beforeEach(() => {
        let simulator = new SeachAssetSimulator("http://meow.cat/");
        searchRequest = simulator
          .searchAssetWithFilters(filters)
          .searchAssetWithPage(page)
          .respondWithAssets([exampleAssetOne])
          .respondWithPages(10)
          .successfully();
        gateway = new SearchGateway();
      });

      it("Searches the API for the given filters and page", async () => {
        await gateway.searchWithFilters(filters, page);
        expect(searchRequest.isDone()).toEqual(true);
      });

      it("Searches the API for the given page", async () => {
        await gateway.searchWithFilters(filters, page);
        expect(searchRequest.isDone()).toEqual(true);
      });

      it("Returns the found asset", async () => {
        let { assets } = await gateway.searchWithFilters(filters, page);
        let foundAsset = assets[0];

        expect(foundAsset).toEqual(exampleAssetOne);
      });

      it("Returns the number of pages", async () => {
        let { pages } = await gateway.searchWithFilters(filters, page);

        expect(pages).toEqual(10);
      });
    });

    describe("Given no asset is found", () => {
      it("Returns an empty array", async () => {
        let simulator = new SeachAssetSimulator("http://meow.cat/");
        simulator
          .searchAssetWithFilters(filters)
          .searchAssetWithPage(page)
          .unsuccessfully(404);
        let gateway = new SearchGateway();

        let { assets, pages } = await gateway.searchWithFilters(filters, page);
        expect(assets).toEqual([]);
        expect(pages).toEqual(0);
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
      page = 10;
    });

    describe("Given it finds an asset", () => {
      beforeEach(() => {
        let simulator = new SeachAssetSimulator("http://dog.woof/");
        searchRequest = simulator
          .searchAssetWithFilters(filters)
          .searchAssetWithPage(page)
          .respondWithAssets([exampleAssetTwo, exampleAssetOne])
          .respondWithPages(5)
          .successfully();
        gateway = new SearchGateway();
      });

      it("Searches the API for the given filters", async () => {
        await gateway.searchWithFilters(
          {
            cow: "moo",
            chicken: "cluck",
            dog: "woof"
          },
          page
        );
        expect(searchRequest.isDone()).toEqual(true);
      });

      it("Returns the found asset", async () => {
        let gateway = new SearchGateway();

        let { assets } = await gateway.searchWithFilters(
          {
            cow: "moo",
            chicken: "cluck",
            dog: "woof"
          },
          page
        );

        let [assetOne, assetTwo] = assets;

        expect(assetOne).toEqual(exampleAssetTwo);
        expect(assetTwo).toEqual(exampleAssetOne);
      });

      it("Returns the number of pages", async () => {
        let { pages } = await gateway.searchWithFilters(filters, page);

        expect(pages).toEqual(5);
      });
    });

    describe("Given no asset is found", () => {
      it("Returns an empty array", async () => {
        let simulator = new SeachAssetSimulator("http://dog.woof/");
        simulator
          .searchAssetWithFilters(filters)
          .searchAssetWithPage(10)
          .unsuccessfully(404);
        let gateway = new SearchGateway();

        let { assets, pages } = await gateway.searchWithFilters(filters, page);
        expect(assets).toEqual([]);
        expect(pages).toEqual(0);
      });
    });
  });
});
