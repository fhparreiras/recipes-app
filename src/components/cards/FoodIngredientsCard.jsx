import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import context from '../../context/MyContext';
import '../../css/explore.css';

function FoodIngrendientsCard({ history, value }) {
  const { setFoodRecipesList } = useContext(context);

  const cardClickHandler = async ({ target }) => {
    const url = `https://www.themealdb.com/api/json/v1/1/filter.php?i=${target.id}`;
    const response = await fetch(url);
    const result = await response.json();
    setFoodRecipesList(result.meals);
    history.push({
      pathname: '/foods',
      prevPath: 'ingredients',
      ingredient: target.id,
    });
  };

  return (
    <div>
      {value.map((ingredient, index) => (
        <div
          aria-hidden="true"
          className="ingredient-card"
          data-testid={ `${index}-ingredient-card` }
          key={ ingredient.idIngredient }
          id={ ingredient.strIngredient }
          onClick={ cardClickHandler }
        >
          <img
            data-testid={ `${index}-card-img` }
            src={ `https://www.themealdb.com/images/ingredients/${ingredient.strIngredient}-Small.png` }
            alt={ ingredient.strDescription }
            name={ ingredient.strIngredient }
            id={ ingredient.strIngredient }
          />
          <p
            data-testid={ `${index}-card-name` }
            id={ ingredient.strIngredient }
          >
            {ingredient.strIngredient}
          </p>
        </div>
      ))}
    </div>
  );
}

FoodIngrendientsCard.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  value: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

export default FoodIngrendientsCard;
