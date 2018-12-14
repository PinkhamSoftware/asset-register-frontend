import React from "react";
import { mount } from "enzyme";
import AggregatesProvider from ".";

describe("<AggregatesProvider>", () => {
  let getAggregatesSpy, childrenSpy, provider;
  describe("Example one", () => {
    beforeEach(() => {
      let foundAggregates = {
        uniqueRecords: 101,
        moneyPaidOut: 202,
        assetValue: 303,
        movementInAssetValue: 404
      };

      getAggregatesSpy = {
        execute: jest.fn(presenter => presenter.present(foundAggregates))
      };

      childrenSpy = jest.fn();
      provider = mount(
        <AggregatesProvider
          getAggregates={getAggregatesSpy}
          searchParameters={{ cat: "meow" }}
        >
          {childrenSpy}
        </AggregatesProvider>
      );
    });

    it("Calls the get aggregates usecase", () => {
      expect(getAggregatesSpy.execute).toHaveBeenCalled();
    });

    it("Calls the get aggregates usecase with search parameters", () => {
      expect(getAggregatesSpy.execute).toHaveBeenCalledWith(expect.anything(), {
        filters: { cat: "meow" }
      });
    });

    it("Passes the found aggregates to the children", () => {
      expect(childrenSpy).toHaveBeenCalledWith({
        aggregates: {
          uniqueRecords: 101,
          moneyPaidOut: 202,
          assetValue: 303,
          movementInAssetValue: 404
        }
      });
    });
  });

  describe("Example two", () => {
    beforeEach(() => {
      let foundAggregates = {
        uniqueRecords: 505,
        moneyPaidOut: 606,
        assetValue: 707,
        movementInAssetValue: 808
      };

      getAggregatesSpy = {
        execute: jest.fn(presenter => presenter.present(foundAggregates))
      };

      childrenSpy = jest.fn();
      provider = mount(
        <AggregatesProvider
          getAggregates={getAggregatesSpy}
          searchParameters={{ dog: "woof" }}
        >
          {childrenSpy}
        </AggregatesProvider>
      );
    });

    it("Calls the get aggregates usecase", () => {
      expect(getAggregatesSpy.execute).toHaveBeenCalled();
    });

    it("Calls the get aggregates usecase with search parameters", () => {
      expect(getAggregatesSpy.execute).toHaveBeenCalledWith(expect.anything(), {
        filters: { dog: "woof" }
      });
    });

    it("Passes the found aggregates to the children", () => {
      expect(childrenSpy).toHaveBeenCalledWith({
        aggregates: {
          uniqueRecords: 505,
          moneyPaidOut: 606,
          assetValue: 707,
          movementInAssetValue: 808
        }
      });
    });
  });
});
