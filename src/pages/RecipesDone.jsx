import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import DoneFoodCard from '../components/cards/DoneFoodCard';
import DoneDrinkCard from '../components/cards/DoneDrinkCard';
import context from '../context/MyContext';

function RecipesDone({ history }) {
  const { foodRecipesList, setFoodRecipesList } = useContext(context);

  const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));

  useEffect(() => {
    function setInitialList() {
      setFoodRecipesList(doneRecipes);
    }
    setInitialList();
  }, []);

  const handleFilterBtn = ({ target }) => {
    if (target.name === 'drink') {
      const filteredByDrink = doneRecipes.filter((recipe) => recipe.type === 'drink');
      setFoodRecipesList(filteredByDrink);
    } else if (target.name === 'food') {
      const filteredByFood = doneRecipes.filter((recipe) => recipe.type === 'food');
      setFoodRecipesList(filteredByFood);
    } else {
      setFoodRecipesList(doneRecipes);
    }
  };

  return (
    <>
      <Header title="Done Recipes" renderSearchBar={ false } />
      <button
        name="all"
        type="button"
        data-testid="filter-by-all-btn"
        onClick={ handleFilterBtn }
      >
        All
      </button>
      <button
        name="food"
        onClick={ handleFilterBtn }
        type="button"
        data-testid="filter-by-food-btn"
      >
        Food
      </button>
      <button
        name="drink"
        onClick={ handleFilterBtn }
        type="button"
        data-testid="filter-by-drink-btn"
      >
        Drinks
      </button>
      <div className="done-recipes-container">
        { foodRecipesList !== null && foodRecipesList.map((recipe, index) => (
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
