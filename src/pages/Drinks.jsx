import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import DrinkCard from '../components/cards/DrinkCard';
import context from '../context/MyContext';
import Footer from '../components/Footer';

function Drinks({ history }) {
  const { drinksList } = useContext(context);

  return (
    <>
      <Header title="Drinks" history={ history } renderSearchBar />
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

Drinks.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};

export default Drinks;
