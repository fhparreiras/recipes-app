const checkIfFavorited = (setFavorited, id) => {
  const pastFavoritedMeal = JSON.parse(localStorage.getItem('favoriteRecipes'));
  const alreadyFavorited = pastFavoritedMeal.some((each) => (
    each.id === id
  ));
  if (alreadyFavorited) setFavorited(true);
  else setFavorited(false);
};

export default checkIfFavorited;
