import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import { getDrinkRecipeApi } from '../helpers/getApi';
import shareIcon from '../images/shareIcon.svg';
import blackHeartIcon from '../images/blackHeartIcon.svg';
import whiteHeartIcon from '../images/whiteHeartIcon.svg';
import context from '../context/MyContext';

function DrinksRecipeProgress({ location: { pathname }, history }) {
  const {
    setCheckedIngredient,
    checkedIngredient,
    updateInProgressRecipes,
    updateChecklist,
    favorited,
    setFavorited,
    updateFavorites,
  } = useContext(context);
  const [drinkData, setDrinkData] = useState([]);
  const [copyText, setCopyText] = useState(false);
  // const [finishBtnD, setFinishBtnD] = useState(true);

  const id = pathname.split('/')[2];

  const gettingDrinkData = async () => {
    const drink = await getDrinkRecipeApi(id);
    setDrinkData(Object.entries(drink[0]));
  };

  useEffect(() => {
    gettingDrinkData();
    updateInProgressRecipes();
    updateChecklist();
    updateFavorites();
  }, [checkedIngredient, favorited]);

  const copyToClipboard = () => {
    setCopyText(!copyText);
    copy(`http://localhost:3000/drinks/${id}`);
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
    const name = drinkData.filter((item) => item[0] === 'strDrink')[0][1];
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
      {drinkData.length > 0 && (
        <div>
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
            onClick={ copyToClipboard }
            src={ shareIcon }
          />
          <input
            type="image"
            data-testid="favorite-btn"
            src={ favorited.includes(drinkData
              .filter((item) => item[0] === 'strDrink')[0][1])
              ? blackHeartIcon : whiteHeartIcon }
            alt="ícone do like-button"
            onClick={ favorites }
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
                    key={ index }
                    data-testid={ `${index}-ingredient-step` }
                  >
                    <input
                      checked={ checkedIngredient
                        .find((ingredients) => ingredients === item[1]) }
                      name={ item[1] }
                      id={ index }
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
            {drinkData.filter((item) => item[0] === 'strInstructions')[0][1]}
          </p>
          <button
            type="button"
            data-testid="finish-recipe-btn"
            disabled={ !drinkData
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

DrinksRecipeProgress.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default DrinksRecipeProgress;
