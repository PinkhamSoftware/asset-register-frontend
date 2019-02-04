import React, { Component } from "react";

export default class FileUpload extends Component {
  constructor() {
    super();

    this.state = {
      file: undefined,
      uploaded: false,
      uploadSuccessful: undefined
    };
  }

  handleFileInput = e => {
    this.setState({ file: e.target.files[0] });
  };

  onSubmit = async e => {
    e.preventDefault();
    await this.props.handleUpload.execute(this, { file: this.state.file });
  };

  present({ success }) {
    this.setState({ uploaded: true, uploadSuccessful: success });
  }

  renderUploadForm = () => {
    if (!this.state.uploaded) {
      return (
        <form data-test="file-upload-form" onSubmit={this.onSubmit}>
          <input
            type="file"
            name="file"
            data-test="file-upload-field"
            onChange={this.handleFileInput}
          />
          <input type="submit" value="Upload" />
        </form>
      );
    }
  };

  renderUploadStatusMessage = () => {
    if (!this.state.uploaded) {
      return <div />;
    }

    if (this.state.uploadSuccessful) {
      return (
        <div data-test="file-upload-success-message">
          File upload successful
        </div>
      );
    } else {
      return (
        <div data-test="file-upload-failure-message">File upload failed</div>
      );
    }
  };

  render() {
    return (
      <div>
        {this.renderUploadStatusMessage()}
        {this.renderUploadForm()}
      </div>
    );
  }
}
