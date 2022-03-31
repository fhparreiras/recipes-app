import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import FoodCard from '../components/cards/FoodCard';
import context from '../context/MyContext';
import Footer from '../components/Footer';

function Foods() {
  const { recipesList } = useContext(context);

  return (
    <>
      <Header title="Foods" renderSearchBar />
      { recipesList !== null && recipesList.map((recipe, index) => {
        const magicNumber = 11;
        return (
          index <= magicNumber
            ? (
              <Link to={ `/foods/${recipe.idMeal}` }>
                <FoodCard
                  imgSrc={ recipe.strMealThumb }
                  index={ index }
                  key={ index }
                  recipeName={ recipe.strMeal }
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
export default Foods;
