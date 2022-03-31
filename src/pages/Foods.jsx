import React, { useContext, useEffect } from 'react';
import Header from '../components/Header';
import FoodCard from '../components/cards/FoodCard';
import context from '../context/MyContext';
import Footer from '../components/Footer';
import { getFoodByCategory } from '../helpers/getApi';

function Foods() {
  const { recipesList, setRecipesList,
    foodCategories, setFoodCategories } = useContext(context);

  useEffect(() => {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    async function fetchList() {
      const response = await fetch(url);
      const result = await response.json();
      return setRecipesList(result.meals);
    }
    fetchList();
  }, [setRecipesList]);

  useEffect(() => {
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?c=list';
    async function fetchCategories() {
      const response = await fetch(url);
      const result = await response.json();
      return setFoodCategories(result.meals);
    }
    fetchCategories();
  }, [setFoodCategories]);

  let filteredFoodList = foodCategories;

  const handleFilterBtn = async ({ target }) => {
    filteredFoodList = await getFoodByCategory(target.name);
    setRecipesList(filteredFoodList);
  };

  return (
    <>
      <Header title="Foods" renderSearchBar />
      <div className="categories-container">
        { foodCategories.map((category, index) => {
          const magicNumber = 4;
          return (
            index <= magicNumber
              ? (
                <button
                  data-testid={ `${category.strCategory}-category-filter` }
                  name={ category.strCategory }
                  type="button"
                  key={ index }
                  onClick={ handleFilterBtn }
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
