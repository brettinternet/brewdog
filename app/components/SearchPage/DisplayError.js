import React from 'react';
import { NavLink } from 'react-router-dom';

const DisplayError = ({ message }) => {
  return (
    <div className="wrapper">
      <div className="error-message">{ message }</div>
    </div>
  );
};

export default DisplayError;
