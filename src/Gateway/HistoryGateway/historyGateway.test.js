import HistoryGateway from ".";

describe("HistoryGateway", () => {
  describe("When storing the search", () => {
    describe("Example one", () => {
      it("Stores the search in the history", () => {
        let historySpy = { push: jest.fn() };
        let gateway = new HistoryGateway(historySpy);

        gateway.storeSearch({ cat: "meow" });

        expect(historySpy.push).toHaveBeenCalledWith("/search?cat=meow");
      });
    });

    describe("Example one", () => {
      it("Stores the search in the history", () => {
        let historySpy = { push: jest.fn() };
        let gateway = new HistoryGateway(historySpy);

        gateway.storeSearch({ dog: "woof", cow: "moo", duck: "quack" });

        expect(historySpy.push).toHaveBeenCalledWith("/search?dog=woof&cow=moo&duck=quack");
      });
    });
  });
});
