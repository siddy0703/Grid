import React, { Component } from 'react';
import cloneDeep from 'lodash/cloneDeep';
import PropTypes from 'prop-types';

import DataGrid from '../src';
import { tableMetaData, getStyles, tableData } from './Data';

const EditButton = ({ rowData }) => (
  <div><button onClick={() => { alert(`First Name: ${rowData.firstName}, Last Name: ${rowData.lastName}`); }}>Edit</button></div>
);

const HelloMessage = () => (
  <div>
    <button type="checkbox" onClick={() => { alert('Hello'); }}>Hello</button>
  </div>
);

const formatMetaDataRowCustomComponent = (metaData) => {
  const custom = cloneDeep(metaData);
  const formattedHeaderConfig = custom.headerConfig.map((dataObj) => {
    if (dataObj.key === 'edit') {
      return { ...dataObj, customComponent: EditButton };
    }
    return { ...dataObj };
  });
  return { ...metaData, 'headerConfig': formattedHeaderConfig };
};
const formatMetaDataHeaderCustomComponent = (metaData) => {
  const custom = cloneDeep(metaData);
  const formattedHeaderConfig = custom.headerConfig.map((dataObj) => {
    if (dataObj.key === 'edit') {
      return { ...dataObj, headerCustomComponent: HelloMessage };
    }
    return { ...dataObj };
  });
  return { ...metaData, 'headerConfig': formattedHeaderConfig };
};
/*
* The SplashPage component which will render - DataGrid.
 * @type {class}
*/
class SplashPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      metaData: tableMetaData(),
      tableData: tableData(),
    };
    this.getSelectedRow = this.getSelectedRow.bind(this);
    this.formatTableData = this.formatTableData.bind(this);
  }
  componentDidMount() {
    this.formatTableData();
  }

  formatTableData() {
    let temporaryTableData = this.state.tableData.map((tableDataObject) => {
      return { ...tableDataObject, isChecked: false };
    });
    this.setState({
      tableData: temporaryTableData,
    });
  }

  getSelectedRow(selectedRow) {
   const temporaryTableData = this.state.tableData.map((tableDataObject) => {
     let temporaryObject = tableDataObject;
       selectedRow.forEach((selectedRowObject) => {
         if (selectedRowObject.id === tableDataObject.id) {
           temporaryObject = selectedRowObject;
        }
      });
     return temporaryObject;
    });
    this.setState({
      tableData: temporaryTableData,
    });
  }
  render() {
    const formattedMetaDataRowCustomComponent = formatMetaDataRowCustomComponent(this.state.metaData);
    const formattedMetaDataHeaderCustomComponent = formatMetaDataHeaderCustomComponent(formattedMetaDataRowCustomComponent);
    return (
      <div id="badge">
        <DataGrid
          data={this.state.tableData}
          metaData={formattedMetaDataHeaderCustomComponent}
          styles={getStyles()}
          getSelectedRow={this.getSelectedRow}
        />
      </div>
    );
  }
}
EditButton.propTypes = {
  rowData: PropTypes.object,
};

EditButton.defaultProps = {
  rowData: {},
};

export default SplashPage;
