import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Login from '../pages/Login';
import DetailsDrink from '../pages/DetailsDrink';
import DetailsFoods from '../pages/DetailsFoods';
import Drinks from '../pages/Drinks';
import DrinksRecipeProgress from '../pages/DrinksRecipeProgress';
import Explore from '../pages/Explore';
import ExploreDrinks from '../pages/ExploreDrinks';
import ExploreDrinksIngredients from '../pages/ExploreDrinksIngredients';
import ExploreFoods from '../pages/ExploreFoods';
import ExploreFoodsIngredients from '../pages/ExploreFoodsIngredients';
import ExploreFoodsNationalities from '../pages/ExploreFoodsNationalities';
import FavoriteRecipes from '../pages/FavoriteRecipes';
import Foods from '../pages/Foods';
import FoodsRecipeProgress from '../pages/FoodsRecipeProgress';
import Profile from '../pages/Profile';
import RecipesDone from '../pages/RecipesDone';
import NotFound from '../pages/NotFound';

function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/foods" component={ Foods } />
        <Route exact path="/drinks" component={ Drinks } />
        <Route exact path="/foods/:id" component={ DetailsFoods } />
        <Route exact path="/drinks/:id" component={ DetailsDrink } />
        <Route exact path="/foods/:id/in-progress" component={ FoodsRecipeProgress } />
        <Route exact path="/drinks/:id/in-progress" component={ DrinksRecipeProgress } />
        <Route exact path="/explore" component={ Explore } />
        <Route exact path="/explore/foods" component={ ExploreFoods } />
        <Route exact path="/explore/drinks" component={ ExploreDrinks } />
        <Route
          exact
          path="/explore/foods/ingredients"
          component={ ExploreFoodsIngredients }
        />
        <Route
          exact
          path="/explore/drinks/ingredients"
          component={ ExploreDrinksIngredients }
        />
        <Route
          exact
          path="/explore/foods/nationalities"
          component={ ExploreFoodsNationalities }
        />
        <Route
          path="/explore/drinks/nationalities"
          component={ NotFound }
        />
        <Route exact path="/profile" component={ Profile } />
        <Route exact path="/done-recipes" component={ RecipesDone } />
        <Route exact path="/favorite-recipes" component={ FavoriteRecipes } />
      </Switch>
    </BrowserRouter>
  );
}

export default Routes;
