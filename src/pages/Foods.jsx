import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import FoodCard from '../components/cards/FoodCard';
import context from '../context/MyContext';
import Footer from '../components/Footer';
import { getFoodByCategory } from '../helpers/getApi';
import Header from '../components/Header';

function Foods({ history }) {
  const { foodRecipesList, setFoodRecipesList,
    foodCategories, setFoodCategories } = useContext(context);

  useEffect(() => {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    async function fetchList() {
      const response = await fetch(url);
      const result = await response.json();
      return setFoodRecipesList(result.meals);
    }
    fetchList();
  }, [setFoodRecipesList]);

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
    if (target.className === 'unset' && target.name !== 'all') {
      target.className = 'set';
      filteredFoodList = await getFoodByCategory(target.name);
      setFoodRecipesList(filteredFoodList);
    } else {
      target.className = 'unset';
      const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
      const response = await fetch(url);
      const result = await response.json();
      return setFoodRecipesList(result.meals);
    }
  };

  return (
    <>
      <Header title="Foods" history={ history } renderSearchBar />
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
        { foodCategories.map((category, index) => {
          const magicNumber = 4;
          return (
            index <= magicNumber
              ? (
                <button
                  className="unset"
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
        { foodRecipesList !== null && foodRecipesList.map((recipe, index) => {
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
      </div>
      <div>
        <Footer />
      </div>
    </>
  );
}
Foods.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
};
export default Foods;
