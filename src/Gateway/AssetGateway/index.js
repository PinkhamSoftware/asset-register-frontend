import fetch from "isomorphic-fetch";
import Asset from "../../Domain/Asset";

export default class AssetGateway {
  getAsset = async id => {
    let response = await fetch(
      `${process.env.REACT_APP_ASSET_REGISTER_API_URL}api/v1/asset/${id}`
    );

    if (response.ok) {
      let { data } = await response.json();

      return {
        successful: true,
        asset: this.buildAssetFromResponseData(data)
      };
    } else {
      return { successful: false };
    }
  };

  buildAssetFromResponseData(responseData) {
    let foundAsset = responseData.asset;
    let asset = new Asset();
    asset.id = foundAsset.id;
    asset.modifiedDateTime = foundAsset.modifiedDateTime;
    asset.monthPaid = foundAsset.monthPaid;
    asset.accountingYear = foundAsset.accountingYear;
    asset.schemeId = foundAsset.schemeId;
    asset.locationLaRegionName = foundAsset.locationLaRegionName;
    asset.imsOldRegion = foundAsset.imsOldRegion;
    asset.noOfBeds = foundAsset.noOfBeds;
    asset.address = foundAsset.address;
    asset.developingRslName = foundAsset.developingRslName;
    asset.completionDateForHpiStart = foundAsset.completionDateForHpiStart;
    asset.imsActualCompletionDate = foundAsset.imsActualCompletionDate;
    asset.imsExpectedCompletionDate = foundAsset.imsExpectedCompletionDate;
    asset.imsLegalCompletionDate = foundAsset.imsLegalCompletionDate;
    asset.hopCompletionDate = foundAsset.hopCompletionDate;
    asset.deposit = foundAsset.deposit;
    asset.agencyEquityLoan = foundAsset.agencyEquityLoan;
    asset.developerEquityLoan = foundAsset.developerEquityLoan;
    asset.shareOfRestrictedEquity = foundAsset.shareOfRestrictedEquity;
    asset.differenceFromImsExpectedCompletionToHopCompletionDate =
      foundAsset.differenceFromImsExpectedCompletionToHopCompletionDate;

    return asset;
  }
}
