export default class GetLoggedInStatus {
  constructor({ authenticationGateway, apiKeyGateway }) {
    this.authenticationGateway = authenticationGateway;
    this.apiKeyGateway = apiKeyGateway;
  }

  async execute() {
    let apiKey = this.apiKeyGateway.get();
    let response = await this.authenticationGateway.verifyApiKey(apiKey);

    return { loggedIn: response.valid };
  }
}
