import React from "react";
import { shallow } from "enzyme";
import SearchBox from ".";

class SearchBoxComponent {
  constructor({ onSearch }) {
    this.searchBox = shallow(<SearchBox onSearch={onSearch} />);
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
            filters: { schemeId: "Cats" }
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
            filters: { schemeId: "Dogs" }
          });
        });
      });
    });
  });
});
