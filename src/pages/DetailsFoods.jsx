import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getFoodRecommendationApi, getRecipeApi } from '../helpers/getApi';
import shareIcon from '../images/shareIcon.svg';
import likeIcon from '../images/whiteHeartIcon.svg';

function DetailsFoods({ location: { pathname } }) {
  const [chosenMealAsArray, setArray] = useState([]);
  const [chosenMeal, setMeal] = useState([]);
  const [recommendedMeals, setRecommended] = useState([]);

  const cortar = 7;
  const url = pathname.split('/');
  const id = url[2];

  const getChosenMeal = async () => {
    const recommended = await getFoodRecommendationApi();
    // console.log('dentro de getChosenMeal: ', recommended);
    const sixRecommend = recommended.filter((_, index) => index < cortar - 1);
    setRecommended(sixRecommend);

    const data = await getRecipeApi(id);
    setMeal(data);

    const mealAsArray = Object.entries(data[0]);
    setArray(mealAsArray);
  };

  useEffect(() => {
    getChosenMeal();
  }, []);

  // const { meals } = recommendedMeals;
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
          { chosenMealAsArray
            .filter((each) => (each[0].includes('Ingredient')
            /* && each[0].includes('Measure') */))
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

          {(!recommendedMeals) ? (<p>Loading</p>
          ) : (
            recommendedMeals.map((each, index) => (
              <div key={ index } data-testid={ `${index}-recomendation-card` }>
                <img src={ each.strMealThumb } alt={ `${each.strMeal}` } />
                <p>{each.strMeal}</p>
              </div>)))}
          <Link to={ `/foods/${id}/in-progress` }>
            <button type="button" data-testid="start-recipe-btn"> Start Recipe </button>
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
