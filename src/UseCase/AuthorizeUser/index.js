export default class AuthorizeUser {
  constructor({ authenticationGateway }) {
    this.authenticationGateway = authenticationGateway;
  }

  async execute(presenter, { email, url }) {
    let authorizeResponse = await this.authenticationGateway.authorize(email, url);
    presenter.present({ authorized: authorizeResponse.authorized });
  }
}
