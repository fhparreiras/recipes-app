import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/explore.css';

function ExploreFoods({ history }) {
  const handleSurpriseBtn = async () => {
    const url = 'https://www.themealdb.com/api/json/v1/1/random.php';
    const response = await fetch(url);
    const result = await response.json();
    const { idMeal } = result.meals[0];
    history.push(`/foods/${idMeal}`);
  };

  return (
    <div>
      <Header
        title="Explore Foods"
        renderSearchBar={ false }
        style={ { fontSize: '20px' } }
      />
      <button
        data-testid="explore-by-ingredient"
        onClick={ () => history.push('/explore/foods/ingredients') }
        type="button"
        className="explore-foods"
      >
        By Ingredient
      </button>
      <button
        data-testid="explore-by-nationality"
        onClick={ () => history.push('/explore/foods/nationalities') }
        type="button"
        className="explore-foods"
      >
        By Nationality
      </button>
      <button
        data-testid="explore-surprise"
        onClick={ handleSurpriseBtn }
        type="button"
        className="explore-foods"
      >
        Surprise me!
      </button>
      <Footer />
    </div>
  );
}

ExploreFoods.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default ExploreFoods;
