import React from "react";
import PropTypes from "prop-types";


class AssetProvider extends React.Component {
  constructor() {
    super();

    this.state = { asset: undefined };
  }

  async componentDidMount() {
    let { asset } = await this.props.getAsset.execute({
      id: this.props.assetId
    });

    this.setState({ asset });
  }

  render() {
    if (this.state.asset) {
      return <div>{this.props.children({ asset: this.state.asset })}</div>;
    } else {
      return <div />;
    }
  }
}

AssetProvider.propTypes = {
  assetId: PropTypes.number.isRequired,
  getAsset: PropTypes.shape({
    execute: PropTypes.func.isRequired
  }).isRequired
};

export default AssetProvider;
