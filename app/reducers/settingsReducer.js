import { SAVE_SETTINGS, LOAD_SETTINGS, CLEAR_SETTINGS } from '../actions/constants';
import objectAssign from 'object-assign';

const initialState = {
  searchBy: 'beer_name',
  sortBy: 'id',
  sortAsc: true,
  searchValue: '',
  page: 1,
  perPage: 20,
  brewDate: null,
  brewSpec: 'brewed_before',
  searchSubmitted: false,
  favoritesToggled: false,
  error: '',
};

export default function settingsReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_SETTINGS:
      return objectAssign({}, state, action.settings);
    case LOAD_SETTINGS:
      return objectAssign({}, state, action.settings);
    case CLEAR_SETTINGS:
      return initialState;
    default:
      return state;
  }
}
