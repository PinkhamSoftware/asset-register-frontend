import PostcodeLookupGateway from ".";
import nock from "nock";

describe("PostcodeLookupGateway", () => {
  let stubApiRequest = (url, postcodes, results) => {
    return nock(url)
      .post("/api/v1/geolocation", postcodes)
      .reply(200, results);
  };

  describe("Example one", () => {
    it("Looks up the postcodes on the API", async () => {
      process.env.REACT_APP_POSTCODE_API_URL = "http://meow.cat/";
      let request = stubApiRequest(
        "http://meow.cat/",
        ["FA1 1KE"],
        [{ latitude: 0, longitude: 10 }]
      );

      let gateway = new PostcodeLookupGateway();

      await gateway.getCoordinates(["FA1 1KE"]);

      expect(request.isDone()).toBeTruthy();
    });

    it("Returns the geolocations from the api", async () => {
      process.env.REACT_APP_POSTCODE_API_URL = "http://meow.cat/";
      stubApiRequest(
        "http://meow.cat/",
        ["FA1 1KE"],
        [{ latitude: 0, longitude: 10 }]
      );

      let gateway = new PostcodeLookupGateway();

      let coordinates = await gateway.getCoordinates(["FA1 1KE"]);

      expect(coordinates).toEqual([{ lat: 0, lng: 10 }]);
    });
  });

  describe("Example one", () => {
    it("Looks up the postcodes on the API", async () => {
      process.env.REACT_APP_POSTCODE_API_URL = "http://dog.woof/";
      let request = stubApiRequest(
        "http://dog.woof/",
        ["FA1 1KE", "FA2 2KE"],
        [{ latitude: 0, longitude: 10 }, { latitude: 10, longitude: 20 }]
      );

      let gateway = new PostcodeLookupGateway();

      await gateway.getCoordinates(["FA1 1KE", "FA2 2KE"]);

      expect(request.isDone()).toBeTruthy();
    });

    it("Returns the geolocations from the api", async () => {
      process.env.REACT_APP_POSTCODE_API_URL = "http://dog.woof/";
      stubApiRequest(
        "http://dog.woof/",
        ["FA1 1KE", "FA2 2KE"],
        [{ latitude: 0, longitude: 10 }, { latitude: 10, longitude: 20 }]
      );

      let gateway = new PostcodeLookupGateway();

      let coordinates = await gateway.getCoordinates(["FA1 1KE", "FA2 2KE"]);

      expect(coordinates).toEqual([{ lat: 0, lng: 10 }, { lat: 10, lng: 20 }]);
    });
  });
});
