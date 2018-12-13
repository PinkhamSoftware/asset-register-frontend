export default class Aggregates {
  constructor({
    uniqueRecords,
    moneyPaidOut,
    assetValue,
    movementInAssetValue
  }) {
    this.uniqueRecords = uniqueRecords;
    this.moneyPaidOut = moneyPaidOut;
    this.assetValue = assetValue;
    this.movementInAssetValue = movementInAssetValue;
  }
}
