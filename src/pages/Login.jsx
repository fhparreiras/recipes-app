import React from 'react';

function Login() {
  return (
    <div>
      <label htmlFor="login">
        Email
        <input
          type="text"
        />
      </label>

      <label htmlFor="password">
        Password
        <input
          type="password"
        />
      </label>

      <button
        type="button"
      >
        Entrar
      </button>
    </div>
  );
}

export default Login;
