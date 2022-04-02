import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getDrinkRecipeApi } from '../helpers/getApi';
import shareIcon from '../images/shareIcon.svg';
import likeIcon from '../images/whiteHeartIcon.svg';

function DrinksRecipeProgress({ location: { pathname } }) {
  const [drinkData, setDrinkData] = useState([]);
  const url = pathname.split('/');
  const id = url[2];

  const gettingDrinkData = async () => {
    const drink = await getDrinkRecipeApi(id);
    setDrinkData(Object.entries(drink[0]));
  };
  useEffect(() => {
    gettingDrinkData();
  }, []);

  return (
    <div>
      {drinkData.length > 0 && (
        <div>
          {console.log('passou', drinkData)}
          <img
            src={ drinkData.filter((item) => item[0] === 'strDrinkThumb')[0][1] }
            alt="imagem da receita"
            data-testid="recipe-photo"
          />
          <h3
            data-testid="recipe-title"
          >
            {drinkData.filter((item) => item[0] === 'strDrink')[0][1]}
          </h3>
          <input
            type="image"
            alt=" ícone do share-button"
            data-testid="share-btn"
            src={ shareIcon }
          />
          <input
            type="image"
            data-testid="favorite-btn"
            src={ likeIcon }
            alt="ícone do like-button"
          />
          <h4
            data-testid="recipe-category"
          >
            {drinkData.filter((item) => item[0] === 'strCategory')[0][1]}
          </h4>
          {drinkData
            .filter((item) => (item[0].includes('strIngredient')))
            .filter((item) => item[1] !== null)
            .map((item, index) => (
              (item[1].length > 1
              ) && (
                <ul key={ index }>
                  <li
                    data-testid={ `data-testid=${index}-ingredient-step` }
                  >
                    <input type="checkbox" />
                    {item[1]}
                  </li>
                </ul>)
            ))}
          <p
            data-testid="instructions"
          >
            {drinkData.filter((item) => item[0] === 'strInstructions')[0][1]}
          </p>
          <button
            type="button"
            data-testid="finish-recipe-btn"
          >
            Finish Recipe
          </button>
        </div>
      )}
    </div>
  );
}

DrinksRecipeProgress.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default DrinksRecipeProgress;
