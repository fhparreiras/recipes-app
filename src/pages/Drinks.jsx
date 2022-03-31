import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import DrinkCard from '../components/cards/DrinkCard';
import context from '../context/MyContext';
import Footer from '../components/Footer';

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
      <div>
        <Footer />
      </div>
    </>
  );
}

export default Drinks;
