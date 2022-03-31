import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoodsIngredients() {
  return (
    <div>
      <Header title="Explore Ingredients" renderSearchBar={ false } />
      <Footer />
    </div>
  );
}

export default ExploreFoodsIngredients;
