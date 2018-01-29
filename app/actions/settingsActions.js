import { SAVE_SETTINGS, LOAD_SETTINGS } from './constants';

const saveSettingsSuccess = (settings) => {
  return dispatch => dispatch({ type: SAVE_SETTINGS, settings });
}

const saveSettingsPromise = (dispatch, settings) => new Promise((resolve, reject) => {
  dispatch(saveSettingsSuccess(settings));
  resolve();
});

export function saveSettings(settings) {
  return (dispatch, getState) => saveSettingsPromise(dispatch, settings);
}

export function loadSettings() {
  return { type: LOAD_SETTINGS };
}
