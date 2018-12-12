export default class DownloadSearchResults {
  constructor({ searchGateway }) {
    this.searchGateway = searchGateway;
  }

  async execute(presenter, { filters }) {
    let { file } = await this.searchGateway.download(filters);
    presenter.present(file);
  }
}
