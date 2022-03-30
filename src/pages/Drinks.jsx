import React, { useContext } from 'react';
import Header from '../components/Header';
import DrinkCard from '../components/cards/DrinkCard';
import context from '../context/MyContext';
import Footer from '../components/Footer';

function Drinks() {
  const { drinksList } = useContext(context);

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
