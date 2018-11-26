import React from "react";
import Pagination from ".";

import { storiesOf } from "@storybook/react";

class PaginationContainer extends React.Component {
  constructor(props) {
    super();
    this.state = { page: props.current };
  }

  onPageSelect = ({ page }) => {
    this.setState({ page });
  };

  render() {
    return (
      <Pagination
        max={this.props.max}
        current={this.state.page}
        onPageSelect={this.onPageSelect}
      />
    );
  }
}

storiesOf("Pagination", module)
  .add("With only one page", () => <PaginationContainer max={1} current={1} />)
  .add("First page", () => <PaginationContainer max={20} current={1} />)
  .add("Middle page", () => <PaginationContainer max={20} current={10} />)
  .add("Last Page", () => <PaginationContainer max={20} current={20} />);
