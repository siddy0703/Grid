import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { getNoOfPages } from '../../utils/CommonUtils';
import '../.././datagrid.css';
/*
 * The Pagination component for the grid which will
 * handle the renderPagination functionality for the grid.
 * @type {class}*/
class Pagination extends Component {
  constructor(props) {
    super(props);
    this.renderPagination = this.renderPagination.bind(this);
    this.renderArrowLeft = this.renderArrowLeft.bind(this);
    this.renderArrowRight = this.renderArrowRight.bind(this);
    this.onPageDecrement = this.onPageDecrement.bind(this);
    this.onPageIncrement = this.onPageIncrement.bind(this);
    this.jumpToFirstPage = this.jumpToFirstPage.bind(this);
    this.jumpToLastPage = this.jumpToLastPage.bind(this);
    this.renderArrowLeftStyles = this.renderArrowLeftStyles.bind(this);
    this.renderArrowRightStyles = this.renderArrowRightStyles.bind(this);
    this.getRightArrowClassName = this.getRightArrowClassName.bind(this);
    this.getLeftArrowClassName = this.getLeftArrowClassName.bind(this);
  }

  renderPagination() {
    return (
      <div className="pagination-wrapper">
        {this.renderArrowLeft()}
        <span className="pagination-info">
          <span
            className="page-number"
          >
            <span className="pagination-text">Showing Page</span>
            <span className="pagination-text">{this.props.currentPage}</span>
            <span className="pagination-text">of</span>
            <span className="pagination-text">{getNoOfPages(this.props.currentData, this.props.recordsPerPage)}</span>
          </span>
        </span>
        {this.renderArrowRight()}
      </div>
    );
  }
  getLeftArrowClassName() {
    if (this.props.currentPage > 1) {
      return 'page-number-arrow';
    }
    return 'page-number-arrow-disabled';
  }
  renderArrowLeftStyles() {
    if (this.props.currentPage > 1) {
      return '';
    }
    return 'disabled';
  }
  renderArrowLeft() {
    return (
      <div className="page-number-arrow-for-margin">
        <button
          onClick={this.jumpToFirstPage}
          className={this.getLeftArrowClassName()}
          disabled={this.renderArrowLeftStyles()}
        >
          <FaAngleDoubleLeft className="arrowIcon" />
        </button>
        <button
          onClick={this.onPageDecrement}
          className={this.getLeftArrowClassName()}
          disabled={this.renderArrowLeftStyles()}
        >
          <FaAngleLeft className="arrowIcon" />
        </button>
      </div>
    );
  }
  getRightArrowClassName() {
    if (this.props.currentPage < getNoOfPages(this.props.currentData, this.props.recordsPerPage)) {
      return 'page-number-arrow';
    }
    return 'page-number-arrow-disabled';
  }
  renderArrowRightStyles() {
    if (this.props.currentPage < getNoOfPages(this.props.currentData, this.props.recordsPerPage)) {
      return '';
    }
    return 'disabled';
  }
  renderArrowRight() {
    return (
      <div className="page-number-arrow-for-margin" >
        <button
          onClick={this.onPageIncrement}
          className={this.getRightArrowClassName()}
          disabled={this.renderArrowRightStyles()}
        >
          <FaAngleRight className="arrowIcon" />
        </button>
        <button
          onClick={this.jumpToLastPage}
          className={this.getRightArrowClassName()}
          disabled={this.renderArrowRightStyles()}
        >
          <FaAngleDoubleRight className="arrowIcon" />
        </button>
      </div>
    );
  }

  jumpToFirstPage() {
    this.props.onPagination('firstPage');
  }

  jumpToLastPage() {
    this.props.onPagination('lastPage');
  }

  onPageDecrement() {
    this.props.onPagination('decrement');
  }

  onPageIncrement() {
    this.props.onPagination('increment');
  }

  render() {
    return (
      <div>
        {this.renderPagination()}
      </div>
    );

  }
}
Pagination.propTypes = {
  currentData: PropTypes.array,
  onPagination: PropTypes.func.isRequired,
  currentPage: PropTypes.number,
  recordsPerPage: PropTypes.number,
};

Pagination.defaultProps = {
  currentData: [],
  currentPage: 0,
  recordsPerPage: 0,
};
export default Pagination;
