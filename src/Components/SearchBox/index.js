import React, { Component } from "react";
import PropTypes from "prop-types";

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
        <div>
          <span>Scheme ID: </span>
          <input
            data-test="search-scheme-id"
            type="number"
            onChange={e => this.onSearchChange("schemeId", e.target.value)}
          />
        </div>
        <div>
          <span>Address: </span>
          <input
            data-test="search-address"
            onChange={e => this.onSearchChange("address", e.target.value)}
          />
        </div>
        <div>
          <button data-test="search-button" type="submit">
            Search
          </button>
        </div>
      </form>
    );
  }
}

SearchBox.propTypes = {
  onSearch: PropTypes.func.isRequired
};
