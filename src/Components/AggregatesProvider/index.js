import React from "react";

export default class AggregatesProvider extends React.Component {
  constructor() {
    super();
    this.state = { aggregates: {} };
  }

  componentDidMount() {
    this.props.getAggregates.execute(this, {
      filters: this.props.searchParameters
    });
  }

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
