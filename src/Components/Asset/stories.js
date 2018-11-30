import React from "react";
import Asset from ".";

import { storiesOf } from "@storybook/react";

storiesOf("Asset", module).add("Default", () => {
  let asset = {
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
    completionDateForHpiStart: "2018-11-13T11:04:24.169Z",
    imsActualCompletionDate: "2018-11-13T11:05:25.169Z",
    imsExpectedCompletionDate: "2018-11-13T11:06:26.169Z",
    imsLegalCompletionDate: "2018-11-13T11:07:27.169Z",
    hopCompletionDate: "2018-11-13T11:08:28.169Z",
    deposit: 1234,
    agencyEquityLoan: 5678,
    developerEquityLoan: 9123,
    shareOfRestrictedEquity: 4567,
    differenceFromImsExpectedCompletionToHopCompletionDate: 8912
  };

  return <Asset asset={asset} />;
});
