import React from "react";
import "govuk-frontend/all.scss";
import moment from "moment";

const formatDate = createdAt => moment(createdAt).format("DD/MM/YYYY @ HH:mm");

const displayOption = version => {
  return (
    <option key={version.id} value={version.id}>
      Version {version.id}: {formatDate(version.createdAt)}
    </option>
  );
};

export default ({ versions, versionSelected, onVersionSelect }) => {
  return (
    <div className="govuk-form-group">
      <label className="govuk-label" htmlFor="version-select">
        Asset Register Version
      </label>
      <select
        name="version-select"
        value={versionSelected}
        onChange={e => onVersionSelect(e.target.value)}
        className="govuk-select"
      >
        {versions.map(version => displayOption(version, versionSelected))}
      </select>
    </div>
  );
};
