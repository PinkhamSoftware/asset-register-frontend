import GetCoordinatesForPostcodes from ".";

describe("GetCoordinatesForPostcodes", () => {
  const presenterDummy = { present: () => {} };

  describe("Example one", () => {
    it("Calls the gateway with the postcodes", async () => {
      let postcodeLookupSpy = { getCoordinates: jest.fn() };
      let useCase = new GetCoordinatesForPostcodes({
        postcodeLookupGateway: postcodeLookupSpy
      });

      await useCase.execute(presenterDummy, { postcodes: ["FA1 1KE"] });

      expect(postcodeLookupSpy.getCoordinates).toHaveBeenCalledWith([
        "FA1 1KE"
      ]);
    });

    it("Presents the coordinates returned from the gateway", async () => {
      let postcodeLookupStub = {
        getCoordinates: jest.fn(() => [{ lat: 10.0, lng: 12.0 }])
      };
      let presenterSpy = { present: jest.fn() };

      let useCase = new GetCoordinatesForPostcodes({
        postcodeLookupGateway: postcodeLookupStub
      });

      await useCase.execute(presenterSpy, {
        postcodes: ["FA1 1KE"]
      });

      expect(presenterSpy.present).toHaveBeenCalledWith({
        coordinates: [{ lat: 10.0, lng: 12.0 }]
      });
    });
  });

  describe("Example one", () => {
    it("Calls the gateway with the postcodes", async () => {
      let postcodeLookupSpy = { getCoordinates: jest.fn() };
      let useCase = new GetCoordinatesForPostcodes({
        postcodeLookupGateway: postcodeLookupSpy
      });

      await useCase.execute(presenterDummy, {
        postcodes: ["FA1 1KE", "FA2 2KE"]
      });

      expect(postcodeLookupSpy.getCoordinates).toHaveBeenCalledWith([
        "FA1 1KE",
        "FA2 2KE"
      ]);
    });

    it("Presents the coordinates returned from the gateway", async () => {
      let postcodeLookupStub = {
        getCoordinates: jest.fn(() => [
          { lat: 10.0, lng: 12.0 },
          { lat: 13.0, lng: 15.0 }
        ])
      };
      let presenterSpy = { present: jest.fn() };

      let useCase = new GetCoordinatesForPostcodes({
        postcodeLookupGateway: postcodeLookupStub
      });

      await useCase.execute(presenterSpy, {
        postcodes: ["FA1 1KE", "FA2 2KE"]
      });

      expect(presenterSpy.present).toHaveBeenCalledWith({
        coordinates: [{ lat: 10.0, lng: 12.0 }, { lat: 13.0, lng: 15.0 }]
      });
    });
  });
});
