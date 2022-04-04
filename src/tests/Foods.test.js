import React from 'react';
import { screen } from '@testing-library/react';
// import userEvent from '@testing-library/user-event';
// import App from '../App';
import Foods from '../pages/Foods';
import renderWithRouter from '../renderWithRouter';

describe('Testes da TELA PRINCIPAL DE RECEITAS', () => {
  test('Todos os inputs e button do HEADER devem estar presentes', () => {
    renderWithRouter(<Foods />);

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
