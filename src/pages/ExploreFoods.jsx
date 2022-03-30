import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function ExploreFoods() {
  return (
    <div>
      <Header title="Explore Foods" renderSearchBar={ false } />
      <Footer />
    </div>
  );
}

export default ExploreFoods;
