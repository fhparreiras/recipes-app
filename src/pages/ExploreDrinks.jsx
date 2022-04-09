import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/explore.css';

function ExploreDrinks({ history }) {
  const handleSurpriseBtn = async () => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/random.php';
    const response = await fetch(url);
    const result = await response.json();
    const { idDrink } = result.drinks[0];
    history.push(`/drinks/${idDrink}`);
  };

  return (
    <div>
      <Header title="Explore Drinks" renderSearchBar={ false } />
      <span className="buttons-container">
        <button
          data-testid="explore-by-ingredient"
          onClick={ () => history.push('/explore/drinks/ingredients') }
          type="button"
        >
          By Ingredient
        </button>
        <button
          data-testid="explore-surprise"
          onClick={ handleSurpriseBtn }
          type="button"
        >
          Surprise me!
        </button>
      </span>
      <Footer />
    </div>
  );
}

ExploreDrinks.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default ExploreDrinks;
