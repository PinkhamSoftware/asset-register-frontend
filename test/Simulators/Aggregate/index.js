import nock from "nock";

export default class AggregateSimulator {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.responseData = {};
    this.filters = {};
    this.downloadCSV = false;
    this.fileResponse = undefined;
  }

  getAggregatesWithFilters(filters) {
    this.filters = { ...filters };
    return this;
  }

  respondWithValues(values) {
    this.values = values;
    return this;
  }

  successfully() {
    return nock(this.baseUrl)
      .get(`/api/v1/asset/search/aggregation?${this.queryStringFromFilters()}`)
      .reply(200, {
        data: { assetAggregates: this.values }
      });
  }

  unsuccessfully() {
    return nock(this.baseUrl)
      .get(`/api/v1/asset/search/aggregation?${this.queryStringFromFilters()}`)
      .reply(500);
  }

  queryStringFromFilters() {
    return Object.entries(this.filters)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
  }
}
