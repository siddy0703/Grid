import React from 'react';
import PropTypes from 'prop-types';

const HeaderCustomComponent = ({ headerCustomComponent }) => {
  const CustomComponent = headerCustomComponent;
  if (headerCustomComponent) {
    return <CustomComponent />;
  }
  return null;
};
HeaderCustomComponent.propTypes = {
  headerCustomComponent: PropTypes.func,
};
HeaderCustomComponent.default = {
  headerCustomComponent: () => {},
};

export default HeaderCustomComponent;
