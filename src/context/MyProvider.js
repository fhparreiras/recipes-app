import React, { useState } from 'react';
import PropTypes from 'prop-types';
import context from './MyContext';

function Provider({ children }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [recipesList, setRecipesList] = useState([]);
  const [drinksList, setDrinksList] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [savingFoodsIpAtLS, setSavingFoodsIpAtLS] = useState(() => {
    const IngredientFoods = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (IngredientFoods === null) {
      return [];
    }
    return IngredientFoods.meals;
  });
  const [savingDrinksIpAtLS, setSavingDrinksIpAtLS] = useState(() => {
    const IngredientDrinks = JSON.parse(localStorage.getItem('inProgressRecipes'));
    if (IngredientDrinks === null) {
      return [];
    }
    return IngredientDrinks.cocktails;
  });

  const updateInProgressRecipes = () => {
    const toLsSaveData = {
      cocktails: {
        ...savingDrinksIpAtLS,
      },
      meals: {
        ...savingFoodsIpAtLS,
      },
    };
    const a = JSON.stringify(toLsSaveData);
    localStorage.setItem('inProgressRecipes', a);
  };

  const [checkedIngredient, setCheckedIngredient] = useState(() => {
    const checkedIngredientLS = JSON.parse(localStorage.getItem('inProgressChecked'));
    if (checkedIngredientLS === null) {
      return [];
    }
    return checkedIngredientLS;
  });

  const updateChecklist = () => {
    if (checkedIngredient !== []) {
      const b = JSON.stringify(checkedIngredient);
      localStorage.setItem('inProgressChecked', b);
    }
  };

  const [favorited, setFavorited] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem('Favorites'));
    if (favorites === null) {
      return [];
    }
    return favorites;
  });

  const updateFavorites = () => {
    if (favorited !== []) {
      const c = JSON.stringify(favorited);
      localStorage.setItem('Favorites', c);
    }
  };

  const stateValues = {
    login,
    setLogin,
    password,
    setPassword,
    recipesList,
    setRecipesList,
    drinksList,
    setDrinksList,
    foodCategories,
    setFoodCategories,
    drinkCategories,
    setDrinkCategories,
    savingFoodsIpAtLS,
    setSavingFoodsIpAtLS,
    savingDrinksIpAtLS,
    setSavingDrinksIpAtLS,
    checkedIngredient,
    setCheckedIngredient,
    updateInProgressRecipes,
    updateChecklist,
    favorited,
    setFavorited,
    updateFavorites,
  };

  return (
    <context.Provider value={ stateValues }>
      {children}
    </context.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Provider;
