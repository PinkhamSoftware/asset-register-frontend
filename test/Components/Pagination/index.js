import React from 'react'
import { mount } from 'enzyme'
import Pagination from '../../../src/Components/Pagination'

export default class PaginationComponent {
  constructor({ max, current, onPageSelect }) {
    this.pagination = mount(
      <Pagination max={max} current={current} onPageSelect={onPageSelect} />
    );
  }

  displaysFirstPageButton() {
    return this.find("pagination-first-page").length == 1;
  }

  displaysCurrentButton() {
    return this.find("pagination-current-page").length == 1;
  }


  displaysButtonForPage(page) {
    return this.find(`pagination-page-${page}`).length == 1;
  }

  selectFirstPage() {
    this.find("pagination-first-page").simulate("click");
  }

  selectLastPage() {
    this.find("pagination-last-page").simulate("click");
  }

  selectPage(page) {
    this.find(`pagination-page-${page}`).simulate("click");
  }

  displaysLastPageButton() {
    return this.find("pagination-last-page").length == 1;
  }

  valueForPage(page) {
    return this.find(`pagination-page-${page}`).text();
  }

  currentPageValue() {
    return this.find("pagination-current-page").text();
  }

  lastPageValue() {
    return this.find("pagination-last-page").text();
  }

  displaysLeftJumpButton() {
    return this.find("pagination-left-jump").length == 1;
  }

  displaysRightJumpButton() {
    return this.find("pagination-right-jump").length == 1;
  }

  jumpLeft() {
    this.find("pagination-left-jump").simulate("click");
  }

  jumpRight() {
    this.find("pagination-right-jump").simulate("click");
  }

  find(param) {
    return this.pagination.find({ "data-test": param });
  }
}
