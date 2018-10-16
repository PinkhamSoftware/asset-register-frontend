import React from "react";
import { shallow } from "enzyme";
import SearchBox from ".";

describe("<SearchBox>", () => {
  let onSearchSpy, searchBox;
  beforeEach(() => {
    onSearchSpy = jest.fn();
    searchBox = shallow(<SearchBox onSearch={onSearchSpy} />);
  });

  describe("Example one", () => {
    describe("When submitting the form", () => {
      it("Calls the onSearch prop", () => {
        searchBox
          .find('[data-test="search-form"]')
          .simulate("submit", { preventDefault: jest.fn() });
        expect(onSearchSpy).toHaveBeenCalled();
      });

      it("Calls the onSearch prop with the value inside the search box", () => {
        searchBox
          .find('[data-test="search-input"]')
          .simulate("change", { target: { value: "Cats" } });

        searchBox
          .find('[data-test="search-form"]')
          .simulate("submit", { preventDefault: jest.fn() });

        expect(onSearchSpy).toHaveBeenCalledWith({ value: "Cats" });
      });
    });
  });

  describe("Example two", () => {
    describe("When submitting the form", () => {
      it("Calls the onSearch", () => {
        searchBox
          .find('[data-test="search-form"]')
          .simulate("submit", { preventDefault: jest.fn() });

        expect(onSearchSpy).toHaveBeenCalled();
      });

      it("Calls the onSearch prop with the value inside the search box", () => {
        searchBox
          .find('[data-test="search-input"]')
          .simulate("change", { target: { value: "Dogs" } });

        searchBox
          .find('[data-test="search-form"]')
          .simulate("submit", { preventDefault: jest.fn() });

        expect(onSearchSpy).toHaveBeenCalledWith({ value: "Dogs" });
      });
    });
  });
});
