import AssetComponent from "../../../test/Components/Asset";

let assetOne = {
  id: 1,
  modifiedDateTime: "2018-11-13T11:04:23.169Z",
  monthPaid: "Jan",
  accountingYear: "2018",
  schemeId: 12345,
  locationLaRegionName: "Yorkshire",
  imsOldRegion: "West Yorkshire",
  noOfBeds: "5",
  address: "123 Fake Street",
  developingRslName: "Meow Meow",
  completionDateForHpiStart: "2018-11-13T11:05:24.169Z",
  imsActualCompletionDate: "2018-11-13T11:06:25.169Z",
  imsExpectedCompletionDate: "2018-11-13T11:07:26.169Z",
  imsLegalCompletionDate: "2018-11-13T11:08:27.169Z",
  hopCompletionDate: "2018-11-13T11:09:28.169Z",
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
  schemeId: 54321,
  locationLaRegionName: "Lancashire",
  imsOldRegion: "West Lancashire",
  noOfBeds: "2",
  address: "321 Fake Street",
  developingRslName: "Woof woof",
  completionDateForHpiStart: "2018-11-13T11:07:24.169Z",
  imsActualCompletionDate: "2018-11-13T11:08:25.169Z",
  imsExpectedCompletionDate: "2018-11-13T11:09:26.169Z",
  imsLegalCompletionDate: "2018-11-13T11:10:27.169Z",
  hopCompletionDate: "2018-11-13T11:11:28.169Z",
  deposit: 4321,
  agencyEquityLoan: 8765,
  developerEquityLoan: 3219,
  shareOfRestrictedEquity: 7654,
  differenceFromImsExpectedCompletionToHopCompletionDate: 2198
};

describe("<Asset>", () => {
  describe("Example one", () => {
    it("Renders the asset details", () => {
      let asset = new AssetComponent(assetOne);
      expect(asset.schemeId()).toEqual("12345");
      expect(asset.address()).toEqual("123 Fake Street");
      expect(asset.deposit()).toEqual("1234");
      expect(asset.agencyEquityLoan()).toEqual("5678");
      expect(asset.developerEquityLoan()).toEqual("9123");
      expect(asset.shareOfRestrictedEquity()).toEqual("4567");
    });
  });

  describe("Example two", () => {
    it("Renders the asset details", () => {
      let asset = new AssetComponent(assetTwo);
      expect(asset.schemeId()).toEqual("54321");
      expect(asset.address()).toEqual("321 Fake Street");
      expect(asset.deposit()).toEqual("4321");
      expect(asset.agencyEquityLoan()).toEqual("8765");
      expect(asset.developerEquityLoan()).toEqual("3219");
      expect(asset.shareOfRestrictedEquity()).toEqual("7654");
    });
  });
});
