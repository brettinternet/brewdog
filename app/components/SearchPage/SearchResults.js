import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { addFavorite, removeFavoriteById } from '../../actions/favoritesActions';

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

  render() {
    const { beer, favorites } = this.props;
    const resultsPhrase = beer && beer.length > 0 ? ( beer.length > 1 ? beer.length + ' results' : '1 result' ) : 'No results'
    return (
      <main className="search-results">
        <div className="results-count">{resultsPhrase}</div>
        {
          beer.map( drink => (
            <div key={ drink.id }>
              <div>
                {
                  favorites.some(fav => fav.id === drink.id) ?
                    <button
                      id={`drink-${drink.id}`}
                      onClick={this.handleRemoveFavorite}
                    >
                      <i className="fa fa-star"></i>
                    </button>
                  :
                    <button
                      id={`drink-${drink.id}`}
                      onClick={this.handleAddFavorite}
                    >
                      <i className="fa fa-star-o"></i>
                    </button>
                }
              </div>
              <div>
                { drink.name }
              </div>
              <img src={ drink.image_url } />
              <div>
                { drink.description }
                { drink.first_brewed }
              </div>
            </div>
          ))
        }
      </main>
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
