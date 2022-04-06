import React, { useState } from 'react';
import PropTypes from 'prop-types';
import context from './MyContext';

function Provider({ children }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [foodRecipesList, setFoodRecipesList] = useState([]);
  const [drinksRecipesList, setDrinksRecipesList] = useState([]);
  const [foodCategories, setFoodCategories] = useState([]);
  const [drinkCategories, setDrinkCategories] = useState([]);
  const [f, setf] = useState({});
  const [drinks, setDrinks] = useState([]);
  const [foods, setFoods] = useState([]);
  const [countriesList, setCountriesList] = useState([]);

  const stateValues = {
    login,
    setLogin,
    password,
    setPassword,
    foodRecipesList,
    setFoodRecipesList,
    drinksRecipesList,
    setDrinksRecipesList,
    foodCategories,
    setFoodCategories,
    drinkCategories,
    setDrinkCategories,
    f,
    setf,
    drinks,
    setDrinks,
    foods,
    setFoods,
    countriesList,
    setCountriesList,
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
