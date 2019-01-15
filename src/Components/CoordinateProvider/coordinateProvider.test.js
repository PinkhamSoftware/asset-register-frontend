import React from "react";
import CoordinateProvider from ".";
import { mount } from "enzyme";

describe("<CoordinateProvider>", () => {
  describe("Example one", () => {
    it("Passes the postcode to the GetCoordinateForPostcode usecase", () => {
      let getCoordinatesSpy = { execute: jest.fn() };
      mount(
        <CoordinateProvider
          postcodes={["FA1 1KE"]}
          getCoordinatesForPostcode={getCoordinatesSpy}
        >
          {() => {}}
        </CoordinateProvider>
      );

      expect(getCoordinatesSpy.execute).toHaveBeenCalledWith(
        expect.anything(),
        {
          postcodes: ["FA1 1KE"]
        }
      );
    });

    it("Provides the found coordinates to the children", () => {
      let getCoordinatesStub = {
        execute: jest.fn(presenter => {
          presenter.present({ coordinates: [{ lat: 0.0, lng: 0.0 }] });
        })
      };
      let childrenSpy = jest.fn();

      mount(
        <CoordinateProvider
          postcodes={["FA1 1KE"]}
          getCoordinatesForPostcode={getCoordinatesStub}
        >
          {childrenSpy}
        </CoordinateProvider>
      );

      expect(childrenSpy).toHaveBeenCalledWith({
        coordinates: [{ lat: 0.0, lng: 0.0 }]
      });
    });
  });

  describe("Example two", () => {
    it("Passes the postcode to the GetCoordinateForPostcode usecase", () => {
      let getCoordinatesSpy = { execute: jest.fn() };

      mount(
        <CoordinateProvider
          postcodes={["FA1 1KE", "FA2 2KE"]}
          getCoordinatesForPostcode={getCoordinatesSpy}
        >
          {() => {}}
        </CoordinateProvider>
      );

      expect(getCoordinatesSpy.execute).toHaveBeenCalledWith(
        expect.anything(),
        {
          postcodes: ["FA1 1KE", "FA2 2KE"]
        }
      );
    });

    it("Provides the found coordinates to the children", () => {
      let getCoordinatesStub = {
        execute: jest.fn(async presenter => {
          presenter.present({
            coordinates: [{ lat: 10.0, lng: 20.0 }, { lat: 10.0, lng: 20.0 }]
          });
        })
      };

      let childrenSpy = jest.fn();

      mount(
        <CoordinateProvider
          postcodes={["FA1 1KE", "FA2 2KE"]}
          getCoordinatesForPostcode={getCoordinatesStub}
        >
          {childrenSpy}
        </CoordinateProvider>
      );

      expect(childrenSpy).toHaveBeenCalledWith({
        coordinates: [{ lat: 10.0, lng: 20.0 }, { lat: 10.0, lng: 20.0 }]
      });
    });
  });
});
