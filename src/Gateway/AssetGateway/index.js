import fetch from "cross-fetch";
import Asset from "../../Domain/Asset";

export default class AssetGateway {
  constructor({ apiKeyGateway }) {
    this.apiKeyGateway = apiKeyGateway;
  }

  getAsset = async id => {
    let response = await fetch(
      `${process.env.REACT_APP_ASSET_REGISTER_API_URL}api/v1/asset/${id}`,
      {
        headers: {
          authorization: `Bearer ${this.apiKeyGateway.get()}`
        }
      }
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

  async download(id) {
    let response = await fetch(
      `${process.env.REACT_APP_ASSET_REGISTER_API_URL}api/v1/asset/${id}`,
      {
        headers: {
          accept: "text/csv",
          authorization: `Bearer ${this.apiKeyGateway.get()}`
        }
      }
    );

    let responseBody = await response.text();

    return { file: responseBody };
  }

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
    asset.propertyPostcode = foundAsset.propertyPostcode;
    asset.propertyPostcode = foundAsset.propertyPostcode;
    asset.originalAgencyPercentage = foundAsset.originalAgencyPercentage;
    asset.developerDiscount = foundAsset.developerDiscount;
    asset.mortgage = foundAsset.mortgage;
    asset.lbha = foundAsset.lbha;
    asset.purchasePrice = foundAsset.purchasePrice;
    asset.equityOwner = foundAsset.equityOwner;
    asset.programme = foundAsset.programme;

    return asset;
  }
}
