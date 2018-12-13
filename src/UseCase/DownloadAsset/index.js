export default class DownloadAsset {
  constructor({ assetGateway }) {
    this.assetGateway = assetGateway;
  }

  async execute(presenter, { id }) {
    let { file } = await this.assetGateway.download(id);
    presenter.present(file);
  }
}
