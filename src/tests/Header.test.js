import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
import App from '../App';
import renderWithRouter from '../renderWithRouter';

describe('Testes do HEADER', () => {
  test('Todos os inputs e button da tela devem estar presentes', () => {
    const { history } = renderWithRouter(<App />);
    history.push('/foods');

    const text = screen.getByText('Foods');
    const profileIcon = screen.getByTestId('profile-top-btn');
    const searchIcon = screen.getByTestId('search-top-btn');
    const pageTitle = screen.getByTestId('page-title');

    expect(text).toBeDefined();
    expect(profileIcon).toBeDefined();
    expect(searchIcon).toBeDefined();
    expect(pageTitle).toBeDefined();
  });
});
