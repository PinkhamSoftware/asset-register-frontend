import React from "react";
import "govuk-frontend/all.scss";
import logo from "govuk-frontend/assets/images/govuk-logotype-crown.png";

export default () => (
  <header class="govuk-header " role="banner" data-module="header">
    <div class="govuk-header__container govuk-width-container">
      <div class="govuk-header__logo">
        <a href="#" class="govuk-header__link govuk-header__link--homepage">
          <span class="govuk-header__logotype">
            <span class="govuk-header__logotype-text">Homes England</span>
          </span>
        </a>
      </div>
      <div class="govuk-header__content">
        <a href="#" class="govuk-header__link govuk-header__link--service-name">
          Asset Register
        </a>
      </div>
    </div>
  </header>
);
