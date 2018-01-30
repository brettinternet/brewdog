import React from 'react';

export default function SortBy({ value, asc, onChange, onClick }) {
  return (
    <div className="sort-by group">
      <label htmlFor="sort">Sort by:</label>
      <select id="sort"
        onChange={onChange}
        value={value}
      >
        <option value="id">None</option>
        <option value="name">Beer Name</option>
        <option value="first_brewed">First Brewed Date</option>
        <option value="abv">ABV</option>
      </select>
      <button className="btn"
        onClick={onClick}
        disabled={value === 'id'}
      >
        <i className={asc ? 'fa fa-caret-up' : 'fa fa-caret-down'}></i>
      </button>
    </div>
  )
}
