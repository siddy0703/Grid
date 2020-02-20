import React, { Component } from 'react';
import PropTypes from 'prop-types';

import '../.././datagrid.css';

/* The RowCell component for the grid which will render - RenderRowCell.
* The RenderRowCell render each cell data.
* @type {class}
* */

class RowCell extends Component {
  constructor(props) {
    super(props);

    this.onChange = this.onChange.bind(this);
  }

  onChange(event) {
    const { gridId, cellId } = this.props;
    this.props.handleRowEdit(gridId, cellId, event);
  }

  render() {
    const { children, title, styles, cellId, editable } = this.props;
    if (editable) {
      if (children && Array.isArray(children)) {
        if (children[1] && children[1].props.type === 'checkbox') {
          return (
            <div className={`row cell__${cellId}`} style={{ width: `${styles.width}px` }}>
              <div
                className="table-cell"
                title={title}
                style={styles.gridTableCell}
              >
                {children}
              </div>
            </div>
          );
        }
      }
      return (
        <div className={`row cell__${cellId}`} style={{ width: `${styles.width}px` }}>
          <input
            className="table-cell"
            value={title}
            style={styles.gridTableCell}
            onChange={this.onChange}
          />
        </div>
      );
    }
    return (
      <div className={`row cell__${cellId}`} style={{ width: `${styles.width}px` }}>
        <div
          className="table-cell"
          title={title}
          style={styles.gridTableCell}
        >
          {children}
        </div>
      </div>
    );
  }
}

RowCell.propTypes = {
  cellId: PropTypes.string,
  editable: PropTypes.bool,
  styles: PropTypes.object,
  children: PropTypes.node,
  title: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
};

RowCell.defaultProps = {
  styles: {},
  editable: false,
  children: '',
  title: '',
  cellId: '',
};

export default RowCell;
