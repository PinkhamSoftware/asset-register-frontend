import React, { Component } from "react";

export default class LoginProvider extends Component {
  constructor() {
    super();

    this.state = { emailSent: false, failedAuthorize: false };
  }

  onLogin = ({ email }) => {
    let url = this.props.locationGateway.getRoot();
    this.props.authorizeUser.execute(this, { email, url });
  };

  present = ({ authorized }) => {
    if (authorized) {
      this.setState({ emailSent: true, failedAuthorize: false });
    } else {
      this.setState({ emailSent: false, failedAuthorize: true });
    }
  };

  render() {
    return (
      <div>
        {this.props.children({
          onLogin: this.onLogin,
          emailSent: this.state.emailSent,
          failedAuthorize: this.state.failedAuthorize
        })}
      </div>
    );
  }
}
