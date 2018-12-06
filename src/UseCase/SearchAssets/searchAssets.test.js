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

  class PresenterSpy {
    constructor() {
      this.assetsPresented = undefined;
      this.pagesPresented = undefined;
      this.totalCountPresented = undefined;
    }

    present({ assets, pages, totalCount }) {
      this.assetsPresented = assets;
      this.pagesPresented = pages;
      this.totalCountPresented = totalCount;
    }
  }

  let presenterSpy, searchGatewaySpy, useCase;

  describe("Example one", () => {
    let foundAsset;

    describe("Given search parameters and a page", () => {
      describe("and the search finds assets", () => {
        beforeEach(() => {
          presenterSpy = new PresenterSpy();
          foundAsset = buildAssetFromData(exampleAssetOne);
          searchGatewaySpy = {
            searchWithFilters: jest.fn(() => ({
              assets: [foundAsset],
              totalCount: 100,
              pages: 10
            }))
          };

          useCase = new SearchAssets({ searchGateway: searchGatewaySpy });
        });

        it("Calls the search gateway with the filters", async () => {
          await useCase.execute(presenterSpy, {
            filters: { cat: "meow", dog: "woof" },
            page: 1
          });

          expect(searchGatewaySpy.searchWithFilters).toHaveBeenCalledWith(
            {
              cat: "meow",
              dog: "woof"
            },
            1
          );
        });

        it("Returns the assets from the gateway", async () => {
          await useCase.execute(presenterSpy, {
            filters: { cat: "meow", dog: "woof" }
          });

          let firstAsset = presenterSpy.assetsPresented[0];

          expectFoundAssetToEqual(firstAsset, exampleAssetOne);
        });

        it("Returns the pages from the gateway", async () => {
          await useCase.execute(presenterSpy, {
            filters: { cat: "meow", dog: "woof" }
          });

          expect(presenterSpy.pagesPresented).toEqual(10);
        });

        it("Returns the total count from the gateway", async () => {
          await useCase.execute(presenterSpy, {
            filters: { cat: "meow", dog: "woof" }
          });

          expect(presenterSpy.totalCountPresented).toEqual(100);
        });
      });

      describe("and the search does not find assets", () => {
        it("Returns an empty array", async () => {
          let searchGatewaySpy = {
            searchWithFilters: jest.fn(() => ({ assets: [] }))
          };

          let useCase = new SearchAssets({
            searchGateway: searchGatewaySpy
          });

          await useCase.execute(presenterSpy, {
            filters: { cat: "meow", dog: "woof" }
          });

          expect(presenterSpy.assetsPresented).toEqual([]);
        });
      });
    });
  });

  describe("Example two", () => {
    describe("Given search parameters", () => {
      describe("and the search finds assets", () => {
        let foundAssetOne, foundAssetTwo;

        beforeEach(() => {
          presenterSpy = new PresenterSpy();
          foundAssetOne = buildAssetFromData(exampleAssetTwo);
          foundAssetTwo = buildAssetFromData(exampleAssetOne);

          searchGatewaySpy = {
            searchWithFilters: jest.fn(() => ({
              assets: [foundAssetOne, foundAssetTwo],
              totalCount: 200,
              pages: 5
            }))
          };

          useCase = new SearchAssets({ searchGateway: searchGatewaySpy });
        });

        it("Calls the search gateway with the filters", async () => {
          await useCase.execute(presenterSpy, {
            filters: { duck: "quack", cow: "moo" },
            page: 5
          });

          expect(searchGatewaySpy.searchWithFilters).toHaveBeenCalledWith(
            {
              duck: "quack",
              cow: "moo"
            },
            5
          );
        });

        it("Calls the presenter with the found assets", async () => {
          await useCase.execute(presenterSpy, {
            filters: { duck: "quack", cow: "moo" }
          });

          let assets = presenterSpy.assetsPresented;

          let firstAsset = assets[0];
          let secondAsset = assets[1];
          expectFoundAssetToEqual(firstAsset, exampleAssetTwo);
          expectFoundAssetToEqual(secondAsset, exampleAssetOne);
        });

        it("Calls the presenter with the number of pages", async () => {
          await useCase.execute(presenterSpy, {
            filters: { duck: "quack", cow: "moo" }
          });

          let pages = presenterSpy.pagesPresented;

          expect(pages).toEqual(5);
        });

        it("Returns the total count from the gateway", async () => {
          await useCase.execute(presenterSpy, {
            filters: { cat: "meow", dog: "woof" }
          });

          expect(presenterSpy.totalCountPresented).toEqual(200);
        });
      });

      describe("and the search does not find assets", () => {
        beforeEach(() => {
          let searchGatewaySpy = {
            searchWithFilters: jest.fn(() => ({ assets: [], pages: 0 }))
          };

          useCase = new SearchAssets({ searchGateway: searchGatewaySpy });
        });

        it("Presents an empty array", async () => {
          await useCase.execute(presenterSpy, {
            filters: { cat: "meow", dog: "woof" }
          });

          expect(presenterSpy.assetsPresented).toEqual([]);
        });

        it("Presents 0 pages", async () => {
          await useCase.execute(presenterSpy, {
            filters: { cat: "meow", dog: "woof" }
          });

          expect(presenterSpy.pagesPresented).toEqual(0);
        });
      });
    });
  });
});
