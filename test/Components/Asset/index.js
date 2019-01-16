import React from "react";
import { mount } from "enzyme";
import Asset from "../../../src/Components/Asset";

export default class AssetComponent {
  constructor(assetData, mapSpy) {
    this.component = mount(<Asset asset={assetData} mapComponent={mapSpy} />);
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

  originalAgencyPercentage() {
    return this.find("asset-original-agency-percentage").text();
  }

  developerDiscount() {
    return this.find("asset-developer-discount").text();
  }

  mortgage() {
    return this.find("asset-mortgage").text();
  }

  agent() {
    return this.find("asset-agent").text();
  }

  purchasePrice() {
    return this.find("asset-purchase-price").text();
  }

  equityOwner() {
    return this.find("asset-equity-owner").text();
  }

  program() {
    return this.find("asset-program").text();
  }
}
