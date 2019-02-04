export default class UploadNewAssetRegisterVersion {
  constructor({ versionGateway }) {
    this.versionGateway = versionGateway;
  }

  async execute(presenter, { file }) {
    let response = await this.versionGateway.uploadNewVersion(file);

    presenter.present({ success: response.success });
  }
}
