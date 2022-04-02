import React, { useState } from 'react';
import PropTypes from 'prop-types';
import copy from 'clipboard-copy';
import '../../css/card.css';
import shareIcon from '../../images/shareIcon.svg';

function DoneFoodCard({ index, recipe }) {
  const [foodLinkCopied, setFoodLinkCopied] = useState(false);

  const clipboardCopy = ({ target }) => {
    copy(`http://localhost:3000/foods/${target.id}`);
    setFoodLinkCopied(!foodLinkCopied);
  };

  return (
    <div key={ index } className="done-recipe-card">
      <img
        src={ recipe.image }
        alt={ recipe.name }
        data-testid={ `${index}-horizontal-image` }
      />
      <h4 data-testid={ `${index}-horizontal-top-text` }>
        { recipe.nationality }
        { ' - ' }
        { recipe.category }
      </h4>
      <h5 data-testid={ `${index}-horizontal-name` }>
        { recipe.name }
      </h5>
      <h6 data-testid={ `${index}-horizontal-done-date` }>
        { recipe.doneDate }
      </h6>
      <input
        type="image"
        data-testid={ `${index}-horizontal-share-btn` }
        id={ recipe.id }
        src={ shareIcon }
        alt="share-button-icon"
        onClick={ clipboardCopy }
      />
      <span data-testid={ `${index}-${recipe.tags[0]}-horizontal-tag` }>
        { recipe.tags[0] }
      </span>
      <span data-testid={ `${index}-${recipe.tags[1]}-horizontal-tag` }>
        { recipe.tags[1] }
      </span>
      <span>{ foodLinkCopied && 'Link copied!' }</span>
    </div>
  );
}

DoneFoodCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
};

export default DoneFoodCard;
