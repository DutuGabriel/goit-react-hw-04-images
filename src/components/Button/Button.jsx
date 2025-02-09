import React from 'react';
import PropTypes from 'prop-types';

const Button = ({ onClick }) => (
  <div className="Button-wrapper">
    <button onClick={onClick} className="Button">
      Load more
    </button>
  </div>
);

Button.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default Button;
