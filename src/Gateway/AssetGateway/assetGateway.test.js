import GetAssetSimulator from "../../../test/Simulators/GetAsset";
import AssetGateway from ".";
import { exampleAssetOne, exampleAssetTwo } from '../../../test/Fixtures/assets'

describe("AssetGateway", () => {
  describe("Getting an asset", () => {
    let gateway, getAssetRequest;
    describe("Example one", () => {
      beforeEach(() => {
        process.env.REACT_APP_ASSET_REGISTER_API_URL = "http://meow.cat/";
        gateway = new AssetGateway();
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
          expect(asset.id).toEqual(1);
          expect(asset.modifiedDateTime).toEqual("2018-11-13T11:04:23.169Z");
          expect(asset.monthPaid).toEqual("Jan");
          expect(asset.accountingYear).toEqual("2018");
          expect(asset.schemeId).toEqual(12345);
          expect(asset.locationLaRegionName).toEqual("Yorkshire");
          expect(asset.imsOldRegion).toEqual("West Yorkshire");
          expect(asset.noOfBeds).toEqual("5");
          expect(asset.address).toEqual("123 Fake Street");
          expect(asset.developingRslName).toEqual("Meow Meow");
          expect(asset.completionDateForHpiStart).toEqual(
            "2018-11-13T11:04:24.169Z"
          );
          expect(asset.imsActualCompletionDate).toEqual(
            "2018-11-13T11:04:25.169Z"
          );
          expect(asset.imsExpectedCompletionDate).toEqual(
            "2018-11-13T11:04:26.169Z"
          );
          expect(asset.imsLegalCompletionDate).toEqual(
            "2018-11-13T11:04:27.169Z"
          );
          expect(asset.hopCompletionDate).toEqual("2018-11-13T11:04:28.169Z");
          expect(asset.deposit).toEqual(1234);
          expect(asset.agencyEquityLoan).toEqual(5678);
          expect(asset.developerEquityLoan).toEqual(9123);
          expect(asset.shareOfRestrictedEquity).toEqual(4567);
          expect(
            asset.differenceFromImsExpectedCompletionToHopCompletionDate
          ).toEqual(8912);
          expect(asset.propertyPostcode).toEqual("FA1 1KE")
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
        gateway = new AssetGateway();
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
          expect(asset.id).toEqual(2);
          expect(asset.modifiedDateTime).toEqual("2018-11-13T11:05:23.169Z");
          expect(asset.monthPaid).toEqual("Feb");
          expect(asset.accountingYear).toEqual("2017");
          expect(asset.schemeId).toEqual(54321);
          expect(asset.locationLaRegionName).toEqual("Lancashire");
          expect(asset.imsOldRegion).toEqual("West Lancashire");
          expect(asset.noOfBeds).toEqual("2");
          expect(asset.address).toEqual("321 Fake Street");
          expect(asset.developingRslName).toEqual("Woof woof");
          expect(asset.completionDateForHpiStart).toEqual(
            "2018-11-13T11:05:24.169Z"
          );
          expect(asset.imsActualCompletionDate).toEqual(
            "2018-11-13T11:05:25.169Z"
          );
          expect(asset.imsExpectedCompletionDate).toEqual(
            "2018-11-13T11:05:26.169Z"
          );
          expect(asset.imsLegalCompletionDate).toEqual(
            "2018-11-13T11:05:27.169Z"
          );
          expect(asset.hopCompletionDate).toEqual("2018-11-13T11:05:28.169Z");
          expect(asset.deposit).toEqual(4321);
          expect(asset.agencyEquityLoan).toEqual(8765);
          expect(asset.developerEquityLoan).toEqual(3219);
          expect(asset.shareOfRestrictedEquity).toEqual(7654);
          expect(
            asset.differenceFromImsExpectedCompletionToHopCompletionDate
          ).toEqual(2198);
          expect(asset.propertyPostcode).toEqual("FA2 2KE")
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

        gateway = new AssetGateway();
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

        gateway = new AssetGateway();
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
