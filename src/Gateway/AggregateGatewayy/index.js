import fetch from "cross-fetch";
import Aggregates from "../../Domain/Aggregates";

export default class AggregateGateway {
  async getAggregateValuesWithFilters(filters) {
    let response = await fetch(
      `${
        process.env.REACT_APP_ASSET_REGISTER_API_URL
      }api/v1/asset/search/aggregation?${this.queryStringFromFilters(filters)}`
    );

    if (response.ok) {
      let { data } = await response.json();

      let { assetAggregates } = data

      return new Aggregates({
        uniqueRecords: assetAggregates.uniqueRecords,
        moneyPaidOut: assetAggregates.moneyPaidOut,
        assetValue: assetAggregates.assetValue,
        movementInAssetValue: assetAggregates.movementInAssetValue
      });
    } else {
      return {};
    }
  }

  queryStringFromFilters(filters) {
    return Object.entries(filters)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
      .join("&");
  }
}
