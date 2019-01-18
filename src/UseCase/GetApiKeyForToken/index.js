export default class GetApiKeyForToken {
  constructor({ authenticationGateway, apiKeyGateway }) {
    this.authenticationGateway = authenticationGateway;
    this.apiKeyGateway = apiKeyGateway;
  }

  async execute({ token }) {
    let response = await this.authenticationGateway.getApiKey(token);
    if (response.authorized) {
      this.apiKeyGateway.save(response.apiKey);
      return { authorized: true };
    } else {
      return { authorized: false };
    }
  }
}
