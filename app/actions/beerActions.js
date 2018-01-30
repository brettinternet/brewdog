import { LOAD_DATA_SUCCESS, SORT_DATA } from './constants';
import { beginAjaxCall, ajaxCallError } from './ajaxStatusActions';
import request from '../utils/request';
import sortBeers from '../utils/sort';
import { loadState } from '../store/localStorageMiddleware';

const loadDataSuccess = (data) => {
  return { type: LOAD_DATA_SUCCESS, data };
}

const loadDataError = (error) => {
  return { type: 'LOAD_DATA_ERROR', error };
}

export const searchData = (urlObj, sortBy, asc) => {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return request(urlObj.url)
      .then(data => sortBy && sortBy !== 'id' ? sortBeers(data, sortBy, asc) : data)
      .then(sortedData => dispatch(loadDataSuccess(sortedData)))
      .catch(error => {
        console.error(error);
        dispatch(loadDataError(error))
      });
  };
}

export function sortData(data, sortBy, asc) {
  return { type: SORT_DATA, data: sortBeers(data, sortBy, asc) }
}

export function viewFavorites () {
  return (dispatch) => {
    dispatch(beginAjaxCall());
    return dispatch(loadDataSuccess(loadState('favorites')));
  }
}

// const loadNextPageSearchSuccess = (nextPageData) => {
//   return { type: NEXT_PAGE_SUCCESS, nextPageData }
// }
//
// const loadNextPageSearch = (urlObj, sortBy, asc) => {
//   return (dispatch) => {
//     dispatch(beginAjaxCall());
//     return request(urlObj.nextPageUrl)
//       .then(data => sortBy && sortBy !== 'id' ? sortBeers(data, sortBy, asc) : data)
//       .then(sortedData => dispatch(loadNextPageSearchSuccess(sortedData)))
//       .catch(error => {
//         console.error(error);
//         dispatch(loadDataError(error))
//       });
//   };
// }

// export function searchData(urlObj, sortBy, asc) {
//   return (dispatch, getState) => {
//     return dispatch(loadData(urlObj, sortBy, asc))
//       .then(() => {
//         if (!urlObj.random)
//           return dispatch(loadNextPageSearch(urlObj, sortBy, asc));
//       });
//   }
// }
