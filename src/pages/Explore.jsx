import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

function Explore() {
  return (
    <div>
      <Header title="Explore" renderSearchBar={ false } />
      <Footer />
    </div>
  );
}

export default Explore;
