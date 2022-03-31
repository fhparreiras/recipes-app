import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explore({ history }) {
  return (
    <div>
      <Header title="Explore" renderSearchBar={ false } />
      <button
        data-testid="explore-foods"
        onClick={ () => history.push('/explore/foods') }
        type="button"
      >
        Explore Foods
      </button>
      <button
        data-testid="explore-drinks"
        onClick={ () => history.push('/explore/drinks') }
        type="button"
      >
        Explore Drinks
      </button>
      <Footer />
    </div>
  );
}

Explore.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Explore;
