import React from 'react';
import PropTypes from 'prop-types';


const ColumnFilter = ({ disableFilter, onChange, selectedColumn, value }) => {
  const handleInputChange = (event) => {
    const searchInput = {
      searchString: event.target.value,
      selectedColumn,
    };
    onChange(searchInput);
  };
  if (!disableFilter) {
    return (
      <div className="filter-column">
        <input className="search-input-column" type="text" value={value} onChange={handleInputChange} />
      </div>
    );
  }
  return null;
};

ColumnFilter.propTypes = {
  disableFilter: PropTypes.bool,
  selectedColumn: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func.isRequired,
};

ColumnFilter.defaultProps = {
  selectedColumn: '',
  value: '',
  disableFilter: false,
};

export default ColumnFilter;
