import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { saveSettings } from '../../actions/settingsActions';
import { addFavorite, removeFavoriteById } from '../../actions/favoritesActions';
import { searchData } from '../../actions/beerActions';
import { getSelectedUrl } from '../../utils/getUrl';
import Loader from '../App/Loader';

class Modal extends Component {

  componentDidMount() {
    if (this.props.beer.length === 0) this.submitSelectedSearch(this.props.settings.selectedBeer);
  }

  handleAddFavorite = (e) => {
    e.stopPropagation();
    let newFavorite = this.props.beer.filter(drink => `drink-${drink.id}` === e.currentTarget.id)[0];
    if (!newFavorite)
      // handle for error, can't find fav
      return;
    this.props.actions.addFavorite(newFavorite);
  }

  handleRemoveFavorite = (e) => {
    e.stopPropagation();
    let notFavoriteId = e.currentTarget.id;
    if (notFavoriteId) notFavoriteId = Number(notFavoriteId.split('-')[1]);
    if (!notFavoriteId)
      // handle for error, can't find fav
      return;
    this.props.actions.removeFavoriteById(notFavoriteId);
  }

  handleCloseModal = () => {
    this.props.actions.saveSettings({ selectedBeer: null });
  }

  submitSelectedSearch = (id) => {
    this.props.actions.searchData(getSelectedUrl(id));
  }

  stopPropagation = (e) => {
    e.stopPropagation();
  }

  render() {
    const drink = this.props.beer.filter(drink => drink.id == this.props.settings.selectedBeer)[0];
    if (!drink) return (<Loader />)
    return (
      <div className="overlay" onClick={this.handleCloseModal}>
        <div className="modal">
          <div className="modal-window" onClick={this.stopPropagation}>
            <button className="btn close-btn"
              onClick={this.handleCloseModal}
            >
              <i className="fa fa-times"></i>
            </button>
            <div className="name">
              {
                this.props.favorites.some(fav => fav.id === drink.id) ?
                  <button className="btn fav-btn"
                    id={`drink-${drink.id}`}
                    onClick={this.handleRemoveFavorite}
                  >
                    <i className="fa fa-heart"></i>
                  </button>
                :
                  <button className="btn fav-btn"
                    id={`drink-${drink.id}`}
                    onClick={this.handleAddFavorite}
                  >
                    <i className="fa fa-heart-o"></i>
                  </button>
              }
              <h1>
                { drink.name }
              </h1>
              <h4>{ drink.tagline }</h4>
            </div>
            <div className="row">
              <div className="img-wrapper">
                <img src={ drink.image_url } alt={`bottle of ${drink.name}`} />
                <div className="volume">{ drink.volume.value } { drink.volume.unit }</div>
              </div>
              <div className="info">
                <div className="date">
                  <i className="fa fa-beer"></i>{ drink.first_brewed }
                </div>
                <div className="description">
                  { drink.description }
                </div>
                <div className="tips">
                  { drink.brewers_tips }
                </div>
                <div className="row">
                  <i className="fa fa-cutlery"></i>
                  {
                    drink.food_pairing.map((food, i) => (
                      <a key={`food-${i}`} className="food-item" target="_blank"
                        href={`https://www.google.com/search?q=${food.split(' ').join('+')}`}
                      >{food}</a>
                    ))
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Modal.propTypes = {
  actions: PropTypes.object.isRequired,
  beer: PropTypes.array,
  favorites: PropTypes.array,
};

Modal.defaultProps = {
  drink: {},
  beer: []
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
      saveSettings, addFavorite, removeFavoriteById, searchData
    }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Modal);
