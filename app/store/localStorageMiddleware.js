import objectAssign from 'object-assign';
import {  ADD_FAVORITE,
          REMOVE_FAVORITE,
          LOAD_FAVORITE,
          SAVE_SETTINGS,
          LOAD_SETTINGS,
          CLEAR_SETTINGS, } from '../actions/constants';

export const localStorageMiddleware = store => next => action => {
  if (actionTypeEndsInFavorite(action.type)) {
    let favoritesKey = 'favorites',
        localFavoriteState = loadState(favoritesKey) || [];
    switch(action.type) {
      case LOAD_FAVORITE:
        let newAction = { type: action.type };
        newAction.favorites = localFavoriteState;
        return next(newAction);
      case ADD_FAVORITE:
        if (localFavoriteState.every(fav => fav.id !== action.beer.id)) {
          let addedToFavorites = [...localFavoriteState, action.beer];
          saveState(favoritesKey, addedToFavorites);
        }
        return next(action);
      case REMOVE_FAVORITE:
        let removedFromStorage = [...localFavoriteState.filter(beer => beer.id !== action.id)];
        saveState(favoritesKey, removedFromStorage);
        return next(action);
      default:
        return next(action);
    }
  } else if (actionTypeEndsInSettings(action.type)) {
    let settingsKey = 'settings',
        localSettingsState = loadState(settingsKey) || [];
    switch(action.type) {
      case LOAD_SETTINGS:
        let newAction = { type: action.type };
        newAction.settings = localSettingsState;
        return next(newAction);
      case SAVE_SETTINGS:
        const cleanSettings = removeSettingsKeys(objectAssign({}, action.settings))
        let addedToSettings = {...localSettingsState, ...cleanSettings};
        saveState(settingsKey, addedToSettings);
        return next(action);
      case CLEAR_SETTINGS:
        clearItem(settingsKey);
        return next(action);
      default:
        return next(action);
    }
  }
  return next(action);
}

export function loadState (key) {
  try {
    const serializedState = localStorage.getItem(key);
    if (serializedState === null)
      return undefined;
    return JSON.parse(serializedState);
  } catch (e) {
    return undefined;
  }
}

function saveState(key, state) {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(key, serializedState);
  } catch (e) {
    // ignore write errors.
  }
}

function clearItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (e) {
    // ignore delete error
  }
}

function removeSettingsKeys(settings) {
  delete settings['searchSubmitted']
  delete settings['favoritesToggled']
  return settings;
}

function actionTypeEndsInFavorite(type) {
  return type.substring(type.length - 9) == '_FAVORITE';
}

function actionTypeEndsInSettings(type) {
  return type.substring(type.length - 9) == '_SETTINGS';
}
