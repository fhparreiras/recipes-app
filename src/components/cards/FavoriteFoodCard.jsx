import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import '../../css/card.css';
import shareIcon from '../../images/shareIcon.svg';
import favoriteIcon from '../../images/blackHeartIcon.svg';

function FavoriteFoodCard({ index, onFavoriteClick, recipe }) {
  const [drinkLinkCopied, setDrinkLinkCopied] = useState(false);

  const clipboardCopy = ({ target }) => {
    copy(`http://localhost:3000/foods/${target.id}`);
    setDrinkLinkCopied(!drinkLinkCopied);
  };

  return (
    <div key={ index } className="favorite-recipe-card">
      <Link to={ `/foods/${recipe.id}` }>
        <img
          className="details-recipe-img"
          src={ recipe.image }
          alt={ recipe.name }
          data-testid={ `${index}-horizontal-image` }
        />
      </Link>
      <h4 data-testid={ `${index}-horizontal-top-text` }>
        { recipe.nationality }
        { ' - ' }
        { recipe.category }
      </h4>
      <Link to={ `/foods/${recipe.id}` }>
        <h5 data-testid={ `${index}-horizontal-name` }>
          { recipe.name }
        </h5>
      </Link>
      <input
        type="image"
        data-testid={ `${index}-horizontal-share-btn` }
        id={ recipe.id }
        src={ shareIcon }
        alt="share-button-icon"
        onClick={ clipboardCopy }
      />
      <input
        type="image"
        data-testid={ `${index}-horizontal-favorite-btn` }
        id={ index }
        src={ favoriteIcon }
        alt="favorite-button-icon"
        onClick={ onFavoriteClick }
      />
      <span>{ drinkLinkCopied && 'Link copied!' }</span>
    </div>
  );
}

FavoriteFoodCard.propTypes = {
  index: PropTypes.number.isRequired,
  onFavoriteClick: PropTypes.func.isRequired,
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default FavoriteFoodCard;
