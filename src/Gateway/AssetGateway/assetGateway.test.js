import GetAssetSimulator from "../../../test/Simulators/GetAsset"
import AssetGateway from ".";

let assetOne = {
  id: 1,
  modifiedDateTime: "2018-11-13T11:04:23.169Z",
  monthPaid: "Jan",
  accountingYear: "2018",
  schemeId: "12345",
  locationLaRegionName: "Yorkshire",
  imsOldRegion: "West Yorkshire",
  noOfBeds: "5",
  address: "123 Fake Street",
  developingRslName: "Meow Meow",
  completionDateForHpiStart: "2018-11-13T11:04:24.169Z",
  imsActualCompletionDate: "2018-11-13T11:04:25.169Z",
  imsExpectedCompletionDate: "2018-11-13T11:04:26.169Z",
  imsLegalCompletionDate: "2018-11-13T11:04:27.169Z",
  hopCompletionDate: "2018-11-13T11:04:28.169Z",
  deposit: 1234,
  agencyEquityLoan: 5678,
  developerEquityLoan: 9123,
  shareOfRestrictedEquity: 4567,
  differenceFromImsExpectedCompletionToHopCompletionDate: 8912
};

let assetTwo = {
  id: 2,
  modifiedDateTime: "2018-11-13T11:05:23.169Z",
  monthPaid: "Feb",
  accountingYear: "2017",
  schemeId: "54321",
  locationLaRegionName: "Lancashire",
  imsOldRegion: "West Lancashire",
  noOfBeds: "2",
  address: "321 Fake Street",
  developingRslName: "Woof woof",
  completionDateForHpiStart: "2018-11-13T11:05:24.169Z",
  imsActualCompletionDate: "2018-11-13T11:05:25.169Z",
  imsExpectedCompletionDate: "2018-11-13T11:05:26.169Z",
  imsLegalCompletionDate: "2018-11-13T11:05:27.169Z",
  hopCompletionDate: "2018-11-13T11:05:28.169Z",
  deposit: 4321,
  agencyEquityLoan: 8765,
  developerEquityLoan: 3219,
  shareOfRestrictedEquity: 7654,
  differenceFromImsExpectedCompletionToHopCompletionDate: 2198
};

describe("AssetGateway", () => {
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
          .respondWithData({ asset: assetOne })
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
        expect(asset.schemeId).toEqual("12345");
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
          .respondWithData({ asset: assetTwo })
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
        expect(asset.schemeId).toEqual("54321");
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
