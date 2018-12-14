import GetAggregateValues from ".";
import Aggregates from "../../Domain/Aggregates";

describe("GetAggregateValues", () => {
  let aggregateGatewaySpy, foundAggregates, presenterSpy, useCase;

  describe("Example one", () => {
    beforeEach(async () => {
      foundAggregates = new Aggregates({
        uniqueRecords: 101,
        moneyPaidOut: 202,
        assetValue: 303,
        movementInAssetValue: 404
      });

      aggregateGatewaySpy = {
        getAggregateValuesWithFilters: jest.fn(() => foundAggregates)
      };

      presenterSpy = { present: jest.fn() };

      useCase = new GetAggregateValues({
        aggregateGateway: aggregateGatewaySpy
      });

      await useCase.execute(presenterSpy, {
        filters: { cat: "meow" }
      });
    });

    it("Calls the gateway", () => {
      expect(
        aggregateGatewaySpy.getAggregateValuesWithFilters
      ).toHaveBeenCalled();
    });

    it("Calls the gateway with the filters", () => {
      expect(
        aggregateGatewaySpy.getAggregateValuesWithFilters
      ).toHaveBeenCalledWith({ cat: "meow" });
    });

    it("Presents the data from the gateway", () => {
      expect(presenterSpy.present).toHaveBeenCalledWith({
        uniqueRecords: 101,
        moneyPaidOut: 202,
        assetValue: 303,
        movementInAssetValue: 404
      });
    });
  });

  describe("Example two", () => {
    beforeEach(async () => {
      foundAggregates = new Aggregates({
        uniqueRecords: 505,
        moneyPaidOut: 606,
        assetValue: 707,
        movementInAssetValue: 808
      });

      aggregateGatewaySpy = {
        getAggregateValuesWithFilters: jest.fn(() => foundAggregates)
      };

      presenterSpy = { present: jest.fn() };

      useCase = new GetAggregateValues({
        aggregateGateway: aggregateGatewaySpy
      });

      await useCase.execute(presenterSpy, { filters: { dog: "woof" } });
    });

    it("Calls the gateway", () => {
      expect(
        aggregateGatewaySpy.getAggregateValuesWithFilters
      ).toHaveBeenCalled();
    });

    it("Calls the gateway with the filters", () => {
      expect(
        aggregateGatewaySpy.getAggregateValuesWithFilters
      ).toHaveBeenCalledWith({ dog: "woof" });
    });

    it("Presents the data from the gateway", () => {
      expect(presenterSpy.present).toHaveBeenCalledWith({
        uniqueRecords: 505,
        moneyPaidOut: 606,
        assetValue: 707,
        movementInAssetValue: 808
      });
    });
  });
});
