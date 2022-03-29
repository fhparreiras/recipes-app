import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, renderSearchBar }) {
  const [disabledSearch, setDisabledSearch] = useState(true);

  const handleClickSearch = () => {
    if (disabledSearch === true) setDisabledSearch(false);
    if (disabledSearch === false) setDisabledSearch(true);
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
        && <input
          type="text"
          data-testid="search-input"
          placeholder="Search Recipe"
        />}
    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  renderSearchBar: PropTypes.bool.isRequired,
};

export default Header;
