import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <div className="table">
        <ul>
          <li><NavLink to="/brewdog">BrewDog</NavLink></li>
        </ul>
        <div className="pad"></div>
        <ul>
          <li>
            <NavLink to="/brewdog" activeClassName="active-link" exact={true}>Search</NavLink>
          </li>
          <li>
            <NavLink to="/brewdog/about" activeClassName="active-link">About</NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};
