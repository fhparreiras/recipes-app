import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreDrinks() {
  return (
    <div>
      <Header title="Explore Drinks" renderSearchBar={ false } />
      <Footer />
    </div>
  );
}

export default ExploreDrinks;
