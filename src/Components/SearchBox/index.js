import React, { Component } from "react";
import PropTypes from "prop-types";

export default class SearchBox extends Component {
  constructor() {
    super();

    this.state = { searchValue: "" };
  }

  onFormSubmit = e => {
    e.preventDefault();
    this.props.onSearch({ value: this.state.searchValue });
  };

  onSearchChange = searchValue => {
    this.setState({ searchValue });
  };

  render() {
    return (
      <form data-test="search-form" onSubmit={this.onFormSubmit}>
        <input
          data-test="search-input"
          onChange={e => this.onSearchChange(e.target.value)}
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
