export default class GetAggregateValues {
  constructor({ aggregateGateway }) {
    this.aggregateGateway = aggregateGateway;
  }

  async execute(presenter, { filters }) {
    let aggregates = await this.aggregateGateway.getAggregateValuesWithFilters(
      filters
    );

    presenter.present({
      uniqueRecords: aggregates.uniqueRecords,
      moneyPaidOut: aggregates.moneyPaidOut,
      assetValue: aggregates.assetValue,
      movementInAssetValue: aggregates.movementInAssetValue
    });
  }
}
