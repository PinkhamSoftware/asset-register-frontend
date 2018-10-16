import React, { Component } from "react";

export default class AssetProvider extends Component {
  constructor() {
    super();
    this.state = { assets: [] };
  }

  onSearch = searchRequest => {
    let assets = this.props.searchAssets.execute(searchRequest);
    this.setState({ assets });
  };

  render() {
    return (
      <div>
        {this.props.children({
          onSearch: this.onSearch,
          assets: this.state.assets
        })}
      </div>
    );
  }
}
