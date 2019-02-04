import UploadNewAssetRegisterVersion from ".";

describe("UploadNewAssetRegisterVersion", () => {
  describe("When uploading a file", () => {
    let useCase, gatewaySpy, presenterSpy;

    describe("Example one", () => {
      describe("Given it is successful", () => {
        beforeEach(() => {
          presenterSpy = { present: jest.fn() };
          gatewaySpy = { uploadNewVersion: jest.fn(() => ({ success: true })) };
          useCase = new UploadNewAssetRegisterVersion({
            versionGateway: gatewaySpy
          });
        });

        it("Passes the file to the gateway", async () => {
          await useCase.execute(presenterSpy, { file: "meow" });

          expect(gatewaySpy.uploadNewVersion).toHaveBeenCalledWith("meow");
        });

        it("Calls presenter with success", async () => {
          await useCase.execute(presenterSpy, { file: "meow" });

          expect(presenterSpy.present).toHaveBeenCalledWith({ success: true });
        });
      });

      describe("Given it unsuccessful", () => {
        beforeEach(() => {
          presenterSpy = { present: jest.fn() };
          gatewaySpy = {
            uploadNewVersion: jest.fn(() => ({ success: false }))
          };
          useCase = new UploadNewAssetRegisterVersion({
            versionGateway: gatewaySpy
          });
        });

        it("Calls presenter with unsuccessful", async () => {
          await useCase.execute(presenterSpy, { file: "meow" });

          expect(presenterSpy.present).toHaveBeenCalledWith({ success: false });
        });
      });
    });

    describe("Example two", () => {
      describe("Given it is successful", () => {
        beforeEach(() => {
          presenterSpy = { present: jest.fn() };
          gatewaySpy = { uploadNewVersion: jest.fn(() => ({ success: true })) };
          useCase = new UploadNewAssetRegisterVersion({
            versionGateway: gatewaySpy
          });
        });

        it("Passes the file to the gateway", async () => {
          await useCase.execute(presenterSpy, { file: "woof" });

          expect(gatewaySpy.uploadNewVersion).toHaveBeenCalledWith("woof");
        });

        it("Calls presenter with success", async () => {
          await useCase.execute(presenterSpy, { file: "woof" });

          expect(presenterSpy.present).toHaveBeenCalledWith({ success: true });
        });
      });

      describe("Given it unsuccessful", () => {
        beforeEach(() => {
          presenterSpy = { present: jest.fn() };
          gatewaySpy = {
            uploadNewVersion: jest.fn(() => ({ success: false }))
          };
          useCase = new UploadNewAssetRegisterVersion({
            versionGateway: gatewaySpy
          });
        });

        it("Calls presenter with unsuccessful", async () => {
          await useCase.execute(presenterSpy, { file: "woof" });

          expect(presenterSpy.present).toHaveBeenCalledWith({ success: false });
        });
      });
    });
  });
});
