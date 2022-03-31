export const getApiDrinks = async (wSearch, src, setDrinksList) => {
  const key = [];
  if (wSearch === 'name') key.push('s');
  if (wSearch === 'ingredient') {
    key.push('i');
    const response = await fetch(
      `https://www.thecocktaildb.com/api/json/v1/1/filter.php?${key[0]}=${src}`,
    );
    const result = await response.json();
    // console.log(key, src);
    // console.log(result);
    return result;
  }
  if (wSearch === 'first-letter') {
    if (src.length > 1) {
      return global.alert('Your search must have only 1 (one) character');
    }
    key.push('f');
  }
  const response = await fetch(
    `https://www.thecocktaildb.com/api/json/v1/1/search.php?${key[0]}=${src}`,
  );
  const result = await response.json();
  // console.log(key, src);
  // console.log(result);
  return setDrinksList(result.drinks);
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

export const getRecipeApi = async (id) => {
  const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(url);
  const { meals } = await response.json();

  return meals;
};

export const getDrinkRecipeApi = async (id) => {
  const url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  const response = await fetch(url);
  const { drinks } = await response.json();
  return drinks;
};

export const getFoodRecommendationApi = async () => {
  const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s='; // ${id}
  const response = await fetch(url);
  const { meals } = await response.json();
  console.log(meals);
  return meals;
};

export const getDrinkRecommendationApi = async () => {
  const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s='; // ${id}
  const response = await fetch(url);
  const { drinks } = await response.json();
  return drinks;
};
