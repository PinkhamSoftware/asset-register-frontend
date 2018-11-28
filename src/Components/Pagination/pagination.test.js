import PaginationComponent from "../../../test/Components/Pagination";

describe("<Pagination>", () => {
  let pagination;

  const getPaginationWithCurrent = current =>
    new PaginationComponent({
      current: current,
      max: 10,
      onPageSelect: () => {}
    });

  const getPaginationWithCurrentAndMax = (current, max) => {
    return new PaginationComponent({
      max: max,
      current: current,
      onPageSelect: () => {}
    });
  };

  describe("Given undefined pages", () => {
    it("Doesn't display any buttons", () => {
      pagination = new PaginationComponent({
        current: 0,
        max: undefined,
        onPageSelect: () => {}
      });

      expect(pagination.displaysFirstPageButton()).toBeFalsy();
      expect(pagination.displaysLeftJumpButton()).toBeFalsy();
      expect(pagination.displaysCurrentButton()).toBeFalsy();
      expect(pagination.displaysRightJumpButton()).toBeFalsy();
      expect(pagination.displaysLastPageButton()).toBeFalsy();
    });
  });

  describe("Given 0 pages", () => {
    it("Doesn't display any buttons", () => {
      pagination = new PaginationComponent({
        current: 0,
        max: 0,
        onPageSelect: () => {}
      });

      expect(pagination.displaysFirstPageButton()).toBeFalsy();
      expect(pagination.displaysLeftJumpButton()).toBeFalsy();
      expect(pagination.displaysCurrentButton()).toBeFalsy();
      expect(pagination.displaysRightJumpButton()).toBeFalsy();
      expect(pagination.displaysLastPageButton()).toBeFalsy();
    });
  });

  describe("Given 1 page", () => {
    it("Only displays the current page button", () => {
      pagination = new PaginationComponent({
        current: 1,
        max: 1,
        onPageSelect: () => {}
      });

      expect(pagination.displaysFirstPageButton()).toBeFalsy();
      expect(pagination.displaysLeftJumpButton()).toBeFalsy();
      expect(pagination.displaysCurrentButton()).toBeTruthy();
      expect(pagination.displaysRightJumpButton()).toBeFalsy();
      expect(pagination.displaysLastPageButton()).toBeFalsy();
    });
  });

  describe("Given the selected is not within two of either end", () => {
    let pageSelectSpy;

    describe("Example one", () => {
      beforeEach(() => {
        pageSelectSpy = jest.fn();

        pagination = new PaginationComponent({
          current: 5,
          max: 10,
          onPageSelect: pageSelectSpy
        });
      });

      it("Displays the first page button", () => {
        expect(pagination.displaysFirstPageButton()).toBeTruthy();
      });

      it("Displays the last page button", () => {
        expect(pagination.displaysLastPageButton()).toBeTruthy();
      });

      it("Displays the max value inside the last page button", () => {
        expect(pagination.lastPageValue()).toEqual("10");
      });

      it("Passes 1 to the page select spy when selecting the first page", () => {
        pagination.selectFirstPage();
        expect(pageSelectSpy).toHaveBeenCalledWith({ page: 1 });
      });

      it("Passes the max value to the page select spy when selecting the first page", () => {
        pagination.selectLastPage();
        expect(pageSelectSpy).toHaveBeenCalledWith({ page: 10 });
      });

      it("Displays the current page as the active page", () => {
        expect(pagination.currentPageValue()).toEqual("5");
      });

      it("Displays the pages either side of the current page", () => {
        expect(pagination.displaysButtonForPage(4)).toBeTruthy();
        expect(pagination.valueForPage(4)).toEqual("4");
        expect(pagination.displaysButtonForPage(6)).toBeTruthy();
        expect(pagination.valueForPage(6)).toEqual("6");
      });

      it("Navigates to the previous page when selecting the previous page", () => {
        pagination.selectPage(4);
        expect(pageSelectSpy).toHaveBeenCalledWith({ page: 4 });
      });

      it("Navigates to the next page when selecting the next page", () => {
        pagination.selectPage(6);
        expect(pageSelectSpy).toHaveBeenCalledWith({ page: 6 });
      });

      it("Shows the left arrow on the page", () => {
        expect(pagination.displaysLeftJumpButton()).toBeTruthy();
      });

      it("Shows the right arrow on the page", () => {
        expect(pagination.displaysRightJumpButton()).toBeTruthy();
      });

      it("Selects the page 1 less than the displayed when selecting the left jump", () => {
        pagination.jumpLeft();
        expect(pageSelectSpy).toHaveBeenCalledWith({ page: 3 });
      });

      it("Selects the page 1 more than the displayed when selecting the right jump", () => {
        pagination.jumpRight();
        expect(pageSelectSpy).toHaveBeenCalledWith({ page: 7 });
      });
    });

    describe("Example two", () => {
      beforeEach(() => {
        pageSelectSpy = jest.fn();

        pagination = new PaginationComponent({
          current: 10,
          max: 20,
          onPageSelect: pageSelectSpy
        });
      });

      it("Displays the first page button", () => {
        expect(pagination.displaysFirstPageButton()).toBeTruthy();
      });

      it("Displays the last page button", () => {
        expect(pagination.displaysLastPageButton()).toBeTruthy();
      });

      it("Displays the max value inside the last page button", () => {
        expect(pagination.lastPageValue()).toEqual("20");
      });

      it("Passes 1 to the page select spy when selecting the first page", () => {
        pagination.selectFirstPage();
        expect(pageSelectSpy).toHaveBeenCalledWith({ page: 1 });
      });

      it("Passes the max value to the page select spy when selecting the first page", () => {
        pagination.selectLastPage();
        expect(pageSelectSpy).toHaveBeenCalledWith({ page: 20 });
      });

      it("Displays the current page as the active page", () => {
        expect(pagination.currentPageValue()).toEqual("10");
      });

      it("Displays the pages either side of the current page", () => {
        expect(pagination.displaysButtonForPage(9)).toBeTruthy();
        expect(pagination.valueForPage(9)).toEqual("9");
        expect(pagination.displaysButtonForPage(11)).toBeTruthy();
        expect(pagination.valueForPage(11)).toEqual("11");
      });

      it("Navigates to the previous page when selecting the previous page", () => {
        pagination.selectPage(9);
        expect(pageSelectSpy).toHaveBeenCalledWith({ page: 9 });
      });

      it("Navigates to the next page when selecting the next page", () => {
        pagination.selectPage(11);
        expect(pageSelectSpy).toHaveBeenCalledWith({ page: 11 });
      });

      it("Shows the left arrow on the page", () => {
        expect(pagination.displaysLeftJumpButton()).toBeTruthy();
      });

      it("Shows the right arrow on the page", () => {
        expect(pagination.displaysRightJumpButton()).toBeTruthy();
      });

      it("Selects the page 1 less than the displayed when selecting the left jump", () => {
        pagination.jumpLeft();
        expect(pageSelectSpy).toHaveBeenCalledWith({ page: 8 });
      });

      it("Selects the page 1 more than the displayed when selecting the right jump", () => {
        pagination.jumpRight();
        expect(pageSelectSpy).toHaveBeenCalledWith({ page: 12 });
      });
    });
  });

  describe("Navigation buttons", () => {
    describe("Given the selected is within two of the start", () => {
      describe("Current = 1", () => {
        beforeEach(() => {
          pagination = getPaginationWithCurrent(1);
        });

        it("Does not display the first page button", () => {
          expect(pagination.displaysFirstPageButton()).toBeFalsy();
        });

        it("Does not display the previous button", () => {
          expect(pagination.displaysButtonForPage(0)).toBeFalsy();
        });

        it("Displays the current button", () => {
          expect(pagination.displaysCurrentButton()).toBeTruthy();
        });

        it("Does not display the left jump button", () => {
          expect(pagination.displaysLeftJumpButton()).toBeFalsy();
        });
      });

      describe("Current = 2", () => {
        beforeEach(() => {
          pagination = getPaginationWithCurrent(2);
        });

        it("Does not display the previous button", () => {
          expect(pagination.displaysButtonForPage(1)).toBeFalsy();
        });

        it("Displays the current button", () => {
          expect(pagination.displaysCurrentButton()).toBeTruthy();
        });

        it("Does not display the left jump button", () => {
          expect(pagination.displaysLeftJumpButton()).toBeFalsy();
        });
      });

      describe("Current = 3", () => {
        it("Does not display the left jump button", () => {
          let pagination = getPaginationWithCurrent(3);
          expect(pagination.displaysLeftJumpButton()).toBeFalsy();
        });
      });
    });

    describe("Given the selected is within two of the end", () => {
      describe("Example one", () => {
        describe("Current = max", () => {
          beforeEach(() => {
            pagination = getPaginationWithCurrentAndMax(10, 10);
          });

          it("Does not display the last page button", () => {
            expect(pagination.displaysLastPageButton()).toBeFalsy();
          });

          it("Does not display the next page button", () => {
            expect(pagination.displaysButtonForPage(11)).toBeFalsy();
          });

          it("Displays the current page button", () => {
            expect(pagination.displaysCurrentButton()).toBeTruthy();
          });

          it("Does not display the left jump button", () => {
            expect(pagination.displaysRightJumpButton()).toBeFalsy();
          });
        });

        describe("Current = max - 1", () => {
          beforeEach(() => {
            pagination = getPaginationWithCurrentAndMax(9, 10);
          });

          it("Displays the last page button", () => {
            expect(pagination.displaysLastPageButton()).toBeTruthy();
          });

          it("Does not display the next page button", () => {
            expect(pagination.displaysButtonForPage(10)).toBeFalsy();
          });

          it("Displays the current button", () => {
            expect(pagination.displaysCurrentButton()).toBeTruthy();
          });

          it("Does not display the right jump button", () => {
            expect(pagination.displaysRightJumpButton()).toBeFalsy();
          });
        });

        describe("Current = max - 2", () => {
          beforeEach(() => {
            pagination = getPaginationWithCurrentAndMax(8, 10);
          });

          it("Displays the last page button", () => {
            expect(pagination.displaysLastPageButton()).toBeTruthy();
          });

          it("Displays the next page button", () => {
            expect(pagination.displaysButtonForPage(9)).toBeTruthy();
          });

          it("Displays the current button", () => {
            expect(pagination.displaysCurrentButton()).toBeTruthy();
          });

          it("Does not display the right jump button", () => {
            expect(pagination.displaysRightJumpButton()).toBeFalsy();
          });
        });

        describe("Current = max - 3", () => {
          beforeEach(() => {
            pagination = getPaginationWithCurrentAndMax(7, 10);
          });

          it("Displays the last page button", () => {
            expect(pagination.displaysLastPageButton()).toBeTruthy();
          });

          it("Displays the next page button", () => {
            expect(pagination.displaysButtonForPage(8)).toBeTruthy();
          });

          it("Displays the current button", () => {
            expect(pagination.displaysCurrentButton()).toBeTruthy();
          });

          it("Displays the right jump button", () => {
            expect(pagination.displaysRightJumpButton()).toBeTruthy();
          });
        });
      });

      describe("Example two", () => {
        describe("Current = max", () => {
          beforeEach(() => {
            pagination = getPaginationWithCurrentAndMax(20, 20);
          });

          it("Does not display the last page button", () => {
            expect(pagination.displaysLastPageButton()).toBeFalsy();
          });

          it("Does not display the next page button", () => {
            expect(pagination.displaysButtonForPage(21)).toBeFalsy();
          });

          it("Displays the current page button", () => {
            expect(pagination.displaysCurrentButton()).toBeTruthy();
          });
          it("Does not display the right jump button", () => {
            expect(pagination.displaysRightJumpButton()).toBeFalsy();
          });
        });

        describe("Current = max - 1", () => {
          beforeEach(() => {
            pagination = getPaginationWithCurrentAndMax(19, 20);
          });

          it("Displays the last page button", () => {
            expect(pagination.displaysLastPageButton()).toBeTruthy();
          });

          it("Does not display the next page button", () => {
            expect(pagination.displaysButtonForPage(20)).toBeFalsy();
          });

          it("Displays the current button", () => {
            expect(pagination.displaysCurrentButton()).toBeTruthy();
          });

          it("Does not display the left jump button", () => {
            expect(pagination.displaysRightJumpButton()).toBeFalsy();
          });
        });

        describe("Current = max - 2", () => {
          beforeEach(() => {
            pagination = getPaginationWithCurrentAndMax(18, 20);
          });

          it("Displays the last page button", () => {
            expect(pagination.displaysLastPageButton()).toBeTruthy();
          });

          it("Displays the next page button", () => {
            expect(pagination.displaysButtonForPage(19)).toBeTruthy();
          });

          it("Displays the current button", () => {
            expect(pagination.displaysCurrentButton()).toBeTruthy();
          });

          it("Does not display the right jump button", () => {
            expect(pagination.displaysRightJumpButton()).toBeFalsy();
          });
        });

        describe("Current = max - 3", () => {
          beforeEach(() => {
            pagination = getPaginationWithCurrentAndMax(17, 20);
          });

          it("Displays the last page button", () => {
            expect(pagination.displaysLastPageButton()).toBeTruthy();
          });

          it("Displays the next page button", () => {
            expect(pagination.displaysButtonForPage(18)).toBeTruthy();
          });

          it("Displays the current button", () => {
            expect(pagination.displaysCurrentButton()).toBeTruthy();
          });

          it("Displays the right jump button", () => {
            expect(pagination.displaysRightJumpButton()).toBeTruthy();
          });
        });
      });
    });
  });
});
