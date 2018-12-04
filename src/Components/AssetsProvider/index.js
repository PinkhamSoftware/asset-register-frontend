import React, { Component } from "react";

export default class AssetsProvider extends Component {
  constructor() {
    super();

    this.state = {
      assets: [],
      page: 1,
      searchParameters: {},
      pages: 0
    };
  }

  searchAssets = async ({ parameters, page }) => {
    let { assets, pages } = await this.props.searchAssets.execute({
      filters: parameters,
      page
    });

    await this.setState({ searchParameters: parameters, assets, pages, page });
  };

  onSearch = async searchRequest => {
    await this.searchAssets({ parameters: searchRequest, page: 1 });
    this.props.history.storeSearch({ ...searchRequest, page: 1 });
  };

  onPageSelect = async ({ page }) => {
    await this.searchAssets({ parameters: this.state.searchParameters, page });
    this.props.history.storeSearch({ ...this.state.searchParameters, page });
  };

  componentDidMount() {
    if (this.props.initialSearchParameters) {
      let { searchParameters, page } = this.props.initialSearchParameters;
      if (searchParameters !== undefined && page !== undefined) {
        this.searchAssets({ parameters: searchParameters, page });
      }
    }
  }

  render() {
    return (
      <div>
        {this.props.children({
          onSearch: this.onSearch,
          onPageSelect: this.onPageSelect,
          assets: this.state.assets,
          numberOfPages: this.state.pages,
          currentPage: this.state.page
        })}
      </div>
    );
  }
}
