import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Shuffle from 'shufflejs';

import { saveSettings } from '../../actions/settingsActions';
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
    const selectedBeer = e.currentTarget.getAttribute('data');
    this.props.actions.saveSettings({ selectedBeer });
  }

  componentDidMount = () => {
    this.shuffle = new Shuffle(this.element, {
      itemSelector: '.card',
      sizer: this.sizer
    })
  }

  componentDidUpdate() {
    this.shuffle.resetItems();
  }

  componentWillUnmount() {
    this.shuffle.destroy();
    this.shuffle = null;
  }

  render() {
    const { beer, favorites } = this.props;
    let ycount = 0;
    const layouts = {};
    layouts.lg = beer.map((el, index) => {
      const rowItem = {i: `${el.id}`, x: index % 2, y: ycount, w: 1, h: 1, static: true};
      ycount += index % 2;
      return rowItem;
    });
    layouts.md = beer.map((el, index) => ({i: `${el.id}`, x: 1, y: index, w: 1, h: 1, static: true}));
    const resultsPhrase = beer && beer.length > 0 ? ( beer.length > 1 ? beer.length + ' results' : '1 result' ) : 'No results';
    return (
      <section className="search-results">
        <div className="results-count">{this.props.settings.searchSubmitted && resultsPhrase}</div>
        <div ref={element => this.element = element}>
          {
            beer.map( drink => (
              <div className="card"
                key={ drink.id }
                data={ drink.id }
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
          <div ref={element => this.sizer = element} className="sizer"></div>
        </div>
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
    actions: bindActionCreators({ addFavorite, removeFavoriteById, saveSettings }, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchResults);











// import React, { Component } from 'react';
// import PropTypes from 'prop-types';
// import { connect } from 'react-redux';
// import { bindActionCreators } from 'redux';
// // import ReactGrid from 'react-grid-layout';
// import { Responsive, WidthProvider } from 'react-grid-layout';
// const ReactGrid = WidthProvider(Responsive);
//
// import { saveSettings } from '../../actions/settingsActions';
// import { addFavorite, removeFavoriteById } from '../../actions/favoritesActions';
// import shortenText from '../../utils/shortenText';
//
// class SearchResults extends Component {
//
//   handleAddFavorite = (e) => {
//     let newFavorite = this.props.beer.filter(drink => `drink-${drink.id}` === e.currentTarget.id)[0];
//     if (!newFavorite)
//       // handle for error, can't find fav
//       return;
//     this.props.actions.addFavorite(newFavorite);
//   }
//
//   handleRemoveFavorite = (e) => {
//     let notFavoriteId = e.currentTarget.id;
//     if (notFavoriteId) notFavoriteId = Number(notFavoriteId.split('-')[1]);
//     if (!notFavoriteId)
//       // handle for error, can't find fav
//       return;
//     this.props.actions.removeFavoriteById(notFavoriteId);
//   }
//
//   handleOpenModal = (e) => {
//     const selectedBeer = e.currentTarget.getAttribute('data');
//     console.log(selectedBeer);
//     this.props.actions.saveSettings({ selectedBeer });
//   }
//
//   render() {
//     const { beer, favorites } = this.props;
//     let ycount = 0;
//     const layouts = {};
//     layouts.lg = beer.map((el, index) => {
//       const rowItem = {i: `${el.id}`, x: index % 2, y: ycount, w: 1, h: 1, static: true};
//       ycount += index % 2;
//       return rowItem;
//     });
//     layouts.md = beer.map((el, index) => ({i: `${el.id}`, x: 1, y: index, w: 1, h: 1, static: true}));
//     const resultsPhrase = beer && beer.length > 0 ? ( beer.length > 1 ? beer.length + ' results' : '1 result' ) : 'No results';
//     return (
//       <section className="search-results">
//         <div className="results-count">{this.props.settings.searchSubmitted && resultsPhrase}</div>
//         <ReactGrid layout={layouts} rowHeight={300} width={770}
//           breakpoints={{ lg: 400, md: 0 }}
//           cols={{ lg: 2, md: 1 }}
//         >
//           {
//             beer.map( drink => (
//               <div className="card"
//                 key={ drink.id }
//                 data={ drink.id }
//                 onClick={this.handleOpenModal}
//               >
//                 <div className="name">
//                   <h3>
//                     { drink.name }
//                   </h3>
//                 </div>
//                 <div className="img-wrapper">
//                   {
//                     favorites.some(fav => fav.id === drink.id) ?
//                       <button className="btn fav-btn"
//                         id={`drink-${drink.id}`}
//                         onClick={this.handleRemoveFavorite}
//                       >
//                         <i className="fa fa-heart"></i>
//                       </button>
//                     :
//                       <button className="btn fav-btn"
//                         id={`drink-${drink.id}`}
//                         onClick={this.handleAddFavorite}
//                       >
//                         <i className="fa fa-heart-o"></i>
//                       </button>
//                   }
//                   <img src={ drink.image_url } alt={`bottle of ${drink.name}`} />
//                 </div>
//                 <div className="date">
//                   { drink.first_brewed }
//                 </div>
//                 <div className="description">
//                   { shortenText(drink.description, 160, true) }
//                 </div>
//               </div>
//             ))
//           }
//         </ReactGrid>
//       </section>
//     );
//   }
// }
//
// SearchResults.propTypes = {
//   actions: PropTypes.object.isRequired,
//   beer: PropTypes.array.isRequired,
//   favorites: PropTypes.array.isRequired
// };
//
// SearchResults.defaultProps = {
//   favorites: [],
//   beer: []
// }
//
// function mapStateToProps(state) {
//   return {
//     beer: state.beer.data,
//     favorites: state.favorites,
//     settings: state.settings,
//     ajaxCallsInProgress: state.ajaxCallsInProgress
//   };
// }
//
// function mapDispatchToProps(dispatch) {
//   return {
//     actions: bindActionCreators({ addFavorite, removeFavoriteById, saveSettings }, dispatch)
//   };
// }
//
// export default connect(
//   mapStateToProps,
//   mapDispatchToProps
// )(SearchResults);
