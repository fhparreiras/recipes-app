import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import DrinkCard from '../components/cards/DrinkCard';
import context from '../context/MyContext';
import Footer from '../components/Footer';

function Drinks() {
  const { drinksList, setDrinksList } = useContext(context);

  useEffect(() => {
    const url = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=';
    async function fetchList() {
      const response = await fetch(url);
      const result = await response.json();
      return setDrinksList(result.drinks);
    }
    fetchList();
  }, [setDrinksList]);

  return (
    <>
      <Header title="Drinks" renderSearchBar />
      <div className="recipe-container">
        { drinksList !== null && drinksList.map((drink, index) => {
          const magicNumber = 11;
          return (
            index <= magicNumber
              ? (
                <DrinkCard
                  imgSrc={ drink.strDrinkThumb }
                  index={ index }
                  key={ index }
                  drinkName={ drink.strDrink }
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
