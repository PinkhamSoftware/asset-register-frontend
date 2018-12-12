import fetch from "cross-fetch";
import Asset from "../../Domain/Asset";

export default class SearchGateway {
  async searchWithFilters(filters, page) {
    let response = await fetch(
      `${
        process.env.REACT_APP_ASSET_REGISTER_API_URL
      }api/v1/asset/search?${this.buildQueryStringFromFiltersAndPage(
        filters,
        page
      )}`
    );

    if (response.ok) {
      let { data } = await response.json();

      let assets = data.assets.map(foundAsset =>
        this.buildAssetFromResponseData(foundAsset)
      );

      return { assets, pages: data.pages, totalCount: data.totalCount };
    } else {
      return { assets: [], pages: 0 };
    }
  }

  async download(filters) {
    filters = { ...filters, pageSize: 1000000 };
    let response = await fetch(
      `${
        process.env.REACT_APP_ASSET_REGISTER_API_URL
      }api/v1/asset/search?${this.buildQueryStringFromFiltersAndPage(
        filters,
        1
      )}`,
      { headers: { accept: "text/csv" } }
    );

    let responseBody = await response.text();

    return { file: responseBody };
  }

  buildQueryStringFromFiltersAndPage(filters, page) {
    return Object.entries({ ...filters, page })
      .map(([key, value]) => `${key}=${value}`)
      .join("&");
  }

  buildAssetFromResponseData(responseData) {
    let asset = new Asset();
    asset.id = responseData.id;
    asset.modifiedDateTime = responseData.modifiedDateTime;
    asset.monthPaid = responseData.monthPaid;
    asset.accountingYear = responseData.accountingYear;
    asset.schemeId = responseData.schemeId;
    asset.locationLaRegionName = responseData.locationLaRegionName;
    asset.imsOldRegion = responseData.imsOldRegion;
    asset.noOfBeds = responseData.noOfBeds;
    asset.address = responseData.address;
    asset.developingRslName = responseData.developingRslName;
    asset.completionDateForHpiStart = responseData.completionDateForHpiStart;
    asset.imsActualCompletionDate = responseData.imsActualCompletionDate;
    asset.imsExpectedCompletionDate = responseData.imsExpectedCompletionDate;
    asset.imsLegalCompletionDate = responseData.imsLegalCompletionDate;
    asset.hopCompletionDate = responseData.hopCompletionDate;
    asset.deposit = responseData.deposit;
    asset.agencyEquityLoan = responseData.agencyEquityLoan;
    asset.developerEquityLoan = responseData.developerEquityLoan;
    asset.shareOfRestrictedEquity = responseData.shareOfRestrictedEquity;
    asset.differenceFromImsExpectedCompletionToHopCompletionDate =
      responseData.differenceFromImsExpectedCompletionToHopCompletionDate;

    return asset;
  }
}
