import fetch from "cross-fetch";

export default class VersionGateway {
  constructor({ apiKeyGateway }) {
    this.apiKeyGateway = apiKeyGateway;
  }

  baseUrl() {
    return process.env.REACT_APP_ASSET_REGISTER_API_URL;
  }

  async getVersions() {
    let response = await fetch(`${this.baseUrl()}api/v1/assetRegisterVersion`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKeyGateway.get()}`
      }
    });

    let responseJson = await response.json();

    return { versions: responseJson.data.assetRegisterVersions };
  }

  async uploadNewVersion(fileToUpload) {
    let formData = new FormData();
    formData.append("files", fileToUpload);

    let response = await fetch(`${this.baseUrl()}api/v1/assetRegisterVersion`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${this.apiKeyGateway.get()}`
      },
      body: formData
    });

    if (response.ok) {
      return { success: true };
    }

    return { success: false };
  }
}
