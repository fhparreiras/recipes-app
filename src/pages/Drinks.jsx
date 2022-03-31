import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function Drinks({ history }) {
  return (
    <Header title="Drinks" history={ history } renderSearchBar />
  );
}

Drinks.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Drinks;
