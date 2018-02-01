import React from 'react';

export default function SearchBar({ value, onKeyPress, onChange, onClick, onClickRandom, onClickFavorites, searchBy }) {
  return (
    <div className="search-bar row">
      <input type="search" placeholder={`Search ${searchBy === 'beer_name' ? 'Beer' : 'Food'}`} className="input"
        onChange={onChange}
        onKeyPress={onKeyPress}
        value={value}
      />
      <div className="group">
        <button className="btn" onClick={onClick}>
          <i className="fa fa-search"></i>
        </button>
        <button className="btn feeling-lucky"
          onClick={onClickRandom}
        >I'm feeling lucky
        </button>
        <button className="btn"
          onClick={onClickFavorites}
        >
          <i className="fa fa-heart"></i>
          View Favorites
        </button>
      </div>
    </div>
  )
}
