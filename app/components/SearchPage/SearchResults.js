import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import ReactGrid from 'react-grid-layout';

import { addFavorite, removeFavoriteById } from '../../actions/favoritesActions';
import shortenText from '../../utils/shortenText';

class SearchResults extends Component {

  handleAddFavorite = (e) => {
    let newFavorite = this.props.beer.filter(drink => `drink-${drink.id}` === e.currentTarget.id)[0];
    if (!newFavorite)
      // handle for error, can't find fav
      return;
    this.props.actions.addFavorite(newFavorite);
  }

  handleRemoveFavorite = (e) => {
    let notFavoriteId = e.currentTarget.id;
    if (notFavoriteId) notFavoriteId = Number(notFavoriteId.split('-')[1]);
    if (!notFavoriteId)
      // handle for error, can't find fav
      return;
    this.props.actions.removeFavoriteById(notFavoriteId);
  }

  handleOpenModal = (e) => {
    console.log('key', e.currentTarget);
    console.log(e.currentTarget.name);
    const selectedBeer = this.props.beer.filter(drink => drink.id == e.target.key)
    console.log(selectedBeer);
  }

  render() {
    const { beer, favorites } = this.props;
    const layout = beer.map((el, index) => ({i: `${el.id}`, x: index % 2, y: 0, w: 1, h: 1, static: true}));
    console.log(beer, layout);
    const resultsPhrase = beer && beer.length > 0 ? ( beer.length > 1 ? beer.length + ' results' : '1 result' ) : 'No results';
    return (
      <section className="search-results">
        <div className="results-count">{this.props.settings.searchSubmitted && resultsPhrase}</div>
        <ReactGrid layout={layout} cols={2} rowHeight={300} width={770}>
          {
            beer.map( drink => (
              <div className="card"
                key={ drink.id }
                name={ drink.id }
                onClick={this.handleOpenModal}
              >
                <div className="name">
                  <h3>
                    { drink.name }
                  </h3>
                </div>
                <div className="img-wrapper">
                  {
                    favorites.some(fav => fav.id === drink.id) ?
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
                  <img src={ drink.image_url } alt={`bottle of ${drink.name}`} />
                </div>
                <div className="date">
                  { drink.first_brewed }
                </div>
                <div className="description">
                  { shortenText(drink.description, 160, true) }
                </div>
              </div>
            ))
          }
        </ReactGrid>
      </section>
    );
  }
}

SearchResults.propTypes = {
  actions: PropTypes.object.isRequired,
  beer: PropTypes.array.isRequired,
  favorites: PropTypes.array.isRequired
};

SearchResults.defaultProps = {
  favorites: [],
  beer: []
}

function mapStateToProps(state) {
  return {
    beer: state.beer.data,
    favorites: state.favorites,
    settings: state.settings,
    ajaxCallsInProgress: state.ajaxCallsInProgress
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators({ addFavorite, removeFavoriteById }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);
