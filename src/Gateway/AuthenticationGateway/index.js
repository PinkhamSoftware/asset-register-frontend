import fetch from "cross-fetch";

export default class AuthenticationGateway {
  baseUrl() {
    return `${
      process.env.REACT_APP_ASSET_REGISTER_API_URL
    }api/v1/authentication/`;
  }
  async authorize(email, url) {
    let response = await fetch(`${this.baseUrl()}authorise`, {
      method: "POST",
      body: JSON.stringify({
        email,
        url
      }),
      headers: { "Content-Type": "application/json" }
    });

    return { authorized: response.ok };
  }

  async verifyApiKey(apiKey) {
    let response = await fetch(`${this.baseUrl()}verification`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`
      }
    });

    return { valid: response.ok };
  }

  async getApiKey(token) {
    let response = await fetch(`${this.baseUrl()}access_token`, {
      method: "POST",
      body: JSON.stringify({ token }),
      headers: { "Content-Type": "application/json" }
    });

    if (response.ok) {
      let jsonResponse = await response.json();
      return { apiKey: jsonResponse.data.accessToken, authorized: true };
    } else {
      return { authorized: false };
    }
  }
}
