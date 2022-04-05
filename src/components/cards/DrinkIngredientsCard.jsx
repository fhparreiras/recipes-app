import React from 'react';
import PropTypes from 'prop-types';

function DrinkIngredientsCard({ value }) {
  return (
    <div>
      {value.map((ingredient, index) => (
        <div
          data-testid={ `${index}-ingredient-card` }
          key={ `${index}${ingredient.strIngredient1}` }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient1}-Small.png` }
            alt={ `${ingredient.strIngredient1}` }

          />
          <p
            data-testid={ `${index}-card-name` }
          >
            {ingredient.strIngredient1}
          </p>
        </div>
      ))}
    </div>
  );
}

DrinkIngredientsCard.propTypes = {
  value: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

export default DrinkIngredientsCard;
