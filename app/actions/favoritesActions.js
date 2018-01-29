import { ADD_FAVORITE, REMOVE_FAVORITE, LOAD_FAVORITE } from './constants';

export function addFavorite(beer) {
  return { type: ADD_FAVORITE, beer };
}

export function removeFavoriteById(id) {
  return { type: REMOVE_FAVORITE, id }
}

export function loadFavorites() {
  return { type: LOAD_FAVORITE };
}
