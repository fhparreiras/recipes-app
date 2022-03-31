import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explore() {
  return (
    <div>
      <Header title="Explore" renderSearchBar={ false } />
      <button data-testid="explore-foods" type="button">
        Explore Foods
      </button>
      <button data-testid="explore-drinks" type="button">
        Explore Drinks
      </button>
      <Footer />
    </div>
  );
}

export default Explore;
