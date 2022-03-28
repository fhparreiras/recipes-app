import React from 'react';

function Login() {
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
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
