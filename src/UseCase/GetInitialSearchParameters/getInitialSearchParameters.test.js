import GetInitialSearchParameters from ".";

describe("GetInitialSearchParameters", () => {
  describe("Given an empty string", () => {
    it("Returns an empty object", () => {
      let useCase = new GetInitialSearchParameters();

      let response = useCase.execute("");

      expect(response).toEqual({});
    });
  });

  describe("Given a query string", () => {
    describe("Example one", () => {
      it("Can get the search parameters", () => {
        let useCase = new GetInitialSearchParameters();

        let { searchParameters } = useCase.execute("?cat=meow&page=1");

        expect(searchParameters).toEqual({ cat: "meow" });
      });

      it("Can get the page", () => {
        let useCase = new GetInitialSearchParameters();

        let { page } = useCase.execute("?cat=meow&page=1");

        expect(page).toEqual(1);
      });
    });

    describe("Example two", () => {
      it("Can get the search parameters", () => {
        let useCase = new GetInitialSearchParameters();

        let { searchParameters } = useCase.execute("?dog=woof&cow=moo&page=5");

        expect(searchParameters).toEqual({ dog: "woof", cow: "moo" });
      });

      it("Can get the page", () => {
        let useCase = new GetInitialSearchParameters();

        let { page } = useCase.execute("?dog=woof&cow=moo&page=5");

        expect(page).toEqual(5);
      });
    });
  });
});
