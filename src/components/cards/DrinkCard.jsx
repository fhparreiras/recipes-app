import React from 'react';
import PropTypes from 'prop-types';
import '../../css/card.css';

function DrinkCard({ index, imgSrc, drinkName }) {
  return (
    <div className="recipe-card" data-testid={ `${index}-recipe-card` }>
      <img src={ imgSrc } alt={ drinkName } data-testid={ `${index}-card-img` } />
      <p data-testid={ `${index}-card-name` }>{ drinkName }</p>
    </div>
  );
}

DrinkCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  drinkName: PropTypes.string.isRequired,
};

export default DrinkCard;
