import React from "react";
import { mount } from "enzyme";
import App from "../../../src/App";
import { MemoryRouter } from "react-router-dom";

export default class AppPage {
  constructor(path) {
    this.page = mount(
      <MemoryRouter initialEntries={[path]}>
        <App />
      </MemoryRouter>
    );
  }

  async load() {
    await this.waitForRequestToResolve();
    this.update();
  }

  async waitForRequestToResolve() {
    await new Promise(resolve => setTimeout(resolve, 100));
  }

  find(params) {
    return this.page.find({ "data-test": params });
  }

  update() {
    this.page.update();
  }

  searchForSchemeId(schemeId) {
    this.find("search-scheme-id")
      .first()
      .simulate("change", {
        target: { value: schemeId }
      });
  }

  searchForAddress(address) {
    this.find("search-address")
      .first()
      .simulate("change", {
        target: { value: address }
      });
  }

  async executeSearch() {
    this.find("search-form")
      .first()
      .simulate("submit", {
        preventDefault: jest.fn()
      });

    await this.waitForRequestToResolve();
    this.update();
  }

  loginFormDisplayed() {
    return this.find("login-form").length === 1;
  }

  loginWithEmail(email) {
    this.find("login-email-input").simulate("change", {
      target: { value: email }
    });

    this.find("login-email-submit").simulate("submit");
  }

  notAuthorisedToLoginMessageIsDisplayed() {
    return this.find("not-authorised").length === 1;
  }

  async navigateToSearchPage() {
    this.page
      .find("Link[data-test='individual-search-link']")
      .simulate("click", { button: 0 });

    await this.load();
  }

  async navigateToReportingPage() {
    this.page
      .find("Link[data-test='reporting-link']")
      .simulate("click", { button: 0 });

    await this.load();
  }

  displaysAggregates() {
    return this.find("asset-aggregates").length === 1;
  }
}
