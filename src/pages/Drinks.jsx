import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import DrinkCard from '../components/cards/DrinkCard';
import context from '../context/MyContext';
import Footer from '../components/Footer';

function Drinks() {
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

  return (
    <>
      <Header title="Drinks" renderSearchBar />
      <div className="categories-container">
        { drinkCategories.map((category, index) => {
          const magicNumber = 4;
          return (
            index <= magicNumber
              ? (
                <button
                  data-testid={ `${category.strCategory}-category-filter` }
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
                <DrinkCard
                  imgSrc={ drink.strDrinkThumb }
                  index={ index }
                  drinkName={ drink.strDrink }
                  key={ drink.idDrink }
                />
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

export default Drinks;
