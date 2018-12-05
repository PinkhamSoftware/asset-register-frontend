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
    this.loadingReceived = undefined;
  }

  selectPage = async page => await this.onPageSelect({ page });

  executeOnSearch = async searchParams =>
    await this.onSearchReceived(searchParams);

  render = ({
    onSearch,
    assets,
    onPageSelect,
    numberOfPages,
    currentPage,
    loading
  }) => {
    this.onSearchReceived = onSearch;
    this.onPageSelect = onPageSelect;
    this.assetsReceived = assets;
    this.numberOfPagesReceived = numberOfPages;
    this.currentPageReceived = currentPage;
    this.loadingReceived = loading;
  };
}

class SearchAssetsFake {
  execute(presenter) {
    this.presenter = presenter;
  }

  presentWith({ assets, pages }) {
    this.presenter.present({ assets, pages });
  }
}

describe("<AssetsProvider>", () => {
  describe("Example One", () => {
    let childrenFake, historyGatewaySpy, searchAssetsSpy, provider;

    beforeEach(() => {
      historyGatewaySpy = {
        storeSearch: jest.fn()
      };

      searchAssetsSpy = {
        execute: jest.fn(presenter => {
          presenter.present({
            assets: [{ cat: "meow" }],
            pages: 5
          });
        })
      };

      childrenFake = new ChildrenFake();

      provider = mount(
        <AssetsProvider
          history={historyGatewaySpy}
          searchAssets={searchAssetsSpy}
        >
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

    it("Defaults loading to false", () => {
      expect(provider.state().loading).toEqual(false);
    });

    it("Passes the value from the children to the searchAssets prop", () => {
      childrenFake.executeOnSearch({ value: "Cats" });

      expect(searchAssetsSpy.execute).toHaveBeenCalledWith(expect.anything(), {
        filters: { value: "Cats" },
        page: 1
      });
    });

    it("Stores the search in the history", async () => {
      await childrenFake.executeOnSearch({ value: "Cats" });

      expect(historyGatewaySpy.storeSearch).toHaveBeenCalledWith({
        value: "Cats",
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

    it("Passes the loading state to the children", () => {
      expect(childrenFake.loadingReceived).toBeFalsy();
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

        expect(searchAssetsSpy.execute).toHaveBeenCalledWith(
          expect.anything(),
          {
            filters: { value: "Cat" },
            page: 3
          }
        );
      });

      it("Resets the page to one when searching with new terms", async () => {
        await childrenFake.selectPage(3);
        await childrenFake.executeOnSearch({ value: "Cat" });

        expect(searchAssetsSpy.execute).toHaveBeenCalledWith(
          expect.anything(),
          {
            filters: { value: "Cat" },
            page: 1
          }
        );
        expect(childrenFake.currentPageReceived).toEqual(1);
      });
    });

    describe("While search results are loading", () => {
      let searchAssetsFake;

      beforeEach(() => {
        let historyGatewayDummy = {
          storeSearch: jest.fn()
        };

        searchAssetsFake = new SearchAssetsFake();

        provider = mount(
          <AssetsProvider
            history={historyGatewayDummy}
            searchAssets={searchAssetsFake}
          >
            {childrenFake.render}
          </AssetsProvider>
        );
      });

      it("Sets the state to loading", () => {
        childrenFake.executeOnSearch({ cat: "meow" });
        expect(provider.state().loading).toEqual(true);
      });

      it("Passes the loading state to the children", () => {
        childrenFake.executeOnSearch({ cat: "meow" });
        expect(childrenFake.loadingReceived).toBeTruthy();
      });

      it("Sets loading to false when results are presented", () => {
        childrenFake.executeOnSearch({ cat: "meow" });
        searchAssetsFake.presentWith({ assets: [], pages: 1 });
        expect(provider.state().loading).toEqual(false);
      });
    });

    describe("Given initial search parameters", () => {
      beforeEach(() => {
        historyGatewaySpy = {
          storeSearch: jest.fn()
        };

        searchAssetsSpy = {
          execute: jest.fn(presenter => {
            presenter.present({
              assets: [{ cat: "meow" }],
              pages: 5
            });
          })
        };

        childrenFake = new ChildrenFake();
      });

      it("Calls search assets with the initial search parameters", () => {
        provider = mount(
          <AssetsProvider
            initialSearchParameters={{
              searchParameters: { dog: "woof" },
              page: 2
            }}
            history={historyGatewaySpy}
            searchAssets={searchAssetsSpy}
          >
            {childrenFake.render}
          </AssetsProvider>
        );

        expect(searchAssetsSpy.execute).toHaveBeenCalledWith(
          expect.anything(),
          {
            filters: { dog: "woof" },
            page: 2
          }
        );
      });

      it("Doesn't store the search in the history", () => {
        provider = mount(
          <AssetsProvider
            initialSearchParameters={{
              searchParameters: { dog: "woof" },
              page: 2
            }}
            history={historyGatewaySpy}
            searchAssets={searchAssetsSpy}
          >
            {childrenFake.render}
          </AssetsProvider>
        );

        expect(historyGatewaySpy.storeSearch).not.toHaveBeenCalled();
      });

      it("Doesn't call search assets with empty initial search parameters", () => {
        provider = mount(
          <AssetsProvider
            initialSearchParameters={{}}
            history={historyGatewaySpy}
            searchAssets={searchAssetsSpy}
          >
            {childrenFake.render}
          </AssetsProvider>
        );

        expect(searchAssetsSpy.execute).not.toHaveBeenCalled();
      });
    });
  });

  describe("Example Two", () => {
    let childrenFake, historyGatewaySpy, searchAssetsSpy, provider;

    beforeEach(() => {
      historyGatewaySpy = {
        storeSearch: jest.fn()
      };

      searchAssetsSpy = {
        execute: jest.fn(presenter => {
          presenter.present({
            assets: [{ dog: "woof" }],
            pages: 10
          });
        })
      };

      childrenFake = new ChildrenFake();

      provider = mount(
        <AssetsProvider
          history={historyGatewaySpy}
          searchAssets={searchAssetsSpy}
        >
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

    it("Passes the loading state to the children", () => {
      expect(childrenFake.loadingReceived).toBeFalsy();
    });

    it("Passes the value from the children to the searchAssets prop", () => {
      childrenFake.executeOnSearch({ animal: "Dogs" });

      expect(searchAssetsSpy.execute).toHaveBeenCalledWith(expect.anything(), {
        filters: { animal: "Dogs" },
        page: 1
      });
    });

    it("Stores the search parameters in the state", async () => {
      await childrenFake.executeOnSearch({ animal: "Dogs", noise: "Woof" });

      expect(provider.state().searchParameters).toEqual({
        animal: "Dogs",
        noise: "Woof"
      });
    });

    it("Stores the search in the history", async () => {
      await childrenFake.executeOnSearch({ animal: "Dogs", noise: "Woof" });

      expect(historyGatewaySpy.storeSearch).toHaveBeenCalledWith({
        animal: "Dogs",
        noise: "Woof",
        page: 1
      });
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
        await childrenFake.executeOnSearch({ animal: "Dogs", noise: "Woof" });
        await childrenFake.selectPage(3);

        expect(searchAssetsSpy.execute).toHaveBeenCalledWith(
          expect.anything(),
          {
            filters: { animal: "Dogs", noise: "Woof" },
            page: 3
          }
        );
      });

      it("Stores the page in the history", async () => {
        await childrenFake.executeOnSearch({ animal: "Dogs", noise: "Woof" });
        await childrenFake.selectPage(3);

        expect(historyGatewaySpy.storeSearch).toHaveBeenCalledWith({
          animal: "Dogs",
          noise: "Woof",
          page: 3
        });
      });

      it("Resets the page to one when searching with new terms", async () => {
        await childrenFake.selectPage(5);
        await childrenFake.executeOnSearch({ animal: "Dogs", noise: "Woof" });

        expect(searchAssetsSpy.execute).toHaveBeenCalledWith(
          expect.anything(),
          {
            filters: { animal: "Dogs", noise: "Woof" },
            page: 1
          }
        );
        expect(childrenFake.currentPageReceived).toEqual(1);
      });
    });

    describe("While search results are loading", () => {
      let searchAssetsFake;

      beforeEach(() => {
        let historyGatewayDummy = {
          storeSearch: jest.fn()
        };

        searchAssetsFake = new SearchAssetsFake();

        provider = mount(
          <AssetsProvider
            history={historyGatewayDummy}
            searchAssets={searchAssetsFake}
          >
            {childrenFake.render}
          </AssetsProvider>
        );
      });

      it("Sets the state to loading", () => {
        childrenFake.executeOnSearch({ dog: "woof" });
        expect(provider.state().loading).toEqual(true);
      });

      it("Passes the loading state to the children", () => {
        childrenFake.executeOnSearch({ cat: "meow" });
        expect(childrenFake.loadingReceived).toBeTruthy();
      });

      it("Sets loading to false when results are presented", () => {
        childrenFake.executeOnSearch({ dog: "woof" });
        searchAssetsFake.presentWith({ assets: [], pages: 1 });
        expect(provider.state().loading).toEqual(false);
      });
    });

    describe("Given initial search parameters", () => {
      beforeEach(() => {
        historyGatewaySpy = {
          storeSearch: jest.fn()
        };

        searchAssetsSpy = {
          execute: jest.fn(() => ({
            assets: [{ dog: "woof" }],
            pages: 10
          }))
        };

        childrenFake = new ChildrenFake();

        provider = mount(
          <AssetsProvider
            initialSearchParameters={{
              searchParameters: { cat: "meow" },
              page: 5
            }}
            history={historyGatewaySpy}
            searchAssets={searchAssetsSpy}
          >
            {childrenFake.render}
          </AssetsProvider>
        );
      });

      it("Calls search assets with the initial search parameters", () => {
        expect(searchAssetsSpy.execute).toHaveBeenCalledWith(
          expect.anything(),
          {
            filters: { cat: "meow" },
            page: 5
          }
        );
      });

      it("Doesn't store the search in the history", () => {
        expect(historyGatewaySpy.storeSearch).not.toHaveBeenCalled();
      });
    });
  });
});
