import React, { useState, useEffect } from 'react';
import { require } from 'clipboard-copy';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { getDrinkRecipeApi, getFoodRecommendationApi } from '../helpers/getApi';
import shareIcon from '../images/shareIcon.svg';
import likedIcon from '../images/whiteHeartIcon.svg';
import dislikedIcon from '../images/blackHeartIcon.svg';
import checkIfFavorited from '../extra-functions/extraFunctions';

function DetailsDrink({ location: { pathname } }) {
  const [chosenDrink, setDrink] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recommendedMeals, setRecommended] = useState([]);
  const [copiedLinkAlert, setCopiedLinkAlert] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const cortar = 8;
  const arrayLength = 3;
  const url = pathname.split('/');
  const id = url[2];

  const pastFavoritedDrink = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const arrayIngredientsMeasures = (data) => {
    const drinkAsArray = Object.entries(data[0]);

    const ingred = drinkAsArray.filter((each) => (each[0].includes('Ingredient')))
      .filter((each) => each[1] !== null && each[1].length > 2);
    setIngredients(ingred);
    console.log(ingredients);

    setMeasures(drinkAsArray.filter((each) => (each[0].includes('Measure')))
      .filter((each) => each[1] !== null && each[1].length > arrayLength));
    console.log(measures);
  };

  const getChosenDrink = async () => {
    const recommended = await getFoodRecommendationApi();
    const sixRecommend = recommended.filter((_, index) => index < cortar - 2);
    setRecommended(sixRecommend);

    const data = await getDrinkRecipeApi(id);
    setDrink(data);

    arrayIngredientsMeasures(data);
  };

  useEffect(() => {
    getChosenDrink();
    if (!pastFavoritedDrink) localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    checkIfFavorited(setFavorited, id);
  }, []);

  const copyURLClipboard = () => {
    const invisibleElement = document.createElement('input');
    invisibleElement.value = window.location.href;
    document.body.appendChild(invisibleElement);
    invisibleElement.select();
    const copy = require('clipboard-copy');
    copy(invisibleElement.value);
    setCopiedLinkAlert(true);
    document.body.removeChild(invisibleElement);
  };

  const favoriteClick = () => {
    if (favorited) {
      setFavorited(false);
      const unfavoritedDrink = pastFavoritedDrink.filter((each) => (
        each.id !== chosenDrink[0].idDrink
      ));
      localStorage.setItem('favoriteRecipes', JSON.stringify(unfavoritedDrink));
    } else {
      setFavorited(true);

      const favoritedDrink = [...pastFavoritedDrink, {
        id: chosenDrink[0].idDrink,
        type: 'drink',
        nationality: '',
        category: chosenDrink[0].strCategory,
        alcoholicOrNot: chosenDrink[0].strAlcoholic,
        name: chosenDrink[0].strDrink,
        image: chosenDrink[0].strDrinkThumb,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoritedDrink));
    }
  };

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
          { copiedLinkAlert ? (<div>Link copied!</div>
          ) : (
            <input
              type="image"
              data-testid="share-btn"
              src={ shareIcon }
              alt="share-button-icon"
              onClick={ copyURLClipboard }
            />
          ) }
          <input
            type="image"
            data-testid="favorite-btn"
            src={ favorited ? dislikedIcon : likedIcon }
            alt="like-button-icon"
            onClick={ favoriteClick }
          />
          <p data-testid="recipe-category">{chosenDrink[0].strAlcoholic}</p>
          <table>
            <tr>
              { ingredients.map((each, index) => (
                <th
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {each[1]}
                </th>))}
            </tr>
            <tr>
              { measures.map((each, index) => (
                <td
                  key={ index }
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {each[1]}
                </td>
              ))}
            </tr>
          </table>
          <p data-testid="instructions">{chosenDrink[0].strInstructions}</p>

          {(!recommendedMeals) ? (<p>Loading</p>
          ) : (
            recommendedMeals.map((each, index) => (
              <div key={ index } data-testid={ `${index}-recomendation-card` }>
                <img src={ each.strMealThumb } alt={ `${each.strMeal}` } />
                <p>{each.strMeal}</p>
              </div>
            )))}
          <Link to={ `/drinks/${id}/in-progress` }>
            <button
              style={ { position: 'fixed', bottom: '0px' } }
              type="button"
              data-testid="start-recipe-btn"
            >
              {' '}
              Start Recipe
              {' '}

            </button>
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
