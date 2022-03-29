import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import profileIcon from '../images/profileIcon.svg';
import searchIcon from '../images/searchIcon.svg';

function Header({ title, renderSearchBar }) {
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
        />
      )}

    </header>
  );
}

Header.propTypes = {
  title: PropTypes.string.isRequired,
  renderSearchBar: PropTypes.bool.isRequired,
};

export default Header;

// import React, { useState } from 'react';

// function Header() {
//   const [disabledSearch, setDisabledSearch] = useState(true);

//   const handleClickSearch = () => {
//     setDisabledSearch(false);
//   };
//   return (
//     <div>
//       <button
//         type="button"
//         onClick={ handleClickSearch }
//       >
//         Busca
//       </button>
//       {!disabledSearch
//       && <input type="text" data-testid="search-input" />}
//     </div>
//   );
// }
