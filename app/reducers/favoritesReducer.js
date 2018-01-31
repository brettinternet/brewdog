import { ADD_FAVORITE, REMOVE_FAVORITE, LOAD_FAVORITE } from '../actions/constants';

const initialState = {
  favorites: []
};

export default function favorites(state = initialState.favorites, action) {
  switch (action.type) {
    case ADD_FAVORITE:
      return [...state, action.beer];
    case REMOVE_FAVORITE:
      return [...state.filter(beer => beer.id !== action.id)]
    case LOAD_FAVORITE:
       return action.favorites;
    default:
      return state;
  }
}
