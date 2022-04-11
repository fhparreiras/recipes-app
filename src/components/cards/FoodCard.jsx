import React from 'react';
import PropTypes from 'prop-types';
import '../../css/card.css';

function FoodCard({ index, imgSrc, recipeName }) {
  return (
    <div key={ index } className="recipe-card" data-testid={ `${index}-recipe-card` }>
      <img src={ imgSrc } alt={ recipeName } data-testid={ `${index}-card-img` } />
      <span data-testid={ `${index}-card-name` }>{ recipeName }</span>
    </div>
  );
}

FoodCard.propTypes = {
  imgSrc: PropTypes.string.isRequired,
  index: PropTypes.string.isRequired,
  recipeName: PropTypes.string.isRequired,
};

export default FoodCard;
