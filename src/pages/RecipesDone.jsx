import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import DoneFoodCard from '../components/cards/DoneFoodCard';
import DoneDrinkCard from '../components/cards/DoneDrinkCard';

function RecipesDone({ history }) {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  return (
    <>
      <Header title="Done Recipes" renderSearchBar={ false } />
      <button
        type="button"
        data-testid="filter-by-all-btn"
      >
        All
      </button>
      <button type="button" data-testid="filter-by-food-btn">
        Food
      </button>
      <button type="button" data-testid="filter-by-drink-btn">
        Drinks
      </button>
      <div className="done-recipes-container">
        { doneRecipes !== null && doneRecipes.map((recipe, index) => (
          recipe.type === 'food' ? (
            <DoneFoodCard history={ history } index={ index } recipe={ recipe } />
          )
            : (
              <DoneDrinkCard history={ history } index={ index } recipe={ recipe } />
            )
        ))}
      </div>
    </>
  );
}

RecipesDone.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default RecipesDone;
