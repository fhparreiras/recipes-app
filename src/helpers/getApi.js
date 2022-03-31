export const getApiDrinks = (wSearch, src) => {
  const key = [];
  if (wSearch === 'name') key.push('s');
  if (wSearch === 'ingredient') {
    key.push('i');
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${key[0]}=${src}`;
    return url;
  }
  if (wSearch === 'first-letter') {
    if (src.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    key.push('f');
  }
  const url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?${key[0]}=${src}`;
  return url;
};

export const getFoodApi = (searchType) => {
  let queryA = '';
  let queryB = '';
  switch (searchType) {
  case 'ingredient':
    queryA = 'filter';
    queryB = 'i';
    break;
  case 'name':
    queryA = 'search';
    queryB = 's';
    break;
  default:
    queryA = 'search';
    queryB = 'f';
  }
  const url = `https://www.themealdb.com/api/json/v1/1/${queryA}.php?${queryB}=`;
  return url;
};
