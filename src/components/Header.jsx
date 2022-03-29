import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { getFoodApi, getApiDrinks } from '../helpers/getApi';

function Header({ title, renderSearchBar }) {
  const [disabledSearch, setDisabledSearch] = useState(true);
  const [searchType, setSearchType] = useState('');
  const [searchBar, setSearchBar] = useState('');

  const handleClickSearch = () => {
    if (disabledSearch === true) setDisabledSearch(false);
    if (disabledSearch === false) setDisabledSearch(true);
  };

  const handleSearchBar = ({ target }) => {
    setSearchBar(target.value);
  };

  const handleRadioBtn = ({ target }) => {
    setSearchType(target.value);
  };

  const handleSearchBtn = async () => {
    if (title === 'Foods') {
      const url = `${getFoodApi(searchType)}${searchBar}`;
      if (searchType === 'first-letter' && searchBar.length > 1) {
        global.alert('Your search must have only 1 (one) character');
      } else {
        const response = await fetch(url);
        const result = await response.json();
        console.log('api: ', result, 'url: ', url);
        return result;
      }
    }
    if (title === 'Drinks') {
      getApiDrinks(searchType, searchBar);
    }
  };

  return (
    <header>
      <Link to="/profile">
        <input
          type="image"
          data-testid="profile-top-btn"
          src={ profileIcon }
          alt="profileIcon"
        />
      </Link>

      <h1
        data-testid="page-title"
      >
        { title }
      </h1>
      { renderSearchBar && (
        <input
          type="image"
          data-testid="search-top-btn"
          src={ searchIcon }
          alt="searchIcon"
          onClick={ handleClickSearch }
        />
      )}
      { disabledSearch !== true
        && (
          <>
            <input
              type="text"
              data-testid="search-input"
              placeholder="Search Recipe"
              onChange={ handleSearchBar }
            />
            <label htmlFor="ingredient">
              <input
                data-testid="ingredient-search-radio"
                id="ingredient"
                name="options"
                onClick={ handleRadioBtn }
                type="radio"
                value="ingredient"
              />
              Ingredient
            </label>
            <label htmlFor="name">
              <input
                data-testid="name-search-radio"
                id="name"
                name="options"
                onClick={ handleRadioBtn }
                type="radio"
                value="name"
              />
              Name
            </label>
            <label htmlFor="first-letter">
              <input
                data-testid="first-letter-search-radio"
                id="first-letter"
                name="options"
                onClick={ handleRadioBtn }
                type="radio"
                value="first-letter"
              />
              First Letter
            </label>
            <button
              data-testid="exec-search-btn"
              onClick={ handleSearchBtn }
              type="button"
            >
              Search
            </button>
          </>)}
    </header>
  );
}

<<<<<<< Updated upstream
Header.propTypes = {
  title: PropTypes.string.isRequired,
  renderSearchBar: PropTypes.bool.isRequired,
};

=======
>>>>>>> Stashed changes
export default Header;
