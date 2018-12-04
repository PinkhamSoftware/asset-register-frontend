import React from "react";
import { shallow } from "enzyme";
import SearchBox from ".";

class SearchBoxComponent {
  constructor({ onSearch }) {
    this.searchBox = shallow(<SearchBox onSearch={onSearch} />);
  }

  searchForAddress(address) {
    this.find("search-address").simulate("change", {
      target: { value: address }
    });
  }

  searchForSchemeId(schemeId) {
    this.find("search-scheme-id").simulate("change", {
      target: { value: schemeId }
    });
  }

  submitForm() {
    this.find("search-form").simulate("submit", {
      preventDefault: jest.fn()
    });
  }

  find(param) {
    return this.searchBox.find({ "data-test": param });
  }
}

describe("<SearchBox>", () => {
  let onSearchSpy, searchBox;
  beforeEach(() => {
    onSearchSpy = jest.fn();
    searchBox = new SearchBoxComponent({ onSearch: onSearchSpy });
  });

  describe("When searching by scheme id", () => {
    describe("Example one", () => {
      describe("When submitting the form", () => {
        it("Calls the onSearch prop", () => {
          searchBox.submitForm();
          expect(onSearchSpy).toHaveBeenCalled();
        });

        it("Calls the onSearch prop with the value inside the search box", () => {
          searchBox.searchForSchemeId("Cats");
          searchBox.submitForm();

          expect(onSearchSpy).toHaveBeenCalledWith({
            schemeId: "Cats"
          });
        });
      });
    });

    describe("Example two", () => {
      describe("When submitting the form", () => {
        it("Calls the onSearch", () => {
          searchBox.submitForm();

          expect(onSearchSpy).toHaveBeenCalled();
        });

        it("Calls the onSearch prop with the value inside the search box", () => {
          searchBox.searchForSchemeId("Dogs");
          searchBox.submitForm();

          expect(onSearchSpy).toHaveBeenCalledWith({
            schemeId: "Dogs"
          });
        });
      });
    });
  });

  describe("When searching by address", () => {
    describe("Example one", () => {
      describe("When submitting the form", () => {
        it("Calls the onSearch prop", () => {
          searchBox.submitForm();
          expect(onSearchSpy).toHaveBeenCalled();
        });

        it("Calls the onSearch prop with the value inside the search box", () => {
          searchBox.searchForAddress("123 Fake Street");
          searchBox.submitForm();

          expect(onSearchSpy).toHaveBeenCalledWith({
            address: "123 Fake Street"
          });
        });
      });
    });

    describe("Example two", () => {
      describe("When submitting the form", () => {
        it("Calls the onSearch", () => {
          searchBox.submitForm();

          expect(onSearchSpy).toHaveBeenCalled();
        });

        it("Calls the onSearch prop with the value inside the search box", () => {
          searchBox.searchForAddress("Dog Town");
          searchBox.submitForm();

          expect(onSearchSpy).toHaveBeenCalledWith({
            address: "Dog Town"
          });
        });
      });
    });
  });

  describe("When searching by both address and scheme id", () => {
    describe("Example one", () => {
      describe("When submitting the form", () => {
        it("Calls the onSearch prop", () => {
          searchBox.submitForm();
          expect(onSearchSpy).toHaveBeenCalled();
        });

        it("Calls the onSearch prop with the value inside the search box", () => {
          searchBox.searchForSchemeId("12345");
          searchBox.searchForAddress("123 Fake Street");
          searchBox.submitForm();

          expect(onSearchSpy).toHaveBeenCalledWith({
            schemeId: "12345",
            address: "123 Fake Street"
          });
        });
      });
    });

    describe("Example two", () => {
      describe("When submitting the form", () => {
        it("Calls the onSearch", () => {
          searchBox.submitForm();

          expect(onSearchSpy).toHaveBeenCalled();
        });

        it("Calls the onSearch prop with the value inside the search box", () => {
          searchBox.searchForSchemeId("54321");
          searchBox.searchForAddress("Dog Town");
          searchBox.submitForm();

          expect(onSearchSpy).toHaveBeenCalledWith({
            schemeId: "54321",
            address: "Dog Town"
          });
        });
      });
    });
  });
});
