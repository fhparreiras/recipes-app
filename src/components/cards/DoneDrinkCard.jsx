import React, { useState } from 'react';
import PropTypes from 'prop-types';
// import copy from 'clipboard-copy';
import '../../css/card.css';
import shareIcon from '../../images/shareIcon.svg';

function DoneDrinkCard({ index, recipe }) {
  const [linkCopied, setLinkCopied] = useState(false);

  const clipboardCopy = () => {
    setLinkCopied(!linkCopied);
  };

  return (
    <div key={ index } className="done-recipe-card">
      <img
        src={ recipe.image }
        alt={ recipe.name }
        data-testid={ `${index}-horizontal-image` }
      />
      <h4 data-testid={ `${index}-horizontal-top-text` }>
        { recipe.alcoholicOrNot }
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
        onClick={ clipboardCopy }
      />
      {/* <span>{ linkCopied && 'Link copied!' }</span> */}
    </div>
  );
}

DoneDrinkCard.propTypes = {
  index: PropTypes.number.isRequired,
  recipe: PropTypes.objectOf(PropTypes.string).isRequired,
};

export default DoneDrinkCard;
