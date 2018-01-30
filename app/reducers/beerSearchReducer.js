import { LOAD_DATA_SUCCESS, SORT_DATA, CLEAR_SETTINGS } from '../actions/constants';

const initialState = {
  data: []
};

export default function beer(state = initialState.data, action) {
  switch (action.type) {
    case LOAD_DATA_SUCCESS:
      return { data: action.data };
    case SORT_DATA:
      return { data: action.data };
    case CLEAR_SETTINGS:
      return { data: [] };
    default:
      return state;
  }
}
