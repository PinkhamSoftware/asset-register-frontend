import VersionGateway from ".";
import nock from "nock";

describe("VersionGateway", () => {
  describe("When getting the versions from the API", () => {
    let foundVersions, versionRequest;
    let baseUrl = "http://meow.cat/";

    beforeEach(() => {
      process.env.REACT_APP_ASSET_REGISTER_API_URL = baseUrl;
      foundVersions = {
        assetRegisterVersions: [
          { id: 2, createdAt: "2019-01-28T13:59:39.363434" },
          { id: 1, createdAt: "2019-01-28T10:59:39.363434" }
        ]
      };

      versionRequest = nock(baseUrl)
        .get("/api/v1/assetRegisterVersion")
        .matchHeader("Authorization", "Bearer apiKey")
        .reply(200, { data: foundVersions });
    });

    it("Performs the request", async () => {
      let apiKeyGateway = { get: () => "apiKey" };

      let gateway = new VersionGateway({ apiKeyGateway });

      await gateway.getVersions();

      expect(versionRequest.isDone()).toBeTruthy();
    });

    it("Returns the versions from the API", async () => {
      let apiKeyGateway = { get: () => "apiKey" };

      let gateway = new VersionGateway({ apiKeyGateway });

      let response = await gateway.getVersions();

      expect(response.versions).toEqual([
        { id: 2, createdAt: "2019-01-28T13:59:39.363434" },
        { id: 1, createdAt: "2019-01-28T10:59:39.363434" }
      ]);
    });
  });
});
