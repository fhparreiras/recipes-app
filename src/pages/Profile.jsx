import React from 'react';
import { useHistory, Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';
import '../css/profile.css';

function Profile() {
  const history = useHistory();
  function checkEmail() {
    if (localStorage.getItem('user')) {
      const { email } = JSON.parse(localStorage.getItem('user'));
      return email;
    }
    return '';
  }

  function logOut() {
    localStorage.removeItem('user');
    localStorage.removeItem('mealsToken');
    localStorage.removeItem('cocktailsToken');
    localStorage.removeItem('doneRecipes');
    localStorage.removeItem('favoriteRecipes');
    localStorage.removeItem('inProgressRecipes');
    history.push('/');
  }

  return (
    <div>
      <Header title="Profile" renderSearchBar={ false } />

      <h2 data-testid="profile-email">{checkEmail()}</h2>

      <div className="button-container">
        <Link to="/done-recipes">
          <button
            type="button"
            data-testid="profile-done-btn"
            className="profile-buttons"
          >
            Done Recipes
          </button>
        </Link>

        <Link to="/favorite-recipes">
          <button
            type="button"
            data-testid="profile-favorite-btn"
            className="profile-buttons"
          >
            Favorite Recipes
          </button>
        </Link>

        <button
          type="button"
          data-testid="profile-logout-btn"
          onClick={ logOut }
          className="profile-buttons"
        >
          Logout
        </button>
      </div>

      <Footer />
    </div>
  );
}

export default Profile;
