import React from 'react';
import { NavLink } from 'react-router-dom';

const DisplayError = ({ message }) => {
  return (
    <div className="error-wrapper">
      <div>{ message }</div>
    </div>
  );
};

export default DisplayError;
