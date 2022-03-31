import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';

function Foods({ history }) {
  return (
    <Header title="Foods" history={ history } renderSearchBar />
  );
}
Foods.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};
export default Foods;
