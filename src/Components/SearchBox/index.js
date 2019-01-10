import React, { Component } from "react";
import PropTypes from "prop-types";
import "govuk-frontend/all.scss";

export default class SearchBox extends Component {
  constructor() {
    super();

    this.state = { filters: {} };
  }

  onFormSubmit = e => {
    e.preventDefault();
    this.props.onSearch(this.state.filters);
  };

  onSearchChange = (filterName, searchValue) => {
    let { filters } = this.state;
    filters[filterName] = searchValue;
    this.setState({ filters });
  };

  render() {
    return (
      <div style={{ background: "#f8f4f4", padding: "20px 10px" }}>
        <form data-test="search-form" onSubmit={this.onFormSubmit}>
          <fieldset className="govuk-fieldset">
            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="scheme-id">
                Scheme ID
              </label>
              <input
                className="govuk-input"
                id="scheme-id"
                data-test="search-scheme-id"
                name="scheme-id"
                type="number"
                onChange={e => this.onSearchChange("schemeId", e.target.value)}
              />
            </div>
            <div className="govuk-form-group">
              <label className="govuk-label" htmlFor="address">
                Address
              </label>
              <input
                className="govuk-input"
                id="address"
                data-test="search-address"
                name="address"
                type="text"
                onChange={e => this.onSearchChange("address", e.target.value)}
              />
            </div>
            <div>
              <button
                className="govuk-button"
                data-test="search-button"
                type="submit"
              >
                Search
              </button>
            </div>
          </fieldset>
        </form>
      </div>
    );
  }
}

SearchBox.propTypes = {
  onSearch: PropTypes.func.isRequired
};
