export default function sortBeers(data, value, asc) {
  if (value.toLowerCase() === 'id') return data.sort((a, b) => asc ? a.id - b.id : a.id + b.id);
  if (value.toLowerCase() === 'name') return data.sort((a, b) => asc ? sortByName(a, b) : -sortByName(a, b));
  if (value.toLowerCase() === 'abv') return data.sort((a, b) => asc ? a.abv - b.abv : a.abv + b.abv);
  if (value.toLowerCase() === 'first_brewed') return data.sort((a, b) => asc ? sortByFirstBrewed(a, b) : -sortByFirstBrewed(a, b));
};


function sortByName(a, b) {
  const x = a.name.toUpperCase(),
        y = b.name.toUpperCase();
  if (x < y) {
    return -1;
  }
  if (x > y) {
    return 1;
  }
  return 0;
}

function sortByFirstBrewed(a, b) {
  const x = new Date(a.first_brewed.split('/').reverse().join('/')),
        y = new Date(b.first_brewed.split('/').reverse().join('/'));
  if (x < y) {
    return -1;
  }
  if (x > y) {
    return 1;
  }
  return 0;
}
