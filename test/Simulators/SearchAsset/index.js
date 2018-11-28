import nock from "nock";

export default class GetAsset {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.responseData = {};
  }

  searchAssetWithFilters(filters) {
    this.filters = filters;
    return this;
  }

  respondWithAssets(assets) {
    this.assets = assets;
    return this;
  }

  successfully() {
    return nock(this.baseUrl)
      .get(`/api/v1/asset/search?${this.queryStringFromFilters()}`)
      .reply(200, { data: { assets: this.assets } });
  }

  unsuccessfully(status = 500) {
    return nock(this.baseUrl)
      .get(`/api/v1/asset/search?${this.queryStringFromFilters()}`)
      .reply(status, { data: this.responseData });
  }

  queryStringFromFilters() {
    return Object.entries(this.filters)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
  }
}
