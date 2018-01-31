import { combineReducers } from 'redux';
import beer from './beerSearchReducer';
import ajaxCallsInProgress from './ajaxStatusReducer';
import favorites from './favoritesReducer';
import settings from './settingsReducer';
import { routerReducer } from 'react-router-redux';

const rootReducer = combineReducers({
  beer,
  favorites,
  settings,
  ajaxCallsInProgress,
  routing: routerReducer
});

export default rootReducer;
