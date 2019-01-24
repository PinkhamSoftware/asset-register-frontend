import AggregateGateway from ".";
import AggregateSimulator from "../../../test/Simulators/Aggregate";

describe("AggregateGateway", () => {
  let apiKeyGatewayStub = { get: () => "meow" };

  describe("When the aggregate search is unsuccessful", () => {
    let gateway;

    beforeEach(() => {
      process.env.REACT_APP_ASSET_REGISTER_API_URL = "http://meow.cat/";

      let simulator = new AggregateSimulator("http://meow.cat/");

      simulator.getAggregatesWithFilters({ cow: "moo" }).unsuccessfully();

      gateway = new AggregateGateway({ apiKeyGateway: apiKeyGatewayStub });
    });

    it("Returns an empty object", async () => {
      let response = await gateway.getAggregateValuesWithFilters({
        cow: "moo"
      });

      expect(response).toEqual({});
    });
  });

  describe("Getting the Aggregates with search parameters", () => {
    let request, gateway;
    describe("Example one", () => {
      beforeEach(() => {
        process.env.REACT_APP_ASSET_REGISTER_API_URL = "http://meow.cat/";

        let simulator = new AggregateSimulator("http://meow.cat/");

        request = simulator
          .getAggregatesWithFilters({ meow: "cat" })
          .respondWithValues({
            uniqueRecords: 1001,
            moneyPaidOut: 2002,
            assetValue: 3003,
            movementInAssetValue: 4004
          })
          .successfully();

        gateway = new AggregateGateway({ apiKeyGateway: apiKeyGatewayStub });
      });

      it("Calls the endpoint with the search parameters", async () => {
        await gateway.getAggregateValuesWithFilters({ meow: "cat" });

        expect(request.isDone()).toBeTruthy();
      });

      it("Returns the calculations from the API", async () => {
        let result = await gateway.getAggregateValuesWithFilters({
          meow: "cat"
        });

        expect(result.uniqueRecords).toEqual(1001);
        expect(result.moneyPaidOut).toEqual(2002);
        expect(result.assetValue).toEqual(3003);
        expect(result.movementInAssetValue).toEqual(4004);
      });
    });

    describe("Example two", () => {
      beforeEach(() => {
        process.env.REACT_APP_ASSET_REGISTER_API_URL = "http://dog.woof/";

        let simulator = new AggregateSimulator("http://dog.woof/");

        request = simulator
          .getAggregatesWithFilters({ dog: "woof" })
          .respondWithValues({
            uniqueRecords: 5005,
            moneyPaidOut: 6006,
            assetValue: 7007,
            movementInAssetValue: 8008
          })
          .successfully();

        gateway = new AggregateGateway({ apiKeyGateway: apiKeyGatewayStub });
      });

      it("Calls the endpoint with the search parameters", async () => {
        await gateway.getAggregateValuesWithFilters({ dog: "woof" });

        expect(request.isDone()).toBeTruthy();
      });

      it("Returns the calculations from the API", async () => {
        let result = await gateway.getAggregateValuesWithFilters({
          dog: "woof"
        });

        expect(result.uniqueRecords).toEqual(5005);
        expect(result.moneyPaidOut).toEqual(6006);
        expect(result.assetValue).toEqual(7007);
        expect(result.movementInAssetValue).toEqual(8008);
      });
    });
  });
});
