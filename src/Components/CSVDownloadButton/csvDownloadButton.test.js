import React from "react";
import { mount } from "enzyme";
import CSVDownloadButton from ".";
describe("<CSVDownloadButton>", () => {
  describe("When clicking the button", () => {
    describe("Example one", () => {
      let button, downloadSearchSpy, presenterStub;

      beforeEach(() => {
        presenterStub = "PresenterStub";
        downloadSearchSpy = { execute: jest.fn() };
        button = mount(
          <CSVDownloadButton
            presenter={presenterStub}
            searchParameters={{ cat: "meow" }}
            downloadSearch={downloadSearchSpy}
          />
        );

        button.find({ "data-test": "csv-download-link" }).simulate("click");
      });

      it("Calls the download usecase", () => {
        expect(downloadSearchSpy.execute).toHaveBeenCalled();
      });

      it("Passes the parameters into the download usecase", () => {
        expect(downloadSearchSpy.execute).toHaveBeenCalledWith(
          expect.anything(),
          {
            filters: { cat: "meow" }
          }
        );
      });

      it("Passes the presenter into the download usecase", () => {
        expect(downloadSearchSpy.execute).toHaveBeenCalledWith(
          presenterStub,
          expect.anything()
        );
      });
    });

    describe("Example two", () => {
      let button, downloadSearchSpy, presenterStub;

      beforeEach(() => {
        presenterStub = "AnotherPresenterStub";
        downloadSearchSpy = { execute: jest.fn() };
        button = mount(
          <CSVDownloadButton
            presenter={presenterStub}
            searchParameters={{ dog: "woof" }}
            downloadSearch={downloadSearchSpy}
          />
        );

        button.find({ "data-test": "csv-download-link" }).simulate("click");
      });

      it("Calls the download usecase", () => {
        expect(downloadSearchSpy.execute).toHaveBeenCalled();
      });

      it("Passes the parameters into the download usecase", () => {
        expect(downloadSearchSpy.execute).toHaveBeenCalledWith(
          expect.anything(),
          {
            filters: { dog: "woof" }
          }
        );
      });

      it("Passes the presenter into the download usecase", () => {
        expect(downloadSearchSpy.execute).toHaveBeenCalledWith(
          presenterStub,
          expect.anything()
        );
      });
    });
  });
});
