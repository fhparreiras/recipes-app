import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import context from '../context/MyContext';

function Login({ history }) {
  const {
    login,
    setLogin,
    password,
    setPassword,
  } = useContext(context);

  const [disabled, setDisabled] = useState(true);

  const isValid = () => {
    const regex = /^[a-z0-9.]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    const emailValid = regex.test(login);
    const MIN_LENGTH = 6; // sem magic numbers
    if (password.length >= MIN_LENGTH && emailValid) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  };

  const handleChangePassword = ({ target }) => {
    setPassword(target.value);
    isValid();
  };
  const handleChangeLogin = ({ target }) => {
    setLogin(target.value);
    isValid();
  };

  const handleClick = () => {
    // const list = JSON.stringify(listProduct); usar isso quando tivermos dados.
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    const email = JSON.stringify({ email: login });
    localStorage.setItem('user', email);
    history.push('/foods');
  };

  return (
    <div>
      <label htmlFor="login">
        Email
        <input
          type="text"
          data-testid="email-input"
          onChange={ handleChangeLogin }
        />
      </label>

      <label htmlFor="password">
        Password
        <input
          type="password"
          data-testid="password-input"
          onChange={ handleChangePassword }
        />
      </label>

      <button
        type="submit"
        data-testid="login-submit-btn"
        disabled={ disabled }
        onClick={ handleClick }
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
