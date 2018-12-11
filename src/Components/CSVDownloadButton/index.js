import React from "react";

export default class CSVDownloadButton extends React.Component {
  render() {
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
