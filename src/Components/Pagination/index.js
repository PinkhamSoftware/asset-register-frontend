import React, { Component } from "react";
import "./style.css";

export default class Pagination extends Component {
  renderFirstButton = () => {
    if (this.props.current == 1) {
      return <span />;
    } else {
      return (
        <a
          className="pagination-link"
          data-test="pagination-first-page"
          onClick={() => this.props.onPageSelect({ page: 1 })}
        >
          1
        </a>
      );
    }
  };

  renderLeftJumpButton = () => {
    if (this.props.current <= 3) {
      return <span />;
    } else {
      return (
        <a
          className="pagination-link"
          data-test="pagination-left-jump"
          onClick={() =>
            this.props.onPageSelect({ page: this.props.current - 2 })
          }
        >
          &laquo;
        </a>
      );
    }
  };

  renderPreviousButton = () => {
    if (this.props.current <= 2) {
      return <span />;
    } else {
      return (
        <a
          className="pagination-link"
          data-test={`pagination-page-${this.props.current - 1}`}
          onClick={() =>
            this.props.onPageSelect({ page: this.props.current - 1 })
          }
        >
          {this.props.current - 1}
        </a>
      );
    }
  };

  renderCurrentButton = () => {
    return (
      <a
        className="pagination-link pagination-active"
        data-test="pagination-current-page"
      >
        {this.props.current}
      </a>
    );
  };

  renderNextButton = () => {
    if (this.props.max - this.props.current <= 1) {
      return <span />;
    } else {
      return (
        <a
          className="pagination-link"
          data-test={`pagination-page-${this.props.current + 1}`}
          onClick={() =>
            this.props.onPageSelect({ page: this.props.current + 1 })
          }
        >
          {this.props.current + 1}
        </a>
      );
    }
  };

  renderRightJumpButton = () => {
    if (this.props.max - this.props.current < 3) {
      return <span />;
    } else {
      return (
        <a
          className="pagination-link"
          data-test="pagination-right-jump"
          onClick={() =>
            this.props.onPageSelect({ page: this.props.current + 2 })
          }
        >
          &raquo;
        </a>
      );
    }
  };

  renderLastButton = () => {
    if (this.props.current == this.props.max) {
      return <span />;
    } else {
      return (
        <a
          className="pagination-link"
          data-test="pagination-last-page"
          onClick={() => this.props.onPageSelect({ page: this.props.max })}
        >
          {this.props.max}
        </a>
      );
    }
  };

  render() {
    return (
      <div className="pagination">
        {this.renderFirstButton()}
        {this.renderLeftJumpButton()}
        {this.renderPreviousButton()}
        {this.renderCurrentButton()}
        {this.renderNextButton()}
        {this.renderRightJumpButton()}
        {this.renderLastButton()}
      </div>
    );
  }
}
