import React, { Component } from "react";

export default class VersionProvider extends Component {
  constructor() {
    super();

    this.state = { loading: true, versions: [], versionSelected: undefined };
  }

  selectVersion = version => {
    this.setState({ versionSelected: version });
  };

  async componentDidMount() {
    let { versions } = await this.props.versionGateway.getVersions();

    this.setState({
      loading: false,
      versions: versions,
      versionSelected: versions[0].id
    });
  }

  render() {
    if (this.state.loading) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        {this.props.children({
          versions: this.state.versions,
          versionSelected: this.state.versionSelected,
          onVersionSelect: this.selectVersion
        })}
      </div>
    );
  }
}
