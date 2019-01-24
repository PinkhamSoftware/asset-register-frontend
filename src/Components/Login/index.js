import React, { Component } from "react";
import PropTypes from "prop-types";
import "govuk-frontend/all.scss";

export default class Login extends Component {
  constructor() {
    super();
    this.state = { email: "" };
  }

  onEmailInputChange = e => {
    this.setState({ email: e.target.value });
  };

  onEmailSubmit = e => {
    e.preventDefault();
    this.props.onLogin({ email: this.state.email });
  };

  render() {
    return (
      <form data-test="login-form" onSubmit={this.onEmailSubmit}>
        <fieldset className="govuk-fieldset">
          <div className="govuk-form-group">
            <label className="govuk-label" htmlFor="login-email">
              Email address
            </label>
            <input
              className="govuk-input"
              id="login-email"
              data-test="login-email-input"
              name="login-email"
              type="text"
              onChange={this.onEmailInputChange}
            />
          </div>
          <button
            className="govuk-button"
            data-test="login-email-submit"
            type="submit"
          >
            Login
          </button>
        </fieldset>
      </form>
    );
  }
}

Login.propTypes = {
  onLogin: PropTypes.func.isRequired
};
