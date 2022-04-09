import React, { useEffect, useState, useContext } from 'react';
import copy from 'clipboard-copy';
import PropTypes from 'prop-types';
import { getDrinkRecommendationApi, getRecipeApi } from '../helpers/getApi';
import homeIcon from '../images/home.svg';
import shareIcon from '../images/shareIcon.svg';
import likedIcon from '../images/whiteHeartIcon.svg';
import context from '../context/MyContext';
import dislikedIcon from '../images/blackHeartIcon.svg';
import checkIfFavorited from '../extra-functions/extraFunctions';
import '../App.css';
import '../css/details.css';

function DetailsFoods({ history, location: { pathname } }) {
  const { setSavingFoodsIpAtLS, setFavoritedd } = useContext(context);

  const [chosenMealAsArray, setArray] = useState([]);
  const [chosenMeal, setMeal] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recommendedDrinks, setRecommended] = useState([]);
  const [copiedLinkAlert, setCopiedLinkAlert] = useState(false);
  const [favorited, setFavorited] = useState(false);

  const cortar = 7;
  // const arrayMaxLength = 3;
  const url = pathname.split('/');
  const id = url[2];

  const pastFavoritedMeal = JSON.parse(localStorage.getItem('favoriteRecipes'));

  const arrayIngredientsMeasures = (data) => {
    const mealAsArray = Object.entries(data[0]);
    setArray(mealAsArray);

    const ingred = mealAsArray.filter((each) => (each[0].includes('Ingredient')))
      .filter((each) => each[1] !== null && each[1] !== '');
    setIngredients(ingred);

    const measure = mealAsArray.filter((each) => (each[0].includes('Measure')))
      .filter((each) => each[1] !== null && each[1] !== '');
    const newMeasure = [...measure.map((each) => each[1])];
    setMeasures(newMeasure);
  };

  const getChosenMeal = async () => {
    const recommended = await getDrinkRecommendationApi();
    const sixRecommend = recommended.filter((_, index) => index < cortar - 1);
    setRecommended(sixRecommend);

    const data = await getRecipeApi(id);
    setMeal(data);

    arrayIngredientsMeasures(data);
  };

  const myStyle = {
    position: 'fixed',
    bottom: '0',
    left: '36%',
  };

  useEffect(() => {
    getChosenMeal();
    if (!pastFavoritedMeal) localStorage.setItem('favoriteRecipes', JSON.stringify([]));
    checkIfFavorited(setFavorited, id);
  }, []);

  const handleClick = () => {
    const ingredientList = chosenMealAsArray
      .filter((item) => (item[0].includes('strIngredient')))
      .filter((item) => item[1] !== '')
      .map((item) => item[1]);
    setSavingFoodsIpAtLS((prevState) => ({
      ...prevState,
      [id]: ingredientList }));
    history.push(`/foods/${id}/in-progress`);
  };

  const copyURLClipboard = () => {
    const invisibleElement = document.createElement('input');
    invisibleElement.value = window.location.href;
    document.body.appendChild(invisibleElement);
    invisibleElement.select();
    copy(invisibleElement.value);
    setCopiedLinkAlert(true);
    document.body.removeChild(invisibleElement);
  };

  const favoriteClick = () => {
    if (favorited) {
      setFavorited(false);
      const unfavoritedMeal = pastFavoritedMeal.filter((each) => (
        each.id !== chosenMeal[0].idMeal
      ));
      localStorage.setItem('favoriteRecipes', JSON.stringify(unfavoritedMeal));
    } else {
      setFavorited(true);

      const favoritedMeal = [...pastFavoritedMeal, {
        id: chosenMeal[0].idMeal,
        type: 'food',
        nationality: chosenMeal[0].strArea,
        category: chosenMeal[0].strCategory,
        alcoholicOrNot: '',
        name: chosenMeal[0].strMeal,
        image: chosenMeal[0].strMealThumb,
      }];
      localStorage.setItem('favoriteRecipes', JSON.stringify(favoritedMeal));
      setFavoritedd(favoritedMeal);
    }
  };

  return (
    <div>
      { (!chosenMeal[0]) ? (<h3>Loading...</h3>
      ) : (
        <div>
          <img
            src={ chosenMeal[0].strMealThumb }
            alt="meal"
            className="main-image"
            data-testid="recipe-photo"
          />
          <span className="title-and-icons-container">
            <span
              className="recipe-title"
              data-testid="recipe-title"
            >
              {chosenMeal[0].strMeal}
            </span>
            <span className="icons-container">
              <input
                type="image"
                src={ homeIcon }
                alt="home-button-icon"
                onClick={ () => history.push('/foods') }
              />
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
            {chosenMeal[0].strCategory}
          </p>
          <h4>Ingredients</h4>
          <table>
            <tbody>
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
                    {measures[index]}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <h4>Instructions</h4>
          <p
            className="p-instructions"
            data-testid="instructions"
          >
            {chosenMeal[0].strInstructions}
          </p>
          <div className="video-container">
            <video
              controls
              data-testid="video"
              src={ chosenMeal[0].strYoutube }
            >
              <track
                default
                kind="captions"
                srcLang="en"
                src=""
              />
            </video>
          </div>

          {(!recommendedDrinks) ? (<p>Loading</p>
          ) : (
            <div className="recommended-container">
              {recommendedDrinks.map((each, index) => (
                <div
                  className="recommended-card"
                  key={ index }
                  data-testid={ `${index}-recomendation-card` }
                >
                  <img src={ each.strDrinkThumb } alt={ `${each.strDrink}` } />
                  <p data-testid={ `${index}-recomendation-title` }>{each.strDrink}</p>
                </div>))}
            </div>)}

          <button
            style={ myStyle }
            type="button"
            data-testid="start-recipe-btn"
            onClick={ handleClick }
          >
            {' '}
            Start Recipe
            {' '}
          </button>
        </div>
      )}
    </div>

  );
}

DetailsFoods.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
  history: PropTypes.shape({ push: PropTypes.func }),
}.isRequired;

export default DetailsFoods;
