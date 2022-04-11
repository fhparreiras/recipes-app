import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import context from '../../context/MyContext';

function DrinkIngredientsCard({ history, value }) {
  const { setDrinksRecipesList } = useContext(context);

  const cardClickHandler = async ({ target }) => {
    const url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${target.id}`;
    const response = await fetch(url);
    const result = await response.json();
    setDrinksRecipesList(result.drinks);
    history.push({
      pathname: '/drinks',
      prevPath: 'ingredients',
      ingredient: target.id,
    });
  };

  return (
    <div>
      {value.map((ingredient, index) => (
        <div
          aria-hidden="true"
          data-testid={ `${index}-ingredient-card` }
          key={ `${index}${ingredient.strIngredient1}` }
          id={ ingredient.strIngredient1 }
          onClick={ cardClickHandler }
          className="ingredient-card"
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
            alt={ `${ingredient.strIngredient1}` }
            id={ ingredient.strIngredient1 }
          />
          <p
            data-testid={ `${index}-card-name` }
            id={ ingredient.strIngredient1 }
          >
            {ingredient.strIngredient1}
          </p>
        </div>
      ))}
    </div>
  );
}

DrinkIngredientsCard.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  value: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

export default DrinkIngredientsCard;
