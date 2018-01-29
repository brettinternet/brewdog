import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <NavLink to="/" activeClassName="active-link">Home</NavLink>
      <NavLink to="/about" activeClassName="active-link">About</NavLink>
    </header>
  );
};

export default Header;
