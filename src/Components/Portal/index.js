import React, { Component } from "react";

export default class Portal extends Component {
  constructor() {
    super();
    this.state = { loading: true, loggedIn: false };
  }

  async componentDidMount() {
    let response = await this.props.getLoggedInStatus.execute();
    if (response.loggedIn) {
      await this.setState({ loading: false, loggedIn: true });
    } else {
      if (this.props.token) {
        let response = await this.props.getApiKeyForToken.execute({
          token: this.props.token
        });

        if (response.authorized) {
          await this.setState({ loading: false, loggedIn: true });
        } else {
          await this.setState({ loading: false });
        }
      } else {
        await this.setState({ loading: false });
      }
    }
  }

  render() {
    if (this.state.loading) return <div>Loading...</div>;
    return this.props.children({ loggedIn: this.state.loggedIn });
  }
}
