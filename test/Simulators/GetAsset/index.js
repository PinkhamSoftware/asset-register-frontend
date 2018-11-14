import nock from "nock"

export default class GetAsset {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.responseData = {};
  }

  getAssetWithId(id) {
    this.assetId = id;
    return this;
  }

  respondWithData(responseData) {
    this.responseData = responseData;
    return this;
  }

  successfully() {
    return nock(this.baseUrl)
      .get(`/api/v1/asset/${this.assetId}`)
      .reply(200, { data: this.responseData });
  }

  unsuccessfully(status = 500) {
    return nock(this.baseUrl)
      .get(`/api/v1/asset/${this.assetId}`)
      .reply(status, { data: this.responseData });
  }
}
