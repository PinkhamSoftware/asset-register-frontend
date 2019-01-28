import React from "react";

export default class AggregatesProvider extends React.Component {
  constructor() {
    super();
    this.state = { aggregates: {} };
  }

  componentDidMount() {
    this.fetchData();
  }

  componentDidUpdate(prevProps) {
    if (this.props.version != prevProps.version) {
      this.fetchData();
    }
  }

  fetchData = () => {
    let filters = {
      ...this.props.searchParameters
    };

    if (this.props.version) {
      filters = { ...filters, assetRegisterVersionId: this.props.version };
    }

    this.props.getAggregates.execute(this, {
      filters
    });
  };

  present = aggregates => {
    this.setState({ aggregates });
  };

  render() {
    return (
      <div>
        {this.props.children({
          aggregates: this.state.aggregates
        })}
      </div>
    );
  }
}
