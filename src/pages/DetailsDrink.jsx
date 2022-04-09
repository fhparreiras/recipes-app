import React, { useState, useEffect, useContext } from 'react';
import { require } from 'clipboard-copy';
import PropTypes from 'prop-types';
import { getDrinkRecipeApi, getFoodRecommendationApi } from '../helpers/getApi';
import shareIcon from '../images/shareIcon.svg';
import likedIcon from '../images/whiteHeartIcon.svg';
import dislikedIcon from '../images/blackHeartIcon.svg';
import context from '../context/MyContext';
import checkIfFavorited from '../extra-functions/extraFunctions';
import '../App.css';
import '../css/details.css';

function DetailsDrink({ location: { pathname }, history }) {
  const { setSavingDrinksIpAtLS, setFavoritedd } = useContext(context);
  const [chosenDrinkAsArray, setArray] = useState([]);
  const [chosenDrink, setDrink] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recommendedMeals, setRecommended] = useState([]);
  const [copiedLinkAlert, setCopiedLinkAlert] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const cortar = 8;
  // const arrayLength = 3;
  const url = pathname.split('/');
  const id = url[2];

  const pastFavoritedDrink = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const arrayIngredientsMeasures = (data) => {
    const drinkAsArray = Object.entries(data[0]);
    setArray(drinkAsArray);

    const ingred = drinkAsArray.filter((each) => (each[0].includes('Ingredient')))
      .filter((each) => each[1] !== null && each[1] !== '');
    setIngredients(ingred);

    const measure = drinkAsArray.filter((each) => (each[0].includes('Measure')))
      .filter((each) => each[1] !== null && each[1] !== '');
    const newMeasure = [...measure.map((each) => each[1])];
    setMeasures(newMeasure);
  };

  const getChosenDrink = async () => {
    const recommended = await getFoodRecommendationApi();
    const sixRecommend = recommended.filter((_, index) => index < cortar - 2);
    setRecommended(sixRecommend);

    const data = await getDrinkRecipeApi(id);
    setDrink(data);

    arrayIngredientsMeasures(data);
  };

  const myStyle = {
    position: 'fixed',
    bottom: '0',
    left: '36%',
  };

  useEffect(() => {
    getChosenDrink();
    if (!pastFavoritedDrink) localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    checkIfFavorited(setFavorited, id);
  }, []);

  const handleClick = () => {
    const ingredientList = chosenDrinkAsArray
      .filter((item) => (item[0].includes('strIngredient')))
      .filter((item) => item[1] !== '')
      .map((item) => item[1]);

    setSavingDrinksIpAtLS((prevState) => ({
      ...prevState,
      [id]: ingredientList,
    }));
    history.push(`/drinks/${id}/in-progress`);
  };

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
      setFavoritedd(favoritedDrink);
    }
  };

  return (
    <div>
      { (!chosenDrink[0]) ? (<h3>Loading...</h3>
      ) : (
        <div>
          <img
            src={ chosenDrink[0].strDrinkThumb }
            alt="Drink"
            className="main-image"
            data-testid="recipe-photo"
          />
          <span className="title-and-icons-container">
            <span
              className="recipe-title"
              data-testid="recipe-title"
            >
              {chosenDrink[0].strDrink}
            </span>
            <span className="icons-container">
              { copiedLinkAlert ? (<div className="copied">Link copied!</div>
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
            </span>
          </span>
          <p
            className="category"
            data-testid="recipe-category"
          >
            {chosenDrink[0].strAlcoholic}
          </p>
          <h4>Ingredients</h4>
          <table>
            { ingredients.map((each, index) => (
              <tr key={ index }>
                <td
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  {'- '}
                  {each[1]}
                </td>
                <td
                  data-testid={ `${index}-ingredient-name-and-measure` }
                >
                  { measures[index] }
                </td>
              </tr>
            ))}
          </table>
          <h4>Instructions</h4>
          <p
            className="p-instructions"
            data-testid="instructions"
          >
            {chosenDrink[0].strInstructions}
          </p>

          {(!recommendedMeals) ? (<h3>Loading...</h3>
          ) : (
            <div className="recommended-container">
              {recommendedMeals.map((each, index) => (
                <div
                  className="recommended-card"
                  key={ index }
                  data-testid={ `${index}-recomendation-card` }
                >
                  <img src={ each.strMealThumb } alt={ `${each.strMeal}` } />
                  <p data-testid={ `${index}-recomendation-title` }>{each.strMeal}</p>
                </div>
              ))}
            </div>)}
          <button
            style={ myStyle }
            className="start-recipe-btn"
            type="button"
            data-testid="start-recipe-btn"
            onClick={ handleClick }
          >
            {' '}
            Start Recipe
            {' '}
          </button>
        </div>)}
    </div>
  );
}

DetailsDrink.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
  history: PropTypes.shape({ push: PropTypes.func }),
}.isRequired;

export default DetailsDrink;
