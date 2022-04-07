import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import DrinkCard from '../components/cards/DrinkCard';
import context from '../context/MyContext';
import Footer from '../components/Footer';
import { getDrinkByCategory } from '../helpers/getApi';

function Drinks({ history, location: { prevPath } }) {
  const { drinksRecipesList, setDrinksRecipesList,
    drinkCategories, setDrinkCategories } = useContext(context);

  useEffect(() => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    async function fetchList() {
      if (prevPath !== 'ingredients') {
        const response = await fetch(url);
        const result = await response.json();
        return setDrinksRecipesList(result.drinks);
      }
    }
    fetchList();
  }, [setDrinksRecipesList]);

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
    if (target.className === 'unset' && target.name !== 'all') {
      target.className = 'set';
      filteredDrinkList = await getDrinkByCategory(target.name);
      setDrinksRecipesList(filteredDrinkList);
    } else {
      target.className = 'unset';
      const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(url);
      const result = await response.json();
      return setDrinksRecipesList(result.drinks);
    }
  };

  return (
    <>
      <Header title="Drinks" history={ history } renderSearchBar />
      <div className="categories-container">
        <button
          className="unset"
          data-testid="All-category-filter"
          name="all"
          onClick={ handleFilterBtn }
          type="button"
        >
          All
        </button>
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
                <>
                </>
              )
          );
        })}
      </div>
      <div className="recipe-container">
        { drinksRecipesList !== null && drinksRecipesList.map((drink, index) => {
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
  location: PropTypes.shape({
    prevPath: PropTypes.string.isRequired,
  }).isRequired,
};

export default Drinks;
