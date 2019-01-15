import React, { Component } from "react";

export default class CoordinateProvider extends Component {
  constructor() {
    super();
    this.state = {};
  }

  componentDidMount() {
    this.props.getCoordinatesForPostcode.execute(this, {
      postcodes: this.props.postcodes
    });
  }

  present({ coordinates }) {
    this.setState({ coordinates });
  }

  render() {
    if (this.state.coordinates) {
      return (
        <React.Fragment>
          {this.props.children({ coordinates: this.state.coordinates })}
        </React.Fragment>
      );
    }
    return <div>Loading...</div>;
  }
}
