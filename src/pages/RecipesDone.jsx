import React from 'react';
import Header from '../components/Header';
import DoneFoodCard from '../components/cards/DoneFoodCard';
import DoneDrinkCard from '../components/cards/DoneDrinkCard';

function RecipesDone() {
  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  return (
    <>
      <Header title="Done Recipes" renderSearchBar={ false } />
      <button type="button" data-testid="filter-by-all-btn">
        All
      </button>
      <button type="button" data-testid="filter-by-food-btn">
        Food
      </button>
      <button type="button" data-testid="filter-by-drink-btn">
        Drinks
      </button>
      <div className="done-recipes-container">
        { doneRecipes.map((recipe, index) => (
          recipe.type === 'food' ? (
            <DoneFoodCard index={ index } recipe={ recipe } />
          )
            : (
              <DoneDrinkCard index={ index } recipe={ recipe } />
            )
        ))}
      </div>
    </>
  );
}

export default RecipesDone;
