import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { isEmpty } from '../../utils/CommonUtils';

import '../.././datagrid.css';

/*
 The TableFooter component for the grid which will render - Total Records.
 * It will also handle the dataLength functionality for the grid.
 * @type {class}
 */
class TableFooter extends Component {

  dataLength() {
    if (!isEmpty(this.props.originalData)) {
      return this.props.originalData.length;
    }
    return 0;
  }

  render() {
    return (
      <div className="table-footer">
        <div className="table-footer-row" />
      </div>
    );
  }
}

TableFooter.propTypes = {
  originalData: PropTypes.array,
};

TableFooter.defaultProps = {
  originalData: [],
};
export default TableFooter;
