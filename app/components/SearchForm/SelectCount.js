import React from 'react';

export default function SelectPerPage({ value, onChange }) {
  return (
    <div className="select-count group">
      <label htmlFor="results-per-page">Results:</label>
      <select id="results-per-page" className="results-per-page-select"
        onChange={onChange}
        value={value}
      >
        <option value="20">20</option>
        <option value="40">40</option>
        <option value="80">80</option>
      </select>
    </div>
  );
}
