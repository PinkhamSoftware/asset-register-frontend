import React, { Component } from "react";
import "./style.css";

export default class Pagination extends Component {
  renderFirstButton = () => {
    if (this.props.current === 1) {
      return <span />;
    } else {
      return (
        <span
          className="pagination-link"
          data-test="pagination-first-page"
          onClick={() => this.props.onPageSelect({ page: 1 })}
        >
          1
        </span>
      );
    }
  };

  renderLeftJumpButton = () => {
    if (this.props.current <= 3) {
      return <span />;
    } else {
      return (
        <span
          className="pagination-link"
          data-test="pagination-left-jump"
          onClick={() =>
            this.props.onPageSelect({ page: this.props.current - 2 })
          }
        >
          &laquo;
        </span>
      );
    }
  };

  renderPreviousButton = () => {
    if (this.props.current <= 2) {
      return <span />;
    } else {
      return (
        <span
          className="pagination-link"
          data-test={`pagination-page-${this.props.current - 1}`}
          onClick={() =>
            this.props.onPageSelect({ page: this.props.current - 1 })
          }
        >
          {this.props.current - 1}
        </span>
      );
    }
  };

  renderCurrentButton = () => {
    return (
      <span
        className="pagination-link pagination-active"
        data-test="pagination-current-page"
      >
        {this.props.current}
      </span>
    );
  };

  renderNextButton = () => {
    if (this.props.max - this.props.current <= 1) {
      return <span />;
    } else {
      return (
        <span
          className="pagination-link"
          data-test={`pagination-page-${this.props.current + 1}`}
          onClick={() =>
            this.props.onPageSelect({ page: this.props.current + 1 })
          }
        >
          {this.props.current + 1}
        </span>
      );
    }
  };

  renderRightJumpButton = () => {
    if (this.props.max - this.props.current < 3) {
      return <span />;
    } else {
      return (
        <span
          className="pagination-link"
          data-test="pagination-right-jump"
          onClick={() =>
            this.props.onPageSelect({ page: this.props.current + 2 })
          }
        >
          &raquo;
        </span>
      );
    }
  };

  renderLastButton = () => {
    if (this.props.current === this.props.max) {
      return <span />;
    } else {
      return (
        <span
          className="pagination-link"
          data-test="pagination-last-page"
          onClick={() => this.props.onPageSelect({ page: this.props.max })}
        >
          {this.props.max}
        </span>
      );
    }
  };

  render() {
    if (this.props.max === undefined || this.props.max < 1) {
      return <div className="pagination" />;
    } else {
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
}
