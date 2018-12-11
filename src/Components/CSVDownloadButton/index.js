import React from "react";

export default class CSVDownloadButton extends React.Component {
  render() {
    if (Object.keys(this.props.searchParameters).length === 0) {
      return <span />;
    }
    return (
      <a
        data-test="csv-download-link"
        onClick={() =>
          this.props.downloadSearch.execute(this.props.presenter, {
            filters: this.props.searchParameters
          })
        }
      >
        Download CSV
      </a>
    );
  }
}
