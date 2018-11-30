import React from "react";
import "govuk-frontend/all.scss";
import logo from "govuk-frontend/assets/images/govuk-logotype-crown.png";

export default () => (
  <header className="govuk-header " role="banner" data-module="header">
    <div className="govuk-header__container govuk-width-container">
      <div className="govuk-header__logo">
        <a href="#" className="govuk-header__link govuk-header__link--homepage">
          <span className="govuk-header__logotype">
            <span className="govuk-header__logotype-text">Homes England</span>
          </span>
        </a>
      </div>
      <div className="govuk-header__content">
        <a href="#" className="govuk-header__link govuk-header__link--service-name">
          Asset Register
        </a>
      </div>
    </div>
  </header>
);
