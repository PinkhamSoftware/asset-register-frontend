import React from "react";
import { mount, shallow } from "enzyme";
import AssetsProvider from ".";

class ChildrenFake {
  constructor() {
    this.onSearchReceived = undefined;
    this.onPageSelect = undefined;
    this.assetsReceived = undefined;
    this.numberOfPagesReceived = undefined;
    this.currentPageReceived = undefined;
  }

  selectPage = async page => await this.onPageSelect({ page });

  executeOnSearch = async searchParams =>
    await this.onSearchReceived(searchParams);

  render = ({ onSearch, assets, onPageSelect, numberOfPages, currentPage }) => {
    this.onSearchReceived = onSearch;
    this.onPageSelect = onPageSelect;
    this.assetsReceived = assets;
    this.numberOfPagesReceived = numberOfPages;
    this.currentPageReceived = currentPage;
  };
}

describe("<AssetsProvider>", () => {
  describe("Example One", () => {
    let childrenFake, searchAssetsSpy, provider;

    beforeEach(() => {
      searchAssetsSpy = {
        execute: jest.fn(() => ({
          assets: [{ cat: "meow" }],
          pages: 5
        }))
      };

      childrenFake = new ChildrenFake();

      provider = mount(
        <AssetsProvider searchAssets={searchAssetsSpy}>
          {childrenFake.render}
        </AssetsProvider>
      );
    });

    it("Can call the searchAssets prop from the children", () => {
      childrenFake.executeOnSearch();

      expect(searchAssetsSpy.execute).toHaveBeenCalled();
    });

    it("Defaults the page to one", () => {
      expect(provider.state().page).toEqual(1);
    });

    it("Defaults the number of pages to 0", () => {
      expect(provider.state().pages).toEqual(0);
    });

    it("Passes the value from the children to the searchAssets prop", () => {
      childrenFake.executeOnSearch({ value: "Cats" });

      expect(searchAssetsSpy.execute).toHaveBeenCalledWith({
        filters: { value: "Cats" },
        page: 1
      });
    });

    it("Stores the search parameters in the state", async () => {
      await childrenFake.executeOnSearch({ value: "Cats" });

      expect(provider.state().searchParameters).toEqual({ value: "Cats" });
    });

    it("Passes an empty assets array by default", () => {
      expect(childrenFake.assetsReceived).toEqual([]);
    });

    it("Passes the found assets from the searchAssets prop to the children", async () => {
      await childrenFake.executeOnSearch();

      expect(childrenFake.assetsReceived).toEqual([{ cat: "meow" }]);
    });

    it("Passes the total number of pages into the children", async () => {
      await childrenFake.executeOnSearch();

      expect(childrenFake.numberOfPagesReceived).toEqual(5);
    });

    it("Passes the current page into the children", () => {
      expect(childrenFake.currentPageReceived).toEqual(1);
    });

    describe("Selecting a page", () => {
      it("Can set the page from the children", async () => {
        await childrenFake.selectPage(5);

        expect(provider.state().page).toEqual(5);
      });

      it("Passes the new page to the children", async () => {
        await childrenFake.selectPage(5);

        expect(childrenFake.currentPageReceived).toEqual(5);
      });

      it("Searches with the previous parameters when selecting a page", async () => {
        await childrenFake.executeOnSearch({ value: "Cat" });
        await childrenFake.selectPage(3);

        expect(searchAssetsSpy.execute).toHaveBeenCalledWith({
          filters: { value: "Cat" },
          page: 3
        });
      });

      it("Resets the page to one when searching with new terms", async () => {
        await childrenFake.selectPage(3);
        await childrenFake.executeOnSearch({ value: "Cat" });

        expect(searchAssetsSpy.execute).toHaveBeenCalledWith({
          filters: { value: "Cat" },
          page: 1
        });
        expect(childrenFake.currentPageReceived).toEqual(1);
      });
    });
  });

  describe("Example Two", () => {
    let childrenFake, searchAssetsSpy, provider;

    beforeEach(() => {
      searchAssetsSpy = {
        execute: jest.fn(() => ({
          assets: [{ dog: "woof" }],
          pages: 10
        }))
      };

      childrenFake = new ChildrenFake();

      provider = mount(
        <AssetsProvider searchAssets={searchAssetsSpy}>
          {childrenFake.render}
        </AssetsProvider>
      );
    });

    it("Can call the searchAssets prop from the children", () => {
      childrenFake.executeOnSearch();

      expect(searchAssetsSpy.execute).toHaveBeenCalled();
    });

    it("Defaults the page to one", () => {
      expect(provider.state().page).toEqual(1);
    });

    it("Defaults the number of pages to 0", () => {
      expect(provider.state().pages).toEqual(0);
    });

    it("Passes the value from the children to the searchAssets prop", () => {
      childrenFake.executeOnSearch({ animal: "Dogs" });

      expect(searchAssetsSpy.execute).toHaveBeenCalledWith({
        filters: { animal: "Dogs" },
        page: 1
      });
    });

    it("Stores the search parameters in the state", async () => {
      await childrenFake.executeOnSearch({ animal: "Dogs" });

      expect(provider.state().searchParameters).toEqual({ animal: "Dogs" });
    });

    it("Passes the found assets from the searchAssets prop to the children", async () => {
      await childrenFake.executeOnSearch();

      expect(childrenFake.assetsReceived).toEqual([{ dog: "woof" }]);
    });

    it("Passes the total number of pages into the children", async () => {
      await childrenFake.executeOnSearch();

      expect(childrenFake.numberOfPagesReceived).toEqual(10);
    });

    it("Passes the current page into the children", () => {
      expect(childrenFake.currentPageReceived).toEqual(1);
    });

    describe("Selecting a page", () => {
      it("Can set the page from the children", async () => {
        await childrenFake.selectPage(3);

        expect(provider.state().page).toEqual(3);
      });

      it("Passes the new page to the children", async () => {
        await childrenFake.selectPage(3);

        expect(childrenFake.currentPageReceived).toEqual(3);
      });

      it("Searches with the previous parameters when selecting a page", async () => {
        await childrenFake.executeOnSearch({ animal: "Dogs" });
        await childrenFake.selectPage(3);

        expect(searchAssetsSpy.execute).toHaveBeenCalledWith({
          filters: { animal: "Dogs" },
          page: 3
        });
      });

      it("Resets the page to one when searching with new terms", async () => {
        await childrenFake.selectPage(5);
        await childrenFake.executeOnSearch({ animal: "Dogs" });

        expect(searchAssetsSpy.execute).toHaveBeenCalledWith({
          filters: { animal: "Dogs" },
          page: 1
        });
        expect(childrenFake.currentPageReceived).toEqual(1);
      });
    });
  });
});
