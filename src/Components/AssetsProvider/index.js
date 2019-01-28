import React, { Component } from "react";

export default class AssetsProvider extends Component {
  constructor() {
    super();

    this.state = {
      assets: [],
      page: 1,
      searchParameters: {},
      pages: 0,
      loading: false,
      totalCount: 0
    };
  }

  present = ({ assets, pages, totalCount }) => {
    this.setState({ assets, pages, totalCount, loading: false });
  };

  searchAssets = ({ parameters, page }) => {
    let filters = { ...parameters, assetRegisterVersionId: this.props.version };
    this.props.searchAssets.execute(this, {
      filters: filters,
      page
    });

    this.setState({ searchParameters: parameters, page, loading: true });
  };

  onSearch = searchRequest => {
    this.searchAssets({ parameters: searchRequest, page: 1 });
    this.props.history.storeSearch({ ...searchRequest, page: 1 });
  };

  onPageSelect = ({ page }) => {
    this.searchAssets({ parameters: this.state.searchParameters, page });
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

  componentDidUpdate(prevProps) {
    if (prevProps.version != this.props.version) {
      this.searchAssets({
        parameters: this.state.searchParameters,
        page: this.state.page
      });
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
          currentPage: this.state.page,
          loading: this.state.loading,
          totalCount: this.state.totalCount,
          searchParameters: this.state.searchParameters
        })}
      </div>
    );
  }
}
