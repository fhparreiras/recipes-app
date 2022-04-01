import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes da TELA DE LOGIN', () => {
  test('Todos os inputs e button da tela devem estar presentes', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const inputPassword = screen.getByTestId('password-input');
    const loginBtn = screen.getByTestId('login-submit-btn');

    expect(inputEmail).toBeDefined();
    expect(inputPassword).toBeDefined();
    expect(loginBtn).toBeDefined();
  });

  test('A pessoa deve conseguir escrever seu email no input de email', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId('email-input');
    const TYPED_EMAIL = 'email@email.com';
    userEvent.type(inputEmail, TYPED_EMAIL);

    expect(inputEmail).toHaveValue(TYPED_EMAIL);
  });

  test('A pessoa deve conseguir escrever sua senha no input de senha', () => {
    renderWithRouter(<App />);
    const inputPassword = screen.getByTestId('password-input');
    const TYPED_PASSWORD = 'xablau1234567';
    userEvent.type(inputPassword, TYPED_PASSWORD);

    expect(inputPassword).toHaveValue(TYPED_PASSWORD);
  });
});
