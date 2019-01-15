export default class GetAsset {
  constructor({ assetGateway }) {
    this.assetGateway = assetGateway;
  }

  execute = async ({ id }) => {
    let { successful, asset } = await this.assetGateway.getAsset(id);
    if (successful) {
      return {
        asset: {
          id: asset.id,
          modifiedDateTime: asset.modifiedDateTime,
          monthPaid: asset.monthPaid,
          accountingYear: asset.accountingYear,
          schemeId: asset.schemeId,
          locationLaRegionName: asset.locationLaRegionName,
          imsOldRegion: asset.imsOldRegion,
          noOfBeds: asset.noOfBeds,
          address: asset.address,
          developingRslName: asset.developingRslName,
          completionDateForHpiStart: asset.completionDateForHpiStart,
          imsActualCompletionDate: asset.imsActualCompletionDate,
          imsExpectedCompletionDate: asset.imsExpectedCompletionDate,
          imsLegalCompletionDate: asset.imsLegalCompletionDate,
          hopCompletionDate: asset.hopCompletionDate,
          deposit: asset.deposit,
          agencyEquityLoan: asset.agencyEquityLoan,
          developerEquityLoan: asset.developerEquityLoan,
          shareOfRestrictedEquity: asset.shareOfRestrictedEquity,
          differenceFromImsExpectedCompletionToHopCompletionDate:
            asset.differenceFromImsExpectedCompletionToHopCompletionDate,
          propertyPostcode: asset.propertyPostcode
        }
      };
    }

    return undefined;
  };
}
