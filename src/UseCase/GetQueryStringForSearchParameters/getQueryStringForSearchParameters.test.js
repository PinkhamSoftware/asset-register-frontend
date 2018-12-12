import GetQueryStringForSearchParameters from ".";

describe("GetQueryStringForSearchParameters", () => {
  let useCase;
  beforeEach(() => {
    useCase = new GetQueryStringForSearchParameters();
  });

  describe("Example one", () => {
    describe("Given one parameter", () => {
      it("It builds the query string", () => {
        let queryString = useCase.execute({ parameters: { cat: "meow" } });

        expect(queryString).toEqual("cat=meow");
      });
    });

    describe("Given two parameters", () => {
      it("It builds the query string", () => {
        let queryString = useCase.execute({
          parameters: { cat: "meow", cow: "moo" }
        });

        expect(queryString).toEqual("cat=meow&cow=moo");
      });
    });

    describe("Given many parameters", () => {
      it("It builds the query string", () => {
        let queryString = useCase.execute({
          parameters: { cat: "meow", cow: "moo", dog: "woof", duck: "quack" }
        });

        expect(queryString).toEqual("cat=meow&cow=moo&dog=woof&duck=quack");
      });
    });
  });

  describe("Example two", () => {
    describe("Given one parameter", () => {
      it("It builds the query string", () => {
        let queryString = useCase.execute({ parameters: { dog: "woof" } });

        expect(queryString).toEqual("dog=woof");
      });
    });

    describe("Given two parameters", () => {
      it("It builds the query string", () => {
        let queryString = useCase.execute({
          parameters: { dog: "woof", duck: "quack" }
        });

        expect(queryString).toEqual("dog=woof&duck=quack");
      });
    });

    describe("Given many parameters", () => {
      it("It builds the query string", () => {
        let queryString = useCase.execute({
          parameters: {
            dog: "woof",
            duck: "quack",
            chicken: "cluck",
            pig: "oink"
          }
        });

        expect(queryString).toEqual(
          "dog=woof&duck=quack&chicken=cluck&pig=oink"
        );
      });
    });
  });
});
