import React, { useState } from 'react';

function Header() {
  const [disabledSearch, setDisabledSearch] = useState(true);

  const handleClickSearch = () => {
    setDisabledSearch(false);
  };
  return (
    <div>
      <button
        type="button"
        onClick={ handleClickSearch }
      >
        Busca
      </button>
      {!disabledSearch
      && <input type="text" data-testid="search-input" />}
    </div>
  );
}
export default Header;
