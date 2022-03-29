import React from 'react';
import PropTypes from 'prop-types';

function Login({ history }) {
  return (
    <div>
      <label htmlFor="login">
        Email
        <input
          type="text"
          data-testid="email-input"
        />
      </label>

      <label htmlFor="password">
        Password
        <input
          type="password"
          data-testid="password-input"
        />
      </label>

      <button
        type="button"
        data-testid="login-submit-btn"
        onClick={ () => history.push('/foods') }
      >
        Entrar
      </button>
    </div>
  );
}

Login.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Login;
