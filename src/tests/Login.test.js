import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';
import { EMAIL_INPUT, LOGIN_BTN, PASSWORD_INPUT } from './literals';

describe('Testes da TELA DE LOGIN', () => {
  test('Todos os inputs e button da tela devem estar presentes', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(EMAIL_INPUT);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT);
    const loginBtn = screen.getByTestId(LOGIN_BTN);

    expect(inputEmail).toBeDefined();
    expect(inputPassword).toBeDefined();
    expect(loginBtn).toBeDefined();
  });

  test('A pessoa deve conseguir escrever seu email no input de email', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(EMAIL_INPUT);
    const TYPED_EMAIL = 'email@email.com';

    userEvent.type(inputEmail, TYPED_EMAIL);

    expect(inputEmail).toHaveValue(TYPED_EMAIL);
  });

  test('A pessoa deve conseguir escrever sua senha no input de senha', () => {
    renderWithRouter(<App />);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT);
    const TYPED_PASSWORD = 'xablau1234567';

    userEvent.type(inputPassword, TYPED_PASSWORD);

    expect(inputPassword).toHaveValue(TYPED_PASSWORD);
  });

  test('O formulário é válido só após a senha ter pelo menos 6 caracteres', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(EMAIL_INPUT);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT);
    const loginBtn = screen.getByTestId(LOGIN_BTN);
    const TYPED_EMAIL = 'emailTest@email.com';
    let TYPED_PASSWORD = 'xablau';

    userEvent.type(inputEmail, TYPED_EMAIL);
    userEvent.type(inputPassword, TYPED_PASSWORD);
    expect(inputPassword).toHaveValue(TYPED_PASSWORD);
    expect(loginBtn).toBeDisabled();

    TYPED_PASSWORD = 'xablau1234567';
    userEvent.type(inputPassword, TYPED_PASSWORD);
    expect(loginBtn).not.toBeDisabled();
  });

  test('Os tokens devem estar salvos no localStorage após logar', () => {
    renderWithRouter(<App />);
    const inputEmail = screen.getByTestId(EMAIL_INPUT);
    const inputPassword = screen.getByTestId(PASSWORD_INPUT);
    const loginBtn = screen.getByTestId(LOGIN_BTN);
    const TYPED_EMAIL = 'emailTest@email.com';
    const TYPED_PASSWORD = 'xablau12345467';

    userEvent.type(inputEmail, TYPED_EMAIL);
    userEvent.type(inputPassword, TYPED_PASSWORD);
    userEvent.click(loginBtn);

    const mealsToken = JSON.parse(localStorage.getItem('mealsToken'));
    const cocktailsToken = JSON.parse(localStorage.getItem('cocktailsToken'));

    expect(mealsToken).toBe(1);
    expect(cocktailsToken).toBe(1);
  });
});
