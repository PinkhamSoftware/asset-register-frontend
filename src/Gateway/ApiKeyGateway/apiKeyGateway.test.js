import ApiKeyGateway from ".";

describe("ApiKeyGateway", () => {
  describe("Example one", () => {
    describe("When saving an api key", () => {
      it("Can get the stored api key", () => {
        let gateway = new ApiKeyGateway();
        gateway.save("apiKey");

        let apiKey = gateway.get();

        expect(apiKey).toEqual("apiKey");
      });
    });
  });

  describe("Example two", () => {
    describe("When saving an api key", () => {
      it("Can get the stored api key", () => {
        let gateway = new ApiKeyGateway();
        gateway.save("meow woof meow");

        let apiKey = gateway.get();

        expect(apiKey).toEqual("meow woof meow");
      });
    });
  });
});
