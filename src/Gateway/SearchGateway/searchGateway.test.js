import SearchGateway from ".";
import SearchAssetSimulator from "../../../test/Simulators/SearchAsset";
import {
  exampleAssetOne,
  exampleAssetTwo
} from "../../../test/Fixtures/assets";

describe("SearchGateway", () => {
  let filters, page, gateway, searchRequest;
  let apiKeyGatewayStub = { get: () => "meow" };

  describe("Example one", () => {
    beforeEach(() => {
      process.env.REACT_APP_ASSET_REGISTER_API_URL = "http://meow.cat/";
      filters = { cat: "meow", dog: "woof" };
      page = 5;
    });

    describe("Given it finds an asset", () => {
      beforeEach(() => {
        let simulator = new SearchAssetSimulator("http://meow.cat/");
        searchRequest = simulator
          .searchAssetWithFilters(filters)
          .searchAssetWithPage(page)
          .respondWithAssets([exampleAssetOne])
          .respondWithTotal(100)
          .respondWithPages(10)
          .successfully();
        gateway = new SearchGateway({ apiKeyGateway: apiKeyGatewayStub });
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

      it("Returns the total number of assets", async () => {
        let { totalCount } = await gateway.searchWithFilters(filters, page);

        expect(totalCount).toEqual(100);
      });
    });

    describe("Given no asset is found", () => {
      it("Returns an empty array", async () => {
        let simulator = new SearchAssetSimulator("http://meow.cat/");
        simulator
          .searchAssetWithFilters(filters)
          .searchAssetWithPage(page)
          .unsuccessfully(404);
        let gateway = new SearchGateway({ apiKeyGateway: apiKeyGatewayStub });

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
        let simulator = new SearchAssetSimulator("http://dog.woof/");
        searchRequest = simulator
          .searchAssetWithFilters(filters)
          .searchAssetWithPage(page)
          .respondWithAssets([exampleAssetTwo, exampleAssetOne])
          .respondWithTotal(50)
          .respondWithPages(5)
          .successfully();
        gateway = new SearchGateway({ apiKeyGateway: apiKeyGatewayStub });
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
        let gateway = new SearchGateway({ apiKeyGateway: apiKeyGatewayStub });

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

      it("Returns the total number of assets", async () => {
        let { totalCount } = await gateway.searchWithFilters(filters, page);

        expect(totalCount).toEqual(50);
      });
    });

    describe("Given no asset is found", () => {
      it("Returns an empty array", async () => {
        let simulator = new SearchAssetSimulator("http://dog.woof/");
        simulator
          .searchAssetWithFilters(filters)
          .searchAssetWithPage(10)
          .unsuccessfully(404);
        let gateway = new SearchGateway({ apiKeyGateway: apiKeyGatewayStub });

        let { assets, pages } = await gateway.searchWithFilters(filters, page);
        expect(assets).toEqual([]);
        expect(pages).toEqual(0);
      });
    });
  });

  describe("Downloading search results", () => {
    describe("Example one", () => {
      let request;

      beforeEach(() => {
        process.env.REACT_APP_ASSET_REGISTER_API_URL = "http://meow.cat/";

        let simulator = new SearchAssetSimulator("http://meow.cat");

        request = simulator
          .searchAssetWithFilters({
            cat: "meow",
            pageSize: "1000000"
          })
          .searchAssetWithPage(1)
          .downloadSearchAsCsv()
          .respondWithFile("File")
          .successfully();

        gateway = new SearchGateway({ apiKeyGateway: apiKeyGatewayStub });
      });

      it("Hits the API with the correct request", async () => {
        await gateway.download({ cat: "meow" });

        expect(request.isDone()).toEqual(true);
      });

      it("Returns the text from the api response", async () => {
        let response = await gateway.download({ cat: "meow" });

        expect(response.file).toEqual("File");
      });
    });

    describe("Example one", () => {
      let request;

      beforeEach(() => {
        process.env.REACT_APP_ASSET_REGISTER_API_URL = "http://meow.cat/";

        let simulator = new SearchAssetSimulator("http://meow.cat");

        request = simulator
          .searchAssetWithFilters({
            dog: "woof",
            pageSize: "1000000"
          })
          .searchAssetWithPage(1)
          .downloadSearchAsCsv()
          .respondWithFile("Super duper mega file")
          .successfully();

        gateway = new SearchGateway({ apiKeyGateway: apiKeyGatewayStub });
      });

      it("Hits the API with the correct request", async () => {
        await gateway.download({ dog: "woof" });

        expect(request.isDone()).toEqual(true);
      });

      it("Returns the text from the api response", async () => {
        let response = await gateway.download({ dog: "woof" });

        expect(response.file).toEqual("Super duper mega file");
      });
    });
  });
});
