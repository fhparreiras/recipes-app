import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getDrinkRecommendationApi, getRecipeApi } from '../helpers/getApi';
import shareIcon from '../images/shareIcon.svg';
import likeIcon from '../images/whiteHeartIcon.svg';
import '../App.css';

function DetailsFoods({ location: { pathname } }) {
  const [chosenMeal, setMeal] = useState([]);
  // const [chosenMealAsArray, setArray] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [measures, setMeasures] = useState([]);
  const [recommendedDrinks, setRecommended] = useState([]);

  const cortar = 7;
  const arrayLength = 3;
  const url = pathname.split('/');
  const id = url[2];

  const arrayIngredientsMeasures = (data) => {
    const mealAsArray = Object.entries(data[0]);

    const ingred = mealAsArray.filter((each) => (each[0].includes('Ingredient')))
      .filter((each) => each[1] !== null && each[1].length > 2);
    setIngredients(ingred);
    console.log(ingredients);

    setMeasures(mealAsArray.filter((each) => (each[0].includes('Measure')))
      .filter((each) => each[1] !== null && each[1].length > arrayLength));
    console.log(measures);
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
  };

  useEffect(() => {
    getChosenMeal();
  }, []);

  return (
    <div>
      { (!chosenMeal[0]) ? (<p>Loading</p>
      ) : (
        <div>
          <img
            src={ chosenMeal[0].strMealThumb }
            alt="meal"
            data-testid="recipe-photo"
          />
          <title data-testid="recipe-title">{chosenMeal[0].strMeal}</title>
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
          <p data-testid="recipe-category">{chosenMeal[0].strCategory}</p>
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

          <p data-testid="instructions">{chosenMeal[0].strInstructions}</p>
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

          {(!recommendedDrinks) ? (<p>Loading</p>
          ) : (
            recommendedDrinks.map((each, index) => (
              <div key={ index } data-testid={ `${index}-recomendation-card` }>
                <img src={ each.strDrinkThumb } alt={ `${each.strDrink}` } />
                <p>{each.strDrink}</p>
              </div>)))}
          <Link to={ `/foods/${id}/in-progress` }>
            <button
              style={ myStyle }
              type="button"
              data-testid="start-recipe-btn"
            >
              {' '}
              Start Recipe
              {' '}
            </button>
          </Link>
        </div>
      )}
    </div>

  );
}

DetailsFoods.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default DetailsFoods;
