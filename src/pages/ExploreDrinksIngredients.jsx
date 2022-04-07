import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import DrinkIngredientsCard from '../components/cards/DrinkIngredientsCard';
import drinkIngredientsApi from '../helpers/drinkIngredientsApi';

function ExploreDrinksIngredients({ history }) {
  const [ingredients, setIngredients] = useState([]);
  const DOZE = 12;

  useEffect(() => {
    (async () => {
      const { drinks } = await drinkIngredientsApi('allIngredients');
      setIngredients(drinks);
    })();
  }, []);

  const firstIngredients = ingredients.slice(0, DOZE);

  return (
    <div>
      <Header title="Explore Ingredients" renderSearchBar={ false } />
      <DrinkIngredientsCard history={ history } value={ firstIngredients } />
      <Footer />
    </div>
  );
}

ExploreDrinksIngredients.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default ExploreDrinksIngredients;
