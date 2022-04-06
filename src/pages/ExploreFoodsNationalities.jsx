import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import context from '../context/MyContext';
import Header from '../components/Header';
import Footer from '../components/Footer';
import FoodCard from '../components/cards/FoodCard';

function ExploreFoodsNationalities() {
  const { foodRecipesList, setFoodRecipesList,
    countriesList, setCountriesList } = useContext(context);

  useEffect(() => {
    const url = 'https://www.themealdb.com/api/json/v1/1/list.php?a=list';
    async function fetchList() {
      const response = await fetch(url);
      const result = await response.json();
      return setCountriesList(result.meals);
    }
    fetchList();
  }, [setCountriesList]);

  useEffect(() => {
    const url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    async function fetchList() {
      const response = await fetch(url);
      const result = await response.json();
      return setFoodRecipesList(result.meals);
    }
    fetchList();
  }, [setFoodRecipesList]);

  const selectNationality = async ({ target }) => {
    let url = '';
    console.log(target.value);
    if (target.value !== 'All') {
      url = `https://www.themealdb.com/api/json/v1/1/filter.php?a=${target.value}`;
    } else {
      url = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';
    }
    console.log(url);
    const response = await fetch(url);
    const result = await response.json();
    setFoodRecipesList(result.meals);
  };

  return (
    <div>
      <Header title="Explore Nationalities" renderSearchBar />
      <select
        data-testid="explore-by-nationality-dropdown"
        className="nationalities-container"
        onChange={ selectNationality }
      >
        <option data-testid="All-option" value="All">
          All
        </option>
        { countriesList.map((country, index) => (
          <option
            key={ index }
            data-testid={ `${country.strArea}-option` }
            value={ country.strArea }
          >
            {country.strArea}
          </option>
        ))}
      </select>
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
      <Footer />
    </div>
  );
}

export default ExploreFoodsNationalities;
