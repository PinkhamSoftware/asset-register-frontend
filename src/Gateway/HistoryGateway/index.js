export default class HistoryGateway {
  constructor(history) {
    this.history = history;
  }

  storeSearch(search) {
    this.history.push(`/search?${this.queryStringFromSearch(search)}`);
  }

  queryStringFromSearch(search) {
    return Object.entries(search)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
  }
}
