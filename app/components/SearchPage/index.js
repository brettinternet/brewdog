import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { searchData, sortData, viewFavorites } from '../../actions/beerActions';
import { saveSettings, clearSettings } from '../../actions/settingsActions';
import { NO_SEARCH_VALUE } from '../../actions/constants';
import { getSearchUrl, getRandomUrl } from '../../utils/getUrl';

import SearchForm from '../SearchForm';
import SearchResults from './SearchResults';
import BeerLoader from './BeerLoader';
import DisplayError from './DisplayError';
import PageButtons from '../SearchForm/PageButtons';
import Modal from '../Modal';

class SearchPage extends Component {

  handleSearchByChange = (e) => {
    this.props.actions.saveSettings({
      searchBy: e.target.value
    }).then(() => {
      if (this.props.settings.searchValue)
        this.getSearchData();
    });
  }

  handleSortByChange = (e) => {
    this.props.actions.saveSettings({
      sortBy: e.target.value
    }).then(() => this.sortExistingData());
  }

  handleSortAscToggle = () => {
    this.props.actions.saveSettings({
      sortAsc: !this.props.settings.sortAsc
    }).then(() => this.sortExistingData());
  }

  handlePerPageChange = (e) => {
    this.props.actions.saveSettings({
      perPage: Number(e.target.value)
    }).then(() => {
      if (this.props.settings.searchValue && this.props.settings.brewSpec)
        if (this.props.settings.page !== 1) {
          this.props.actions.saveSettings({ page: 1 });
          this.getSearchData();
        } else {
          this.getSearchData();
        }
    });
  }

  handleBrewSpecChange = (e) => {
    this.props.actions.saveSettings({
      brewSpec: e.target.value
    }).then(() => {
      if (this.props.settings.searchValue && this.props.settings.brewSpec)
        this.getSearchData();
    });
  }

  handleBrewDateChange = (date) => {
    this.props.actions.saveSettings({
      brewDate: date
    }).then(() => {
      if (this.props.settings.searchValue)
        this.getSearchData();
    });
  }

  handleSearchKeyPress = (e) => {
    if (e.key === 'Enter') this.submitSearch();
  }

  handleSearchInput = (e) => {
    this.props.actions.saveSettings({ searchValue: e.target.value });
  }

  sortExistingData = () => {
    if (this.props.beer && this.props.beer.length > 0)
      this.props.actions.sortData(this.props.beer.slice(), this.props.settings.sortBy, this.props.settings.sortAsc);
      this.forceUpdate();
  }

  submitSearch = () => {
    if (!this.props.settings.searchValue)
      return this.props.actions.saveSettings({ error: NO_SEARCH_VALUE });
    this.props.actions.saveSettings({
      page: 1
    }).then(() => this.getSearchData());
  }

  getSearchData = (nextPage) => {
    if (nextPage) {
      return this.props.actions.saveSettings({
        page: this.props.settings.page + nextPage
      }).then(() => this.getSearchData());
    }
    const { searchValue,
            searchBy,
            page,
            perPage,
            sortBy,
            sortAsc,
            brewDate,
            brewSpec,
            favoritesToggled } = this.props.settings;
    const searchSettings = {
      searchValue,
      searchBy,
      page,
      perPage,
      brewDate,
      brewSpec,
    }
    const pageSettings = {
      favoritesToggled: false,
      searchSubmitted: true,
      error: '',
    };
    if (favoritesToggled) pageSettings.page = 1;
    this.props.actions.saveSettings(pageSettings)
      .then(() => this.props.actions.searchData(getSearchUrl(searchSettings), sortBy, sortAsc))
    ;
  }

  getNextPageSearchData = () => {
    this.getSearchData(1);
  }

  getPreviousPageSearchData = () => {
    if (this.props.settings.page > 1)
      this.getSearchData(-1);
  }

  submitRandomSearch = () => {
    this.props.actions.searchData(getRandomUrl());
  }

  handleViewFavorites = () => {
    this.props.actions.saveSettings({
      searchSubmitted: true,
      favoritesToggled: true,
      error: '',
      page: 1
    }).then(() => this.props.actions.viewFavorites());
  }

  handleCloseModal = () => {
    this.props.actions.saveSettings({ selectedBeer: null });
  }

  render () {
    const multiplePagesBool = this.props.beer.length == this.props.settings.perPage;
    const selectedBeer = this.props.beer.filter(drink => drink.id == this.props.settings.selectedBeer)[0];
    const searchFormProps = {
      searchBy: this.props.settings.searchBy,
      handleSearchByChange: this.handleSearchByChange,
      handleSortByChange: this.handleSortByChange,
      handleSearchKeyPress: this.handleSearchKeyPress,
      handleSearchInput: this.handleSearchInput,
      submitSearch: this.submitSearch,
      sortAsc: this.props.settings.sortAsc,
      sortBy: this.props.settings.sortBy,
      searchValue: this.props.settings.searchValue,
      submitRandomSearch: this.submitRandomSearch,
      handleSortAscToggle: this.handleSortAscToggle,
      getNextPageSearchData: this.getNextPageSearchData,
      getPreviousPageSearchData: this.getPreviousPageSearchData,
      multiplePagesBool: multiplePagesBool,
      page: this.props.settings.page,
      perPage: this.props.settings.perPage,
      handlePerPageChange: this.handlePerPageChange,
      brewDate: this.props.settings.brewDate,
      brewSpec: this.props.settings.brewSpec,
      handleBrewDateChange: this.handleBrewDateChange,
      handleBrewSpecChange: this.handleBrewSpecChange,
      handleViewFavorites: this.handleViewFavorites,
      handleClearSettings: this.props.actions.clearSettings,
    }
    return (
      <main className="home-page">
        {
          this.props.settings.favoritesToggled ?
            <h1>Favorites</h1>
          :
            <h1>Search</h1>
        }
        <SearchForm { ...searchFormProps } />
        { this.props.settings.error && <DisplayError message={this.props.settings.error} /> }

        {
          this.props.ajaxCallsInProgress > 0 ?
            <BeerLoader />
          :
            <SearchResults />
        }

        {
          !(this.props.ajaxCallsInProgress > 0) && multiplePagesBool &&
          <PageButtons
            onClickPrevious={this.getPreviousPageSearchData}
            currentPage={this.props.settings.page}
            onClickNext={this.getNextPageSearchData}
            multiplePagesBool={multiplePagesBool}
          />
        }
        {
          this.props.settings.selectedBeer &&
          <Modal
            beer={selectedBeer}
            onClick={this.handleCloseModal}
          />
        }

      </main>
    );
  }
};

SearchPage.propTypes = {
  actions: PropTypes.object.isRequired,
  beer: PropTypes.array,
  favorites: PropTypes.array,
  ajaxCallsInProgress: PropTypes.number
};

SearchPage.defaultProps = {
  beer: [],
  searchBy: 'beer_name',
  sortBy: 'id',
  sortAsc: true,
  page: 1,
  perPage: 20
};

function mapStateToProps(state) {
  return {
    favorites: state.favorites,
    beer: state.beer.data,
    settings: state.settings,
    ajaxCallsInProgress: state.ajaxCallsInProgress
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({
      searchData, sortData, viewFavorites, clearSettings, saveSettings,
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchPage);
