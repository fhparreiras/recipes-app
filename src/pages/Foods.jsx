import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import FoodCard from '../components/cards/FoodCard';
import context from '../context/MyContext';
import Footer from '../components/Footer';

function Foods() {
  const { recipesList, setRecipesList } = useContext(context);

  useEffect(() => {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    async function fetchList() {
      const response = await fetch(url);
      const result = await response.json();
      return setRecipesList(result.meals);
    }
    fetchList();
  }, [setRecipesList]);

  return (
    <>
      <Header title="Foods" renderSearchBar />
      <div className="recipe-container">
        { recipesList !== null && recipesList.map((recipe, index) => {
          const magicNumber = 11;
          return (
            index <= magicNumber
              ? (
                <FoodCard
                  imgSrc={ recipe.strMealThumb }
                  index={ index }
                  key={ index }
                  recipeName={ recipe.strMeal }
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
export default Foods;
