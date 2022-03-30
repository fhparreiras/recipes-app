import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreDrinksIngredients() {
  return (
    <div>
      <Header title="Explore Ingredients" renderSearchBar={ false } />
      <Footer />
    </div>
  );
}

export default ExploreDrinksIngredients;
