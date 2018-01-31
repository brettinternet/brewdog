import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <header className="header">
      <div className="table">
        <ul>
          <li><NavLink to="/">BrewDog</NavLink></li>
        </ul>
        <div className="pad"></div>
        <ul>
          <li>
            <NavLink to="/" activeClassName="active-link" exact={true}>Search</NavLink>
          </li>
          <li>
            <NavLink to="/about" activeClassName="active-link">About</NavLink>
          </li>
        </ul>
      </div>
    </header>
  );
};
