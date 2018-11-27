import React, { Component } from "react";
import PropTypes from "prop-types";

export default class SearchBox extends Component {
  constructor() {
    super();

    this.state = { filters: {} };
  }

  onFormSubmit = e => {
    e.preventDefault();
    this.props.onSearch({ filters:  this.state.filters});
  };

  onSearchChange = (filterName, searchValue) => {
    let { filters } = this.state
    filters[filterName] = searchValue;
    this.setState({ filters });
  };

  render() {
    return (
      <form data-test="search-form" onSubmit={this.onFormSubmit}>
        <input
          data-test="search-scheme-id"
          onChange={e => this.onSearchChange("schemeId", e.target.value)}
        />

        <button data-test="search-button" type="submit">
          Search
        </button>
      </form>
    );
  }
}

SearchBox.propTypes = {
  onSearch: PropTypes.func.isRequired
};
