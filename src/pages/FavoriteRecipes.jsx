import React, { useContext, useEffect } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import FavoriteFoodCard from '../components/cards/FavoriteFoodCard';
import FavoriteDrinkCard from '../components/cards/FavoriteDrinkCard';
import context from '../context/MyContext';

function FavoriteRecipes({ history }) {
  const { foodRecipesList, setFoodRecipesList } = useContext(context);

  const favoriteRecipes = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const removeFavorite = ({ target }) => {
    favoriteRecipes.splice(target.id, 1);
    setFoodRecipesList(favoriteRecipes);
    localStorage.setItem('favoriteRecipes', JSON.stringify(favoriteRecipes));
  };

  useEffect(() => {
    const setInitialList = () => {
      setFoodRecipesList(favoriteRecipes);
    };
    setInitialList();
  }, []);

  const handleFilterBtn = ({ target }) => {
    if (target.name === 'drink') {
      const filteredByDrink = favoriteRecipes.filter((recipe) => recipe.type === 'drink');
      setFoodRecipesList(filteredByDrink);
    } else if (target.name === 'food') {
      const filteredByFood = favoriteRecipes.filter((recipe) => recipe.type === 'food');
      setFoodRecipesList(filteredByFood);
    } else {
      setFoodRecipesList(favoriteRecipes);
    }
  };

  return (
    <>
      <Header
        title="Favorite Recipes"
        renderSearchBar={ false }
        style={ { fontSize: '18px' } }
      />
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
      <div className="favorite-recipes-container">
        { foodRecipesList !== null && foodRecipesList.map((recipe, index) => (
          recipe.type === 'food' ? (
            <FavoriteFoodCard
              history={ history }
              index={ index }
              recipe={ recipe }
              onFavoriteClick={ removeFavorite }
            />
          )
            : (
              <FavoriteDrinkCard
                history={ history }
                index={ index }
                recipe={ recipe }
                onFavoriteClick={ removeFavorite }
              />
            )
        ))}
      </div>
    </>
  );
}

FavoriteRecipes.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default FavoriteRecipes;
