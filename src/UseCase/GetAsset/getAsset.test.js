import Asset from "../../Domain/Asset";
import GetAsset from ".";

describe("GetAsset", () => {
  function expectReturnedAssetToEqual(expectedAsset, actualAsset) {
    expect(expectedAsset.id).toEqual(actualAsset.id);
    expect(expectedAsset.modifiedDateTime).toEqual(
      actualAsset.modifiedDateTime
    );
    expect(expectedAsset.monthPaid).toEqual(actualAsset.monthPaid);
    expect(expectedAsset.accountingYear).toEqual(actualAsset.accountingYear);
    expect(expectedAsset.schemeId).toEqual(actualAsset.schemeId);
    expect(expectedAsset.locationLaRegionName).toEqual(
      actualAsset.locationLaRegionName
    );
    expect(expectedAsset.imsOldRegion).toEqual(actualAsset.imsOldRegion);
    expect(expectedAsset.noOfBeds).toEqual(actualAsset.noOfBeds);
    expect(expectedAsset.address).toEqual(actualAsset.address);
    expect(expectedAsset.developingRslName).toEqual(
      actualAsset.developingRslName
    );
    expect(expectedAsset.completionDateForHpiStart).toEqual(
      actualAsset.completionDateForHpiStart
    );
    expect(expectedAsset.imsActualCompletionDate).toEqual(
      actualAsset.imsActualCompletionDate
    );
    expect(expectedAsset.imsExpectedCompletionDate).toEqual(
      actualAsset.imsExpectedCompletionDate
    );
    expect(expectedAsset.imsLegalCompletionDate).toEqual(
      actualAsset.imsLegalCompletionDate
    );
    expect(expectedAsset.hopCompletionDate).toEqual(
      actualAsset.hopCompletionDate
    );
    expect(expectedAsset.deposit).toEqual(actualAsset.deposit);
    expect(expectedAsset.agencyEquityLoan).toEqual(
      actualAsset.agencyEquityLoan
    );
    expect(expectedAsset.developerEquityLoan).toEqual(
      actualAsset.developerEquityLoan
    );
    expect(expectedAsset.shareOfRestrictedEquity).toEqual(
      actualAsset.shareOfRestrictedEquity
    );
    expect(
      expectedAsset.differenceFromImsExpectedCompletionToHopCompletionDate
    ).toEqual(
      actualAsset.differenceFromImsExpectedCompletionToHopCompletionDate
    );
    expect(expectedAsset.propertyPostcode).toEqual(
      actualAsset.propertyPostcode
    );
    expect(expectedAsset.developerDiscount).toEqual(
      actualAsset.developerDiscount
    );
    expect(expectedAsset.mortgage).toEqual(actualAsset.mortgage);
    expect(expectedAsset.lbha).toEqual(actualAsset.lbha);
    expect(expectedAsset.purchasePrice).toEqual(actualAsset.purchasePrice);
    expect(expectedAsset.equityOwner).toEqual(actualAsset.equityOwner);
    expect(expectedAsset.programme).toEqual(actualAsset.programme);
  }

  describe("Example one", () => {
    let assetToReturn, assetGatewaySpy, useCase;

    beforeEach(async () => {
      assetToReturn = new Asset();
      assetToReturn.id = 1;
      assetToReturn.modifiedDateTime = "2018-11-13T11:04:23.169Z";
      assetToReturn.monthPaid = "Jan";
      assetToReturn.accountingYear = "2018";
      assetToReturn.schemeId = "12345";
      assetToReturn.locationLaRegionName = "Yorkshire";
      assetToReturn.imsOldRegion = "West Yorkshire";
      assetToReturn.noOfBeds = "5";
      assetToReturn.address = "123 Fake Street";
      assetToReturn.developingRslName = "Meow Meow";
      assetToReturn.completionDateForHpiStart = "2018-11-13T11:04:24.169Z";
      assetToReturn.imsActualCompletionDate = "2018-11-13T11:04:25.169Z";
      assetToReturn.imsExpectedCompletionDate = "2018-11-13T11:04:26.169Z";
      assetToReturn.imsLegalCompletionDate = "2018-11-13T11:04:27.169Z";
      assetToReturn.hopCompletionDate = "2018-11-13T11:04:28.169Z";
      assetToReturn.deposit = 1234;
      assetToReturn.agencyEquityLoan = 5678;
      assetToReturn.developerEquityLoan = 9123;
      assetToReturn.shareOfRestrictedEquity = 4567;
      assetToReturn.differenceFromImsExpectedCompletionToHopCompletionDate = 8912;
      assetToReturn.propertyPostcode = "FA1 1KE";
      assetToReturn.developerDiscount = 1111;
      assetToReturn.mortgage = 1212;
      assetToReturn.lbha = "Agent 1";
      assetToReturn.purchasePrice = 1232;
      assetToReturn.equityOwner = "Cats England";
      assetToReturn.programme = "Program 1";

      assetGatewaySpy = {
        getAsset: jest.fn(() => ({ successful: true, asset: assetToReturn }))
      };
      useCase = new GetAsset({ assetGateway: assetGatewaySpy });
    });

    it("Calls the AssetGateway", async () => {
      await useCase.execute({ id: 1 });

      expect(assetGatewaySpy.getAsset).toHaveBeenCalled();
    });

    it("Passes the ID to the asset gateway", async () => {
      await useCase.execute({ id: 1 });

      expect(assetGatewaySpy.getAsset).toHaveBeenCalledWith(1);
    });

    describe("Given an asset is found", () => {
      it("Returns the asset from the asset gateway ", async () => {
        let { asset } = await useCase.execute({ id: 1 });

        expectReturnedAssetToEqual(assetToReturn, asset);
      });
    });

    describe("Given no asset is found", () => {
      it("Returns undefined", async () => {
        let assetGatewaySpy = {
          getAsset: jest.fn(() => ({ successful: false }))
        };
        let useCase = new GetAsset({ assetGateway: assetGatewaySpy });

        let response = await useCase.execute({ id: 1 });

        expect(response).toBeUndefined();
      });
    });
  });

  describe("Example two", () => {
    let assetToReturn, assetGatewaySpy, useCase;

    beforeEach(async () => {
      assetToReturn = new Asset();
      assetToReturn.id = 2;
      assetToReturn.modifiedDateTime = "2018-11-13T11:05:23.169Z";
      assetToReturn.monthPaid = "Feb";
      assetToReturn.accountingYear = "2017";
      assetToReturn.schemeId = "54321";
      assetToReturn.locationLaRegionName = "Lancashire";
      assetToReturn.imsOldRegion = "West Lancashire";
      assetToReturn.noOfBeds = "2";
      assetToReturn.address = "321 Fake Street";
      assetToReturn.developingRslName = "Woof woof";
      assetToReturn.completionDateForHpiStart = "2018-11-13T11:05:24.169Z";
      assetToReturn.imsActualCompletionDate = "2018-11-13T11:05:25.169Z";
      assetToReturn.imsExpectedCompletionDate = "2018-11-13T11:05:26.169Z";
      assetToReturn.imsLegalCompletionDate = "2018-11-13T11:05:27.169Z";
      assetToReturn.hopCompletionDate = "2018-11-13T11:05:28.169Z";
      assetToReturn.deposit = 4321;
      assetToReturn.agencyEquityLoan = 8765;
      assetToReturn.developerEquityLoan = 3219;
      assetToReturn.shareOfRestrictedEquity = 7654;
      assetToReturn.differenceFromImsExpectedCompletionToHopCompletionDate = 2198;
      assetToReturn.propertyPostcode = "FA2 2KE";
      assetToReturn.originalAgencyPercentage = 25.0;
      assetToReturn.developerDiscount = 2222;
      assetToReturn.mortgage = 2121;
      assetToReturn.lbha = "Agent 2";
      assetToReturn.purchasePrice = 2232;
      assetToReturn.equityOwner = "Homes England";
      assetToReturn.programme = "Program 2";

      assetGatewaySpy = {
        getAsset: jest.fn(() => ({ successful: true, asset: assetToReturn }))
      };

      useCase = new GetAsset({ assetGateway: assetGatewaySpy });
    });

    it("Calls the AssetGateway", async () => {
      await useCase.execute({ id: 2 });

      expect(assetGatewaySpy.getAsset).toHaveBeenCalled();
    });

    it("Passes the ID to the asset gateway", async () => {
      await useCase.execute({ id: 2 });

      expect(assetGatewaySpy.getAsset).toHaveBeenCalledWith(2);
    });

    describe("Given an asset is found", () => {
      it("Returns the asset from the asset gateway ", async () => {
        let { asset } = await useCase.execute({ id: 2 });

        expectReturnedAssetToEqual(assetToReturn, asset);
      });
    });

    describe("Given no asset is found", () => {
      it("Returns undefined", async () => {
        let assetGatewaySpy = {
          getAsset: jest.fn(() => ({ successful: false }))
        };
        let useCase = new GetAsset({ assetGateway: assetGatewaySpy });

        let response = await useCase.execute({ id: 2 });

        expect(response).toBeUndefined();
      });
    });
  });
});
