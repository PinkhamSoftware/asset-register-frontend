import React from "react";
import "govuk-frontend/all.scss";

export default (props) => (
  <header className="govuk-header " role="banner" data-module="header">
    <div className="govuk-header__container govuk-width-container">
      <div className="govuk-header__logo">
        <props.linkComponent to="/" className="govuk-header__link govuk-header__link--homepage">
          <span className="govuk-header__logotype">
            <span className="govuk-header__logotype-text">Homes Equity Asset Register</span>
          </span>
        </props.linkComponent>
      </div>
      <div className="govuk-header__content">
        <props.linkComponent to="/" className="govuk-header__link govuk-header__link--service-name">
          Asset Register
        </props.linkComponent>
      </div>
    </div>
  </header>
);
