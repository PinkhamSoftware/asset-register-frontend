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
    this.props.onSearch({ filters: this.state.filters });
  };

  onSearchChange = (filterName, searchValue) => {
    let { filters } = this.state;
    filters[filterName] = searchValue;
    this.setState({ filters });
  };

  render() {
    return (
      <form data-test="search-form" onSubmit={this.onFormSubmit}>
        <fieldset className="govuk-fieldset">
          <div class="govuk-form-group">
            <label class="govuk-label" for="scheme-id">
              Scheme ID
            </label>
            <input
              class="govuk-input"
              id="scheme-id"
              data-test="search-scheme-id"
              name="scheme-id"
              type="number"
              onChange={e => this.onSearchChange("schemeId", e.target.value)}
            />
          </div>
          <div class="govuk-form-group">
            <label class="govuk-label" for="address">
              Address
            </label>
            <input
              class="govuk-input"
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
    );
  }
}

SearchBox.propTypes = {
  onSearch: PropTypes.func.isRequired
};
