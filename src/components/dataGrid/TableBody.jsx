import React, { Component } from 'react';
import PropTypes from 'prop-types';
import isEmpty from 'lodash/isEmpty';

import Row from './Row';
import '../.././datagrid.css';

/*
 The TableBody component for the grid which will render - Row and RenderTableBody.
 @type {class}
 */
class TableBody extends Component {
  constructor(props) {
    super(props);
    this.renderTableBody = this.renderTableBody.bind(this);
  }

  renderTableBody({ tableData, currentMetaData, styles }) {
    if (isEmpty(tableData)) {
      return null;
    }
    return tableData.map(rowData => (
      <Row
        handleSingleCheckBoxChange={this.props.handleSingleCheckBoxChange}
        data={rowData}
        currentMetaData={currentMetaData}
        styles={styles}
        key={rowData.id}
      />
    ));
  }
  render() {
    const { tableData, currentMetaData, styles } = this.props;
    return (
      <div className="table-body">
        {this.renderTableBody({ tableData, currentMetaData, styles })}
      </div>
    );
  }
}

TableBody.propTypes = {
  handleSingleCheckBoxChange: PropTypes.func,
  tableData: PropTypes.array,
  currentMetaData: PropTypes.object,
  styles: PropTypes.object,
};

TableBody.defaultProps = {
  handleSingleCheckBoxChange: () => {},
  tableData: [],
  currentMetaData: {},
  styles: {},
};

export default TableBody;

