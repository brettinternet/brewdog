import { LOAD_DATA_SUCCESS, SORT_DATA, NEXT_PAGE_SUCCESS } from '../actions/constants';
import objectAssign from 'object-assign';

const initialState = {
  data: [],
  // nextPageData: [],
  // nextPage: false,
};

export default function beer(state = initialState, action) {
  switch (action.type) {
    case LOAD_DATA_SUCCESS:
      // if (state.nextPage && state.nextPageData.length > 0)
        // return objectAssign({}, state, { data: state.nextPageData });
      // else
      return objectAssign({}, state, { data: action.data });
    case SORT_DATA:
      return objectAssign({}, state, { data: action.data });
    // case NEXT_PAGE_SUCCESS:
    //   if (action.nextPageData.length > 0)
    //     return objectAssign({}, state, { nextPage: true, nextPageData: action.nextPageData });
    //   else
    //     return objectAssign({}, state, { nextPage: false, nextPageData: [] });
    default:
      return state;
  }
}
