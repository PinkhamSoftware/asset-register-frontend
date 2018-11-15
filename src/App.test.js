import React from "react";
import { mount } from "enzyme";
import App from "./App";
import GetAssetSimulator from "../test/Simulators/GetAsset";

let asset = {
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

const waitForRequestToResolve = async () => {
  await new Promise(resolve => setTimeout(resolve, 100));
};

describe("When rendering the app", () => {
  it("Renders an asset with data from the API", async () => {
    process.env.REACT_APP_ASSET_REGISTER_API_URL = "https://meow.cat/";
    let getAssetSimulator = new GetAssetSimulator("https://meow.cat/");
    getAssetSimulator
      .getAssetWithId(1)
      .respondWithData({ asset })
      .successfully();

    let app = mount(<App />);
    await waitForRequestToResolve();
    app.update();

    let renderedAsset = app.find({ "data-test": "asset" });

    expect(renderedAsset.length).toEqual(1);
  });
});
