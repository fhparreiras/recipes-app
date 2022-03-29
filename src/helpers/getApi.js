export const getApi = async () => {
  const response = await fetch('');
  const result = await response.json();
  return result;
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
