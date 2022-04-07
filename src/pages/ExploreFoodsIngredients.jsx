import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import foodIngredientsApi from '../helpers/foodIngredientsApi';
import FoodIngrendientsCard from '../components/cards/FoodIngredientsCard';

function ExploreFoodsIngredients({ history }) {
  const [ingredients, setIngredients] = useState([]);
  const DOZE = 12;

  useEffect(() => {
    (async () => {
      const { meals } = await foodIngredientsApi('allIngredients');
      setIngredients(meals);
    })();
  }, []);

  const firstIngredients = ingredients.slice(0, DOZE);

  return (
    <div>
      <Header title="Explore Ingredients" renderSearchBar={ false } />
      <FoodIngrendientsCard history={ history } value={ firstIngredients } />
      <Footer />
    </div>
  );
}

ExploreFoodsIngredients.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default ExploreFoodsIngredients;
