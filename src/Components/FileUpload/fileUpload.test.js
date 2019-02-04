import React from "react";
import { mount } from "enzyme";
import FileUpload from ".";

describe("<FileUpload>", () => {
  let component, uploadSpy;

  const uploadFile = file => {
    component
      .find({ "data-test": "file-upload-field" })
      .simulate("change", { target: { files: [file] } });

    component.find({ "data-test": "file-upload-form" }).simulate("submit");
  };

  beforeEach(() => {
    uploadSpy = { execute: jest.fn() };
    component = mount(<FileUpload handleUpload={uploadSpy} />);
  });

  describe("Example one", () => {
    it("Displays the file upload area", () => {
      expect(
        component.find({ "data-test": "file-upload-field" }).length
      ).toEqual(1);
    });

    it("Passes the file to the upload usecase when submitting", async () => {
      uploadFile("meow");

      expect(uploadSpy.execute).toHaveBeenCalledWith(expect.anything(), {
        file: "meow"
      });
    });

    describe("Given uploading was successful", () => {
      it("Displays a success message", () => {
        uploadSpy = {
          execute: jest.fn(presenter => presenter.present({ success: true }))
        };

        component = mount(<FileUpload handleUpload={uploadSpy} />);

        uploadFile("meow");

        expect(
          component.find({ "data-test": "file-upload-field" }).length
        ).toEqual(0);

        expect(
          component.find({ "data-test": "file-upload-success-message" }).length
        ).toEqual(1);
      });
    });

    describe("Given uploading was unsuccessful", () => {
      it("Displays a failure message", () => {
        uploadSpy = {
          execute: jest.fn(presenter => presenter.present({ success: false }))
        };

        component = mount(<FileUpload handleUpload={uploadSpy} />);

        uploadFile("meow");

        expect(
          component.find({ "data-test": "file-upload-field" }).length
        ).toEqual(0);

        expect(
          component.find({ "data-test": "file-upload-failure-message" }).length
        ).toEqual(1);
      });
    });
  });

  describe("Example two", () => {
    it("Displays the file upload area", () => {
      expect(
        component.find({ "data-test": "file-upload-field" }).length
      ).toEqual(1);
    });

    it("Passes the file to the upload usecase when submitting", async () => {
      uploadFile("woof");

      expect(uploadSpy.execute).toHaveBeenCalledWith(expect.anything(), {
        file: "woof"
      });
    });
  });
});
