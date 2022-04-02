import React from 'react';
import PropTypes from 'prop-types';
import '../../css/card.css';
import shareIcon from '../../images/shareIcon.svg';

function DoneFoodCard({ index, recipe }) {
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
        src={ shareIcon }
        alt="share-button-icon"
      />
      <span data-testid={ `${index}-${recipe.tags[0]}-horizontal-tag` }>
        { recipe.tags[0] }
      </span>
      <span data-testid={ `${index}-${recipe.tags[1]}-horizontal-tag` }>
        { recipe.tags[1] }
      </span>
    </div>
  );
}

DoneFoodCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default DoneFoodCard;
