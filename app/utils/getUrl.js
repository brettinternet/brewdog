import Moment from 'moment';

export function getSearchUrl(searchSettings) {
  const { searchValue,
          searchBy,
          page,
          perPage,
          brewDate,
          brewSpec, } = searchSettings;
  const searchQuery = `${searchBy === 'food' ? 'food' : 'beer_name'}=${searchValue}`;
  const dateQuery = brewDate && brewSpec && `&${brewSpec}=${Moment(brewDate).format("MM-YYYY")}`;
  // let nextPageUrl;
  // if (pageForward)
  //   nextPageUrl = `https://api.punkapi.com/v2/beers?${searchQuery}&page=${page + 1 || 1}&per_page=${perPage || 20}`;
  // else
  //   nextPageUrl = `https://api.punkapi.com/v2/beers?${searchQuery}&page=${page > 1 ? page - 1 : 1}&per_page=${perPage || 20}`;
  return {
    url: `https://api.punkapi.com/v2/beers?${searchQuery}&page=${page || 1}&per_page=${perPage || 20}${dateQuery ? dateQuery : ''}`,
    // nextPageUrl,
    searchQuery,
    page,
    perPage,
  }
}

export function getRandomUrl() {
  return { url: 'https://api.punkapi.com/v2/beers/random', random: true };
}
