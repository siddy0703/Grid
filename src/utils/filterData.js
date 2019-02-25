export const getFilterData = (filterConfig, data) => {
  const { searchString, selectedColumn } = filterConfig;
  const searchedData = [];
  if (isNaN(searchString)) {
    if (!searchString) {
      return data;
    }
    return data.filter((dataObj) => {
      return String(dataObj[selectedColumn]).toLowerCase().includes(searchString.toLowerCase());
    });
  } else if (!isNaN(searchString)) {
    if (!searchString) {
      return data;
    }
     return data.filter((dataObj) => {
      return String(dataObj[selectedColumn]).includes(searchString);
    });
  }
  data.forEach((object) => {
    let isPresent = false;
    for (const key in object) {
      if ((key !== 'id') && (String(object[key]).toLowerCase().indexOf(searchString.toLowerCase()) !== -1) && !isPresent) {
        searchedData.push(object);
        isPresent = true;
      }
    }
  });
  return searchedData;
};
export const filterData = (appliedFilter, data) => {

  let filteredData = [...data];
  for (const column in appliedFilter) {
    const filterConfig = {
      searchString: appliedFilter[column],
      selectedColumn: column,
    };
    filteredData = getFilterData(filterConfig, filteredData);
  }
  return filteredData;
};
