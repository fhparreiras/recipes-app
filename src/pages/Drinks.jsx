import React, { useContext } from 'react';
import Header from '../components/Header';
import DrinkCard from '../components/cards/DrinkCard';
import context from '../context/MyContext';

function Drinks() {
  const { drinksList } = useContext(context);

  return (
    <>
      <Header title="Drinks" renderSearchBar />
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
    </>
  );
}

export default Drinks;
