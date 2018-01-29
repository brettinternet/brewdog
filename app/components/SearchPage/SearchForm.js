import React from 'react';
import PropTypes from 'prop-types';
import DatePicker from 'react-datepicker'; // https://reactdatepicker.com/

const SearchForm = (props) => {
  const { searchBy,
          handleSearchByChange,
          handleSortByChange,
          handleSearchKeyPress,
          handleSearchInput,
          submitSearch,
          searchValue,
          submitRandomSearch,
          sortAsc,
          sortBy,
          handleSortAscToggle,
          getPreviousPageSearchData,
          getNextPageSearchData,
          multiplePagesBool,
          page,
          perPage,
          handlePerPageChange,
          brewDate,
          brewSpec,
          handleBrewDateChange,
          handleBrewSpecChange,
          handleViewFavorites, } = props
  return (
    <div className="search-form">
      <div>
        <input type="search" placeholder="Search Beer"
          onChange={handleSearchInput}
          onKeyPress={handleSearchKeyPress}
          value={searchValue}
        />
        <button className="icon" onClick={submitSearch}>
          <i className="fa fa-search"></i>
        </button>
        <button onClick={submitRandomSearch}>
          I'm feeling lucky
        </button>
      </div>
      <div className="search-options">

        <input type="radio" id="beer-name" value="beer_name"
          onChange={handleSearchByChange}
          checked={searchBy==='beer_name'}
        />
        <label htmlFor="beer-name">Search by beer name</label>

        <input type="radio" id="food-pairing" value="food"
          onChange={handleSearchByChange}
          checked={searchBy==='food'}
        />
        <label htmlFor="food-pairing">Search by food pairing</label>

        <label htmlFor="sort" className="form__label">Sort by:</label>
        <select id="sort" className="sort-select"
          onChange={handleSortByChange}
          value={sortBy}
        >
          <option value="id">None</option>
          <option value="name">Beer Name</option>
          <option value="first_brewed">First Brewed Date</option>
          <option value="abv">ABV</option>
        </select>
        <button onClick={handleSortAscToggle} disabled={sortBy === 'id'}>
          <i className={sortAsc ? 'fa fa-caret-up' : 'fa fa-caret-down'}></i>
        </button>

        <label htmlFor="results-per-page" className="form__label">Results per page:</label>
        <select id="results-per-page" className="results-per-page-select"
          onChange={handlePerPageChange}
          value={perPage}
        >
          <option value="20">20</option>
          <option value="40">40</option>
          <option value="80">80</option>
        </select>

        <span>First Brewed</span>
        <label className="form__label">Start</label>

        <label htmlFor="brewed-date-select" className="form__label">Brewed date:</label>
        <select id="brewed-date-select" className="results-per-page-select"
          onChange={handleBrewSpecChange}
          value={brewSpec}
        >
          <option value="brewed_before">Before</option>
          <option value="brewed_after">After</option>
        </select>


        <button
          onClick={handleViewFavorites}
        >
          View Favorites
        </button>


        <div>
          <button
            onClick={getPreviousPageSearchData}
            disabled={page === 1}
          >
            <i className="fa fa-caret-left"></i> Prevous
          </button>
          <button
            onClick={getNextPageSearchData}
            disabled={!multiplePagesBool}
          >
            Next <i className="fa fa-caret-right"></i>
          </button>
        </div>

      </div>
    </div>
  );
}

SearchForm.propTypes = {
  searchingBy: PropTypes.string,
  handleSearchByChange: PropTypes.func,
  handleSortByChange: PropTypes.func
};

export default SearchForm;
