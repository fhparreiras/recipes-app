import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/explore.css';

function Explore({ history }) {
  return (
    <div>
      <Header title="Explore" renderSearchBar={ false } />
      <div>

        <button
          data-testid="explore-foods"
          onClick={ () => history.push('/explore/foods') }
          type="button"
          className="explore"
        >
          Explore Foods
        </button>
        <button
          data-testid="explore-drinks"
          onClick={ () => history.push('/explore/drinks') }
          type="button"
          className="explore"
        >
          Explore Drinks
        </button>
      </div>
      <Footer />
    </div>
  );
}

Explore.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Explore;
