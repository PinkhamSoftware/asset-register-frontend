import Asset from ".";
import React from "react";
import { mount } from "enzyme";

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
  schemeId: "54321",
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

class AssetComponent {
  constructor(assetData) {
    this.component = mount(<Asset asset={assetData} />);
  }

  find(dataTest) {
    return this.component.find({ "data-test": dataTest });
  }

  assetId() {
    return this.find("asset-id").text();
  }

  modifiedDateTime() {
    return this.find("asset-modified-date-time").text();
  }

  monthPaid() {
    return this.find("asset-month-paid").text();
  }

  accountingYear() {
    return this.find("asset-accounting-year").text();
  }

  schemeId() {
    return this.find("asset-scheme-id").text();
  }

  imsOldRegion() {
    return this.find("asset-ims-old-region").text();
  }

  locationLaRegionName() {
    return this.find("asset-location-la-region-name").text();
  }

  noOfBeds() {
    return this.find("asset-no-of-beds").text();
  }

  address() {
    return this.find("asset-address").text();
  }

  developingRslName() {
    return this.find("asset-developing-rsl-name").text();
  }

  completionDateForHpiStart() {
    return this.find("asset-completion-date-for-hpi-start").text();
  }

  imsActualCompletionDate() {
    return this.find("asset-ims-actual-completion-date").text();
  }

  imsExpectedCompletionDate() {
    return this.find("asset-ims-expected-completion-date").text();
  }

  imsLegalCompletionDate() {
    return this.find("asset-ims-legal-completion-date").text();
  }

  hopCompletionDate() {
    return this.find("asset-hop-completion-date").text();
  }

  deposit() {
    return this.find("asset-deposit").text();
  }

  agencyEquityLoan() {
    return this.find("asset-agency-equity-loan").text();
  }

  developerEquityLoan() {
    return this.find("asset-developer-equity-loan").text();
  }

  shareOfRestrictedEquity() {
    return this.find("asset-share-of-restricted-equity").text();
  }

  differenceFromImsExpectedCompletionToHopCompletionDate() {
    return this.find(
      "asset-difference-from-ims-expected-completion-to-hop-completion-date"
    ).text();
  }
}

describe("<Asset>", () => {
  describe("Example one", () => {
    it("Renders the asset details", () => {
      let asset = new AssetComponent(assetOne);
      expect(asset.assetId()).toEqual("1");
      expect(asset.modifiedDateTime()).toEqual("13/11/2018 @ 11:04");
      expect(asset.monthPaid()).toEqual("Jan");
      expect(asset.accountingYear()).toEqual("2018");
      expect(asset.schemeId()).toEqual("12345");
      expect(asset.locationLaRegionName()).toEqual("Yorkshire");
      expect(asset.imsOldRegion()).toEqual("West Yorkshire");
      expect(asset.noOfBeds()).toEqual("5");
      expect(asset.address()).toEqual("123 Fake Street");
      expect(asset.developingRslName()).toEqual("Meow Meow");
      expect(asset.completionDateForHpiStart()).toEqual("13/11/2018 @ 11:05");
      expect(asset.imsActualCompletionDate()).toEqual("13/11/2018 @ 11:06");
      expect(asset.imsExpectedCompletionDate()).toEqual("13/11/2018 @ 11:07");
      expect(asset.imsLegalCompletionDate()).toEqual("13/11/2018 @ 11:08");
      expect(asset.hopCompletionDate()).toEqual("13/11/2018 @ 11:09");
      expect(asset.deposit()).toEqual("1234");
      expect(asset.agencyEquityLoan()).toEqual("5678");
      expect(asset.developerEquityLoan()).toEqual("9123");
      expect(asset.shareOfRestrictedEquity()).toEqual("4567");
      expect(
        asset.differenceFromImsExpectedCompletionToHopCompletionDate()
      ).toEqual("8912");
    });
  });

  describe("Example two", () => {
    it("Renders the asset details", () => {
      let asset = new AssetComponent(assetTwo);
      expect(asset.assetId()).toEqual("2");
      expect(asset.modifiedDateTime()).toEqual("13/11/2018 @ 11:05");
      expect(asset.monthPaid()).toEqual("Feb");
      expect(asset.accountingYear()).toEqual("2017");
      expect(asset.schemeId()).toEqual("54321");
      expect(asset.locationLaRegionName()).toEqual("Lancashire");
      expect(asset.imsOldRegion()).toEqual("West Lancashire");
      expect(asset.noOfBeds()).toEqual("2");
      expect(asset.address()).toEqual("321 Fake Street");
      expect(asset.developingRslName()).toEqual("Woof woof");
      expect(asset.completionDateForHpiStart()).toEqual("13/11/2018 @ 11:07");
      expect(asset.imsActualCompletionDate()).toEqual("13/11/2018 @ 11:08");
      expect(asset.imsExpectedCompletionDate()).toEqual("13/11/2018 @ 11:09");
      expect(asset.imsLegalCompletionDate()).toEqual("13/11/2018 @ 11:10");
      expect(asset.hopCompletionDate()).toEqual("13/11/2018 @ 11:11");
      expect(asset.deposit()).toEqual("4321");
      expect(asset.agencyEquityLoan()).toEqual("8765");
      expect(asset.developerEquityLoan()).toEqual("3219");
      expect(asset.shareOfRestrictedEquity()).toEqual("7654");
      expect(
        asset.differenceFromImsExpectedCompletionToHopCompletionDate()
      ).toEqual("2198");
    });
  });
});
