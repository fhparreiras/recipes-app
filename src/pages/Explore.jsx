import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/explore.css';

function Explore({ history }) {
  return (
    <div>
      <Header title="Explore" renderSearchBar={ false } />
      <span className="buttons-container">
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
      </span>
      <Footer />
    </div>
  );
}

Explore.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Explore;
