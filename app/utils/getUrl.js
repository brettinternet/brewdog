export function getSearchUrl(searchSettings) {
  const { searchValue,
          searchBy,
          page,
          perPage,
          brewDate,
          brewSpec, } = searchSettings;
  let searchQuery = `${searchBy === 'food' ? 'food' : 'beer_name'}=${searchValue}`;
  let formattedDate;
  console.log(brewDate);
  if (brewDate) formattedDate = brewDate.format("MM-YYYY");
  let dateQuery = brewDate && brewSpec && `&${brewSpec}=${formattedDate}`;
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
