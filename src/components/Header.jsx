import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';
import { getFoodApi, getApiDrinks } from '../helpers/getApi';
import context from '../context/MyContext';
import '../css/footer.css';

const Header = ({ title, renderSearchBar, history }) => {
  const {
    setReturnApiDrinks,
    setReturnApiMeals,
  } = useContext(context);
  const [disabledSearch, setDisabledSearch] = useState(true);
  const [searchType, setSearchType] = useState('');
  const [searchBar, setSearchBar] = useState('');

  const { setDrinksList, setRecipesList } = useContext(context);

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
        const { meals } = await response.json();
        setReturnApiMeals(meals);
        if (meals.length === 1) {
          history.push(`/foods/${meals[0].idMeal}`);
          return meals;
        }
        return meals;
      }
    }
    if (title === 'Drinks') {
      const url = `${getApiDrinks(searchType, searchBar)}`;
      const response = await fetch(url);
      const { drinks } = await response.json();
      setReturnApiDrinks(drinks);
      if (drinks.length === 1) {
        history.push(`/drinks/${drinks[0].idDrink}`);
        return drinks;
      }
      return drinks;
    }
  };

  return (
    <header>
      <div className="header">
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
          {title}
        </h1>
        {renderSearchBar && (
          <input
            type="image"
            data-testid="search-top-btn"
            src={ searchIcon }
            alt="searchIcon"
            onClick={ handleClickSearch }
          />
        )}
      </div>
      {disabledSearch !== true
        && (
          <div className="search-bar">
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
          </div>)}
    </header>
  );
};

Header.propTypes = {
  title: PropTypes.string,
  renderSearchBar: PropTypes.bool,
  history: PropTypes.shape({ push: PropTypes.func }),
}.isRequired;

export default Header;
