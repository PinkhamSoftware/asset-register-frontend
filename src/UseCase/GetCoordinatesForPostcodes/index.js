export default class GetCoordinatesForPostcodes {
  constructor({ postcodeLookupGateway }) {
    this.postcodeLookupGateway = postcodeLookupGateway;
  }

  async execute(presenter, { postcodes }) {
    let coordinates = await this.postcodeLookupGateway.getCoordinates(
      postcodes
    );

    presenter.present({ coordinates });
  }
}
