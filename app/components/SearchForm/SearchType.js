import React from 'react';

export default function SearchType({ value, onChange }) {
  return (
    <div className="search-type group">
      <input type="radio" id="beer-name" value="beer_name"
        onChange={onChange}
        checked={value==='beer_name'}
      />
      <label htmlFor="beer-name">Search by beer name</label>

      <input type="radio" id="food-pairing" value="food"
        onChange={onChange}
        checked={value==='food'}
      />
      <label htmlFor="food-pairing">Search by food pairing</label>
    </div>
  )
}
