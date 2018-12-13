import nock from "nock"

export default class GetAsset {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.responseData = {};
    this.downloadAsCsv = false;
  }

  getAssetWithId(id) {
    this.assetId = id;
    return this;
  }

  downloadAssetAsCsv() {
    this.downloadAsCsv = true;
    return this;
  }

  respondWithData(responseData) {
    this.responseData = responseData;
    return this;
  }

  respondWithFile(file) {
    this.responseData = file;
    return this;
  }

  successfully() {
    let request = nock(this.baseUrl)
      .get(`/api/v1/asset/${this.assetId}`)

    if (!this.downloadAsCsv) {
      return request.reply(200, {
        data: this.responseData
      });
    } else {
      return request
        .matchHeader("accept", "text/csv")
        .reply(200, this.responseData);
    }
  }

  unsuccessfully(status = 500) {
    return nock(this.baseUrl)
      .get(`/api/v1/asset/${this.assetId}`)
      .reply(status, { data: this.responseData });
  }
}
