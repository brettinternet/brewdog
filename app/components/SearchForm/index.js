import React from 'react';
import PropTypes from 'prop-types';

import SearchBar from './SearchBar';
import SearchType from './SearchType';
import SortBy from './SortBy';
import PageButtons from './PageButtons';
import DateFilter from './DateFilter';
import SelectCount from './SelectCount';

const SearchForm = (props) => {
  return (
    <div className="search-form">
      <SearchBar
        onChange={props.handleSearchInput}
        onKeyPress={props.handleSearchKeyPress}
        value={props.searchValue}
        onClick={props.submitSearch}
        onClickRandom={props.submitRandomSearch}
        onClickFavorites={props.handleViewFavorites}
        searchBy={props.searchBy}
      />

      <div className="search-options">
        <div className="row">
          <SearchType
            value={props.searchBy}
            onChange={props.handleSearchByChange}
          />

          <SortBy
            onChange={props.handleSortByChange}
            value={props.sortBy}
            onClick={props.handleSortAscToggle}
            asc={props.sortAsc}
          />
        </div>

        <div className="row">
          <SelectCount
            onChange={props.handlePerPageChange}
            value={props.perPage}
          />

          <DateFilter
            selected={props.brewDate}
            onChangeDate={props.handleBrewDateChange}
            onChangeSpec={props.handleBrewSpecChange}
            value={props.brewSpec}
          />

        <button className="btn clear-filters"
            onClick={props.handleClearSettings}
          >
            <i className="fa fa-filter"></i>Clear
          </button>
        </div>



        <PageButtons
          onClickPrevious={props.getPreviousPageSearchData}
          currentPage={props.page}
          onClickNext={props.getNextPageSearchData}
          multiplePagesBool={props.multiplePagesBool}
        />

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
