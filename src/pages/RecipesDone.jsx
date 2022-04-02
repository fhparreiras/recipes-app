import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import DoneFoodCard from '../components/cards/DoneFoodCard';
import DoneDrinkCard from '../components/cards/DoneDrinkCard';
import context from '../context/MyContext';

function RecipesDone({ history }) {
  const { recipesList, setRecipesList } = useContext(context);

  // const doneRecipes = JSON.parse(localStorage.getItem('doneRecipes'));
  const doneRecipes = [{
    id: '52771',
    type: 'food',
    nationality: 'Italian',
    category: 'Vegetarian',
    alcoholicOrNot: '',
    name: 'Spicy Arrabiata Penne',
    image: 'https://www.themealdb.com/images/media/meals/ustsqw1468250014.jpg',
    doneDate: '23/06/2020',
    tags: ['Pasta', 'Curry'],
  },
  { id: '178319',
    type: 'drink',
    nationality: '',
    category: 'Cocktail',
    alcoholicOrNot: 'Alcoholic',
    name: 'Aquamarine',
    image: 'https://www.thecocktaildb.com/images/media/drink/zvsre31572902738.jpg',
    doneDate: '23/06/2020',
    tags: [],
  },
  ];

  useEffect(() => {
    function setInitialList() {
      setRecipesList(doneRecipes);
    }
    setInitialList();
  }, []);

  const handleFilterBtn = ({ target }) => {
    if (target.name === 'drink') {
      const filteredByDrink = doneRecipes.filter((recipe) => recipe.type === 'drink');
      setRecipesList(filteredByDrink);
    } else if (target.name === 'food') {
      const filteredByFood = doneRecipes.filter((recipe) => recipe.type === 'food');
      setRecipesList(filteredByFood);
    } else {
      setRecipesList(doneRecipes);
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
        { recipesList !== null && recipesList.map((recipe, index) => (
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
