import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { getRecipeApi } from '../helpers/getApi';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import shareIcon from '../images/shareIcon.svg';
import context from '../context/MyContext';

function FoodsRecipeProgress({ history, location: { pathname } }) {
  const {
    setCheckedIngredient,
    checkedIngredient,
    updateInProgressRecipes,
    updateChecklist,
    favorited,
    setFavorited,
    updateFavorites,
  } = useContext(context);
  const [copyText, setCopyText] = useState(false);
  const [foodData, setFoodData] = useState([]);

  const id = pathname.split('/')[2];

  const gettingFoodData = async () => {
    const food = await getRecipeApi(id);
    setFoodData(Object.entries(food[0]));
  };

  useEffect(() => {
    gettingFoodData();
  }, []);

  useEffect(() => {
    gettingFoodData();
    updateInProgressRecipes();
    updateChecklist();
    updateFavorites();
  }, [checkedIngredient, favorited]);

  const copyToClipboard = () => {
    setCopyText(!copyText);
    copy(`http://localhost:3000/foods/${id}`);
  };

  const handleChange = ({ target }) => {
    const { name } = target;
    if (!checkedIngredient.find((item) => item === name)) { // coloca
      setCheckedIngredient([...checkedIngredient, name]);
    }
    if (checkedIngredient.find((item) => item === name)) { // retira
      setCheckedIngredient(checkedIngredient.filter((item) => item !== name));
    }
  };

  const favorites = () => {
    const name = foodData.filter((item) => item[0] === 'strMeal')[0][1];
    if (!favorited.find((item) => item === name)) { // coloca
      setFavorited([...favorited, name]);
    }
    if (favorited.find((item) => item === name)) { // retira
      setFavorited(favorited.filter((item) => item !== name));
    }
  };

  return (
    <div>
      <p>{ copyText && 'Link copied!' }</p>
      {foodData.length > 0 && (
        <div>
          <img
            src={ foodData.filter((item) => item[0] === 'strMealThumb')[0][1] }
            alt="imagem da receita"
            data-testid="recipe-photo"
          />
          <h3
            data-testid="recipe-title"
          >
            {foodData.filter((item) => item[0] === 'strMeal')[0][1]}
          </h3>
          <input
            type="image"
            alt="ícone do share-button"
            data-testid="share-btn"
            onClick={ copyToClipboard }
            src={ shareIcon }
          />
          <input
            type="image"
            data-testid="favorite-btn"
            src={ favorited.includes(foodData
              .filter((item) => item[0] === 'strMeal')[0][1])
              ? blackHeartIcon : whiteHeartIcon }
            alt="ícone do like-button"
            onClick={ favorites }
          />
          <h4
            data-testid="recipe-category"
          >
            {foodData.filter((item) => item[0] === 'strCategory')[0][1]}
          </h4>
          {foodData
            .filter((item) => (item[0].includes('strIngredient')))
            .filter((item) => item[1] !== null)
            .map((item, index) => (
              (item[1].length > 1
              ) && (
                <ul key={ index }>
                  <li
                    data-testid={ `${index}-ingredient-step` }
                  >
                    <input
                      checked={ checkedIngredient
                        .find((ingredients) => ingredients === item[1]) }
                      id={ index }
                      name={ item[1] }
                      type="checkbox"
                      onChange={ handleChange }
                    />
                    {item[1]}
                  </li>
                </ul>)
            ))}
          <p
            data-testid="instructions"
          >
            {foodData.filter((item) => item[0] === 'strInstructions')[0][1]}
          </p>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ !foodData
              .filter((item) => (item[0].includes('strIngredient')))
              .filter((item) => item[1] !== null)
              .filter((item) => item[1] !== '')
              .map((item) => item[1])
              .every((element) => checkedIngredient.includes(element)) }
            onClick={ () => history.push('/done-recipes') }
          >
            Finish Recipe
          </button>
        </div>
      )}
    </div>
  );
}

FoodsRecipeProgress.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default FoodsRecipeProgress;
