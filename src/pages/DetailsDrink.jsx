import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getDrinkRecipeApi, getDrinkRecommendationApi } from '../helpers/getApi';
import shareIcon from '../images/shareIcon.svg';
import likeIcon from '../images/whiteHeartIcon.svg';

function DetailsDrink({ location: { pathname } }) {
  const [chosenDrinkAsArray, setArray] = useState([]);
  const [chosenDrink, setDrink] = useState([]);
  const [recommendedDrinks, setRecommended] = useState([]);

  const cortar = 8;
  // const salvar = 5;
  const url = pathname.split('/');
  const id = url[2];

  const getChosenDrink = async () => {
    const recommended = await getDrinkRecommendationApi();
    const sixRecommend = recommended.filter((_, index) => index < cortar - 2);
    setRecommended(sixRecommend);

    const data = await getDrinkRecipeApi(id);
    setDrink(data);

    const drinkAsArray = Object.entries(data[0]);
    setArray(drinkAsArray);
  };

  useEffect(() => {
    getChosenDrink();
  }, []);

  return (
    <div>
      { (!chosenDrink[0]) ? (<p>Loading</p>
      ) : (
        <div>
          <img
            src={ chosenDrink[0].strDrinkThumb }
            alt="Drink"
            data-testid="recipe-photo"
          />
          <title data-testid="recipe-title">{chosenDrink[0].strDrink}</title>
          <input
            type="image"
            data-testid="share-btn"
            src={ shareIcon }
            alt="share-button-icon"
          />
          <input
            type="image"
            data-testid="favorite-btn"
            src={ likeIcon }
            alt="like-button-icon"
          />
          <p data-testid="recipe-category">{chosenDrink[0].strCategory}</p>
          { chosenDrinkAsArray
            .filter((each) => (each[0].includes('Ingredient')))
            .filter((each) => each[1] !== null)
            .map((each, index) => (
              (each[1].length > 1
              ) && (
                <ul key={ index }>
                  <li
                    data-testid={ `${index}-ingredient-name-and-measure` }
                  >
                    {each[1]}
                  </li>
                </ul>)
            ))}
          <p data-testid="instructions">{chosenDrink[0].strInstructions}</p>

          {(!recommendedDrinks) ? (<p>Loading</p>
          ) : (
            recommendedDrinks.map((each, index) => (
              <div key={ index }>
                <img src={ each.strDrinkThumb } alt={ `${each.strDrink}` } />
                <p>{each.strDrink}</p>
              </div>
            )))}
          <Link to={ `/drinks/${id}/in-progress` }>
            <button type="button" data-testid="start-recipe-btn"> Start Recipe </button>
          </Link>
        </div>)}
    </div>
  );
}

DetailsDrink.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default DetailsDrink;
