import React, { Component } from "react";

export default class AssetsProvider extends Component {
  constructor() {
    super();
    this.state = { assets: [] };
  }

  onSearch = async searchRequest => {
    let { assets } = await this.props.searchAssets.execute(searchRequest);
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
