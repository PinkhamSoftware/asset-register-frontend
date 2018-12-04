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

  onSearch = async searchRequest => {
    let { assets, pages } = await this.props.searchAssets.execute({
      filters: searchRequest,
      page: 1
    });
    this.setState({ searchParameters: searchRequest, assets, pages, page: 1 });
  };

  onPageSelect = async ({ page }) => {
    let { assets } = await this.props.searchAssets.execute({
      filters: this.state.searchParameters,
      page
    });

    this.setState({ page, assets });
  };

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
