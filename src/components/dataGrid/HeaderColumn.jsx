import React from 'react';
import PropTypes from 'prop-types';
import { Resizable } from 'react-resizable';

import HeaderCustomComponent from './HeaderCustomComponent';
import ColumnFilter from './ColumnFilter';

class HeaderColumn extends React.Component {
  constructor(props) {
    super(props);
    this.MyRef = React.createRef();
    this.state = {};
    this.onResize = this.onResize.bind(this);
    this.onResizeStop = this.onResizeStop.bind(this);
    this.renderFirstDiv = this.renderFirstDiv.bind(this);
    this.renderSecondDiv = this.renderSecondDiv.bind(this);
  }
  componentDidMount() {
    const { offsetWidth } = this.MyRef.current;
    this.setState({
      width: offsetWidth,
    });
    this.props.onResizeColumnWidth(this.props.columnMetaData.key, offsetWidth);
  }

  renderFirstDiv() {
    let className = '';
    const {
      columnType,
      disableFilter,
      headerCustomComponent,
      isLastColumn,
      key,
      label
    } = this.props.columnMetaData;
    if (isLastColumn) {
      className = 'lastColumn';
    }
    return (
      <div
        className={`header-column cell__${key} ${className}`}
        ref={this.MyRef}
        style={isLastColumn ? { width: `${this.state.width}px` } : { width: `${this.state.width}px` }}
      >
        <div
          title={label}
          className="table-heading"
          onClick={e => this.props.onClickSort(key, disableFilter, columnType, e)}
          id={key}
        >{this.props.getSortIcon()}{label}
          <input
            type="checkbox"
            onChange={this.props.handleAllCheckBoxChange}
            checked={this.props.allCheckBox ? 'checked' : ''}
          />
        </div>
      </div>
    );
  }

  renderSecondDiv() {
    let className = '';
    const {
      columnType,
      disableFilter,
      headerCustomComponent,
      isLastColumn,
      key,
      label
    } = this.props.columnMetaData;
    if (isLastColumn) {
      className = 'lastColumn';
    }
    return (
      <div
        className={`header-column cell__${key} ${className}`}
        ref={this.MyRef}
        style={isLastColumn ? { width: `${this.state.width}px` } : { width: `${this.state.width}px` }}
      >
        <div
          title={this.props.columnMetaData.label}
          className="table-heading"
          onClick={e => this.props.onClickSort(key, disableFilter, columnType, e)}
          id={key}
        >{this.props.getSortIcon(key)}{label}
        </div>
        <ColumnFilter
          disableFilter={disableFilter}
          selectedColumn={key}
          onChange={this.props.onFilterChange}
          value={this.props.getFilterValue(key)}
          key={key}
        />
        <HeaderCustomComponent
          headerCustomComponent={headerCustomComponent}
        />
      </div>
    );
  }

  onResize(event, { size }) {
    if (!this.props.columnMetaData.isLastColumn) {
      this.setState({
        width: size.width,
      });
    }
  }

  onResizeStop() {
    const { width } = this.state;

    this.props.onResizeColumnWidth(this.props.columnMetaData.key, width);
  }

  render() {
    const {
      enableRowSelection,
      columnMetaData,
      resizeColumnWidth,
    } = this.props;
    if ((columnMetaData.key === 'grid__select-column') && (enableRowSelection)) {
      if (this.props.columnMetaData.isLastColumn || !resizeColumnWidth) {
        return this.renderFirstDiv();
      } else if (resizeColumnWidth) {
        return (
          <Resizable
            onResize={this.onResize}
            onResizeStop={this.onResizeStop}
            width={this.state.width ? this.state.width : window.innerWidth}
            height={window.innerHeight}
          >
            {this.renderFirstDiv()}
          </Resizable>
        );
      }
      return (
        this.renderFirstDiv()
      );
    }
    if (this.props.columnMetaData.isLastColumn || !resizeColumnWidth) {
      return this.renderSecondDiv();
    } else if (resizeColumnWidth) {
      return (
        <Resizable
          onResize={this.onResize}
          onResizeStop={this.onResizeStop}
          width={this.state.width ? this.state.width : window.innerWidth}
          height={window.innerHeight}
        >
          {this.renderSecondDiv()}
        </Resizable>
      );
    }
    return (
      this.renderSecondDiv()
    );
  }
}

HeaderColumn.propTypes = {
  handleAllCheckBoxChange: PropTypes.func,
  handleAllCheckBox: PropTypes.func,
  onResizeColumnWidth: PropTypes.func,
  allCheckBox: PropTypes.bool,
  columnMetaData: PropTypes.object,
  onFilterChange: PropTypes.func.isRequired,
  onClickSort: PropTypes.func.isRequired,
  getSortIcon: PropTypes.func.isRequired,
  getFilterValue: PropTypes.func.isRequired,
  enableRowSelection: PropTypes.bool,
  enableAllRowSelection: PropTypes.bool,
  resizeColumnWidth: PropTypes.bool,
};

HeaderColumn.defaultProps = {
  handleAllCheckBoxChange: () => {},
  handleAllCheckBox: () => {},
  onResizeColumnWidth: () => {},
  allCheckBox: false,
  columnMetaData: {},
  enableRowSelection: false,
  enableAllRowSelection: false,
  resizeColumnWidth: false,
};

export default HeaderColumn;
