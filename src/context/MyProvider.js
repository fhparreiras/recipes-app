import React, { useState } from 'react';
import PropTypes from 'prop-types';
import context from './MyContext';

function Provider({ children }) {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [recipesList, setRecipesList] = useState([]);
  const [drinksList, setDrinksList] = useState([]);

  const stateValues = {
    login,
    setLogin,
    password,
    setPassword,
    recipesList,
    setRecipesList,
    drinksList,
    setDrinksList,
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
