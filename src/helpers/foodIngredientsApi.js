import genericGetApi from './genericGetApi';

const INGREDIENT = 'https://www.themealdb.com/api/json/v1/1/filter.php?i=';
const ALLINGREDIENTS = 'https://www.themealdb.com/api/json/v1/1/list.php?i=list';

export default async function foodIngredientsApi(type, _value) {
  switch (type) {
  case 'INGREDIENT':
    return genericGetApi(`${INGREDIENT}${_value}`);
  case 'allIngredients':
    return genericGetApi(`${ALLINGREDIENTS}`);
  default:
    break;
  }
}
