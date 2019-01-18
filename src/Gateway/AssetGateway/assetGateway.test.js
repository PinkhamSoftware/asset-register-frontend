import GetAssetSimulator from "../../../test/Simulators/GetAsset";
import AssetGateway from ".";
import {
  exampleAssetOne,
  exampleAssetTwo
} from "../../../test/Fixtures/assets";

describe("AssetGateway", () => {
  let apiKeyGatewayStub = { get: () => "meow" };

  describe("Getting an asset", () => {
    let gateway, getAssetRequest;
    describe("Example one", () => {
      beforeEach(() => {
        process.env.REACT_APP_ASSET_REGISTER_API_URL = "http://meow.cat/";
        gateway = new AssetGateway({ apiKeyGateway: apiKeyGatewayStub });
      });

      describe("Given an asset is found", () => {
        beforeEach(() => {
          let simulator = new GetAssetSimulator("http://meow.cat/");
          getAssetRequest = simulator
            .getAssetWithId(1)
            .respondWithData({ asset: exampleAssetOne })
            .successfully();
        });

        it("Calls the get endpoint on the API", async () => {
          await gateway.getAsset(1);
          expect(getAssetRequest.isDone()).toBeTruthy();
        });

        it("Returns successful", async () => {
          let getAssetResponse = await gateway.getAsset(1);
          expect(getAssetResponse.successful).toBeTruthy();
        });

        it("Returns an asset with the correct data", async () => {
          let getAssetResponse = await gateway.getAsset(1);
          let asset = getAssetResponse.asset;
          expect(asset).toEqual(exampleAssetOne);
        });
      });

      describe("Given an asset is not found", () => {
        beforeEach(() => {
          let simulator = new GetAssetSimulator("http://meow.cat/");
          getAssetRequest = simulator.getAssetWithId(1).unsuccessfully(404);
        });

        it("Returns unsuccessful", async () => {
          let { successful } = await gateway.getAsset(1);
          expect(successful).toBeFalsy();
        });
      });
    });

    describe("Example two", () => {
      beforeEach(() => {
        process.env.REACT_APP_ASSET_REGISTER_API_URL = "http://woof.dog/";
        gateway = new AssetGateway({ apiKeyGateway: apiKeyGatewayStub });
      });

      describe("Given an asset is found", () => {
        beforeEach(() => {
          let simulator = new GetAssetSimulator("http://woof.dog/");
          getAssetRequest = simulator
            .getAssetWithId(2)
            .respondWithData({ asset: exampleAssetTwo })
            .successfully();
        });

        it("Calls the get endpoint on the API", async () => {
          await gateway.getAsset(2);
          expect(getAssetRequest.isDone()).toBeTruthy();
        });

        it("Returns successful", async () => {
          let getAssetResponse = await gateway.getAsset(2);
          expect(getAssetResponse.successful).toBeTruthy();
        });

        it("Returns an asset with the correct data", async () => {
          let { asset } = await gateway.getAsset(2);
          expect(asset).toEqual(exampleAssetTwo);
        });
      });

      describe("Given an asset is not found", () => {
        beforeEach(() => {
          let simulator = new GetAssetSimulator("http://woof.dog/");
          getAssetRequest = simulator.getAssetWithId(2).unsuccessfully(404);
        });

        it("Returns unsuccessful", async () => {
          let { successful } = await gateway.getAsset(2);
          expect(successful).toBeFalsy();
        });
      });
    });
  });

  describe("Downloading asset data", () => {
    describe("Example one", () => {
      let request, gateway;

      beforeEach(() => {
        process.env.REACT_APP_ASSET_REGISTER_API_URL = "http://meow.cat/";

        let simulator = new GetAssetSimulator("http://meow.cat");

        request = simulator
          .getAssetWithId(1)
          .downloadAssetAsCsv()
          .respondWithFile("File")
          .successfully();

        gateway = new AssetGateway({ apiKeyGateway: apiKeyGatewayStub });
      });

      it("Hits the API with the correct request", async () => {
        await gateway.download(1);

        expect(request.isDone()).toEqual(true);
      });

      it("Returns the text from the api response", async () => {
        let response = await gateway.download(1);

        expect(response.file).toEqual("File");
      });
    });

    describe("Example two", () => {
      let request, gateway;

      beforeEach(() => {
        process.env.REACT_APP_ASSET_REGISTER_API_URL = "http://dog.woof/";

        let simulator = new GetAssetSimulator("http://dog.woof");

        request = simulator
          .getAssetWithId(2)
          .downloadAssetAsCsv()
          .respondWithFile("Super duper mega file")
          .successfully();

        gateway = new AssetGateway({ apiKeyGateway: apiKeyGatewayStub });
      });

      it("Hits the API with the correct request", async () => {
        await gateway.download(2);

        expect(request.isDone()).toEqual(true);
      });

      it("Returns the text from the api response", async () => {
        let response = await gateway.download(2);

        expect(response.file).toEqual("Super duper mega file");
      });
    });
  });
});
