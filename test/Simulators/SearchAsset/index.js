import nock from "nock";

export default class GetAsset {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
    this.responseData = {};
    this.filters = {};
    this.downloadCSV = false;
    this.fileResponse = undefined;
  }

  searchAssetWithFilters(filters) {
    this.filters = { ...filters };
    return this;
  }

  downloadSearchAsCsv() {
    this.downloadCSV = true;
    return this;
  }

  searchAssetWithPage(page) {
    this.filters.page = page;
    return this;
  }

  respondWithFile(file) {
    this.fileResponse = file;
    return this;
  }

  respondWithAssets(assets) {
    this.assets = assets;
    return this;
  }

  respondWithPages(pages) {
    this.pages = pages;
    return this;
  }

  respondWithTotal(total) {
    this.total = total;
    return this;
  }

  successfully() {
    let request = nock(this.baseUrl).get(
      `/api/v1/asset/search?${this.queryStringFromFilters()}`
    );

    if (!this.downloadCSV) {
      return request.reply(200, {
        data: { assets: this.assets, pages: this.pages, pages: this.pages, totalCount: this.total }
      });
    } else {
      return request
        .matchHeader("accept", "text/csv")
        .reply(200, this.fileResponse);
    }
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
