export default class SearchAssets {
  constructor({ searchGateway }) {
    this.searchGateway = searchGateway;
  }

  async execute(presenter, { filters, page }) {
    let {
      assets,
      pages,
      totalCount
    } = await this.searchGateway.searchWithFilters(filters, page);

    presenter.present({ assets, pages, totalCount });
  }

  buildAssetResponseFromFoundAssets(foundAssets) {
    return foundAssets.map(asset => ({
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
        asset.differenceFromImsExpectedCompletionToHopCompletionDate
    }));
  }
}
