import React from 'react';
import PropTypes from 'prop-types';

function FoodIngrendientsCard({ value }) {
  return (
    <div>
      {value.map((ingredient, index) => (
        <div
          data-testid={ `${index}-ingredient-card` }
          key={ ingredient.idIngredient }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
            alt={ ingredient.strDescription }

          />
          <p
            data-testid={ `${index}-card-name` }
          >
            {ingredient.strIngredient}
          </p>
        </div>
      ))}
    </div>
  );
}

FoodIngrendientsCard.propTypes = {
  value: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

export default FoodIngrendientsCard;
