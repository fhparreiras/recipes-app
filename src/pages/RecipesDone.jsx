import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import DoneFoodCard from '../components/cards/DoneFoodCard';
import DoneDrinkCard from '../components/cards/DoneDrinkCard';

function RecipesDone({ location }) {
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
            <DoneFoodCard location={ location } index={ index } recipe={ recipe } />
          )
            : (
              <DoneDrinkCard location={ location } index={ index } recipe={ recipe } />
            )
        ))}
      </div>
    </>
  );
}

RecipesDone.propTypes = {
  location: PropTypes.shape({
    origin: PropTypes.string.isRequired,
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default RecipesDone;
