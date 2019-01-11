import React from "react";
import Aggregates from ".";
import { mount } from "enzyme";

describe("<Aggregates>", () => {
  let aggregates;

  describe("Given aggregate values", () => {
    describe("Example one", () => {
      beforeEach(() => {
        let aggregateValues = {
          uniqueRecords: 101,
          moneyPaidOut: 202,
          assetValue: 303,
          movementInAssetValue: 404
        };

        aggregates = mount(<Aggregates aggregateValues={aggregateValues} />);
      });

      it("Displays the unique records", () => {
        let uniqueRecords = aggregates.find({
          "data-test": "aggregates-unique-records"
        });
        expect(uniqueRecords.text()).toEqual("101");
      });

      it("Displays the money paid out", () => {
        let moneyPaidOut = aggregates.find({
          "data-test": "aggregates-money-paid-out"
        });
        expect(moneyPaidOut.text()).toEqual("£202");
      });

      it("Displays the asset value", () => {
        let assetValue = aggregates.find({
          "data-test": "aggregates-asset-value"
        });
        expect(assetValue.text()).toEqual("£303");
      });

      it("Displays the movement in asset value", () => {
        let assetValue = aggregates.find({
          "data-test": "aggregates-movement-in-asset-value"
        });
        expect(assetValue.text()).toEqual("£404");
      });
    });

    describe("Example two", () => {
      beforeEach(() => {
        let aggregateValues = {
          uniqueRecords: 505,
          moneyPaidOut: 606,
          assetValue: 707,
          movementInAssetValue: 808
        };

        aggregates = mount(<Aggregates aggregateValues={aggregateValues} />);
      });

      it("Displays the unique records", () => {
        let uniqueRecords = aggregates.find({
          "data-test": "aggregates-unique-records"
        });
        expect(uniqueRecords.text()).toEqual("505");
      });

      it("Displays the money paid out", () => {
        let moneyPaidOut = aggregates.find({
          "data-test": "aggregates-money-paid-out"
        });
        expect(moneyPaidOut.text()).toEqual("£606");
      });

      it("Displays the asset value", () => {
        let assetValue = aggregates.find({
          "data-test": "aggregates-asset-value"
        });
        expect(assetValue.text()).toEqual("£707");
      });

      it("Displays the movement in asset value", () => {
        let assetValue = aggregates.find({
          "data-test": "aggregates-movement-in-asset-value"
        });
        expect(assetValue.text()).toEqual("£808");
      });
    });
  });
});
