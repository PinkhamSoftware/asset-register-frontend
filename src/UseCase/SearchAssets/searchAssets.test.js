import SearchAssets from ".";
import {
  exampleAssetOne,
  exampleAssetTwo
} from "../../../test/Fixtures/assets";
import Asset from "../../Domain/Asset";

describe("SearchAssets", () => {
  const buildAssetFromData = data => {
    let asset = new Asset();
    asset.id = data.id;
    asset.modifiedDateTime = data.modifiedDateTime;
    asset.monthPaid = data.monthPaid;
    asset.accountingYear = data.accountingYear;
    asset.schemeId = data.schemeId;
    asset.locationLaRegionName = data.locationLaRegionName;
    asset.imsOldRegion = data.imsOldRegion;
    asset.noOfBeds = data.noOfBeds;
    asset.address = data.address;
    asset.developingRslName = data.developingRslName;
    asset.completionDateForHpiStart = data.completionDateForHpiStart;
    asset.imsActualCompletionDate = data.imsActualCompletionDate;
    asset.imsExpectedCompletionDate = data.imsExpectedCompletionDate;
    asset.imsLegalCompletionDate = data.imsLegalCompletionDate;
    asset.hopCompletionDate = data.hopCompletionDate;
    asset.deposit = data.deposit;
    asset.agencyEquityLoan = data.agencyEquityLoan;
    asset.developerEquityLoan = data.developerEquityLoan;
    asset.shareOfRestrictedEquity = data.shareOfRestrictedEquity;
    asset.differenceFromImsExpectedCompletionToHopCompletionDate =
      data.differenceFromImsExpectedCompletionToHopCompletionDate;

    return asset;
  };

  const expectFoundAssetToEqual = (foundAsset, expectedAsset) => {
    expect(foundAsset.id).toEqual(expectedAsset.id);
    expect(foundAsset.modifiedDateTime).toEqual(expectedAsset.modifiedDateTime);
    expect(foundAsset.monthPaid).toEqual(expectedAsset.monthPaid);
    expect(foundAsset.accountingYear).toEqual(expectedAsset.accountingYear);
    expect(foundAsset.schemeId).toEqual(expectedAsset.schemeId);
    expect(foundAsset.locationLaRegionName).toEqual(
      expectedAsset.locationLaRegionName
    );
    expect(foundAsset.imsOldRegion).toEqual(expectedAsset.imsOldRegion);
    expect(foundAsset.noOfBeds).toEqual(expectedAsset.noOfBeds);
    expect(foundAsset.address).toEqual(expectedAsset.address);
    expect(foundAsset.developingRslName).toEqual(
      expectedAsset.developingRslName
    );
    expect(foundAsset.completionDateForHpiStart).toEqual(
      expectedAsset.completionDateForHpiStart
    );
    expect(foundAsset.imsActualCompletionDate).toEqual(
      expectedAsset.imsActualCompletionDate
    );
    expect(foundAsset.imsExpectedCompletionDate).toEqual(
      expectedAsset.imsExpectedCompletionDate
    );
    expect(foundAsset.imsLegalCompletionDate).toEqual(
      expectedAsset.imsLegalCompletionDate
    );
    expect(foundAsset.hopCompletionDate).toEqual(
      expectedAsset.hopCompletionDate
    );
    expect(foundAsset.deposit).toEqual(expectedAsset.deposit);
    expect(foundAsset.agencyEquityLoan).toEqual(expectedAsset.agencyEquityLoan);
    expect(foundAsset.developerEquityLoan).toEqual(
      expectedAsset.developerEquityLoan
    );
    expect(foundAsset.shareOfRestrictedEquity).toEqual(
      expectedAsset.shareOfRestrictedEquity
    );
    expect(
      foundAsset.differenceFromImsExpectedCompletionToHopCompletionDate
    ).toEqual(
      expectedAsset.differenceFromImsExpectedCompletionToHopCompletionDate
    );
  };

  let searchGatewaySpy, useCase;

  describe("Example one", () => {
    let foundAsset;

    describe("Given search parameters", () => {
      describe("and the search finds assets", () => {
        beforeEach(() => {
          foundAsset = buildAssetFromData(exampleAssetOne);
          searchGatewaySpy = { searchWithFilters: jest.fn(() => [foundAsset]) };
          useCase = new SearchAssets({ searchGateway: searchGatewaySpy });
        });

        it("Calls the search gateway with the filters", async () => {
          await useCase.execute({ filters: { cat: "meow", dog: "woof" } });

          expect(searchGatewaySpy.searchWithFilters).toHaveBeenCalledWith({
            cat: "meow",
            dog: "woof"
          });
        });

        it("Returns the assets from the gateway", async () => {
          let { assets } = await useCase.execute({
            filters: { cat: "meow", dog: "woof" }
          });

          let firstAsset = assets[0];
          expectFoundAssetToEqual(firstAsset, exampleAssetOne);
        });
      });

      describe("and the search does not find assets", () => {
        it("Returns an empty array", async () => {
          let searchGatewaySpy = {
            searchWithFilters: jest.fn(() => [])
          };

          let useCase = new SearchAssets({ searchGateway: searchGatewaySpy });
          let { assets } = await useCase.execute({
            filters: { cat: "meow", dog: "woof" }
          });

          expect(assets).toEqual([]);
        });
      });
    });
  });

  describe("Example two", () => {
    describe("Given search parameters", () => {
      describe("and the search finds assets", () => {
        let foundAssetOne, foundAssetTwo;

        beforeEach(() => {
          foundAssetOne = buildAssetFromData(exampleAssetTwo);
          foundAssetTwo = buildAssetFromData(exampleAssetOne);

          searchGatewaySpy = {
            searchWithFilters: jest.fn(() => [foundAssetOne, foundAssetTwo])
          };

          useCase = new SearchAssets({ searchGateway: searchGatewaySpy });
        });

        it("Calls the search gateway with the filters", async () => {
          await useCase.execute({ filters: { duck: "quack", cow: "moo" } });

          expect(searchGatewaySpy.searchWithFilters).toHaveBeenCalledWith({
            duck: "quack",
            cow: "moo"
          });
        });

        it("Returns the assets from the gateway", async () => {
          let { assets } = await useCase.execute({
            filters: { duck: "quack", cow: "moo" }
          });

          let firstAsset = assets[0];
          let secondAsset = assets[1];
          expectFoundAssetToEqual(firstAsset, exampleAssetTwo);
          expectFoundAssetToEqual(secondAsset, exampleAssetOne);
        });
      });

      describe("and the search does not find assets", () => {
        it("Returns an empty array", async () => {
          let searchGatewaySpy = {
            searchWithFilters: jest.fn(() => [])
          };

          let useCase = new SearchAssets({ searchGateway: searchGatewaySpy });
          let { assets } = await useCase.execute({
            filters: { cat: "meow", dog: "woof" }
          });

          expect(assets).toEqual([]);
        });
      });
    });
  });
});
