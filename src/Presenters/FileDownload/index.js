import fileDownload from "js-file-download";

export default class fileDownloadPresenter {
  async present(file) {
    fileDownload(file, "results.csv");
  }
}
