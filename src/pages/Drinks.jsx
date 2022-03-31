import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import DrinkCard from '../components/cards/DrinkCard';
import context from '../context/MyContext';
import Footer from '../components/Footer';
import { getDrinkByCategory } from '../helpers/getApi';

function Drinks({ history }) {
  const { drinksList, setDrinksList,
    drinkCategories, setDrinkCategories } = useContext(context);

  useEffect(() => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    async function fetchList() {
      const response = await fetch(url);
      const result = await response.json();
      return setDrinksList(result.drinks);
    }
    fetchList();
  }, [setDrinksList]);

  useEffect(() => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list';
    async function fetchCategories() {
      const response = await fetch(url);
      const result = await response.json();
      return setDrinkCategories(result.drinks);
    }
    fetchCategories();
  }, [setDrinkCategories]);

  let filteredDrinkList = drinkCategories;

  const handleFilterBtn = async ({ target }) => {
    if (target.className === 'unset') {
      target.className = 'set';
      filteredDrinkList = await getDrinkByCategory(target.name);
      setDrinksList(filteredDrinkList);
    } else {
      target.className = 'unset';
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(url);
      const result = await response.json();
      return setDrinksList(result.drinks);
    }
  };

  return (
    <>
      <Header title="Drinks" history={ history } renderSearchBar />
      <div className="categories-container">
        { drinkCategories.map((category, index) => {
          const magicNumber = 4;
          return (
            index <= magicNumber
              ? (
                <button
                  className="unset"
                  data-testid={ `${category.strCategory}-category-filter` }
                  name={ category.strCategory }
                  onClick={ handleFilterBtn }
                  type="button"
                  key={ index }
                >
                  { category.strCategory }
                </button>
              )
              : (
                <span />
              )
          );
        })}
      </div>
      <div className="recipe-container">
        { drinksList !== null && drinksList.map((drink, index) => {
          const magicNumber = 11;
          return (
            index <= magicNumber
              ? (
                <Link to={ `/drinks/${drink.idDrink}` }>
                  <DrinkCard
                    imgSrc={ drink.strDrinkThumb }
                    index={ index }
                    key={ index }
                    drinkName={ drink.strDrink }
                  />
                </Link>
              )
              : (
                <span />
              )
          );
        })}
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}

Drinks.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Drinks;
